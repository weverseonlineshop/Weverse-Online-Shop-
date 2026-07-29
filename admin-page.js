import { supabase } from './supabase-client.js';
import { getCurrentUser, signOut } from './auth.js';

// ── Navigation config ─────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', group: 'main' },
  { id: 'products', label: 'Products', icon: 'package', group: 'main' },
  { id: 'orders', label: 'Orders', icon: 'shopping-bag', group: 'main' },
  { id: 'special-orders', label: 'Special Orders', icon: 'package-plus', group: 'main' },
  { id: 'customers', label: 'Customers', icon: 'users', group: 'main' },
  { id: 'payments', label: 'Payments', icon: 'credit-card', group: 'main' },
  { id: 'shipping', label: 'Shipping', icon: 'truck', group: 'main' },
  { id: 'promotions', label: 'Promotions', icon: 'megaphone', group: 'main' },
  { id: 'content', label: 'Content', icon: 'file-text', group: 'main' },
  { id: 'email', label: 'Email', icon: 'mail', group: 'main' },
  { id: 'analytics', label: 'Analytics', icon: 'bar-chart-3', group: 'main' },
  { id: 'ai', label: 'AI Assistant', icon: 'sparkles', group: 'main' },
  { id: 'security', label: 'Security', icon: 'shield', group: 'system' },
  { id: 'settings', label: 'Website Settings', icon: 'settings', group: 'system' },
  { id: 'ai-settings', label: 'AI Settings', icon: 'bot', group: 'system' },
  { id: 'integrations', label: 'Integrations', icon: 'plug', group: 'system' },
  { id: 'publish', label: 'Publish & Deploy', icon: 'rocket', group: 'system' },
];

const PAGE_TITLES = {
  dashboard: 'Dashboard', products: 'Product Management', orders: 'Order Management',
  customers: 'Customer Management', payments: 'Payment Management', shipping: 'Shipping Management',
  promotions: 'Promotions', content: 'Content Management', email: 'Email Management',
  analytics: 'Analytics', ai: 'AI Admin Assistant', security: 'Security & Logs',
  settings: 'Website Settings', integrations: 'Integrations',
  'special-orders': 'Special Order Requests',
  'ai-settings': 'AI Settings',
  publish: 'Publish & Deploy',
};

let state = {
  user: null,
  isAdmin: false,
  currentSection: 'dashboard',
  data: {},
  loading: true,
};

// ── Helpers ────────────────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
  if (window.lucide) lucide.createIcons();
}

function escapeHtml(text) {
  if (text == null) return '';
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

function fmtMoney(amount, currency = 'USD') {
  const n = parseFloat(amount) || 0;
  return `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function fmtDateTime(d) {
  if (!d) return '—';
  return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function statusBadge(status) {
  const colors = {
    order_placed: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    payment_approved: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    processing: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    shipped: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    in_transit: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    inactive: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };
  const cls = colors[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  return `<span class="inline-flex items-center gap-1 ${cls} border text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">${escapeHtml(status?.replace(/_/g, ' '))}</span>`;
}

function ripple(btn) {
  btn.addEventListener('click', function (e) {
    const r = this.getBoundingClientRect();
    const rip = document.createElement('span');
    rip.className = 'ripple';
    const s = Math.max(r.width, r.height);
    rip.style.width = rip.style.height = s + 'px';
    rip.style.left = (e.clientX - r.left - s / 2) + 'px';
    rip.style.top = (e.clientY - r.top - s / 2) + 'px';
    this.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  });
}

function closeModal(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('modal-container').innerHTML = '';
}

window.closeModal = closeModal;

// ── Data loading ──────────────────────────────────────────────
async function loadDashboardStats() {
  const [products, orders, profiles, promotions, gateways, reviews, settings] = await Promise.all([
    supabase.from('showroom_listings').select('id,category,is_active,stock_quantity,price,currency,listing_type'),
    supabase.from('payment_receipts').select('id,status,amount,currency,payment_method,created_at'),
    supabase.from('profiles').select('user_id,created_at', { count: 'exact' }),
    supabase.from('promotions').select('id,is_active,promo_type'),
    supabase.from('payment_gateways').select('id,is_active'),
    supabase.from('product_reviews').select('id', { count: 'exact' }),
    supabase.from('site_settings').select('*').limit(1).maybeSingle(),
  ]);

  const productList = products.data || [];
  const orderList = orders.data || [];
  const cats = new Set(productList.map(p => p.category).filter(Boolean));
  const lowStock = productList.filter(p => p.stock_quantity != null && p.stock_quantity > 0 && p.stock_quantity < 10);
  const outStock = productList.filter(p => p.stock_quantity === 0);
  const revenue = orderList.filter(o => ['payment_approved', 'delivered'].includes(o.status)).reduce((s, o) => s + (parseFloat(o.amount) || 0), 0);
  const now = new Date();
  const monthOrders = orderList.filter(o => o.created_at && new Date(o.created_at).getMonth() === now.getMonth() && new Date(o.created_at).getFullYear() === now.getFullYear());
  const monthRevenue = monthOrders.filter(o => ['payment_approved', 'delivered'].includes(o.status)).reduce((s, o) => s + (parseFloat(o.amount) || 0), 0);
  const todayOrders = orderList.filter(o => o.created_at && new Date(o.created_at).toDateString() === now.toDateString());
  const dayRevenue = todayOrders.filter(o => ['payment_approved', 'delivered'].includes(o.status)).reduce((s, o) => s + (parseFloat(o.amount) || 0), 0);
  const pendingManual = orderList.filter(o => o.payment_method === 'manual_bank_transfer' && o.status === 'order_placed');

  return {
    totalProducts: productList.length,
    activeProducts: productList.filter(p => p.is_active).length,
    totalCategories: cats.size,
    totalOrders: orderList.length,
    pendingOrders: orderList.filter(o => o.status === 'order_placed').length,
    completedOrders: orderList.filter(o => o.status === 'delivered').length,
    cancelledOrders: orderList.filter(o => o.status === 'cancelled').length,
    totalRevenue: revenue,
    monthlyRevenue: monthRevenue,
    dailyRevenue: dayRevenue,
    pendingManualPayments: pendingManual.length,
    activeCoupons: (promotions.data || []).filter(p => p.is_active && p.promo_type === 'coupon').length,
    totalReviews: reviews.count || 0,
    totalCustomers: profiles.count || 0,
    activeGateways: (gateways.data || []).filter(g => g.is_active).length,
    activePromotions: (promotions.data || []).filter(p => p.is_active).length,
    lowStock: lowStock.length,
    outOfStock: outStock.length,
    lowStockItems: lowStock,
    settings: settings.data,
  };
}

// ── Section renderers ─────────────────────────────────────────
function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  const groups = { main: [], system: [] };
  NAV.forEach(item => groups[item.group].push(item));

  nav.innerHTML = `
    ${groups.main.map(item => `
      <button onclick="navigate('${item.id}')" class="nav-item ${state.currentSection === item.id ? 'active' : ''} w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold text-gray-400 rounded-xl">
        <i data-lucide="${item.icon}" class="w-4 h-4 shrink-0"></i> ${item.label}
      </button>
    `).join('')}
    <div class="pt-3 mt-3 border-t border-blue-500/10">
      <p class="text-[9px] font-bold text-gray-600 uppercase tracking-wider px-3 mb-1">System</p>
      ${groups.system.map(item => `
        <button onclick="navigate('${item.id}')" class="nav-item ${state.currentSection === item.id ? 'active' : ''} w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold text-gray-400 rounded-xl">
          <i data-lucide="${item.icon}" class="w-4 h-4 shrink-0"></i> ${item.label}
        </button>
      `).join('')}
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

function renderAdminUserInfo() {
  const el = document.getElementById('admin-user-info');
  if (state.user) {
    el.innerHTML = `
      <div class="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
        <i data-lucide="user" class="w-4 h-4 text-blue-400"></i>
      </div>
      <div class="min-w-0">
        <p class="text-xs font-bold text-white truncate">${escapeHtml(state.user.email)}</p>
        <p class="text-[10px] text-emerald-400 font-bold uppercase">Admin</p>
      </div>
    `;
  }
  if (window.lucide) lucide.createIcons();
}

// ── Dashboard section ─────────────────────────────────────────
async function renderDashboard() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading dashboard...</div></div>`;
  if (window.lucide) lucide.createIcons();

  try {
    const stats = await loadDashboardStats();
    state.data.stats = stats;

    content.innerHTML = `
      <div class="fade-in space-y-6">
        <!-- Stat cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          ${statCard('Total Customers', stats.totalCustomers, 'users', 'blue')}
          ${statCard('Total Products', stats.totalProducts, 'package', 'amber')}
          ${statCard('Categories', stats.totalCategories, 'layers', 'violet')}
          ${statCard('Total Orders', stats.totalOrders, 'shopping-bag', 'emerald')}
          ${statCard('Pending Orders', stats.pendingOrders, 'clock', 'amber')}
          ${statCard('Completed', stats.completedOrders, 'check-circle', 'emerald')}
          ${statCard('Cancelled', stats.cancelledOrders, 'x-circle', 'red')}
          ${statCard('Total Revenue', fmtMoney(stats.totalRevenue), 'dollar-sign', 'emerald')}
          ${statCard('Monthly Revenue', fmtMoney(stats.monthlyRevenue), 'trending-up', 'blue')}
          ${statCard('Daily Revenue', fmtMoney(stats.dailyRevenue), 'calendar', 'amber')}
          ${statCard('Pending Manual', stats.pendingManualPayments, 'alert-triangle', 'orange')}
          ${statCard('Active Coupons', stats.activeCoupons, 'ticket', 'violet')}
          ${statCard('Total Reviews', stats.totalReviews, 'star', 'amber')}
          ${statCard('Low Stock', stats.lowStock, 'alert-circle', 'orange')}
          ${statCard('Out of Stock', stats.outOfStock, 'package-x', 'red')}
          ${statCard('Active Gateways', stats.activeGateways, 'credit-card', 'blue')}
          ${statCard('Active Promos', stats.activePromotions, 'megaphone', 'violet')}
          ${statCard('Active Products', stats.activeProducts, 'check', 'emerald')}
        </div>

        <!-- Charts row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
            <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="trending-up" class="w-4 h-4 text-blue-400"></i> Revenue Overview</h3>
            <canvas id="chart-revenue" height="200"></canvas>
          </div>
          <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up" style="animation-delay:.1s">
            <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="shopping-bag" class="w-4 h-4 text-blue-400"></i> Orders by Status</h3>
            <canvas id="chart-orders" height="200"></canvas>
          </div>
        </div>

        <!-- Low stock alert -->
        ${stats.lowStock > 0 ? `
          <div class="glass border border-orange-500/20 rounded-2xl p-5 slide-up">
            <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-3 flex items-center gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-orange-400"></i> Low Stock Alert (${stats.lowStock})</h3>
            <div class="space-y-2">
              ${stats.lowStockItems.slice(0, 5).map(p => `
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-300">${escapeHtml(p.title || 'Untitled')} <span class="text-gray-600">(${p.property_id || '—'})</span></span>
                  <span class="text-orange-400 font-bold">Stock: ${p.stock_quantity}</span>
                </div>
              `).join('')}
            </div>
            <button onclick="navigate('products')" class="btn-press mt-3 text-xs font-bold text-blue-400 hover:text-blue-300 transition">View all products →</button>
          </div>
        ` : ''}

        <!-- Empty categories notification -->
        <div id="empty-categories-alert" class="hidden glass border border-amber-500/20 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-3 flex items-center gap-2">
            <i data-lucide="folder-x" class="w-4 h-4 text-amber-400"></i> Categories With No Products
          </h3>
          <div id="empty-categories-list" class="space-y-2"></div>
          <p class="text-xs text-gray-500 mt-3">Add products to these categories using the AI Assistant or the Add Product button.</p>
        </div>

        <!-- Recent activity -->
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="activity" class="w-4 h-4 text-blue-400"></i> Recent Activity</h3>
          <div id="recent-activity" class="space-y-2"></div>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();

    // Load recent activity
    const { data: activity } = await supabase.from('admin_activity_logs').select('action,entity_type,entity_id,created_at,user_id').order('created_at', { ascending: false }).limit(10);
    const actEl = document.getElementById('recent-activity');
    if (activity && activity.length > 0) {
      actEl.innerHTML = activity.map(a => `<div class="flex items-center gap-2 text-xs text-gray-400 py-1.5 border-b border-blue-500/5 last:border-0"><span class="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span><span class="font-bold text-gray-300">${escapeHtml(a.action)}</span> ${a.entity_type ? `<span class="text-gray-600">on ${escapeHtml(a.entity_type)}</span>` : ''} <span class="text-gray-600 ml-auto">${fmtDateTime(a.created_at)}</span></div>`).join('');
    } else {
      actEl.innerHTML = '<p class="text-xs text-gray-600 text-center py-4">No recent activity.</p>';
    }

    // Load empty categories notification
    try {
      const { data: allCats } = await supabase.from('showroom_listings').select('category').eq('is_active', true);
      const knownCategories = ['Real Estate','Apartments','Villas','Mansions','Beach Houses','Luxury Condominiums','Farm Houses','Commercial Buildings','Hotels','Cars','Motorhomes','Trucks','Electronics','Phones','Computers','Fashion','Home & Garden','Sports','Beauty','Toys','Books','Automotive','Groceries','Health','Jewelry','Art','Music','Other'];
      const productCats = new Set((allCats || []).map(r => r.category));
      const empty = knownCategories.filter(c => !productCats.has(c));
      const alertEl = document.getElementById('empty-categories-alert');
      const listEl = document.getElementById('empty-categories-list');
      if (alertEl && listEl) {
        if (empty.length > 0) {
          listEl.innerHTML = empty.map(c => `<div class="text-xs text-gray-300 py-1">• ${escapeHtml(c)}</div>`).join('');
          alertEl.classList.remove('hidden');
        }
      }
    } catch {}

    // Render charts
    renderRevenueChart(stats);
    renderOrdersChart(stats);
  } catch (err) {
    content.innerHTML = `<div class="glass border border-red-500/20 rounded-2xl p-6 text-center"><p class="text-sm text-red-400">Failed to load dashboard: ${escapeHtml(err.message)}</p></div>`;
  }
}

function statCard(label, value, icon, color) {
  const colorMap = {
    blue: 'bg-blue-500/10 text-blue-400', amber: 'bg-amber-500/10 text-amber-400',
    violet: 'bg-violet-500/10 text-violet-400', emerald: 'bg-emerald-500/10 text-emerald-400',
    red: 'bg-red-500/10 text-red-400', orange: 'bg-orange-500/10 text-orange-400',
  gray: 'bg-gray-500/10 text-gray-400',
  dollar: 'bg-emerald-500/10 text-emerald-400',
  star: 'bg-amber-500/10 text-amber-400',
    ticket: 'bg-violet-500/10 text-violet-400',
    megaphone: 'bg-violet-500/10 text-violet-400',
    credit: 'bg-blue-500/10 text-blue-400',
  };
  const cls = colorMap[color] || colorMap.blue;
  return `<div class="stat-card glass border border-blue-500/15 rounded-2xl p-4 slide-up"><div class="flex items-center justify-between mb-2"><div class="p-2 ${cls} rounded-lg"><i data-lucide="${icon}" class="w-4 h-4"></i></div></div><p class="text-xl font-black text-white">${typeof value === 'string' && value.length > 12 ? value : value}</p><p class="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">${label}</p></div>`;
}

function renderRevenueChart(stats) {
  const ctx = document.getElementById('chart-revenue');
  if (!ctx) return;
  const labels = ['Total', 'Monthly', 'Daily'];
  const data = [stats.totalRevenue, stats.monthlyRevenue, stats.dailyRevenue];
  new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Revenue', data, backgroundColor: ['rgba(59,130,246,.6)', 'rgba(168,85,247,.6)', 'rgba(245,158,11,.6)'], borderColor: ['rgb(59,130,246)', 'rgb(168,85,247)', 'rgb(245,158,11)'], borderWidth: 1 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(59,130,246,.05)' } }, x: { ticks: { color: '#64748b' }, grid: { display: false } } } },
  });
}

function renderOrdersChart(stats) {
  const ctx = document.getElementById('chart-orders');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Pending', 'Completed', 'Cancelled'],
      datasets: [{ data: [stats.pendingOrders, stats.completedOrders, stats.cancelledOrders], backgroundColor: ['rgba(245,158,11,.6)', 'rgba(16,185,129,.6)', 'rgba(239,68,68,.6)'], borderColor: ['rgb(245,158,11)', 'rgb(16,185,129)', 'rgb(239,68,68)'], borderWidth: 1 }],
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 11 } } } } },
  });
}

// ── Products section ──────────────────────────────────────────
async function renderProducts() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading products...</div></div>`;
  if (window.lucide) lucide.createIcons();

  const { data: products } = await supabase.from('showroom_listings').select('*').order('created_at', { ascending: false }).limit(100);

  content.innerHTML = `
    <div class="fade-in space-y-4">
      <div class="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div class="flex gap-2 flex-1 max-w-md">
          <input type="text" id="product-search" placeholder="Search products..." oninput="filterProducts()" class="input-field flex-1 bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          <select id="product-filter-type" onchange="filterProducts()" class="input-field bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            <option value="">All Types</option>
            <option value="product">Products</option>
            <option value="property">Properties</option>
            <option value="vehicle">Vehicles</option>
          </select>
        </div>
        <button onclick="showProductModal()" class="btn-press flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">
          <i data-lucide="plus" class="w-4 h-4"></i> Add Product
        </button>
      </div>
      <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto scrollbar-thin">
          <table class="w-full data-table">
            <thead><tr class="border-b border-blue-500/10 bg-blue-950/30">
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">ID</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Title</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3 hidden sm:table-cell">Type</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3 hidden md:table-cell">Category</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Price</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3 hidden lg:table-cell">Stock</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Status</th>
              <th class="text-right text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Actions</th>
            </tr></thead>
            <tbody id="products-tbody">${(products || []).map(p => productRow(p)).join('')}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
  state.data.products = products || [];
  document.querySelectorAll('.btn-press').forEach(ripple);
}

function productRow(p) {
  return `<tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition" data-search="${escapeHtml((p.title || '').toLowerCase())}" data-type="${p.listing_type || ''}">
    <td class="px-4 py-3 text-xs font-mono text-blue-400">${p.property_id || '—'}</td>
    <td class="px-4 py-3 text-xs text-white font-bold max-w-[200px] truncate">${escapeHtml(p.title || 'Untitled')}</td>
    <td class="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">${escapeHtml(p.listing_type || '—')}</td>
    <td class="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">${escapeHtml(p.category || '—')}</td>
    <td class="px-4 py-3 text-xs text-amber-400 font-bold">${fmtMoney(p.price, p.currency)}</td>
    <td class="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">${p.stock_quantity != null ? p.stock_quantity : '—'}</td>
    <td class="px-4 py-3">${p.is_active ? statusBadge('active') : statusBadge('inactive')}</td>
    <td class="px-4 py-3 text-right">
      <div class="flex items-center justify-end gap-1">
        <button onclick="toggleProductActive('${p.property_id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 transition" title="${p.is_active ? 'Hide' : 'Publish'}"><i data-lucide="${p.is_active ? 'eye-off' : 'eye'}" class="w-4 h-4"></i></button>
        <button onclick="duplicateProduct('${p.property_id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 transition" title="Duplicate"><i data-lucide="copy" class="w-4 h-4"></i></button>
        <button onclick="showProductModal('${p.property_id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition" title="Edit"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
        <button onclick="confirmDeleteProduct('${p.property_id}')" class="btn-press p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition" title="Delete"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>
    </td>
  </tr>`;
}

window.filterProducts = () => {
  const search = document.getElementById('product-search').value.toLowerCase();
  const type = document.getElementById('product-filter-type').value;
  document.querySelectorAll('#products-tbody tr').forEach(row => {
    const matchSearch = !search || row.dataset.search.includes(search);
    const matchType = !type || row.dataset.type === type;
    row.style.display = matchSearch && matchType ? '' : 'none';
  });
};

window.showProductModal = async (propertyId) => {
  const modal = document.getElementById('modal-container');
  let product = null;
  if (propertyId) {
    const { data } = await supabase.from('showroom_listings').select('*').eq('property_id', propertyId).maybeSingle();
    product = data;
  }
  const p = product || {};
  modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
    <div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin" onclick="event.stopPropagation()">
      <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="${propertyId ? 'edit-3' : 'plus'}" class="w-5 h-5 text-blue-400"></i> ${propertyId ? 'Edit Product' : 'Add Product'}</h3>
      <form id="product-form" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Title *</label><input type="text" id="pf-title" required value="${escapeHtml(p.title || '')}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Category</label><input type="text" id="pf-category" value="${escapeHtml(p.category || '')}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        </div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Description</label><textarea id="pf-description" rows="3" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none">${escapeHtml(p.description || '')}</textarea></div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Price *</label><input type="number" id="pf-price" step="0.01" required value="${p.price || 0}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Currency</label><select id="pf-currency" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"><option value="USD" ${p.currency === 'USD' ? 'selected' : ''}>USD</option><option value="NGN" ${p.currency === 'NGN' ? 'selected' : ''}>NGN</option><option value="GBP" ${p.currency === 'GBP' ? 'selected' : ''}>GBP</option><option value="EUR" ${p.currency === 'EUR' ? 'selected' : ''}>EUR</option></select></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Stock</label><input type="number" id="pf-stock" value="${p.stock_quantity ?? ''}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Type</label><select id="pf-type" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"><option value="product" ${p.listing_type === 'product' ? 'selected' : ''}>Product</option><option value="property" ${p.listing_type === 'property' ? 'selected' : ''}>Property</option><option value="vehicle" ${p.listing_type === 'vehicle' ? 'selected' : ''}>Vehicle</option></select></div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">SKU</label><input type="text" id="pf-sku" value="${escapeHtml(p.sku || '')}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Subcategory</label><input type="text" id="pf-subcategory" value="${escapeHtml(p.subcategory || '')}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        </div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Features (comma-separated)</label><input type="text" id="pf-features" value="${escapeHtml((p.features || []).join(', '))}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Tags (comma-separated)</label><input type="text" id="pf-tags" value="${escapeHtml((p.tags || []).join(', '))}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">SEO Keywords (comma-separated)</label><input type="text" id="pf-seo" value="${escapeHtml((p.seo_keywords || []).join(', '))}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div class="flex items-center gap-2"><input type="checkbox" id="pf-active" ${p.is_active !== false ? 'checked' : ''} class="w-4 h-4 rounded border-blue-500/20 bg-[#0a1124]"><label for="pf-active" class="text-xs font-bold text-gray-400">Active (visible to customers)</label></div>
        <div class="flex gap-3 pt-2">
          <button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">${propertyId ? 'Save Changes' : 'Add Product'}</button>
          <button type="button" onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition">Cancel</button>
        </div>
      </form>
    </div>
  </div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  document.getElementById('product-form').addEventListener('submit', (e) => saveProduct(e, propertyId));
};

window.saveProduct = async (e, propertyId) => {
  e.preventDefault();
  const features = document.getElementById('pf-features').value.split(',').map(s => s.trim()).filter(Boolean);
  const tags = document.getElementById('pf-tags').value.split(',').map(s => s.trim()).filter(Boolean);
  const seo = document.getElementById('pf-seo').value.split(',').map(s => s.trim()).filter(Boolean);
  const data = {
    title: document.getElementById('pf-title').value.trim(),
    category: document.getElementById('pf-category').value.trim() || 'Electronics',
    description: document.getElementById('pf-description').value.trim(),
    price: parseFloat(document.getElementById('pf-price').value) || 0,
    currency: document.getElementById('pf-currency').value,
    stock_quantity: document.getElementById('pf-stock').value ? parseInt(document.getElementById('pf-stock').value) : null,
    listing_type: document.getElementById('pf-type').value,
    sku: document.getElementById('pf-sku').value.trim() || null,
    subcategory: document.getElementById('pf-subcategory').value.trim() || null,
    features, tags, seo_keywords: seo,
    is_active: document.getElementById('pf-active').checked,
  };
  try {
    if (propertyId) {
      const { error } = await supabase.from('showroom_listings').update(data).eq('property_id', propertyId);
      if (error) throw error;
      showToast('Product updated successfully.');
    } else {
      const pid = 'KCO-' + Date.now().toString().slice(-6) + Math.random().toString(36).slice(2, 4).toUpperCase();
      const { error } = await supabase.from('showroom_listings').insert({ ...data, property_id: pid, country: '', country_code: '', listing_status: 'sale', images: [] });
      if (error) throw error;
      showToast('Product added successfully.');
    }
    closeModal();
    renderProducts();
    await logActivity(propertyId ? 'update_product' : 'add_product', 'product', propertyId || 'new');
  } catch (err) {
    showToast('Error: ' + err.message);
  }
};

window.toggleProductActive = async (propertyId) => {
  const product = state.data.products?.find(p => p.property_id === propertyId);
  if (!product) return;
  try {
    const { error } = await supabase.from('showroom_listings').update({ is_active: !product.is_active }).eq('property_id', propertyId);
    if (error) throw error;
    showToast(`Product ${product.is_active ? 'hidden' : 'published'}.`);
    renderProducts();
    await logActivity('toggle_product', 'product', propertyId);
  } catch (err) { showToast('Error: ' + err.message); }
};

window.duplicateProduct = async (propertyId) => {
  const product = state.data.products?.find(p => p.property_id === propertyId);
  if (!product) return;
  try {
    const newPid = 'KCO-' + Date.now().toString().slice(-6) + Math.random().toString(36).slice(2, 4).toUpperCase();
    const { id, created_at, property_id, ...rest } = product;
    const { error } = await supabase.from('showroom_listings').insert({ ...rest, property_id: newPid, title: product.title + ' (Copy)', is_active: false });
    if (error) throw error;
    showToast('Product duplicated successfully.');
    renderProducts();
    await logActivity('duplicate_product', 'product', propertyId);
  } catch (err) { showToast('Error: ' + err.message); }
};

window.confirmDeleteProduct = (propertyId) => {
  const modal = document.getElementById('modal-container');
  modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
    <div class="modal-content glass border border-red-500/20 rounded-2xl p-6 max-w-sm w-full" onclick="event.stopPropagation()">
      <div class="text-center mb-4"><div class="inline-flex items-center justify-center w-14 h-14 bg-red-500/10 rounded-2xl mb-3"><i data-lucide="alert-triangle" class="w-7 h-7 text-red-400"></i></div><h3 class="text-lg font-bold text-white mb-1">Delete Product?</h3><p class="text-sm text-gray-400">Are you sure you want to delete product <span class="font-mono text-blue-400">${propertyId}</span>? This cannot be undone.</p></div>
      <div class="flex gap-3"><button onclick="deleteProduct('${propertyId}')" class="btn-press flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition">Delete</button><button onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition">Cancel</button></div>
    </div>
  </div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
};

window.deleteProduct = async (propertyId) => {
  try {
    const { error } = await supabase.from('showroom_listings').delete().eq('property_id', propertyId);
    if (error) throw error;
    closeModal();
    showToast('Product deleted successfully.');
    renderProducts();
    await logActivity('delete_product', 'product', propertyId);
  } catch (err) { showToast('Error: ' + err.message); }
};

// ── Orders section ────────────────────────────────────────────
async function renderOrders() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading orders...</div></div>`;
  if (window.lucide) lucide.createIcons();
  const { data: orders } = await supabase.from('payment_receipts').select('*').order('created_at', { ascending: false }).limit(100);
  content.innerHTML = `
    <div class="fade-in space-y-4">
      <div class="flex gap-2 flex-wrap">
        <button onclick="filterOrders('')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl border transition ${'' === state.data.orderFilter ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-blue-950/50 text-gray-400 border-blue-500/15'}">All</button>
        <button onclick="filterOrders('order_placed')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl border transition ${'order_placed' === state.data.orderFilter ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-blue-950/50 text-gray-400 border-blue-500/15'}">Pending</button>
        <button onclick="filterOrders('payment_approved')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl border transition ${'payment_approved' === state.data.orderFilter ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-blue-950/50 text-gray-400 border-blue-500/15'}">Approved</button>
        <button onclick="filterOrders('delivered')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl border transition ${'delivered' === state.data.orderFilter ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-blue-950/50 text-gray-400 border-blue-500/15'}">Delivered</button>
        <button onclick="filterOrders('cancelled')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl border transition ${'cancelled' === state.data.orderFilter ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-blue-950/50 text-gray-400 border-blue-500/15'}">Cancelled</button>
      </div>
      <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto scrollbar-thin">
          <table class="w-full data-table">
            <thead><tr class="border-b border-blue-500/10 bg-blue-950/30">
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3">Order #</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3 hidden sm:table-cell">Customer</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3 hidden md:table-cell">Method</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3">Amount</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3">Status</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3 hidden lg:table-cell">Date</th>
              <th class="text-right text-[10px] font-bold uppercase text-gray-500 px-4 py-3">Actions</th>
            </tr></thead>
            <tbody>${(orders || []).map(o => `
              <tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition">
                <td class="px-4 py-3 text-xs font-mono text-blue-400">${o.order_number || '—'}</td>
                <td class="px-4 py-3 text-xs text-gray-300 hidden sm:table-cell">${escapeHtml(o.full_name || o.customer_name || '—')}</td>
                <td class="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">${escapeHtml(o.payment_method || '—')}</td>
                <td class="px-4 py-3 text-xs text-amber-400 font-bold">${fmtMoney(o.amount, o.currency)}</td>
                <td class="px-4 py-3">${statusBadge(o.status)}</td>
                <td class="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell">${fmtDate(o.created_at)}</td>
                <td class="px-4 py-3 text-right"><button onclick="showOrderModal('${o.order_number}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition"><i data-lucide="eye" class="w-4 h-4"></i></button></td>
              </tr>
            `).join('')}</tbody>
          </table>
        </div>
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
  state.data.orders = orders || [];
  document.querySelectorAll('.btn-press').forEach(ripple);
}

window.filterOrders = (status) => {
  state.data.orderFilter = status;
  renderOrders();
};

window.showOrderModal = async (orderNumber) => {
  const modal = document.getElementById('modal-container');
  const order = state.data.orders?.find(o => o.order_number === orderNumber);
  if (!order) return;
  let receiptUrl = null;
  if (order.receipt_file_path) {
    try {
      const { data } = await supabase.storage.from('payment-receipts').createSignedUrl(order.receipt_file_path, 3600);
      if (data?.signedUrl) receiptUrl = data.signedUrl;
    } catch {}
  }
  const isImage = order.receipt_file_name ? /\.(jpg|jpeg|png|webp)$/i.test(order.receipt_file_name) : false;
  const receiptPreviewHtml = receiptUrl
    ? `<div class="bg-blue-950/30 border border-blue-500/15 rounded-xl p-4">
        <p class="text-[10px] font-bold uppercase text-gray-500 mb-2">Payment Receipt</p>
        ${isImage
          ? `<img src="${receiptUrl}" alt="Receipt" class="w-full rounded-lg border border-blue-500/10 max-h-64 object-contain mb-3">`
          : `<div class="flex items-center gap-3 mb-3 p-3 bg-blue-950/50 rounded-lg"><i data-lucide="file-text" class="w-8 h-8 text-blue-400"></i><span class="text-xs text-gray-300">${escapeHtml(order.receipt_file_name || 'receipt.pdf')}</span></div>`
        }
        <div class="flex gap-2">
          <a href="${receiptUrl}" target="_blank" download="${escapeHtml(order.receipt_file_name || 'receipt')}" class="btn-press flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 font-bold py-2 rounded-lg text-xs uppercase transition flex items-center justify-center gap-1.5"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download</a>
          <a href="${receiptUrl}" target="_blank" class="btn-press flex-1 bg-blue-950/60 hover:bg-blue-900/40 text-gray-300 border border-blue-500/20 font-bold py-2 rounded-lg text-xs uppercase transition flex items-center justify-center gap-1.5"><i data-lucide="external-link" class="w-3.5 h-3.5"></i> Open</a>
        </div>
      </div>`
    : `<div class="bg-blue-950/20 border border-blue-500/10 rounded-xl p-4 text-center"><p class="text-xs text-gray-500">No receipt file uploaded</p></div>`;
  modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
    <div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-thin" onclick="event.stopPropagation()">
      <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="shopping-bag" class="w-5 h-5 text-blue-400"></i> Order ${order.order_number}</h3>
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div><p class="text-[10px] text-gray-500 uppercase">Customer</p><p class="text-white font-bold">${escapeHtml(order.full_name || order.customer_name || '—')}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">Email</p><p class="text-gray-300">${escapeHtml(order.email || '—')}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">Amount</p><p class="text-amber-400 font-bold">${fmtMoney(order.amount, order.currency)}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">Method</p><p class="text-gray-300">${escapeHtml(order.payment_method || '—')}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">Tx Reference</p><p class="text-gray-300 text-xs font-mono">${escapeHtml(order.transaction_reference || '—')}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">Status</p>${statusBadge(order.status)}</div>
          <div><p class="text-[10px] text-gray-500 uppercase">Date</p><p class="text-gray-300">${fmtDateTime(order.created_at)}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">File</p><p class="text-gray-400 text-xs truncate">${escapeHtml(order.receipt_file_name || '—')}</p></div>
        </div>
        ${order.additional_notes ? `<div class="bg-blue-950/30 border border-blue-500/10 rounded-xl p-3"><p class="text-[10px] text-gray-500 uppercase mb-1">Customer Notes</p><p class="text-xs text-gray-300">${escapeHtml(order.additional_notes)}</p></div>` : ''}
        ${receiptPreviewHtml}
        ${order.admin_notes ? `<div class="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3"><p class="text-[10px] text-amber-500 uppercase mb-1">Admin Notes</p><p class="text-xs text-gray-300">${escapeHtml(order.admin_notes)}</p></div>` : ''}
        <div class="pt-3 border-t border-blue-500/10">
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Admin Notes (for rejection explanation)</label>
          <textarea id="admin-notes-input" rows="2" placeholder="Add notes for the customer..." class="w-full bg-blue-950/40 border border-blue-500/20 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition">${escapeHtml(order.admin_notes || '')}</textarea>
        </div>
        <div class="pt-3 border-t border-blue-500/10">
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Update Status</label>
          <div class="flex gap-2 flex-wrap">
            <button onclick="updateOrderStatus('${order.order_number}','pending_verification')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 transition">Pending</button>
            <button onclick="updateOrderStatus('${order.order_number}','payment_approved')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 transition">Approve</button>
            <button onclick="updateOrderStatus('${order.order_number}','rejected')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 transition">Reject</button>
            <button onclick="updateOrderStatus('${order.order_number}','delivered')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 transition">Delivered</button>
            <button onclick="updateOrderStatus('${order.order_number}','cancelled')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl bg-gray-500/10 text-gray-400 border border-gray-500/20 transition">Cancel</button>
          </div>
        </div>
        <div class="flex gap-3 pt-2">
          <button onclick="printInvoice('${order.order_number}')" class="btn-press flex-1 bg-blue-950/60 border border-blue-500/20 text-blue-400 font-bold py-2.5 rounded-xl text-xs uppercase transition flex items-center justify-center gap-2"><i data-lucide="printer" class="w-4 h-4"></i> Print Invoice</button>
          <button onclick="closeModal()" class="btn-press px-5 py-2.5 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-xs uppercase transition">Close</button>
        </div>
      </div>
    </div>
  </div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
};

window.updateOrderStatus = async (orderNumber, status) => {
  try {
    const notesInput = document.getElementById('admin-notes-input');
    const adminNotes = notesInput ? notesInput.value.trim() : null;
    const update = { status, admin_reviewed_at: new Date().toISOString() };
    if (adminNotes) update.admin_notes = adminNotes;
    const { error } = await supabase.from('payment_receipts').update(update).eq('order_number', orderNumber);
    if (error) throw error;
    showToast(`Order status updated to ${status.replace(/_/g, ' ')}.`);
    closeModal();
    await logActivity('update_order_status', 'order', orderNumber, { status, admin_notes: adminNotes });
    try {
      const order = state.data.orders?.find(o => o.order_number === orderNumber);
      if (order?.email) {
        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-notification`, {
          method: 'POST', headers: { 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_number: orderNumber }),
        });
      }
    } catch {}
    renderOrders();
  } catch (err) { showToast('Error: ' + err.message); }
};

window.printInvoice = (orderNumber) => {
  const order = state.data.orders?.find(o => o.order_number === orderNumber);
  if (!order) return;
  const w = window.open('', '_blank');
  w.document.write(`<html><head><title>Invoice ${orderNumber}</title><style>body{font-family:Arial;padding:40px;color:#1e293b}h1{color:#2563eb}.row{margin:8px 0}.label{color:#64748b;font-size:12px;text-transform:uppercase}</style></head><body><h1>K.C.O Global Online Marketplace</h1><h2>Invoice</h2><div class="row"><span class="label">Order Number:</span> ${orderNumber}</div><div class="row"><span class="label">Customer:</span> ${escapeHtml(order.full_name || '')}</div><div class="row"><span class="label">Amount:</span> ${fmtMoney(order.amount, order.currency)}</div><div class="row"><span class="label">Payment Method:</span> ${escapeHtml(order.payment_method || '')}</div><div class="row"><span class="label">Status:</span> ${order.status}</div><div class="row"><span class="label">Date:</span> ${fmtDateTime(order.created_at)}</div></body></html>`);
  w.document.close();
  w.print();
};

// ── Special Orders section ────────────────────────────────────
async function renderSpecialOrders() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="fade-in"><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-black text-white tracking-tight">Special Order Requests</h2><p class="text-sm text-gray-500 mt-1">Review and process customer product sourcing requests</p></div><button onclick="renderSpecialOrders()" class="btn-press px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-bold transition flex items-center gap-2"><i data-lucide="refresh-cw" class="w-4 h-4"></i> Refresh</button></div><div id="special-orders-list" class="space-y-3"><div class="flex items-center justify-center py-20 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin mr-2"></i> Loading requests...</div></div></div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  try {
    const { data, error } = await supabase.from('product_requests').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    const container = document.getElementById('special-orders-list');
    if (!data || data.length === 0) {
      container.innerHTML = `<div class="flex flex-col items-center justify-center py-20 text-gray-500"><i data-lucide="package-search" class="w-12 h-12 mb-3 opacity-50"></i><p class="text-sm">No special order requests yet.</p></div>`;
      if (window.lucide) lucide.createIcons();
      return;
    }
    const statusColors = { pending_review: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', under_review: 'bg-blue-500/10 text-blue-400 border-blue-500/30', approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', rejected: 'bg-red-500/10 text-red-400 border-red-500/30', quoted: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30', fulfilled: 'bg-green-500/10 text-green-400 border-green-500/30', cancelled: 'bg-gray-500/10 text-gray-400 border-gray-500/30' };
    container.innerHTML = data.map(r => {
      const badgeClass = statusColors[r.status] || statusColors.pending_review;
      const statusLabel = r.status.replace(/_/g, ' ');
      const price = r.target_price ? `${r.currency} ${Number(r.target_price).toLocaleString()}` : '—';
      const quoted = r.quoted_price ? `${r.quoted_currency} ${Number(r.quoted_price).toLocaleString()}` : null;
      return `<div class="glass border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition">
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1.5">
              <h4 class="text-sm font-bold text-white truncate">${escapeHtml(r.request_title)}</h4>
              <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${badgeClass}">${escapeHtml(statusLabel)}</span>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
              <span><i data-lucide="tag" class="w-3 h-3 inline mr-1"></i>${escapeHtml(r.category || 'Uncategorized')}</span>
              <span><i data-lucide="award" class="w-3 h-3 inline mr-1"></i>${escapeHtml(r.brand || 'Any')}</span>
              <span><i data-lucide="circle-dollar-sign" class="w-3 h-3 inline mr-1"></i>${price}</span>
              <span><i data-lucide="hash" class="w-3 h-3 inline mr-1"></i>Qty: ${r.quantity}</span>
              <span><i data-lucide="calendar" class="w-3 h-3 inline mr-1"></i>${fmtDate(r.created_at)}</span>
            </div>
            ${r.request_description ? `<p class="text-xs text-gray-500 mt-2 line-clamp-2">${escapeHtml(r.request_description)}</p>` : ''}
            ${quoted ? `<p class="text-xs text-cyan-400 font-bold mt-2">Quoted: ${quoted} (${escapeHtml(r.payment_status)})</p>` : ''}
            <div class="text-xs text-gray-500 mt-2"><i data-lucide="map-pin" class="w-3 h-3 inline mr-1"></i>${escapeHtml(r.delivery_full_name || '')}, ${escapeHtml(r.delivery_address || '')}, ${escapeHtml(r.delivery_city || '')}, ${escapeHtml(r.delivery_country || '')}${r.delivery_phone ? ' &middot; ' + escapeHtml(r.delivery_phone) : ''}</div>
          </div>
          <div class="flex flex-wrap gap-2 shrink-0">
            <button onclick="viewSpecialOrder('${r.id}')" class="btn-press px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5"><i data-lucide="eye" class="w-3.5 h-3.5"></i> View</button>
            <button onclick="updateSpecialOrderStatus('${r.id}','under_review')" class="btn-press px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-bold transition">Review</button>
            <button onclick="updateSpecialOrderStatus('${r.id}','approved')" class="btn-press px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold transition">Approve</button>
            <button onclick="updateSpecialOrderStatus('${r.id}','rejected')" class="btn-press px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-bold transition">Reject</button>
          </div>
        </div>
      </div>`;
    }).join('');
    if (window.lucide) lucide.createIcons();
    document.querySelectorAll('.btn-press').forEach(ripple);
  } catch (err) {
    document.getElementById('special-orders-list').innerHTML = `<div class="text-red-400 text-sm p-4">Error loading requests: ${escapeHtml(err.message)}</div>`;
  }
}

window.viewSpecialOrder = async (id) => {
  try {
    const { data, error } = await supabase.from('product_requests').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    if (!data) { showToast('Request not found.'); return; }
    const { data: updates } = await supabase.from('product_request_status_updates').select('*').eq('request_id', id).order('created_at', { ascending: true });
    const statusColors = { pending_review: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', under_review: 'bg-blue-500/10 text-blue-400 border-blue-500/30', approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', rejected: 'bg-red-500/10 text-red-400 border-red-500/30', quoted: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30', fulfilled: 'bg-green-500/10 text-green-400 border-green-500/30', cancelled: 'bg-gray-500/10 text-gray-400 border-gray-500/30' };
    const badgeClass = statusColors[data.status] || statusColors.pending_review;
    const updatesHtml = (updates || []).map(u => `<div class="flex gap-3 py-2 border-b border-gray-800 last:border-0"><div class="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div><div class="flex-1"><p class="text-xs font-bold text-white">${escapeHtml(u.status.replace(/_/g,' '))}</p>${u.message ? `<p class="text-xs text-gray-400 mt-0.5">${escapeHtml(u.message)}</p>` : ''}<p class="text-[10px] text-gray-600 mt-0.5">${fmtDateTime(u.created_at)}</p></div></div>`).join('');
    let modal = document.getElementById('special-order-modal');
    if (!modal) { modal = document.createElement('div'); modal.id = 'special-order-modal'; modal.className = 'fixed inset-0 z-[70] bg-black/80 backdrop-blur-md overflow-y-auto'; document.body.appendChild(modal); }
    modal.innerHTML = `<div class="max-w-2xl mx-auto px-4 py-6 sm:py-10"><div class="glass bg-[#0f172a] border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
      <div class="flex items-center justify-between p-5 border-b border-gray-800"><h3 class="text-lg font-bold text-white">Special Order Details</h3><button onclick="document.getElementById('special-order-modal').style.display='none';document.body.style.overflow=''" class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"><i data-lucide="x" class="w-5 h-5"></i></button></div>
      <div class="p-5 space-y-4">
        <div class="flex items-center gap-2"><span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${badgeClass}">${escapeHtml(data.status.replace(/_/g,' '))}</span>${data.payment_status !== 'unpaid' ? `<span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border bg-cyan-500/10 text-cyan-400 border-cyan-500/30">${escapeHtml(data.payment_status)}</span>` : ''}</div>
        <div class="bg-gray-900/50 rounded-xl p-4 space-y-2 border border-gray-800">
          <div><span class="text-xs text-gray-500 uppercase font-bold">Product</span><p class="text-sm text-white font-semibold mt-0.5">${escapeHtml(data.request_title)}</p></div>
          ${data.request_description ? `<div class="pt-2"><span class="text-xs text-gray-500 uppercase font-bold">Description</span><p class="text-sm text-gray-300 mt-0.5">${escapeHtml(data.request_description)}</p></div>` : ''}
          <div class="grid grid-cols-2 gap-3 pt-2">
            <div><span class="text-xs text-gray-500 uppercase font-bold">Category</span><p class="text-sm text-gray-300 mt-0.5">${escapeHtml(data.category || '—')}</p></div>
            <div><span class="text-xs text-gray-500 uppercase font-bold">Brand</span><p class="text-sm text-gray-300 mt-0.5">${escapeHtml(data.brand || '—')}</p></div>
            <div><span class="text-xs text-gray-500 uppercase font-bold">Target Price</span><p class="text-sm text-orange-400 font-bold mt-0.5">${data.currency} ${data.target_price ? Number(data.target_price).toLocaleString() : '—'}</p></div>
            <div><span class="text-xs text-gray-500 uppercase font-bold">Quantity</span><p class="text-sm text-gray-300 mt-0.5">${data.quantity}</p></div>
          </div>
          ${data.quoted_price ? `<div class="pt-2"><span class="text-xs text-gray-500 uppercase font-bold">Quoted Price</span><p class="text-sm text-cyan-400 font-bold mt-0.5">${data.quoted_currency} ${Number(data.quoted_price).toLocaleString()}</p></div>` : ''}
        </div>
        <div class="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
          <p class="text-xs text-gray-500 uppercase font-bold mb-2">Delivery Information</p>
          <p class="text-sm text-white font-semibold">${escapeHtml(data.delivery_full_name || '—')}</p>
          <p class="text-sm text-gray-400">${escapeHtml(data.delivery_address || '—')}</p>
          <p class="text-sm text-gray-400">${escapeHtml(data.delivery_city || '—')}, ${escapeHtml(data.delivery_state || '—')}</p>
          <p class="text-sm text-gray-400">${escapeHtml(data.delivery_postal_code || '—')} ${escapeHtml(data.delivery_country || '—')}</p>
          <p class="text-sm text-gray-400 mt-1"><i data-lucide="phone" class="w-3.5 h-3.5 inline mr-1"></i>${escapeHtml(data.delivery_phone || '—')}</p>
        </div>
        <div class="bg-gray-900/50 rounded-xl p-4 border border-gray-800"><p class="text-xs text-gray-500 uppercase font-bold mb-2">Status History</p>${updatesHtml || '<p class="text-xs text-gray-600">No updates yet.</p>'}</div>
        <div class="space-y-2">
          <label class="block text-xs font-bold text-gray-400 uppercase tracking-wide">Update Status</label>
          <select id="so-status-select" class="w-full bg-gray-900/80 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-orange-500 focus:outline-none transition">
            <option value="pending_review">Pending Review</option><option value="under_review">Under Review</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="quoted">Quoted</option><option value="fulfilled">Fulfilled</option><option value="cancelled">Cancelled</option>
          </select>
          <input id="so-quote-price" type="number" min="0" step="0.01" placeholder="Quoted price (optional)" class="w-full bg-gray-900/80 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition">
          <textarea id="so-admin-message" rows="2" placeholder="Message to customer (optional)" class="w-full bg-gray-900/80 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition"></textarea>
          <button onclick="saveSpecialOrderUpdate('${data.id}')" class="btn-press w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-orange-500/30">Update Request</button>
        </div>
      </div>
    </div></div>`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    const sel = document.getElementById('so-status-select');
    if (sel) sel.value = data.status;
    if (window.lucide) lucide.createIcons();
    document.querySelectorAll('.btn-press').forEach(ripple);
  } catch (err) { showToast('Error loading request: ' + err.message); }
};

window.updateSpecialOrderStatus = async (id, status) => {
  try {
    const { error } = await supabase.from('product_requests').update({ status }).eq('id', id);
    if (error) throw error;
    await supabase.from('product_request_status_updates').insert({ request_id: id, status, message: `Status updated to: ${status.replace(/_/g,' ')}` });
    showToast('Request status updated to: ' + status.replace(/_/g,' '));
    renderSpecialOrders();
  } catch (err) { showToast('Error updating request: ' + err.message); }
};

window.saveSpecialOrderUpdate = async (id) => {
  const status = document.getElementById('so-status-select').value;
  const quotePrice = parseFloat(document.getElementById('so-quote-price').value) || null;
  const message = document.getElementById('so-admin-message').value.trim() || null;
  try {
    const update = { status };
    if (quotePrice !== null) { update.quoted_price = quotePrice; update.payment_status = 'pending'; }
    const { error } = await supabase.from('product_requests').update(update).eq('id', id);
    if (error) throw error;
    await supabase.from('product_request_status_updates').insert({ request_id: id, status, message: message || `Status updated to: ${status.replace(/_/g,' ')}` });
    showToast('Request updated successfully.');
    document.getElementById('special-order-modal').style.display = 'none';
    document.body.style.overflow = '';
    renderSpecialOrders();
  } catch (err) { showToast('Error updating request: ' + err.message); }
};

// ── Customers section ──────────────────────────────────────────
async function renderCustomers() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading customers...</div></div>`;
  if (window.lucide) lucide.createIcons();
  const { data: profiles } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(100);
  content.innerHTML = `
    <div class="fade-in space-y-4">
      <div class="flex gap-2 flex-1 max-w-md">
        <input type="text" id="customer-search" placeholder="Search customers..." oninput="filterCustomers()" class="input-field flex-1 bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
      </div>
      <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto scrollbar-thin">
          <table class="w-full data-table">
            <thead><tr class="border-b border-blue-500/10 bg-blue-950/30">
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3">Name</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3 hidden sm:table-cell">Country</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3 hidden md:table-cell">Phone</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3">Admin</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3 hidden lg:table-cell">Joined</th>
              <th class="text-right text-[10px] font-bold uppercase text-gray-500 px-4 py-3">Actions</th>
            </tr></thead>
            <tbody>${(profiles || []).map(p => `
              <tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition" data-search="${escapeHtml((p.display_name || '').toLowerCase())}">
                <td class="px-4 py-3 text-xs text-white font-bold">${escapeHtml(p.display_name || 'Unknown')}</td>
                <td class="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">${escapeHtml(p.country_code || '—')}</td>
                <td class="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">${escapeHtml(p.phone_number || '—')}</td>
                <td class="px-4 py-3">${p.is_admin ? statusBadge('active') : statusBadge('inactive')}</td>
                <td class="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell">${fmtDate(p.created_at)}</td>
                <td class="px-4 py-3 text-right"><button onclick="toggleAdmin('${p.user_id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg ${p.is_admin ? 'text-amber-400' : 'text-gray-400'} transition" title="Toggle Admin"><i data-lucide="shield" class="w-4 h-4"></i></button></td>
              </tr>
            `).join('')}</tbody>
          </table>
        </div>
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
  state.data.profiles = profiles || [];
  document.querySelectorAll('.btn-press').forEach(ripple);
}

window.filterCustomers = () => {
  const search = document.getElementById('customer-search').value.toLowerCase();
  document.querySelectorAll('#content tbody tr').forEach(row => {
    row.style.display = !search || row.dataset.search.includes(search) ? '' : 'none';
  });
};

window.toggleAdmin = async (userId) => {
  const profile = state.data.profiles?.find(p => p.user_id === userId);
  if (!profile) return;
  try {
    const { error } = await supabase.from('profiles').update({ is_admin: !profile.is_admin }).eq('user_id', userId);
    if (error) throw error;
    showToast(`Admin status ${profile.is_admin ? 'removed' : 'granted'}.`);
    await logActivity('toggle_admin', 'customer', userId);
    renderCustomers();
  } catch (err) { showToast('Error: ' + err.message); }
};

// ── Payments section ──────────────────────────────────────────
async function renderPayments() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading payments...</div></div>`;
  if (window.lucide) lucide.createIcons();
  const [gateways, payments] = await Promise.all([
    supabase.from('payment_gateways').select('*').order('display_order', { ascending: true }),
    supabase.from('payment_receipts').select('*').order('created_at', { ascending: false }).limit(50),
  ]);
  content.innerHTML = `
    <div class="fade-in space-y-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-1 glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="credit-card" class="w-4 h-4 text-blue-400"></i> Payment Gateways</h3>
          <div class="space-y-2">
            ${(gateways.data || []).map(g => `
              <div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between">
                <div><p class="text-sm font-bold text-white">${escapeHtml(g.name)}</p><p class="text-[10px] text-gray-500 uppercase">${g.code}</p></div>
                <div class="flex items-center gap-2">
                  ${g.is_default ? '<span class="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase">Default</span>' : ''}
                  <button onclick="toggleGateway('${g.id}',${!g.is_active})" class="btn-press relative w-10 h-5 rounded-full transition ${g.is_active ? 'bg-blue-500' : 'bg-gray-600'}">
                    <span class="absolute top-0.5 ${g.is_active ? 'left-5' : 'left-0.5'} w-4 h-4 bg-white rounded-full transition-all"></span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
          <button onclick="showAddGatewayModal()" class="btn-press mt-3 w-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold py-2.5 rounded-xl text-xs uppercase transition flex items-center justify-center gap-2"><i data-lucide="plus" class="w-4 h-4"></i> Add Gateway</button>
        </div>
        <div class="lg:col-span-2 glass border border-blue-500/20 rounded-2xl overflow-hidden">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide p-5 mb-2 flex items-center gap-2"><i data-lucide="receipt" class="w-4 h-4 text-blue-400"></i> Payment Records</h3>
          <div class="overflow-x-auto scrollbar-thin">
            <table class="w-full data-table">
              <thead><tr class="border-b border-blue-500/10 bg-blue-950/30">
                <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3">Order #</th>
                <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3 hidden sm:table-cell">Method</th>
                <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3">Amount</th>
                <th class="text-left text-[10px] font-bold uppercase text-gray-500 px-4 py-3">Status</th>
                <th class="text-right text-[10px] font-bold uppercase text-gray-500 px-4 py-3">Actions</th>
              </tr></thead>
              <tbody>${(payments.data || []).map(p => `
                <tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition">
                  <td class="px-4 py-3 text-xs font-mono text-blue-400">${p.order_number || '—'}</td>
                  <td class="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">${escapeHtml(p.payment_method || '—')}</td>
                  <td class="px-4 py-3 text-xs text-amber-400 font-bold">${fmtMoney(p.amount, p.currency)}</td>
                  <td class="px-4 py-3">${statusBadge(p.status)}</td>
                  <td class="px-4 py-3 text-right">
                    <button onclick="updateOrderStatus('${p.order_number}','payment_approved')" class="btn-press p-2 hover:bg-emerald-500/10 rounded-lg text-emerald-400 transition" title="Verify"><i data-lucide="check-circle" class="w-4 h-4"></i></button>
                    <button onclick="updateOrderStatus('${p.order_number}','cancelled')" class="btn-press p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition" title="Reject"><i data-lucide="x-circle" class="w-4 h-4"></i></button>
                  </td>
                </tr>
              `).join('')}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
  state.data.gateways = gateways.data || [];
  document.querySelectorAll('.btn-press').forEach(ripple);
}

window.toggleGateway = async (id, active) => {
  try {
    const { error } = await supabase.from('payment_gateways').update({ is_active: active }).eq('id', id);
    if (error) throw error;
    showToast(`Gateway ${active ? 'enabled' : 'disabled'}.`);
    await logActivity('toggle_gateway', 'gateway', id, { active });
    renderPayments();
  } catch (err) { showToast('Error: ' + err.message); }
};

window.showAddGatewayModal = () => {
  const modal = document.getElementById('modal-container');
  modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
    <div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-md w-full" onclick="event.stopPropagation()">
      <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="plus-circle" class="w-5 h-5 text-blue-400"></i> Add Payment Gateway</h3>
      <form id="gateway-form" class="space-y-4">
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Name *</label><input type="text" id="gw-name" required placeholder="e.g. M-Pesa" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Code *</label><input type="text" id="gw-code" required placeholder="e.g. mpesa" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 lowercase"></div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">API Key</label><input type="password" id="gw-api-key" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Secret Key</label><input type="password" id="gw-secret-key" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        </div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Webhook URL</label><input type="text" id="gw-webhook" placeholder="https://..." class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div class="flex items-center gap-2"><input type="checkbox" id="gw-active" checked class="w-4 h-4 rounded border-blue-500/20 bg-[#0a1124]"><label for="gw-active" class="text-xs font-bold text-gray-400">Enable immediately</label></div>
        <div class="flex gap-3 pt-2">
          <button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">Add Gateway</button>
          <button type="button" onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition">Cancel</button>
        </div>
      </form>
    </div>
  </div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  document.getElementById('gateway-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('payment_gateways').insert({
        name: document.getElementById('gw-name').value.trim(),
        code: document.getElementById('gw-code').value.trim().toLowerCase(),
        api_key: document.getElementById('gw-api-key').value.trim() || null,
        secret_key: document.getElementById('gw-secret-key').value.trim() || null,
        webhook_url: document.getElementById('gw-webhook').value.trim() || null,
        is_active: document.getElementById('gw-active').checked,
        display_order: 99,
      });
      if (error) throw error;
      closeModal();
      showToast('Gateway added successfully.');
      await logActivity('add_gateway', 'gateway', document.getElementById('gw-code').value);
      renderPayments();
    } catch (err) { showToast('Error: ' + err.message); }
  });
};

// ── Promotions section ─────────────────────────────────────────
async function renderPromotions() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading promotions...</div></div>`;
  if (window.lucide) lucide.createIcons();
  const { data: promos } = await supabase.from('promotions').select('*').order('created_at', { ascending: false });
  content.innerHTML = `
    <div class="fade-in space-y-4">
      <div class="flex justify-end"><button onclick="showPromoModal()" class="btn-press flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30"><i data-lucide="plus" class="w-4 h-4"></i> Create Promotion</button></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${(promos || []).map(p => `
          <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
            <div class="flex items-center justify-between mb-3">
              <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="${p.promo_type === 'coupon' ? 'ticket' : p.promo_type === 'flash_sale' ? 'zap' : 'megaphone'}" class="w-5 h-5 text-blue-400"></i></div>
              ${p.is_active ? statusBadge('active') : statusBadge('inactive')}
            </div>
            <h3 class="text-sm font-bold text-white mb-1">${escapeHtml(p.title)}</h3>
            <p class="text-xs text-gray-500 mb-2">${escapeHtml(p.description || '—')}</p>
            <div class="flex items-center gap-2 text-[10px] text-gray-500">
              <span class="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full uppercase font-bold">${escapeHtml(p.promo_type)}</span>
              ${p.discount_value ? `<span class="text-amber-400">${p.discount_value}${p.discount_type === 'percentage' ? '%' : ''} off</span>` : ''}
              ${p.coupon_code ? `<span class="text-emerald-400 font-mono">${escapeHtml(p.coupon_code)}</span>` : ''}
            </div>
            <div class="flex gap-2 mt-3">
              <button onclick="togglePromo('${p.id}',${!p.is_active})" class="btn-press flex-1 text-xs font-bold py-2 rounded-xl ${p.is_active ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'} transition">${p.is_active ? 'Deactivate' : 'Activate'}</button>
              <button onclick="deletePromo('${p.id}')" class="btn-press p-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
  state.data.promos = promos || [];
  document.querySelectorAll('.btn-press').forEach(ripple);
}

window.showPromoModal = () => {
  const modal = document.getElementById('modal-container');
  modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
    <div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-md w-full" onclick="event.stopPropagation()">
      <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="megaphone" class="w-5 h-5 text-blue-400"></i> Create Promotion</h3>
      <form id="promo-form" class="space-y-4">
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Title *</label><input type="text" id="pr-title" required placeholder="Weekend Flash Sale" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Type *</label><select id="pr-type" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"><option value="banner">Banner</option><option value="discount">Discount</option><option value="flash_sale">Flash Sale</option><option value="coupon">Coupon</option></select></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Description</label><textarea id="pr-desc" rows="2" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"></textarea></div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Discount Value</label><input type="number" id="pr-value" step="0.01" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Discount Type</label><select id="pr-dtype" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"><option value="percentage">Percentage</option><option value="fixed">Fixed</option></select></div>
        </div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Coupon Code</label><input type="text" id="pr-code" placeholder="WEEKEND20" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 uppercase"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Banner Text</label><input type="text" id="pr-banner" placeholder="🔥 Weekend Flash Sale — Up to 50% Off!" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div class="flex gap-3 pt-2">
          <button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">Create</button>
          <button type="button" onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition">Cancel</button>
        </div>
      </form>
    </div>
  </div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  document.getElementById('promo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('promotions').insert({
        title: document.getElementById('pr-title').value.trim(),
        promo_type: document.getElementById('pr-type').value,
        description: document.getElementById('pr-desc').value.trim() || null,
        discount_value: parseFloat(document.getElementById('pr-value').value) || null,
        discount_type: document.getElementById('pr-dtype').value,
        coupon_code: document.getElementById('pr-code').value.trim() || null,
        banner_text: document.getElementById('pr-banner').value.trim() || null,
        is_active: true,
      });
      if (error) throw error;
      closeModal();
      showToast('Promotion created successfully.');
      await logActivity('create_promotion', 'promotion', 'new');
      renderPromotions();
    } catch (err) { showToast('Error: ' + err.message); }
  });
};

window.togglePromo = async (id, active) => {
  try {
    const { error } = await supabase.from('promotions').update({ is_active: active }).eq('id', id);
    if (error) throw error;
    showToast(`Promotion ${active ? 'activated' : 'deactivated'}.`);
    renderPromotions();
  } catch (err) { showToast('Error: ' + err.message); }
};

window.deletePromo = async (id) => {
  try {
    const { error } = await supabase.from('promotions').delete().eq('id', id);
    if (error) throw error;
    showToast('Promotion deleted.');
    renderPromotions();
  } catch (err) { showToast('Error: ' + err.message); }
};

// ── Content, Email, Analytics, Security, Settings, Integrations ─
async function renderContent() {
  const pages = [
    { name: 'Homepage', path: '/index.html', icon: 'home' },
    { name: 'About Us', path: '/about.html', icon: 'info' },
    { name: 'Contact Us', path: '/contact.html', icon: 'mail' },
    { name: 'FAQ / Help Center', path: '/help.html', icon: 'help-circle' },
    { name: 'Privacy Policy', path: '/privacy.html', icon: 'shield' },
    { name: 'Terms & Conditions', path: '/terms.html', icon: 'file-text' },
    { name: 'Refund Policy', path: '/refund-policy.html', icon: 'refresh-cw' },
    { name: 'Shipping Policy', path: '/shipping-policy.html', icon: 'truck' },
  ];
  document.getElementById('content').innerHTML = `
    <div class="fade-in">
      <div class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-blue-400"></i> Content Pages</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          ${pages.map(p => `
            <a href="${p.path}" target="_blank" class="btn-press glass-soft border border-blue-500/15 hover:border-blue-500/40 rounded-xl p-4 transition group">
              <div class="p-2 bg-blue-500/10 rounded-lg w-fit mb-2 group-hover:bg-blue-500/20 transition"><i data-lucide="${p.icon}" class="w-5 h-5 text-blue-400"></i></div>
              <p class="text-sm font-bold text-white">${p.name}</p>
              <p class="text-[10px] text-gray-500 mt-1">${p.path}</p>
            </a>
          `).join('')}
        </div>
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
}

async function renderEmail() {
  const { data: templates } = await supabase.from('email_templates').select('*').order('template_key', { ascending: true });
  document.getElementById('content').innerHTML = `
    <div class="fade-in space-y-4">
      <div class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-blue-400"></i> Email Templates</h3>
        <div class="space-y-2">
          ${(templates || []).map(t => `
            <div class="glass-soft border border-blue-500/10 rounded-xl p-4 flex items-center justify-between">
              <div class="min-w-0 flex-1"><p class="text-sm font-bold text-white">${escapeHtml(t.template_key.replace(/_/g, ' '))}</p><p class="text-xs text-gray-500 truncate">${escapeHtml(t.subject)}</p></div>
              <button onclick="editTemplate('${t.id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
  state.data.templates = templates || [];
}

window.editTemplate = (id) => {
  const t = state.data.templates?.find(x => x.id === id);
  if (!t) return;
  const modal = document.getElementById('modal-container');
  modal.innerHTML = `<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
    <div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-thin" onclick="event.stopPropagation()">
      <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="edit-3" class="w-5 h-5 text-blue-400"></i> Edit Template</h3>
      <form id="template-form" class="space-y-4">
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Subject</label><input type="text" id="tp-subject" value="${escapeHtml(t.subject)}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Body (supports {{variables}})</label><textarea id="tp-body" rows="8" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none">${escapeHtml(t.body)}</textarea></div>
        <div class="flex gap-3 pt-2"><button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">Save</button><button type="button" onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition">Cancel</button></div>
      </form>
    </div>
  </div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  document.getElementById('template-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('email_templates').update({
        subject: document.getElementById('tp-subject').value.trim(),
        body: document.getElementById('tp-body').value.trim(),
      }).eq('id', id);
      if (error) throw error;
      closeModal();
      showToast('Template updated.');
      renderEmail();
    } catch (err) { showToast('Error: ' + err.message); }
  });
};

async function renderAnalytics() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading analytics...</div></div>`;
  if (window.lucide) lucide.createIcons();
  const [products, orders, profiles] = await Promise.all([
    supabase.from('showroom_listings').select('category,price,currency,listing_type'),
    supabase.from('payment_receipts').select('amount,currency,status,created_at'),
    supabase.from('profiles').select('country_code,created_at'),
  ]);
  // Category distribution
  const cats = {};
  (products.data || []).forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
  // Revenue by month (last 6)
  const now = new Date();
  const monthLabels = []; const monthData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString('en-US', { month: 'short' });
    monthLabels.push(label);
    const rev = (orders.data || []).filter(o => o.status === 'payment_approved' || o.status === 'delivered').filter(o => {
      const od = new Date(o.created_at); return od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear();
    }).reduce((s, o) => s + (parseFloat(o.amount) || 0), 0);
    monthData.push(rev);
  }
  content.innerHTML = `
    <div class="fade-in space-y-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up"><h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="trending-up" class="w-4 h-4 text-blue-400"></i> Revenue (6 months)</h3><canvas id="chart-rev-line" height="200"></canvas></div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up" style="animation-delay:.1s"><h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="layers" class="w-4 h-4 text-blue-400"></i> Products by Category</h3><canvas id="chart-cat" height="200"></canvas></div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up"><h3 class="text-sm font-bold text-white uppercase tracking-wide mb-3">Products</h3><p class="text-3xl font-black text-amber-400">${(products.data || []).length}</p></div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up" style="animation-delay:.1s"><h3 class="text-sm font-bold text-white uppercase tracking-wide mb-3">Orders</h3><p class="text-3xl font-black text-blue-400">${(orders.data || []).length}</p></div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up" style="animation-delay:.2s"><h3 class="text-sm font-bold text-white uppercase tracking-wide mb-3">Customers</h3><p class="text-3xl font-black text-emerald-400">${(profiles.data || []).length}</p></div>
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
  // Charts
  const ctx1 = document.getElementById('chart-rev-line');
  if (ctx1) new Chart(ctx1, { type: 'line', data: { labels: monthLabels, datasets: [{ label: 'Revenue', data: monthData, borderColor: 'rgb(59,130,246)', backgroundColor: 'rgba(59,130,246,.1)', fill: true, tension: .4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(59,130,246,.05)' } }, x: { ticks: { color: '#64748b' }, grid: { display: false } } } } });
  const ctx2 = document.getElementById('chart-cat');
  if (ctx2) new Chart(ctx2, { type: 'doughnut', data: { labels: Object.keys(cats), datasets: [{ data: Object.values(cats), backgroundColor: ['rgba(59,130,246,.6)', 'rgba(168,85,247,.6)', 'rgba(245,158,11,.6)', 'rgba(16,185,129,.6)', 'rgba(239,68,68,.6)', 'rgba(99,102,241,.6)', 'rgba(236,72,153,.6)', 'rgba(20,184,166,.6)'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 10 } } } } } });
}

async function renderSecurity() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading security logs...</div></div>`;
  if (window.lucide) lucide.createIcons();
  const [activity, security, roles] = await Promise.all([
    supabase.from('admin_activity_logs').select('*').order('created_at', { ascending: false }).limit(50),
    supabase.from('admin_security_logs').select('*').order('created_at', { ascending: false }).limit(50),
    supabase.from('admin_roles').select('*'),
  ]);

  // Check 2FA status
  let twoFaEnabled = false;
  let twoFaSetup = false;
  try {
    const { data: session } = await supabase.auth.getSession();
    const accessToken = session?.session?.access_token;
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-2fa`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'status' }),
    });
    const twoFaData = await res.json();
    twoFaEnabled = !!twoFaData.enabled;
    twoFaSetup = !!twoFaData.setup;
  } catch {}

  content.innerHTML = `
    <div class="fade-in space-y-4">
      <!-- 2FA Management -->
      <div class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Two-Factor Authentication (2FA)</h3>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm font-bold ${twoFaEnabled ? 'text-emerald-400' : 'text-gray-400'}">${twoFaEnabled ? '2FA is Active' : '2FA is Not Enabled'}</span>
              ${twoFaEnabled ? '<span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">Protected</span>' : '<span class="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase">Vulnerable</span>'}
            </div>
            <p class="text-xs text-gray-500 max-w-md">${twoFaEnabled ? 'Your admin dashboard is protected with authenticator app verification. A 6-digit code is required on every login.' : 'Protect your admin dashboard with Google Authenticator or Microsoft Authenticator. A 6-digit code will be required on every login.'}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            ${twoFaEnabled ? `
              <button onclick="regenerateBackupCodes()" class="btn-press flex items-center gap-1.5 px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold rounded-xl text-xs transition border border-amber-500/20">
                <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i> Regenerate Backup Codes
              </button>
              <button onclick="disable2FA()" class="btn-press flex items-center gap-1.5 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl text-xs transition border border-red-500/20">
                <i data-lucide="shield-off" class="w-3.5 h-3.5"></i> Disable 2FA
              </button>
            ` : `
              <button onclick="setup2FA()" class="btn-press flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30">
                <i data-lucide="shield-plus" class="w-3.5 h-3.5"></i> Enable 2FA
              </button>
            `}
          </div>
        </div>
      </div>

      <!-- 2FA Setup modal container -->
      <div id="twofa-setup-modal" class="hidden"></div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="activity" class="w-4 h-4 text-blue-400"></i> Activity Logs</h3>
          <div class="space-y-1 max-h-96 overflow-y-auto scrollbar-thin">
            ${(activity.data || []).map(a => `<div class="flex items-center gap-2 text-xs py-2 border-b border-blue-500/5 last:border-0"><span class="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span><span class="font-bold text-gray-300">${escapeHtml(a.action)}</span>${a.entity_type ? `<span class="text-gray-600">${escapeHtml(a.entity_type)}</span>` : ''}<span class="text-gray-600 ml-auto">${fmtDateTime(a.created_at)}</span></div>`).join('') || '<p class="text-xs text-gray-600 text-center py-4">No activity logged yet.</p>'}
          </div>
        </div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="shield" class="w-4 h-4 text-emerald-400"></i> Security Logs</h3>
          <div class="space-y-1 max-h-96 overflow-y-auto scrollbar-thin">
            ${(security.data || []).map(s => `<div class="flex items-center gap-2 text-xs py-2 border-b border-blue-500/5 last:border-0"><span class="w-2 h-2 rounded-full ${s.event_type?.includes('failed') || s.event_type?.includes('locked') ? 'bg-red-400' : 'bg-emerald-400'} shrink-0"></span><span class="font-bold text-gray-300">${escapeHtml(s.event_type)}</span><span class="text-gray-600 ml-auto">${fmtDateTime(s.created_at)}</span></div>`).join('') || '<p class="text-xs text-gray-600 text-center py-4">No security events yet.</p>'}
          </div>
        </div>
      </div>
      <div class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="users" class="w-4 h-4 text-violet-400"></i> Admin Roles</h3>
        <div class="space-y-2">
          ${(roles.data || []).map(r => `<div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between"><div><p class="text-sm font-bold text-white">${escapeHtml(r.role.replace(/_/g, ' '))}</p><p class="text-[10px] text-gray-500">${(r.permissions || []).length} permissions</p></div><span class="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full uppercase">${escapeHtml(r.role)}</span></div>`).join('') || '<p class="text-xs text-gray-600 text-center py-4">No roles assigned yet.</p>'}
        </div>
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
}

async function renderSettings() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading settings...</div></div>`;
  if (window.lucide) lucide.createIcons();
  const { data: settings } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
  if (!settings) { content.innerHTML = '<p class="text-sm text-red-400">Failed to load settings.</p>'; return; }
  content.innerHTML = `
    <div class="fade-in space-y-4">
      <div class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="settings" class="w-4 h-4 text-blue-400"></i> General Settings</h3>
        <form id="settings-form" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Site Name</label><input type="text" id="st-site-name" value="${escapeHtml(settings.site_name)}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Marketplace Name</label><input type="text" id="st-mp-name" value="${escapeHtml(settings.marketplace_name)}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Default Currency</label><input type="text" id="st-currency" value="${escapeHtml(settings.default_currency)}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Support Email</label><input type="email" id="st-email" value="${escapeHtml(settings.support_email)}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Tax Rate (%)</label><input type="number" id="st-tax" step="0.01" value="${settings.tax_rate}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Supported Currencies (comma-separated)</label><input type="text" id="st-currencies" value="${(settings.supported_currencies || []).join(', ')}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Supported Languages (comma-separated)</label><input type="text" id="st-languages" value="${(settings.supported_languages || []).join(', ')}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          </div>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2"><input type="checkbox" id="st-tax-enabled" ${settings.tax_enabled ? 'checked' : ''} class="w-4 h-4 rounded border-blue-500/20 bg-[#0a1124]"><span class="text-xs font-bold text-gray-400">Enable Tax</span></label>
            <label class="flex items-center gap-2"><input type="checkbox" id="st-maintenance" ${settings.maintenance_mode ? 'checked' : ''} class="w-4 h-4 rounded border-blue-500/20 bg-[#0a1124]"><span class="text-xs font-bold text-gray-400">Maintenance Mode</span></label>
          </div>
          <div class="pt-3 border-t border-blue-500/10">
            <h4 class="text-xs font-bold text-white uppercase mb-3">Integration Keys</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Cloudinary Cloud Name</label><input type="text" id="st-cloud-name" value="${escapeHtml(settings.cloudinary_cloud_name || '')}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
              <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Cloudinary API Key</label><input type="password" id="st-cloud-key" value="${escapeHtml(settings.cloudinary_api_key || '')}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
              <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Cloudinary API Secret</label><input type="password" id="st-cloud-secret" value="${escapeHtml(settings.cloudinary_api_secret || '')}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
              <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Resend API Key</label><input type="password" id="st-resend" value="${escapeHtml(settings.resend_api_key || '')}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            </div>
          </div>
          <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">Save Settings</button>
        </form>
      </div>
      <div class="glass border border-orange-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="globe" class="w-4 h-4 text-orange-400"></i> Global Smart Search Settings</h3>
        <div id="global-search-settings" class="space-y-4"><div class="flex items-center justify-center py-8 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin mr-2"></i> Loading...</div></div>
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  loadGlobalSearchSettings();
  document.getElementById('settings-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('site_settings').update({
        site_name: document.getElementById('st-site-name').value.trim(),
        marketplace_name: document.getElementById('st-mp-name').value.trim(),
        default_currency: document.getElementById('st-currency').value.trim(),
        support_email: document.getElementById('st-email').value.trim(),
        tax_rate: parseFloat(document.getElementById('st-tax').value) || 0,
        tax_enabled: document.getElementById('st-tax-enabled').checked,
        maintenance_mode: document.getElementById('st-maintenance').checked,
        supported_currencies: document.getElementById('st-currencies').value.split(',').map(s => s.trim()).filter(Boolean),
        supported_languages: document.getElementById('st-languages').value.split(',').map(s => s.trim()).filter(Boolean),
        cloudinary_cloud_name: document.getElementById('st-cloud-name').value.trim() || null,
        cloudinary_api_key: document.getElementById('st-cloud-key').value.trim() || null,
        cloudinary_api_secret: document.getElementById('st-cloud-secret').value.trim() || null,
        resend_api_key: document.getElementById('st-resend').value.trim() || null,
      }).neq('id', '00000000-0000-0000-0000-000000000000');
      if (error) throw error;
      showToast('Settings saved successfully.');
      await logActivity('update_settings', 'settings', 'site');
    } catch (err) { showToast('Error: ' + err.message); }
  });
}

async function renderIntegrations() {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading integrations...</div></div>`;
  if (window.lucide) lucide.createIcons();
  const [gateways, settings, aiSettings] = await Promise.all([
    supabase.from('payment_gateways').select('*').order('display_order', { ascending: true }),
    supabase.from('site_settings').select('*').limit(1).maybeSingle(),
    supabase.from('ai_settings').select('*').limit(1).maybeSingle(),
  ]);
  const s = settings.data || {};
  const ai = aiSettings.data || {};
  content.innerHTML = `
    <div class="fade-in space-y-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="credit-card" class="w-4 h-4 text-blue-400"></i> Payment Providers</h3>
          <div class="space-y-2">${(gateways.data || []).map(g => `<div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between"><div><p class="text-sm font-bold text-white">${escapeHtml(g.name)}</p><p class="text-[10px] text-gray-500">${g.api_key ? 'Configured' : 'Not configured'}</p></div>${g.is_active ? statusBadge('active') : statusBadge('inactive')}</div>`).join('')}</div>
          <a href="/admin.html" onclick="navigate('payments')" class="btn-press mt-3 block text-center text-xs font-bold text-blue-400 hover:text-blue-300 transition">Manage Payment Gateways →</a>
        </div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="sparkles" class="w-4 h-4 text-violet-400"></i> AI Providers</h3>
          <div class="space-y-2">
            <div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between"><div><p class="text-sm font-bold text-white">OpenAI</p><p class="text-[10px] text-gray-500">${ai.openai_api_key ? 'Configured' : 'Not configured'} · ${ai.openai_model || 'gpt-4o'}</p></div>${ai.active_provider === 'openai' ? '<span class="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">Active</span>' : ''}</div>
            <div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between"><div><p class="text-sm font-bold text-white">Google Gemini</p><p class="text-[10px] text-gray-500">${ai.gemini_api_key ? 'Configured' : 'Not configured'} · ${ai.gemini_model || 'gemini-1.5-flash'}</p></div>${ai.active_provider === 'gemini' ? '<span class="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">Active</span>' : ''}</div>
            <div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between"><div><p class="text-sm font-bold text-white">Anthropic Claude</p><p class="text-[10px] text-gray-500">${ai.anthropic_api_key ? 'Configured' : 'Not configured'} · ${ai.anthropic_model || 'claude-3-5-sonnet'}</p></div>${ai.active_provider === 'anthropic' ? '<span class="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">Active</span>' : ''}</div>
          </div>
          <a href="/admin-ai-settings.html" class="btn-press mt-3 block text-center text-xs font-bold text-blue-400 hover:text-blue-300 transition">Configure AI Providers →</a>
        </div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="image" class="w-4 h-4 text-amber-400"></i> Cloud Storage (Cloudinary)</h3>
          <div class="space-y-2"><div class="glass-soft border border-blue-500/10 rounded-xl p-3"><p class="text-sm font-bold text-white">Cloudinary</p><p class="text-[10px] text-gray-500">${s.cloudinary_cloud_name ? 'Configured' : 'Not configured'}</p></div></div>
          <a href="/admin.html" onclick="navigate('settings')" class="btn-press mt-3 block text-center text-xs font-bold text-blue-400 hover:text-blue-300 transition">Configure Cloudinary →</a>
        </div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-emerald-400"></i> Email Provider (Resend)</h3>
          <div class="space-y-2"><div class="glass-soft border border-blue-500/10 rounded-xl p-3"><p class="text-sm font-bold text-white">Resend</p><p class="text-[10px] text-gray-500">${s.resend_api_key ? 'Configured' : 'Not configured'}</p></div></div>
          <a href="/admin.html" onclick="navigate('settings')" class="btn-press mt-3 block text-center text-xs font-bold text-blue-400 hover:text-blue-300 transition">Configure Resend →</a>
        </div>
      </div>
    </div>`;
  if (window.lucide) lucide.createIcons();
}

// ── AI section (embeds the AI assistant inline) ───────────────
function renderAI() {
  document.getElementById('content').innerHTML = `
    <div class="fade-in">
      <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden" style="height: calc(100vh - 8rem)">
        <iframe src="/admin-ai.html" class="w-full h-full border-0" title="AI Admin Assistant"></iframe>
      </div>
    </div>`;
}

// ── AI Settings section (embeds the settings page inline) ──────
function renderAISettings() {
  document.getElementById('content').innerHTML = `
    <div class="fade-in">
      <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden" style="height: calc(100vh - 8rem)">
        <iframe src="/admin-ai-settings.html" class="w-full h-full border-0" title="AI Settings"></iframe>
      </div>
    </div>`;
}

// ── Publish & Deploy section ───────────────────────────────────
const DEPLOY_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/publish-deploy`;
let deployPollInterval = null;

async function renderPublish() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="fade-in space-y-5">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 class="text-xl font-bold text-white">Publish & Deploy</h2>
          <p class="text-sm text-gray-400 mt-1">Deploy the latest version of your marketplace to production.</p>
        </div>
        <button id="publish-btn" onclick="startPublish()" class="btn-press flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-blue-600/30">
          <i data-lucide="rocket" class="w-4 h-4"></i> Publish Website
        </button>
      </div>

      <!-- Progress indicator (hidden until publishing) -->
      <div id="deploy-progress" class="hidden glass border border-blue-500/20 rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <i data-lucide="loader-2" class="w-4 h-4 animate-spin text-blue-400" id="deploy-spinner"></i>
            <span id="deploy-progress-title">Preparing...</span>
          </h3>
          <span id="deploy-version" class="text-xs font-mono text-gray-500"></span>
        </div>
        <!-- Step indicators -->
        <div class="flex items-center gap-2 mb-4">
          ${['Preparing','Building','Deploying','Live'].map((label, i) => `
            <div class="flex-1 flex flex-col items-center gap-1.5">
              <div id="deploy-step-${i}" class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${i === 0 ? 'border-blue-500 bg-blue-500/20 text-blue-300' : 'border-gray-700 bg-gray-800/50 text-gray-600'}">
                ${i < 4 ? i + 1 : '<i data-lucide="check" class="w-4 h-4"></i>'}
              </div>
              <span id="deploy-step-label-${i}" class="text-[10px] font-bold ${i === 0 ? 'text-blue-300' : 'text-gray-600'}">${label}</span>
            </div>
          `).join('')}
        </div>
        <p id="deploy-detail" class="text-xs text-gray-500"></p>
      </div>

      <!-- Error display -->
      <div id="deploy-error" class="hidden glass border border-red-500/30 rounded-2xl p-5">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
            <i data-lucide="alert-triangle" class="w-5 h-5 text-red-400"></i>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-bold text-red-300 mb-1">Deployment Failed</h3>
            <p id="deploy-error-msg" class="text-xs text-red-200/80 mb-2"></p>
            <p id="deploy-error-fix" class="text-xs text-gray-400"></p>
          </div>
        </div>
      </div>

      <!-- Success display -->
      <div id="deploy-success" class="hidden glass border border-emerald-500/30 rounded-2xl p-5">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
            <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-bold text-emerald-300 mb-1">Deployment Successful</h3>
            <p id="deploy-success-msg" class="text-xs text-emerald-200/80"></p>
          </div>
        </div>
      </div>

      <!-- Pending changes summary -->
      <div id="deploy-pending" class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
          <i data-lucide="package" class="w-4 h-4 text-blue-400"></i> Pending Changes
        </h3>
        <div id="deploy-pending-content" class="space-y-3">
          <div class="flex items-center justify-center py-6 text-gray-500 text-sm">
            <i data-lucide="loader-2" class="w-4 h-4 animate-spin mr-2"></i> Checking for pending changes...
          </div>
        </div>
      </div>

      <!-- Deployment history -->
      <div class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
          <i data-lucide="history" class="w-4 h-4 text-blue-400"></i> Deployment History
        </h3>
        <div id="deploy-history" class="space-y-2">
          <div class="flex items-center justify-center py-8 text-gray-500 text-sm">
            <i data-lucide="loader-2" class="w-4 h-4 animate-spin mr-2"></i> Loading history...
          </div>
        </div>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  await loadPendingChanges();
  await loadDeployHistory();
  await checkDeployStatus();
}

async function loadPendingChanges() {
  const container = document.getElementById('deploy-pending-content');
  if (!container) return;
  try {
    const headers = await getDeployAuthHeaders();
    const res = await fetch(DEPLOY_FUNCTION_URL, {
      method: 'POST', headers,
      body: JSON.stringify({ action: 'pending_changes' }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      container.innerHTML = `<p class="text-xs text-red-400">Error: ${escapeHtml(err.error || res.statusText)}</p>`;
      return;
    }
    const data = await res.json();
    const newProducts = data.new_products || [];
    const updatedProducts = data.updated_products || [];
    const deletedProducts = data.deleted_products || [];
    const total = data.total_pending || 0;

    if (total === 0) {
      container.innerHTML = `
        <div class="flex items-center gap-3 py-4">
          <div class="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
          </div>
          <p class="text-sm text-gray-400">All changes are published. No pending updates.</p>
        </div>`;
      if (window.lucide) lucide.createIcons();
      return;
    }

    const sections = [];
    if (newProducts.length > 0) {
      sections.push(`
        <div>
          <p class="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
            <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> New Products (${newProducts.length})
          </p>
          <div class="space-y-1.5">
            ${newProducts.map(p => `
              <div class="flex items-center justify-between gap-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-3 py-2">
                <div class="min-w-0">
                  <p class="text-xs font-bold text-white truncate">${escapeHtml(p.title)}</p>
                  <p class="text-[10px] text-gray-500">${escapeHtml(p.property_id)} · ${escapeHtml(p.category || '')}</p>
                </div>
                <span class="text-xs font-bold text-emerald-400 shrink-0">${escapeHtml(String(p.price || ''))} ${escapeHtml(p.currency || '')}</span>
              </div>
            `).join('')}
          </div>
        </div>`);
    }
    if (updatedProducts.length > 0) {
      sections.push(`
        <div>
          <p class="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Updated Products (${updatedProducts.length})
          </p>
          <div class="space-y-1.5">
            ${updatedProducts.map(p => `
              <div class="flex items-center justify-between gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
                <div class="min-w-0">
                  <p class="text-xs font-bold text-white truncate">${escapeHtml(p.title)}</p>
                  <p class="text-[10px] text-gray-500">${escapeHtml(p.property_id)} · ${escapeHtml(p.category || '')}</p>
                </div>
                <span class="text-xs font-bold text-amber-400 shrink-0">${escapeHtml(String(p.price || ''))} ${escapeHtml(p.currency || '')}</span>
              </div>
            `).join('')}
          </div>
        </div>`);
    }
    if (deletedProducts.length > 0) {
      sections.push(`
        <div>
          <p class="text-xs font-bold text-red-400 mb-2 flex items-center gap-1.5">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Deleted Products (${deletedProducts.length})
          </p>
          <div class="space-y-1.5">
            ${deletedProducts.map(p => `
              <div class="flex items-center justify-between gap-2 bg-red-500/5 border border-red-500/10 rounded-lg px-3 py-2">
                <div class="min-w-0">
                  <p class="text-xs font-bold text-white truncate">${escapeHtml(p.title)}</p>
                  <p class="text-[10px] text-gray-500">${escapeHtml(p.property_id || '')}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>`);
    }

    container.innerHTML = `
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">${total} pending change${total !== 1 ? 's' : ''}</span>
      </div>
      <div class="space-y-4">${sections.join('')}</div>`;
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    container.innerHTML = `<p class="text-xs text-red-400">Error: ${escapeHtml(err.message)}</p>`;
  }
}

async function getDeployAuthHeaders() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY;
  return { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
}

async function loadDeployHistory() {
  const container = document.getElementById('deploy-history');
  if (!container) return;
  try {
    const headers = await getDeployAuthHeaders();
    const res = await fetch(DEPLOY_FUNCTION_URL, {
      method: 'POST', headers,
      body: JSON.stringify({ action: 'history' }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      container.innerHTML = `<p class="text-xs text-red-400">Error loading history: ${escapeHtml(err.error || res.statusText)}</p>`;
      return;
    }
    const data = await res.json();
    const deployments = data.deployments || [];
    if (deployments.length === 0) {
      container.innerHTML = `<p class="text-xs text-gray-500 text-center py-6">No deployments yet. Click "Publish Website" to deploy your marketplace.</p>`;
      return;
    }
    container.innerHTML = deployments.map(d => {
      const statusColors = {
        live: 'emerald', failed: 'red', preparing: 'blue', building: 'amber', deploying: 'violet',
      };
      const color = statusColors[d.status] || 'gray';
      const date = new Date(d.started_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const duration = d.completed_at ? `${Math.round((new Date(d.completed_at) - new Date(d.started_at)) / 1000)}s` : '—';
      return `
        <div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-${color}-500/10">
              <i data-lucide="${d.status === 'live' ? 'check-circle' : d.status === 'failed' ? 'alert-triangle' : 'loader-2'}" class="w-4 h-4 text-${color}-400 ${d.status === 'preparing' || d.status === 'building' || d.status === 'deploying' ? 'animate-spin' : ''}"></i>
            </div>
            <div class="min-w-0">
              <p class="text-sm font-bold text-white truncate">v${escapeHtml(d.version)}</p>
              <p class="text-[10px] text-gray-500">${date} · ${duration} · ${escapeHtml(d.triggered_by_email || 'Unknown')}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-[9px] font-bold text-${color}-400 bg-${color}-500/10 px-2 py-0.5 rounded-full uppercase">${d.status}</span>
            ${d.status === 'live' ? `<button onclick="republish('${d.id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition" title="Republish"><i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i></button>` : ''}
          </div>
        </div>
      `;
    }).join('');
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    container.innerHTML = `<p class="text-xs text-red-400">Error: ${escapeHtml(err.message)}</p>`;
  }
}

async function checkDeployStatus() {
  try {
    const headers = await getDeployAuthHeaders();
    const res = await fetch(DEPLOY_FUNCTION_URL, {
      method: 'POST', headers,
      body: JSON.stringify({ action: 'status' }),
    });
    if (!res.ok) return;
    const data = await res.json();
    if (data.inProgress) {
      // A deployment is in progress — show progress UI and start polling
      showDeployProgress(data.latest || {});
      startDeployPolling();
    }
  } catch {}
}

function showDeployProgress(deployment) {
  const progressDiv = document.getElementById('deploy-progress');
  const publishBtn = document.getElementById('publish-btn');
  if (!progressDiv || !publishBtn) return;
  progressDiv.classList.remove('hidden');
  publishBtn.disabled = true;
  publishBtn.classList.add('opacity-50', 'pointer-events-none');
  publishBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Deploying...';
  if (window.lucide) lucide.createIcons();
  updateDeploySteps(deployment.status || 'preparing');
  if (deployment.version) {
    document.getElementById('deploy-version').textContent = `v${deployment.version}`;
  }
}

function updateDeploySteps(status) {
  const steps = ['preparing', 'building', 'deploying', 'live'];
  const currentIdx = steps.indexOf(status);
  const labels = ['Preparing', 'Building', 'Deploying', 'Live'];

  for (let i = 0; i < 4; i++) {
    const stepEl = document.getElementById(`deploy-step-${i}`);
    const labelEl = document.getElementById(`deploy-step-label-${i}`);
    if (!stepEl || !labelEl) continue;

    if (i < currentIdx || status === 'live') {
      // Completed
      stepEl.className = 'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 border-emerald-500 bg-emerald-500/20 text-emerald-300';
      stepEl.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
      labelEl.className = 'text-[10px] font-bold text-emerald-300';
    } else if (i === currentIdx) {
      // Current
      stepEl.className = 'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 border-blue-500 bg-blue-500/20 text-blue-300';
      stepEl.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>`;
      labelEl.className = 'text-[10px] font-bold text-blue-300';
    } else {
      // Pending
      stepEl.className = 'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 border-gray-700 bg-gray-800/50 text-gray-600';
      stepEl.innerHTML = String(i + 1);
      labelEl.className = 'text-[10px] font-bold text-gray-600';
    }
    labelEl.textContent = labels[i];
  }

  const titleEl = document.getElementById('deploy-progress-title');
  const detailEl = document.getElementById('deploy-detail');
  if (titleEl) titleEl.textContent = status.charAt(0).toUpperCase() + status.slice(1) + '...';
  if (detailEl) {
    const detailMap = {
      preparing: 'Gathering product changes from the database...',
      building: 'Verifying product updates and pending changes...',
      deploying: 'Publishing changes to the live marketplace...',
      live: 'Deployment is live! Your marketplace has been updated.',
    };
    detailEl.textContent = detailMap[status] || '';
  }
  if (window.lucide) lucide.createIcons();
}

function startDeployPolling() {
  if (deployPollInterval) clearInterval(deployPollInterval);
  deployPollInterval = setInterval(async () => {
    try {
      const headers = await getDeployAuthHeaders();
      const res = await fetch(DEPLOY_FUNCTION_URL, {
        method: 'POST', headers,
        body: JSON.stringify({ action: 'status' }),
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.latest) {
        updateDeploySteps(data.latest.status);
        if (data.latest.version) {
          const vEl = document.getElementById('deploy-version');
          if (vEl) vEl.textContent = `v${data.latest.version}`;
        }
      }
      if (!data.inProgress && data.latest) {
        // Deployment finished
        clearInterval(deployPollInterval);
        deployPollInterval = null;
        await finishDeploy(data.latest);
      }
    } catch {}
  }, 2000);
}

async function finishDeploy(deployment) {
  const progressDiv = document.getElementById('deploy-progress');
  const publishBtn = document.getElementById('publish-btn');
  const successDiv = document.getElementById('deploy-success');
  const errorDiv = document.getElementById('deploy-error');

  if (publishBtn) {
    publishBtn.disabled = false;
    publishBtn.classList.remove('opacity-50', 'pointer-events-none');
    publishBtn.innerHTML = '<i data-lucide="rocket" class="w-4 h-4"></i> Publish Website';
  }
  if (window.lucide) lucide.createIcons();

  if (deployment.status === 'live') {
    if (progressDiv) progressDiv.classList.add('hidden');
    if (successDiv) {
      successDiv.classList.remove('hidden');
      const msg = document.getElementById('deploy-success-msg');
      if (msg) msg.textContent = `Version ${deployment.version} is now live. Your marketplace has been successfully deployed.`;
    }
    showToast('Deployment successful! Your marketplace is live.');
    await loadPendingChanges();
  } else if (deployment.status === 'failed') {
    if (progressDiv) progressDiv.classList.add('hidden');
    if (errorDiv) {
      errorDiv.classList.remove('hidden');
      const msg = document.getElementById('deploy-error-msg');
      const fix = document.getElementById('deploy-error-fix');
      if (msg) msg.textContent = deployment.error_message || 'Unknown error occurred.';
      if (fix) {
        const errLower = (deployment.error_message || '').toLowerCase();
        let fixText = 'Check the error message above and try again. If the issue persists, verify your project configuration.';
        if (errLower.includes('build failed')) fixText = 'There was a build error. Check your code for syntax errors or missing dependencies, then try publishing again.';
        else if (errLower.includes('dist') || errLower.includes('deploy')) fixText = 'The build completed but deployment failed. Ensure the build output is valid and try again.';
        else if (errLower.includes('already in progress')) fixText = 'Wait for the current deployment to finish before starting a new one.';
        fix.textContent = fixText;
      }
    }
    showToast('Deployment failed. See error details below.');
  }

  await loadDeployHistory();
}

window.startPublish = async () => {
  const btn = document.getElementById('publish-btn');
  if (!btn) return;
  btn.disabled = true;
  btn.classList.add('opacity-50', 'pointer-events-none');
  btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Starting...';
  if (window.lucide) lucide.createIcons();

  // Hide previous results
  document.getElementById('deploy-success')?.classList.add('hidden');
  document.getElementById('deploy-error')?.classList.add('hidden');

  try {
    const headers = await getDeployAuthHeaders();
    const res = await fetch(DEPLOY_FUNCTION_URL, {
      method: 'POST', headers,
      body: JSON.stringify({ action: 'publish' }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `Request failed (${res.status})`);
    }
    // Show progress UI
    const progressDiv = document.getElementById('deploy-progress');
    if (progressDiv) progressDiv.classList.remove('hidden');
    const vEl = document.getElementById('deploy-version');
    if (vEl) vEl.textContent = `v${data.version}`;
    updateDeploySteps('preparing');
    startDeployPolling();
    showToast('Deployment started. Building your marketplace...');
  } catch (err) {
    btn.disabled = false;
    btn.classList.remove('opacity-50', 'pointer-events-none');
    btn.innerHTML = '<i data-lucide="rocket" class="w-4 h-4"></i> Publish Website';
    if (window.lucide) lucide.createIcons();

    const errorDiv = document.getElementById('deploy-error');
    if (errorDiv) {
      errorDiv.classList.remove('hidden');
      const msg = document.getElementById('deploy-error-msg');
      const fix = document.getElementById('deploy-error-fix');
      if (msg) msg.textContent = err.message;
      if (fix) {
        const errLower = err.message.toLowerCase();
        let fixText = 'Check the error message above and try again.';
        if (errLower.includes('already in progress')) fixText = 'A deployment is already running. Wait for it to complete before starting a new one.';
        else if (errLower.includes('unauthorized') || errLower.includes('admin')) fixText = 'You need Super Admin privileges to publish. Sign in with an admin account.';
        fix.textContent = fixText;
      }
    }
    showToast('Failed to start deployment: ' + err.message);
  }
};

window.republish = async (deployId) => {
  // Republish is the same as starting a new publish
  await window.startPublish();
};

// ── Shipping section ──────────────────────────────────────────
function renderShipping() {
  document.getElementById('content').innerHTML = `
    <div class="fade-in">
      <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden" style="height: calc(100vh - 8rem)">
        <iframe src="/admin-shipping.html" class="w-full h-full border-0" title="Shipping Management"></iframe>
      </div>
    </div>`;
}

// ── Activity logging ──────────────────────────────────────────
async function logActivity(action, entityType, entityId, details) {
  try {
    await supabase.rpc('log_admin_activity', {
      p_user_id: state.user.id,
      p_action: action,
      p_entity_type: entityType,
      p_entity_id: entityId,
      p_details: details || {},
    });
  } catch {}
}

// ── Navigation ────────────────────────────────────────────────

// ── Global Search Settings ──
async function loadGlobalSearchSettings() {
  const container = document.getElementById('global-search-settings');
  if (!container) return;
  try {
    const { data, error } = await supabase.from('global_search_settings').select('*').eq('id', 1).maybeSingle();
    if (error) throw error;
    const s = data || { enabled: true, auto_source_from_suppliers: true, allow_special_orders: true, default_profit_margin_pct: 15, default_service_fee_pct: 3, default_shipping_fee: 0, default_tax_pct: 0, special_order_badge_label: 'Available by Special Order' };
    container.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label class="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-800 cursor-pointer">
          <input type="checkbox" id="gss-enabled" ${s.enabled ? 'checked' : ''} class="w-4 h-4 accent-orange-500">
          <div><p class="text-xs font-bold text-white">Enable Global Search</p><p class="text-[10px] text-gray-500">Allow worldwide product search</p></div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-800 cursor-pointer">
          <input type="checkbox" id="gss-auto-source" ${s.auto_source_from_suppliers ? 'checked' : ''} class="w-4 h-4 accent-orange-500">
          <div><p class="text-xs font-bold text-white">Auto-Source from Suppliers</p><p class="text-[10px] text-gray-500">Search connected suppliers</p></div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-800 cursor-pointer">
          <input type="checkbox" id="gss-special-orders" ${s.allow_special_orders ? 'checked' : ''} class="w-4 h-4 accent-orange-500">
          <div><p class="text-xs font-bold text-white">Allow Special Orders</p><p class="text-[10px] text-gray-500">Let customers request products</p></div>
        </label>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div><label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Profit Margin %</label><input type="number" id="gss-margin" value="${s.default_profit_margin_pct}" min="0" step="0.1" class="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"></div>
        <div><label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Service Fee %</label><input type="number" id="gss-service" value="${s.default_service_fee_pct}" min="0" step="0.1" class="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"></div>
        <div><label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Shipping Fee</label><input type="number" id="gss-shipping" value="${s.default_shipping_fee}" min="0" step="0.01" class="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"></div>
        <div><label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Tax %</label><input type="number" id="gss-tax" value="${s.default_tax_pct}" min="0" step="0.1" class="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"></div>
      </div>
      <div><label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Special Order Badge Label</label><input type="text" id="gss-badge" value="${escapeHtml(s.special_order_badge_label)}" class="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"></div>
      <button onclick="saveGlobalSearchSettings()" class="btn-press px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-orange-500/30 flex items-center gap-2"><i data-lucide="save" class="w-4 h-4"></i> Save Settings</button>
    `;
    if (window.lucide) lucide.createIcons();
    document.querySelectorAll('.btn-press').forEach(ripple);
  } catch (err) {
    container.innerHTML = `<div class="text-red-400 text-sm">Error loading settings: ${escapeHtml(err.message)}</div>`;
  }
}

window.saveGlobalSearchSettings = async () => {
  const payload = {
    id: 1,
    enabled: document.getElementById('gss-enabled').checked,
    auto_source_from_suppliers: document.getElementById('gss-auto-source').checked,
    allow_special_orders: document.getElementById('gss-special-orders').checked,
    default_profit_margin_pct: parseFloat(document.getElementById('gss-margin').value) || 0,
    default_service_fee_pct: parseFloat(document.getElementById('gss-service').value) || 0,
    default_shipping_fee: parseFloat(document.getElementById('gss-shipping').value) || 0,
    default_tax_pct: parseFloat(document.getElementById('gss-tax').value) || 0,
    special_order_badge_label: document.getElementById('gss-badge').value.trim() || 'Available by Special Order',
  };
  try {
    const { error } = await supabase.from('global_search_settings').upsert(payload).eq('id', 1);
    if (error) throw error;
    showToast('Global search settings saved.');
  } catch (err) {
    showToast('Error saving settings: ' + err.message);
  }
};

window.navigate = (section) => {
  state.currentSection = section;
  document.getElementById('page-title').textContent = PAGE_TITLES[section] || section;
  renderSidebar();
  if (window.innerWidth < 1024) {
    document.getElementById('sidebar').classList.add('-translate-x-full');
    document.getElementById('sidebar-overlay').classList.add('hidden');
  }
  const renderers = {
    dashboard: renderDashboard, products: renderProducts, orders: renderOrders,
    'special-orders': renderSpecialOrders,
    customers: renderCustomers, payments: renderPayments, shipping: renderShipping,
    promotions: renderPromotions, content: renderContent, email: renderEmail,
    analytics: renderAnalytics, ai: renderAI, security: renderSecurity,
    settings: renderSettings, integrations: renderIntegrations,
    'ai-settings': renderAISettings,
    publish: renderPublish,
  };
  (renderers[section] || renderDashboard)();
};

window.toggleSidebar = () => {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  sb.classList.toggle('-translate-x-full');
  ov.classList.toggle('hidden');
};

window.adminSignOut = async () => {
  await signOut();
  window.location.href = '/auth.html';
};

// Listen for auth state changes (session expiry, sign-out from another tab, etc.)
// Wrapped in async IIFE to avoid the onAuthStateChange deadlock documented in the bolt-database skill.
supabase.auth.onAuthStateChange((_event, session) => {
  (async () => {
    if (!session) {
      // Session lost — redirect to login if we're not already there
      if (!window.location.pathname.includes('auth.html')) {
        const currentPath = window.location.pathname + window.location.search;
        window.location.href = `/auth.html?redirect=${encodeURIComponent(currentPath)}`;
      }
    }
  })();
});

// ── Clock ─────────────────────────────────────────────────────
function updateClock() {
  const el = document.getElementById('live-clock');
  if (el) el.innerHTML = `<i data-lucide="clock" class="w-3 h-3"></i> ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
  if (window.lucide) lucide.createIcons();
}

// ── Init ──────────────────────────────────────────────────────
async function init() {
  // Use getSession() for reliable session restoration across refresh/navigation.
  // getUser() can return null on cold loads even when a valid session exists.
  const { data: sessionData } = await supabase.auth.getSession();
  state.user = sessionData?.session?.user || null;

  if (!state.user) {
    // Not logged in — redirect to login page with return path
    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `/auth.html?redirect=${encodeURIComponent(currentPath)}`;
    return;
  }

  // Check if this user is an admin via SECURITY DEFINER RPC (bypasses RLS)
  const { data: isAdmin } = await supabase.rpc('is_current_user_admin');
  if (isAdmin) {
    state.isAdmin = true;
    state.loading = false;

    // ── 2FA verification gate ──
    // Check if 2FA is enabled for this admin. If so, require a valid
    // TOTP code or backup code before granting access to the dashboard.
    try {
      const { data: session } = await supabase.auth.getSession();
      const accessToken = session?.session?.access_token;
      const twoFaRes = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-2fa`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'status' }),
      });
      const twoFaData = await twoFaRes.json();
      if (twoFaData.enabled) {
        // 2FA is enabled — show verification gate
        state.user._accessToken = accessToken;
        await show2FAGate(accessToken);
        return; // Don't proceed to dashboard until verified
      }
    } catch (err) {
      // If 2FA check fails, log it but allow access (fail-open for availability)
      console.warn('2FA status check failed:', err);
    }

    proceedToDashboard();
    return;
  }

  // User is logged in but NOT an admin.
  // Check if any admin exists at all (via SECURITY DEFINER RPC that bypasses RLS).
  const { data: anyAdmin } = await supabase.rpc('has_any_admin');
  if (anyAdmin) {
    // An admin exists — show access denied, no bootstrap option
    showAccessDenied('You are signed in, but this account does not have administrator privileges. Please sign in with an admin account.');
  } else {
    // No admin exists yet — allow this user to become the first admin
    showBootstrapPrompt();
  }
}

function showAccessDenied(message) {
  const denied = document.getElementById('access-denied');
  denied.classList.remove('hidden');
  document.getElementById('access-denied-msg').textContent = message;
  // Ensure the sign-in button is present (showBootstrapPrompt may have replaced it)
  const existingBtn = denied.querySelector('#bootstrap-btn');
  if (existingBtn) {
    existingBtn.outerHTML = `<a href="/auth.html?redirect=${encodeURIComponent(window.location.pathname)}" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30"><i data-lucide="log-in" class="w-4 h-4"></i> Sign In</a>`;
  }
  if (window.lucide) lucide.createIcons();
}

// ── 2FA verification gate ──────────────────────────────────────

function proceedToDashboard() {
  renderSidebar();
  renderAdminUserInfo();
  navigate('dashboard');
  setInterval(updateClock, 1000);
  updateClock();
  // Log login
  try {
    supabase.from('admin_security_logs').insert({ user_id: state.user.id, event_type: 'admin_login' }).then(() => {}, () => {});
  } catch {}
}

async function show2FAGate(accessToken) {
  const root = document.getElementById('admin-root') || document.body;
  root.innerHTML = `
    <div class="min-h-screen bg-[#050816] flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-600/30 mb-4">
            <i data-lucide="shield-check" class="w-8 h-8 text-white"></i>
          </div>
          <h1 class="text-2xl font-bold text-white mb-1">Two-Factor Authentication</h1>
          <p class="text-sm text-gray-400">Enter the 6-digit code from your authenticator app to access the Admin Dashboard.</p>
        </div>
        <div class="glass border border-blue-500/20 rounded-2xl p-6 space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-2">Authentication Code</label>
            <input type="text" id="twofa-code" inputmode="numeric" maxlength="6" placeholder="000000"
              class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] text-white font-bold focus:outline-none focus:border-blue-500"
              oninput="this.value = this.value.replace(/[^0-9]/g,'')">
          </div>
          <button id="twofa-verify-btn" onclick="verify2FAGate('${accessToken}')" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
            <i data-lucide="shield-check" class="w-4 h-4"></i> Verify & Access Dashboard
          </button>
          <div class="pt-2 border-t border-white/5">
            <button onclick="document.getElementById('twofa-backup-section').classList.toggle('hidden')" class="text-xs font-bold text-gray-500 hover:text-gray-300 transition w-full text-center">
              Lost your phone? Use a backup code
            </button>
            <div id="twofa-backup-section" class="hidden mt-3 space-y-3">
              <input type="text" id="twofa-backup-code" placeholder="xxxx-xxxx-xxxx-xxxx"
                class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500">
              <button onclick="verify2FAGate('${accessToken}', true)" class="btn-press w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-sm transition">
                Use Backup Code
              </button>
            </div>
          </div>
          <div id="twofa-error" class="hidden text-xs text-red-400 text-center font-bold"></div>
          <div class="flex items-center justify-between pt-2">
            <button onclick="signOut2FA()" class="text-xs font-bold text-gray-500 hover:text-gray-300 transition flex items-center gap-1.5">
              <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Sign Out
            </button>
            <span id="twofa-attempts" class="text-xs text-gray-600"></span>
          </div>
        </div>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
  const codeInput = document.getElementById('twofa-code');
  if (codeInput) codeInput.focus();
  codeInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verify2FAGate(accessToken);
  });
}

window.verify2FAGate = async (accessToken, isBackup = false) => {
  const errEl = document.getElementById('twofa-error');
  const attemptsEl = document.getElementById('twofa-attempts');
  const btn = document.getElementById('twofa-verify-btn');
  errEl?.classList.add('hidden');

  const code = isBackup
    ? document.getElementById('twofa-backup-code')?.value.trim()
    : document.getElementById('twofa-code')?.value.trim();

  if (!code) {
    if (errEl) { errEl.textContent = 'Please enter a code.'; errEl.classList.remove('hidden'); }
    return;
  }

  if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Verifying...'; if (window.lucide) lucide.createIcons(); }

  try {
    const body = isBackup
      ? { action: 'verify', backup_code: code }
      : { action: 'verify', code };
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-2fa`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      if (btn) { btn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> Verified!'; if (window.lucide) lucide.createIcons(); }
      setTimeout(() => {
        proceedToDashboard();
      }, 600);
    } else {
      if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="shield-check" class="w-4 h-4"></i> Verify & Access Dashboard'; if (window.lucide) lucide.createIcons(); }
      if (errEl) {
        errEl.textContent = data.error || 'Verification failed.';
        errEl.classList.remove('hidden');
      }
      if (attemptsEl && data.attempts_remaining !== undefined) {
        attemptsEl.textContent = `${data.attempts_remaining} attempt(s) remaining`;
      }
      const codeInput = document.getElementById(isBackup ? 'twofa-backup-code' : 'twofa-code');
      if (codeInput) { codeInput.value = ''; codeInput.focus(); }
    }
  } catch (err) {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="shield-check" class="w-4 h-4"></i> Verify & Access Dashboard'; if (window.lucide) lucide.createIcons(); }
    if (errEl) { errEl.textContent = 'Network error. Please try again.'; errEl.classList.remove('hidden'); }
  }
};

window.signOut2FA = async () => {
  try { await supabase.auth.signOut(); } catch {}
  window.location.href = '/auth.html?redirect=/admin.html';
};

// ── 2FA Management (Security section) ──────────────────────────

window.setup2FA = async () => {
  const modal = document.getElementById('twofa-setup-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.innerHTML = `
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onclick="if(event.target===this)document.getElementById('twofa-setup-modal').classList.add('hidden')">
      <div class="glass border border-blue-500/20 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white flex items-center gap-2"><i data-lucide="shield-plus" class="w-5 h-5 text-blue-400"></i> Set Up 2FA</h3>
          <button onclick="document.getElementById('twofa-setup-modal').classList.add('hidden')" class="text-gray-500 hover:text-white transition"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <div id="twofa-setup-content" class="space-y-4">
          <div class="flex items-center justify-center py-8"><i data-lucide="loader-2" class="w-6 h-6 animate-spin text-blue-400"></i></div>
        </div>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();

  try {
    const { data: session } = await supabase.auth.getSession();
    const accessToken = session?.session?.access_token;
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-2fa`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'setup' }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Setup failed');

    const content = document.getElementById('twofa-setup-content');
    content.innerHTML = `
      <div class="text-center space-y-4">
        <div class="bg-white rounded-xl p-4 inline-block">
          <img src="${data.qr_url}" alt="QR Code" class="w-48 h-48 mx-auto" />
        </div>
        <div>
          <p class="text-sm text-gray-400 mb-2">1. Scan this QR code with Google Authenticator or Microsoft Authenticator</p>
          <p class="text-xs text-gray-500 mb-1">Or enter this secret key manually:</p>
          <div class="bg-[#0a1124] border border-blue-500/20 rounded-lg p-2 font-mono text-xs text-blue-300 break-all select-all cursor-pointer" onclick="navigator.clipboard?.writeText('${data.secret}')">${data.secret}</div>
        </div>
        <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-left">
          <p class="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Save Your Backup Codes</p>
          <p class="text-xs text-gray-400 mb-2">Store these safely. Each can be used once if you lose your phone:</p>
          <div class="grid grid-cols-2 gap-1.5 font-mono text-xs text-amber-300">
            ${data.backup_codes.map((c) => `<div class="bg-[#0a1124] rounded px-2 py-1">${c}</div>`).join('')}
          </div>
        </div>
        <div>
          <p class="text-sm text-gray-400 mb-2">2. Enter the 6-digit code from your app to confirm:</p>
          <input type="text" id="twofa-setup-confirm" inputmode="numeric" maxlength="6" placeholder="000000"
            class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-3 text-center text-xl tracking-[0.5em] text-white font-bold focus:outline-none focus:border-blue-500"
            oninput="this.value = this.value.replace(/[^0-9]/g,'')">
        </div>
        <button onclick="confirm2FASetup('${accessToken}')" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition flex items-center justify-center gap-2">
          <i data-lucide="shield-check" class="w-4 h-4"></i> Confirm & Enable 2FA
        </button>
        <div id="twofa-setup-error" class="hidden text-xs text-red-400 text-center font-bold"></div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    document.getElementById('twofa-setup-confirm')?.focus();
  } catch (err) {
    document.getElementById('twofa-setup-content').innerHTML = `<p class="text-sm text-red-400 text-center">${escapeHtml(err.message)}</p>`;
  }
};

window.confirm2FASetup = async (accessToken) => {
  const code = document.getElementById('twofa-setup-confirm')?.value.trim();
  const errEl = document.getElementById('twofa-setup-error');
  if (!code || !/^\d{6}$/.test(code)) {
    if (errEl) { errEl.textContent = 'Enter a valid 6-digit code.'; errEl.classList.remove('hidden'); }
    return;
  }
  try {
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-2fa`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'verify_setup', code }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('2FA enabled successfully!');
      document.getElementById('twofa-setup-modal')?.classList.add('hidden');
      renderSecurity();
    } else {
      if (errEl) { errEl.textContent = data.error || 'Invalid code.'; errEl.classList.remove('hidden'); }
    }
  } catch (err) {
    if (errEl) { errEl.textContent = 'Network error.'; errEl.classList.remove('hidden'); }
  }
};

window.disable2FA = async () => {
  const code = prompt('Enter your current 6-digit authentication code to disable 2FA:');
  if (!code) return;
  try {
    const { data: session } = await supabase.auth.getSession();
    const accessToken = session?.session?.access_token;
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-2fa`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'disable', code }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('2FA disabled.');
      renderSecurity();
    } else {
      showToast(data.error || 'Failed to disable 2FA.');
    }
  } catch (err) {
    showToast('Error: ' + err.message);
  }
};

window.regenerateBackupCodes = async () => {
  const code = prompt('Enter your current 6-digit authentication code to regenerate backup codes:');
  if (!code) return;
  try {
    const { data: session } = await supabase.auth.getSession();
    const accessToken = session?.session?.access_token;
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-2fa`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'regenerate_backup_codes', code }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      alert('New backup codes (save these — they replace all old ones):\n\n' + data.backup_codes.join('\n'));
      showToast('Backup codes regenerated.');
    } else {
      showToast(data.error || 'Failed to regenerate backup codes.');
    }
  } catch (err) {
    showToast('Error: ' + err.message);
  }
};

function showBootstrapPrompt() {
  const denied = document.getElementById('access-denied');
  denied.classList.remove('hidden');
  document.getElementById('access-denied-msg').textContent = 'No administrator has been set up yet. You can promote your account to become the first admin.';
  denied.querySelector('a').outerHTML = `<button onclick="bootstrapAdmin()" id="bootstrap-btn" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-amber-600/30"><i data-lucide="shield" class="w-4 h-4"></i> Become Admin</button>`;
  if (window.lucide) lucide.createIcons();
  document.querySelector('#bootstrap-btn').addEventListener('click', ripple);
}

window.bootstrapAdmin = async () => {
  const btn = document.getElementById('bootstrap-btn');
  if (!btn) return;
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Promoting...';
  if (window.lucide) lucide.createIcons();
  try {
    const { data: session } = await supabase.auth.getSession();
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-admin-assistant`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${session?.session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'bootstrap_admin' }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('You are now an admin!');
      setTimeout(() => window.location.reload(), 1000);
    } else {
      // If an admin already exists, show access denied instead of looping
      if (data.error && data.error.toLowerCase().includes('already exists')) {
        showAccessDenied('An administrator already exists. Please sign in with an admin account.');
      } else {
        showToast(data.error || 'Failed');
        btn.disabled = false;
        btn.innerHTML = '<i data-lucide="shield" class="w-4 h-4"></i> Become Admin';
        if (window.lucide) lucide.createIcons();
      }
    }
  } catch (err) {
    showToast('Error: ' + err.message);
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="shield" class="w-4 h-4"></i> Become Admin';
    if (window.lucide) lucide.createIcons();
  }
};

init();

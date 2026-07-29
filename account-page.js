import { supabase } from './supabase-client.js';
import { getCurrentUser, signOut } from './auth.js';
import { requestNotificationPermission, onForegroundMessage } from './firebase-config.js';
import { trackEvent } from './analytics.js';
import { getCountryByCode, COUNTRIES, searchCountries } from './country-data.js';

const FALLBACK_IMG = '/fallback.svg';

/* ── Navigation config ─────────────────────────────────────── */
const NAV_SECTIONS = [
  {
    group: 'Overview',
    items: [
      { id: 'home', label: 'Dashboard Home', icon: 'layout-dashboard' },
      { id: 'profile', label: 'My Profile', icon: 'user' },
      { id: 'edit-profile', label: 'Edit Profile', icon: 'user-cog' },
      { id: 'change-password', label: 'Change Password', icon: 'key-round' },
    ],
  },
  {
    group: 'Orders & Shopping',
    items: [
      { id: 'orders', label: 'My Orders', icon: 'shopping-bag' },
      { id: 'special-orders', label: 'Special Orders', icon: 'package-plus' },
      { id: 'tracking', label: 'Order Tracking', icon: 'truck' },
      { id: 'history', label: 'Order History', icon: 'history' },
      { id: 'cart', label: 'Shopping Cart', icon: 'shopping-cart' },
    ],
  },
  {
    group: 'Account',
    items: [
      { id: 'notifications', label: 'Notifications', icon: 'bell' },
      { id: 'messages', label: 'Messages', icon: 'mail' },
      { id: 'payment-methods', label: 'Payment Methods', icon: 'credit-card' },
      { id: 'payments', label: 'Payment History', icon: 'receipt' },
      { id: 'addresses', label: 'Shipping Addresses', icon: 'map-pin' },
      { id: 'receipts', label: 'Download Receipts', icon: 'download' },
    ],
  },
  {
    group: 'Support & Settings',
    items: [
      { id: 'email-prefs', label: 'Email Preferences', icon: 'settings' },
      { id: 'support', label: 'Customer Support', icon: 'headphones' },
      { id: 'help', label: 'Help Center', icon: 'help-circle' },
      { id: 'privacy', label: 'Privacy & Security', icon: 'shield-check' },
    ],
  },
];

/* ── Order steps ───────────────────────────────────────────── */
const ORDER_STEPS = [
  { id: 'order_placed', label: 'Order Placed', icon: 'shopping-bag', color: 'text-blue-400', bg: 'bg-blue-500/15' },
  { id: 'payment_received', label: 'Payment Received', icon: 'credit-card', color: 'text-cyan-400', bg: 'bg-cyan-500/15' },
  { id: 'pending_verification', label: 'Pending Verification', icon: 'shield-alert', color: 'text-amber-400', bg: 'bg-amber-500/15' },
  { id: 'payment_approved', label: 'Approved', icon: 'check-circle', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  { id: 'order_processing', label: 'Processing', icon: 'package', color: 'text-blue-400', bg: 'bg-blue-500/15' },
  { id: 'order_shipped', label: 'Shipped', icon: 'truck', color: 'text-indigo-400', bg: 'bg-indigo-500/15' },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: 'bike', color: 'text-orange-400', bg: 'bg-orange-500/15' },
  { id: 'order_delivered', label: 'Delivered', icon: 'package-check', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
];

const STATUS_ALIASES = { approved: 'payment_approved', submitted: 'payment_received', placed: 'order_placed' };
function normalizeStatus(s) { return STATUS_ALIASES[s] || s; }
function stepIndex(status) { const i = ORDER_STEPS.findIndex(s => s.id === normalizeStatus(status)); return i >= 0 ? i : 0; }

/* ── Helpers ────────────────────────────────────────────────── */
function formatDate(d) { return d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'; }
function formatDateTime(d) { return d ? new Date(d).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'; }
function initials(email) { return (email || '?').slice(0, 2).toUpperCase(); }
function escapeHtml(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
  if (window.lucide) lucide.createIcons();
}

function copyToClipboard(text) {
  const fb = () => { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(t); };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).catch(() => fb()); else fb();
  showToast('Copied to clipboard.');
}

function statusBadge(status) {
  const norm = normalizeStatus(status);
  const step = ORDER_STEPS.find(s => s.id === norm) || ORDER_STEPS[0];
  const colorMap = {
    'text-blue-400': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'text-cyan-400': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'text-amber-400': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'text-emerald-400': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'text-indigo-400': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    'text-orange-400': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'text-red-400': 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  const cls = colorMap[step.color] || colorMap['text-blue-400'];
  const label = status === 'rejected' ? 'Rejected' : step.label;
  return `<span class="inline-flex items-center gap-1 ${cls} border text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">${label}</span>`;
}

function ripple(btn) {
  btn.addEventListener('click', function (e) {
    if (this.disabled) return;
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

/* ── State ──────────────────────────────────────────────────── */
let state = {
  user: null,
  profile: null,
  orders: [],
  events: {},
  notifications: [],
  addresses: [],
  emailPrefs: null,
  messages: [],
  paymentMethods: [],
  activeSection: 'home',
};

/* ── Particles ──────────────────────────────────────────────── */
function spawnParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    const s = Math.random() * 3 + 1;
    p.className = 'particle';
    p.style.width = p.style.height = s + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.background = Math.random() > 0.5 ? 'rgba(59,130,246,.4)' : 'rgba(251,191,36,.3)';
    p.style.animationDuration = (Math.random() * 20 + 15) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    c.appendChild(p);
  }
}
spawnParticles();

/* ── Init ───────────────────────────────────────────────────── */
async function init() {
  const root = document.getElementById('dashboard-root');
  state.user = await getCurrentUser();
  if (!state.user) { window.location.href = '/auth.html?redirect=/account.html'; return; }

  await loadProfile();
  await loadOrders();
  await loadAddresses();
  await loadEmailPrefs();
  await loadMessages();
  await loadPaymentMethods();

  renderNav();
  renderSidebarProfile();
  attachGlobalHandlers();
  renderSection('home');

  // Request FCM push notification permission for order updates
  requestNotificationPermission().then(token => {
    if (token) console.log('Push notifications enabled');
  });
  onForegroundMessage((payload) => {
    const { title, body } = payload.notification || {};
    showToast(title || 'Order Update: ' + (body || ''));
  });
}

async function loadProfile() {
  const { data } = await supabase.from('profiles').select('*').eq('user_id', state.user.id).maybeSingle();
  state.profile = data;
}

async function loadOrders() {
  const { data: orders } = await supabase.from('payment_receipts').select('*').eq('user_id', state.user.id).order('created_at', { ascending: false });
  state.orders = orders || [];
  if (state.orders.length) {
    const nums = state.orders.map(o => o.order_number);
    const { data: evs } = await supabase.from('order_events').select('*').in('order_number', nums).order('created_at', { ascending: true });
    state.events = {};
    (evs || []).forEach(e => { (state.events[e.order_number] ||= []).push(e); });
    const { data: notifs } = await supabase.from('notification_log').select('*').in('order_number', nums).order('created_at', { ascending: false });
    state.notifications = notifs || [];
  }
}

async function loadAddresses() {
  const { data } = await supabase.from('shipping_addresses').select('*').eq('user_id', state.user.id).order('created_at', { ascending: false });
  state.addresses = data || [];
}

async function loadEmailPrefs() {
  const { data } = await supabase.from('email_preferences').select('*').eq('user_id', state.user.id).maybeSingle();
  state.emailPrefs = data;
}

async function loadMessages() {
  const { data } = await supabase.from('support_messages').select('*').eq('user_id', state.user.id).order('created_at', { ascending: false });
  state.messages = data || [];
}

async function loadPaymentMethods() {
  const { data } = await supabase.from('customer_payment_methods').select('*').eq('user_id', state.user.id).order('is_default', { ascending: false }).order('created_at', { ascending: false });
  state.paymentMethods = data || [];
}

/* ── Navigation ─────────────────────────────────────────────── */
function renderNav() {
  const navHtml = NAV_SECTIONS.map(sec => `
    <div class="mb-3">
      <p class="text-[10px] font-bold uppercase tracking-wider text-gray-600 px-3 mb-1.5">${sec.group}</p>
      ${sec.items.map(item => `
        <button data-section="${item.id}" class="nav-item w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-blue-500/5 rounded-xl transition border border-transparent ${state.activeSection === item.id ? 'active' : ''}">
          <i data-lucide="${item.icon}" class="nav-icon w-4 h-4 shrink-0 text-gray-500"></i>
          <span class="truncate">${item.label}</span>
        </button>
      `).join('')}
    </div>
  `).join('');
  document.getElementById('nav-menu').innerHTML = navHtml;
  document.getElementById('mobile-nav-menu').innerHTML = navHtml;
  document.querySelectorAll('[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = btn.dataset.section;
      navigateTo(sec);
    });
  });
  if (window.lucide) lucide.createIcons();
}

function navigateTo(section) {
  state.activeSection = section;
  document.querySelectorAll('[data-section]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === section);
  });
  renderSection(section);
  closeMobileDrawer();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderSidebarProfile() {
  const name = state.profile?.display_name || state.profile?.first_name || 'Customer';
  const email = state.user.email;
  const avatarHtml = state.profile?.avatar_url
    ? `<img src="${state.profile.avatar_url}" class="w-full h-full object-cover" onerror="this.style.display='none'">`
    : initials(email);
  ['sidebar-avatar', 'mobile-avatar'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = avatarHtml;
  });
  ['sidebar-name', 'mobile-name'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = name;
  });
  ['sidebar-email', 'mobile-email'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = email;
  });
}

/* ── Section renderer ───────────────────────────────────────── */
async function renderSection(section) {
  const root = document.getElementById('dashboard-root');
  let html = '';
  switch (section) {
    case 'home': html = renderHome(); break;
    case 'profile': html = renderProfile(); break;
    case 'edit-profile': html = renderEditProfile(); break;
    case 'change-password': html = renderChangePassword(); break;
    case 'orders': html = renderOrders(); break;
    case 'special-orders': html = await renderSpecialOrders(); break;
    case 'tracking': html = renderTracking(); break;
    case 'history': html = renderHistory(); break;
    case 'cart': html = renderCart(); break;
    case 'notifications': html = renderNotifications(); break;
    case 'messages': html = renderMessages(); break;
    case 'payments': html = renderPayments(); break;
    case 'payment-methods': html = renderPaymentMethods(); break;
    case 'addresses': html = renderAddresses(); break;
    case 'receipts': html = renderReceipts(); break;
    case 'email-prefs': html = renderEmailPrefs(); break;
    case 'support': html = renderSupport(); break;
    case 'help': html = renderHelp(); break;
    case 'privacy': html = renderPrivacy(); break;
    default: html = renderHome();
  }
  root.innerHTML = `<div class="section active fade-in">${html}</div>`;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  attachSectionHandlers(section);
}

/* ── Page title helper ─────────────────────────────────────── */
function pageTitle(title, subtitle) {
  return `
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">${title}</h1>
      ${subtitle ? `<p class="text-sm text-gray-500 mt-1">${subtitle}</p>` : ''}
    </div>
  `;
}

/* ── Stats helper ───────────────────────────────────────────── */
function orderStats() {
  const total = state.orders.length;
  const pending = state.orders.filter(o => ['order_placed', 'payment_received', 'pending_verification', 'order_processing'].includes(normalizeStatus(o.status))).length;
  const completed = state.orders.filter(o => normalizeStatus(o.status) === 'order_delivered').length;
  const cancelled = state.orders.filter(o => o.status === 'rejected').length;
  return { total, pending, completed, cancelled };
}

function statCard(label, value, icon, color) {
  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <div class="flex items-center justify-between mb-3">
        <div class="p-2.5 ${color.bg} rounded-xl"><i data-lucide="${icon}" class="w-5 h-5 ${color.text}"></i></div>
      </div>
      <p class="text-3xl font-black text-white">${value}</p>
      <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">${label}</p>
    </div>
  `;
}

/* ════════════════════════════════════════════════════════════
   SECTION: Dashboard Home
════════════════════════════════════════════════════════════ */
function renderHome() {
  const stats = orderStats();
  const name = state.profile?.display_name || state.profile?.first_name || 'Customer';
  const country = state.profile?.country_code ? getCountryByCode(state.profile.country_code) : null;
  const recentOrders = state.orders.slice(0, 4);
  const recentNotifs = state.notifications.slice(0, 5);

  return `
    ${pageTitle('Dashboard Home', `Welcome back, ${name}! Here's your account overview.`)}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      ${statCard('Total Orders', stats.total, 'shopping-bag', { bg: 'bg-blue-500/10', text: 'text-blue-400' })}
      ${statCard('Pending Orders', stats.pending, 'clock', { bg: 'bg-amber-500/10', text: 'text-amber-400' })}
      ${statCard('Completed', stats.completed, 'check-circle', { bg: 'bg-emerald-500/10', text: 'text-emerald-400' })}
      ${statCard('Cancelled', stats.cancelled, 'x-circle', { bg: 'bg-red-500/10', text: 'text-red-400' })}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Recent orders -->
      <div class="lg:col-span-2 glass border border-blue-500/20 rounded-2xl p-5 slide-up">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <i data-lucide="shopping-bag" class="w-4 h-4 text-blue-400"></i> Recent Orders
          </h3>
          <button onclick="navigateTo('orders')" class="text-xs text-blue-400 hover:text-blue-300 font-bold transition">View All →</button>
        </div>
        ${recentOrders.length === 0 ? `<p class="text-sm text-gray-500 text-center py-8">No orders yet. <a href="/" class="text-blue-400 font-bold">Start shopping</a></p>` : recentOrders.map(o => `
          <div class="flex items-center gap-3 p-3 bg-blue-950/30 border border-blue-500/10 rounded-xl mb-2 hover:border-blue-500/30 transition cursor-pointer" onclick="navigateTo('orders')">
            <div class="w-12 h-12 rounded-lg bg-gray-900 overflow-hidden shrink-0 ring-1 ring-blue-500/10">
              <img src="${o.listing_image || FALLBACK_IMG}" class="w-full h-full object-cover" onerror="this.src='${FALLBACK_IMG}'">
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-white truncate">${o.listing_title}</p>
              <p class="text-xs text-gray-500 font-mono">${o.order_number}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="text-sm font-bold text-amber-400">${o.amount} ${o.currency}</p>
              ${statusBadge(o.status)}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Quick actions + notifications -->
      <div class="space-y-5">
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
            <i data-lucide="zap" class="w-4 h-4 text-amber-400"></i> Quick Actions
          </h3>
          <div class="grid grid-cols-2 gap-2">
            <button onclick="navigateTo('tracking')" class="btn-press flex flex-col items-center gap-1.5 p-3 bg-blue-500/5 hover:bg-blue-500/15 border border-blue-500/10 hover:border-blue-500/30 rounded-xl transition relative overflow-hidden">
              <i data-lucide="truck" class="w-5 h-5 text-blue-400"></i><span class="text-xs font-bold text-gray-300">Track Order</span>
            </button>
            <button onclick="navigateTo('addresses')" class="btn-press flex flex-col items-center gap-1.5 p-3 bg-blue-500/5 hover:bg-blue-500/15 border border-blue-500/10 hover:border-blue-500/30 rounded-xl transition relative overflow-hidden">
              <i data-lucide="map-pin" class="w-5 h-5 text-emerald-400"></i><span class="text-xs font-bold text-gray-300">Addresses</span>
            </button>
            <button onclick="navigateTo('support')" class="btn-press flex flex-col items-center gap-1.5 p-3 bg-blue-500/5 hover:bg-blue-500/15 border border-blue-500/10 hover:border-blue-500/30 rounded-xl transition relative overflow-hidden">
              <i data-lucide="headphones" class="w-5 h-5 text-amber-400"></i><span class="text-xs font-bold text-gray-300">Support</span>
            </button>
          </div>
        </div>

        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
            <i data-lucide="bell" class="w-4 h-4 text-blue-400"></i> Latest Notifications
          </h3>
          ${recentNotifs.length === 0 ? `<p class="text-xs text-gray-500 text-center py-4">No notifications yet.</p>` : recentNotifs.map(n => {
            const step = ORDER_STEPS.find(s => s.id === n.event_type) || ORDER_STEPS[0];
            return `
              <div class="flex items-start gap-2.5 p-2.5 hover:bg-blue-500/5 rounded-xl transition cursor-pointer" onclick="navigateTo('notifications')">
                <div class="w-7 h-7 ${step.bg} rounded-lg flex items-center justify-center shrink-0">
                  <i data-lucide="${step.icon}" class="w-3.5 h-3.5 ${step.color}"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-white truncate">${n.subject}</p>
                  <p class="text-[10px] text-gray-500">${formatDateTime(n.created_at)}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- Account info -->
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mt-5 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="user" class="w-4 h-4 text-blue-400"></i> Account Information
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Email</p><p class="text-sm text-white truncate">${state.user.email}</p></div>
        <div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Country</p><p class="text-sm text-white">${country ? country.flag + ' ' + country.name : '—'}</p></div>
        <div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Member Since</p><p class="text-sm text-white">${formatDate(state.user.created_at)}</p></div>
      </div>
    </div>
  `;
}

/* ════════════════════════════════════════════════════════════
   SECTION: My Profile
════════════════════════════════════════════════════════════ */
function renderProfile() {
  const p = state.profile || {};
  const country = p.country_code ? getCountryByCode(p.country_code) : null;
  const avatarHtml = p.avatar_url
    ? `<img src="${p.avatar_url}" class="w-full h-full object-cover" onerror="this.style.display='none'">`
    : `<span class="text-2xl font-black">${initials(state.user.email)}</span>`;

  return `
    ${pageTitle('My Profile', 'View your account details and personal information.')}
    <div class="glass border border-blue-500/20 rounded-2xl p-6 slide-up">
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
        <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white overflow-hidden shrink-0 ring-2 ring-blue-500/20 shadow-lg shadow-blue-600/30">
          ${avatarHtml}
        </div>
        <div class="flex-1 text-center sm:text-left">
          <h2 class="text-xl font-black text-white">${p.display_name || p.first_name || 'Customer'}</h2>
          <p class="text-sm text-gray-400">${state.user.email}</p>
          <div class="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
            ${country ? `<span class="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs text-blue-400 font-medium">${country.flag} ${country.name}</span>` : ''}
            <span class="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-xs text-emerald-400 font-medium"><i data-lucide="shield-check" class="w-3 h-3"></i> Verified</span>
            <span class="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 text-xs text-amber-400 font-medium"><i data-lucide="calendar" class="w-3 h-3"></i> ${formatDate(state.user.created_at)}</span>
          </div>
          <button onclick="navigateTo('edit-profile')" class="btn-press mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
            <i data-lucide="edit-3" class="w-4 h-4"></i> Edit Profile
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-blue-500/10">
        ${profileField('First Name', p.first_name || '—')}
        ${profileField('Last Name', p.last_name || '—')}
        ${profileField('Display Name', p.display_name || '—')}
        ${profileField('Phone', p.phone_code && p.phone_number ? `+${p.phone_code} ${p.phone_number}` : '—')}
        ${profileField('Country', country ? country.name : '—')}
        ${profileField('Email', state.user.email)}
      </div>
      ${p.bio ? `<div class="pt-5 border-t border-blue-500/10 mt-4"><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Bio</p><p class="text-sm text-gray-300">${p.bio}</p></div>` : ''}
    </div>
  `;
}

function profileField(label, value) {
  return `<div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">${label}</p><p class="text-sm text-white">${value}</p></div>`;
}

/* ════════════════════════════════════════════════════════════
   SECTION: Edit Profile
════════════════════════════════════════════════════════════ */
function renderEditProfile() {
  const p = state.profile || {};
  const country = p.country_code ? getCountryByCode(p.country_code) : null;
  return `
    ${pageTitle('Edit Profile', 'Update your personal information and profile picture.')}
    <div class="glass border border-blue-500/20 rounded-2xl p-6 slide-up max-w-2xl">
      <form id="edit-profile-form" class="space-y-5">
        <!-- Avatar -->
        <div class="flex items-center gap-4">
          <div id="edit-avatar-preview" class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-xl overflow-hidden shrink-0 ring-2 ring-blue-500/20">
            ${p.avatar_url ? `<img src="${p.avatar_url}" class="w-full h-full object-cover" onerror="this.style.display='none'">` : initials(state.user.email)}
          </div>
          <div>
            <label class="btn-press cursor-pointer inline-flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-wide transition relative overflow-hidden">
              <i data-lucide="upload" class="w-4 h-4"></i> Upload Photo
              <input type="file" id="avatar-file" accept="image/*" class="hidden">
            </label>
            <p class="text-[11px] text-gray-500 mt-1.5">JPG, PNG. Max 5 MB.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">First Name</label>
            <input type="text" id="ep-first-name" value="${p.first_name || ''}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Last Name</label>
            <input type="text" id="ep-last-name" value="${p.last_name || ''}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Display Name</label>
          <input type="text" id="ep-display-name" value="${p.display_name || ''}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Phone Code</label>
            <input type="text" id="ep-phone-code" value="${p.phone_code || (country ? country.dial : '')}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Phone Number</label>
            <input type="text" id="ep-phone-number" value="${p.phone_number || ''}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Country</label>
          <select id="ep-country" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            ${COUNTRIES.map(c => `<option value="${c.code}" ${p.country_code === c.code ? 'selected' : ''}>${c.flag} ${c.name} (+${c.dial})</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Bio</label>
          <textarea id="ep-bio" rows="3" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none" placeholder="Tell us about yourself...">${p.bio || ''}</textarea>
        </div>
        <div class="flex gap-3">
          <button type="submit" id="ep-save-btn" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
            <i data-lucide="save" class="w-4 h-4"></i> Save Changes
          </button>
          <button type="button" onclick="navigateTo('profile')" class="btn-press px-5 py-3 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">Cancel</button>
        </div>
      </form>
    </div>
  `;
}

/* ════════════════════════════════════════════════════════════
   SECTION: Change Password
════════════════════════════════════════════════════════════ */
function renderChangePassword() {
  return `
    ${pageTitle('Change Password', 'Update your account password to keep your account secure.')}
    <div class="glass border border-blue-500/20 rounded-2xl p-6 slide-up max-w-md">
      <form id="change-password-form" class="space-y-5">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Current Password</label>
          <div class="relative">
            <i data-lucide="lock" class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input type="password" id="cp-current" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">New Password</label>
          <div class="relative">
            <i data-lucide="key-round" class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input type="password" id="cp-new" required minlength="6" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Confirm New Password</label>
          <div class="relative">
            <i data-lucide="shield-check" class="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input type="password" id="cp-confirm" required minlength="6" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div id="cp-error" class="hidden text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5"></div>
        <button type="submit" id="cp-submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
          <i data-lucide="key-round" class="w-4 h-4"></i> Update Password
        </button>
      </form>
    </div>
  `;
}

/* ════════════════════════════════════════════════════════════
   SECTION: My Orders
════════════════════════════════════════════════════════════ */
function renderOrders() {
  return `
    ${pageTitle('My Orders', 'View and manage all your orders. Click an order to see full details.')}
    <div id="orders-list" class="space-y-4">
      ${state.orders.length === 0 ? renderEmptyState('No Orders Yet', 'You haven\'t placed any orders yet.', 'shopping-bag', 'Start Shopping') : state.orders.map(o => renderOrderCard(o, false)).join('')}
    </div>
  `;
}

function renderOrderCard(order, expanded) {
  const cover = order.listing_image || FALLBACK_IMG;
  const evs = state.events[order.order_number] || [];
  const isExpanded = expanded === order.order_number;
  return `
    <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden slide-up">
      <div class="p-4 sm:p-5 cursor-pointer hover:bg-blue-500/5 transition" onclick="toggleOrder('${order.order_number}')">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-900 shrink-0 ring-1 ring-blue-500/10">
            <img src="${cover}" class="w-full h-full object-cover" onerror="this.src='${FALLBACK_IMG}'">
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 mb-1">
              <h3 class="text-sm font-bold text-white truncate">${order.listing_title}</h3>
              ${statusBadge(order.status)}
            </div>
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              <span class="font-mono text-blue-400">${order.order_number}</span>
              <span>·</span><span>${formatDate(order.created_at)}</span>
              <span>·</span><span class="text-amber-400 font-bold">${order.amount} ${order.currency}</span>
            </div>
          </div>
          <i data-lucide="chevron-${isExpanded ? 'up' : 'down'}" class="w-5 h-5 text-gray-500 shrink-0 mt-2"></i>
        </div>
      </div>
      <div class="${isExpanded ? '' : 'hidden'} border-t border-blue-500/10 p-4 sm:p-5 bg-blue-950/20">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          ${detailBox('Order Number', order.order_number, 'mono')}
          ${detailBox('Order Date', formatDate(order.created_at))}
          ${detailBox('Total Amount', `${order.amount} ${order.currency}`, 'amber')}
          ${detailBox('Quantity', '1')}
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wide mb-3 flex items-center gap-2"><i data-lucide="git-branch" class="w-4 h-4 text-blue-400"></i> Order Progress</h4>
            ${renderOrderTracker(order.status)}
          </div>
          <div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wide mb-3 flex items-center gap-2"><i data-lucide="history" class="w-4 h-4 text-blue-400"></i> Order History</h4>
            <div class="space-y-2 max-h-64 overflow-y-auto scrollbar-none">
              ${evs.length === 0 ? '<p class="text-xs text-gray-600">No events yet.</p>' : evs.map(ev => `
                <div class="flex items-start gap-2.5 p-2.5 bg-blue-950/30 border border-blue-500/10 rounded-xl">
                  <div class="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                  <div class="flex-1 min-w-0"><p class="text-xs text-gray-200 font-medium">${ev.message}</p><p class="text-[10px] text-gray-500 mt-0.5">${formatDateTime(ev.created_at)}</p></div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-5 pt-4 border-t border-blue-500/10">
          <button onclick="event.stopPropagation();copyToClipboard('${order.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-xs font-bold text-blue-400 transition relative overflow-hidden"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Order #</button>
          <button onclick="event.stopPropagation();contactSupport('${order.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg text-xs font-bold text-amber-400 transition relative overflow-hidden"><i data-lucide="headphones" class="w-3.5 h-3.5"></i> Contact Support</button>
          ${order.receipt_file_path ? `<button onclick="event.stopPropagation();downloadReceipt('${order.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-xs font-bold text-emerald-400 transition relative overflow-hidden"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Receipt</button>` : ''}
        </div>
      </div>
    </div>
  `;
}

function detailBox(label, value, cls) {
  const extra = cls === 'mono' ? 'font-mono text-blue-400' : cls === 'amber' ? 'text-amber-400 font-bold' : 'text-white';
  return `<div class="bg-blue-950/40 border border-blue-500/10 rounded-xl p-3"><div class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">${label}</div><div class="text-sm ${extra} break-all">${value}</div></div>`;
}

function renderOrderTracker(status) {
  const idx = stepIndex(status);
  return `
    <div class="relative pt-2">
      <div class="absolute left-4 top-6 bottom-6 w-0.5 bg-blue-500/10"></div>
      <div class="absolute left-4 top-6 w-0.5 bg-blue-500 transition-all duration-500" style="height: calc(${(idx / (ORDER_STEPS.length - 1)) * 100}% - 1rem)"></div>
      <div class="space-y-3">
        ${ORDER_STEPS.map((s, i) => {
          const done = i <= idx; const active = i === idx;
          return `<div class="flex items-center gap-3 relative"><div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${done ? s.bg + ' border border-blue-500/30' : 'bg-blue-950/40 border border-blue-500/10'} ${active ? 'pulse-glow' : ''}"><i data-lucide="${s.icon}" class="w-4 h-4 ${done ? s.color : 'text-gray-600'} ${active ? 'animate-pulse' : ''}"></i></div><div class="flex-1 flex items-center justify-between"><span class="text-sm font-medium ${done ? 'text-white' : 'text-gray-600'}">${s.label}</span>${done && !active ? '<i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0"></i>' : ''}${active ? '<span class="text-[10px] text-blue-400 font-bold uppercase shrink-0">Current</span>' : ''}</div></div>`;
        }).join('')}
      </div>
    </div>
  `;
}

let expandedOrder = null;
window.toggleOrder = (num) => {
  expandedOrder = expandedOrder === num ? null : num;
  const list = document.getElementById('orders-list');
  if (list) { list.innerHTML = state.orders.map(o => renderOrderCard(o, expandedOrder)).join(''); if (window.lucide) lucide.createIcons(); document.querySelectorAll('.btn-press').forEach(ripple); }
};

/* ════════════════════════════════════════════════════════════
   SECTION: Order Tracking
════════════════════════════════════════════════════════════ */
// ── Special Orders section ──
async function renderSpecialOrders() {
  try {
    const { data, error } = await supabase.from('product_requests').select('*').eq('user_id', state.user.id).order('created_at', { ascending: false });
    if (error) throw error;
    const statusColors = { pending_review: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', under_review: 'bg-blue-500/10 text-blue-400 border-blue-500/30', approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', rejected: 'bg-red-500/10 text-red-400 border-red-500/30', quoted: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30', fulfilled: 'bg-green-500/10 text-green-400 border-green-500/30', cancelled: 'bg-gray-500/10 text-gray-400 border-gray-500/30' };
    if (!data || data.length === 0) {
      return `<div class="text-center py-16"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4"><i data-lucide="package-plus" class="w-8 h-8 text-gray-500"></i></div><h3 class="text-lg font-bold text-white mb-2">No Special Orders yet</h3><p class="text-sm text-gray-500 mb-5">When you can't find a product in our marketplace, you can request it as a Special Order and we'll source it for you.</p><a href="/" class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-orange-500/30"><i data-lucide="search" class="w-4 h-4"></i> Search Products</a></div>`;
    }
    let html = `<div class="mb-4"><p class="text-sm text-gray-400">Track your special order requests and their status updates.</p></div><div class="space-y-3">`;
    data.forEach(r => {
      const badgeClass = statusColors[r.status] || statusColors.pending_review;
      const statusLabel = r.status.replace(/_/g, ' ');
      const price = r.target_price ? `${r.currency} ${Number(r.target_price).toLocaleString()}` : '—';
      const quoted = r.quoted_price ? `${r.quoted_currency} ${Number(r.quoted_price).toLocaleString()}` : null;
      html += `<div class="glass border border-gray-800 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2"><h4 class="text-sm font-bold text-white truncate">${escapeHtml(r.request_title)}</h4><span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${badgeClass}">${escapeHtml(statusLabel)}</span></div>
        <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-2">
          <span><i data-lucide="tag" class="w-3 h-3 inline mr-1"></i>${escapeHtml(r.category || 'Uncategorized')}</span>
          <span><i data-lucide="award" class="w-3 h-3 inline mr-1"></i>${escapeHtml(r.brand || 'Any')}</span>
          <span><i data-lucide="circle-dollar-sign" class="w-3 h-3 inline mr-1"></i>${price}</span>
          <span><i data-lucide="hash" class="w-3 h-3 inline mr-1"></i>Qty: ${r.quantity}</span>
          <span><i data-lucide="calendar" class="w-3 h-3 inline mr-1"></i>${new Date(r.created_at).toLocaleDateString()}</span>
        </div>
        ${r.request_description ? `<p class="text-xs text-gray-500 mb-2">${escapeHtml(r.request_description)}</p>` : ''}
        ${quoted ? `<p class="text-xs text-cyan-400 font-bold mb-2">Quoted Price: ${quoted} (${escapeHtml(r.payment_status)})</p>` : ''}
        <div class="text-xs text-gray-500"><i data-lucide="map-pin" class="w-3 h-3 inline mr-1"></i>${escapeHtml(r.delivery_full_name || '')}, ${escapeHtml(r.delivery_city || '')}, ${escapeHtml(r.delivery_country || '')}</div>
      </div>`;
    });
    html += `</div>`;
    return html;
  } catch (err) {
    return `<div class="text-red-400 text-sm p-4">Error loading special orders: ${escapeHtml(err.message)}</div>`;
  }
}

function renderTracking() {
  const activeOrders = state.orders.filter(o => !['order_delivered', 'rejected'].includes(normalizeStatus(o.status)));
  return `
    ${pageTitle('Order Tracking', 'Track your active orders in real time.')}
    ${activeOrders.length === 0 ? renderEmptyState('No Active Orders', 'All your orders have been delivered.', 'check-circle', 'Browse Marketplace') : `
      <div class="space-y-4">
        ${activeOrders.map(o => `
          <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-gray-900 overflow-hidden ring-1 ring-blue-500/10">
                  <img src="${o.listing_image || FALLBACK_IMG}" class="w-full h-full object-cover" onerror="this.src='${FALLBACK_IMG}'">
                </div>
                <div><h3 class="text-sm font-bold text-white">${o.listing_title}</h3><p class="text-xs text-gray-500 font-mono">${o.order_number}</p></div>
              </div>
              ${statusBadge(o.status)}
            </div>
            ${renderOrderTracker(o.status)}
          </div>
        `).join('')}
      </div>
    `}
  `;
}

/* ════════════════════════════════════════════════════════════
   SECTION: Order History
════════════════════════════════════════════════════════════ */
function renderHistory() {
  return `
    ${pageTitle('Order History', 'Your complete, permanently saved order history.')}
    <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden slide-up">
      <div class="overflow-x-auto scrollbar-none">
        <table class="w-full">
          <thead>
            <tr class="border-b border-blue-500/10 bg-blue-950/30">
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Order #</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Product</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3 hidden sm:table-cell">Date</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Amount</th>
              <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            ${state.orders.length === 0 ? `<tr><td colspan="5" class="text-center text-sm text-gray-500 py-10">No orders yet.</td></tr>` : state.orders.map(o => `
              <tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition cursor-pointer" onclick="navigateTo('orders')">
                <td class="px-4 py-3 text-xs font-mono text-blue-400">${o.order_number}</td>
                <td class="px-4 py-3 text-xs text-white font-medium max-w-[160px] truncate">${o.listing_title}</td>
                <td class="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">${formatDate(o.created_at)}</td>
                <td class="px-4 py-3 text-xs text-amber-400 font-bold">${o.amount} ${o.currency}</td>
                <td class="px-4 py-3">${statusBadge(o.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <p class="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1.5"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Your complete order history is permanently saved and secured.</p>
  `;
}

/* ════════════════════════════════════════════════════════════
   SECTION: Shopping Cart
════════════════════════════════════════════════════════════ */
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('kco_cart') || '[]');
  return `
    ${pageTitle('Shopping Cart', 'Items in your shopping cart.')}
    ${cart.length === 0 ? renderEmptyState('Cart is Empty', 'Your shopping cart is empty.', 'shopping-cart', 'Browse Marketplace') : `
      <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
        <div class="space-y-3">
          ${cart.map(id => {
            const item = window.SHOWROOM_LISTINGS?.find(l => l.property_id === id);
            if (!item) return '';
            return `<div class="flex items-center gap-3 p-3 bg-blue-950/30 border border-blue-500/10 rounded-xl">
              <div class="w-14 h-14 rounded-lg bg-gray-900 overflow-hidden shrink-0"><img src="${item.images?.[0] || FALLBACK_IMG}" class="w-full h-full object-cover" onerror="this.src='${FALLBACK_IMG}'"></div>
              <div class="flex-1 min-w-0"><h3 class="text-sm font-bold text-white truncate">${item.title}</h3><p class="text-xs text-amber-400 font-bold">${item.price} ${item.currency}</p></div>
              <button onclick="removeFromCart('${item.property_id}')" class="btn-press p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition relative overflow-hidden"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>`;
          }).join('')}
        </div>
        <button onclick="clearCart()" class="btn-press w-full mt-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold py-2.5 rounded-xl text-xs uppercase transition relative overflow-hidden">Clear Cart</button>
      </div>
    `}
  `;
}

window.removeFromCart = (id) => {
  let cart = JSON.parse(localStorage.getItem('kco_cart') || '[]');
  cart = cart.filter(c => c !== id);
  localStorage.setItem('kco_cart', JSON.stringify(cart));
  renderSection('cart');
  showToast('Removed from cart.');
};
window.clearCart = () => { localStorage.removeItem('kco_cart'); renderSection('cart'); showToast('Cart cleared.'); };

/* ════════════════════════════════════════════════════════════
   SECTION: Notifications
════════════════════════════════════════════════════════════ */
function renderNotifications() {
  return `
    ${pageTitle('Notifications', 'All email notifications related to your orders.')}
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      ${state.notifications.length === 0 ? renderEmptyState('No Notifications', 'You haven\'t received any notifications yet.', 'bell-off', null) : `
        <div class="space-y-2">
          ${state.notifications.map(n => {
            const step = ORDER_STEPS.find(s => s.id === n.event_type) || ORDER_STEPS[0];
            return `
              <div class="flex items-start gap-3 p-3 bg-blue-950/30 border border-blue-500/10 rounded-xl hover:border-blue-500/30 transition">
                <div class="w-9 h-9 ${step.bg} rounded-xl flex items-center justify-center shrink-0"><i data-lucide="${step.icon}" class="w-4 h-4 ${step.color}"></i></div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-white truncate">${n.subject}</p>
                  <p class="text-xs text-gray-500 mt-0.5">${formatDateTime(n.created_at)}</p>
                  <div class="flex items-center gap-2 mt-1.5">
                    <span class="text-[10px] ${n.status === 'sent' ? 'text-emerald-400' : n.status === 'failed' ? 'text-red-400' : 'text-amber-400'} font-bold uppercase">${n.status}</span>
                    <span class="text-[10px] text-gray-600">·</span>
                    <span class="text-[10px] text-gray-500 font-mono">${n.order_number}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}

/* ════════════════════════════════════════════════════════════
   SECTION: Messages
════════════════════════════════════════════════════════════ */
function renderMessages() {
  return `
    ${pageTitle('Messages', 'Your conversation with customer support.')}
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <!-- Message thread -->
      <div id="msg-thread" class="space-y-3 mb-5 max-h-96 overflow-y-auto scrollbar-none">
        ${state.messages.length === 0 ? `<p class="text-sm text-gray-500 text-center py-8">No messages yet. Send a message to start a conversation with support.</p>` : state.messages.map(m => `
          <div class="flex ${m.from_admin ? 'justify-start' : 'justify-end'}">
            <div class="max-w-[80%] ${m.from_admin ? 'bg-blue-950/60 border-blue-500/20' : 'bg-blue-600/20 border-blue-500/30'} border rounded-2xl px-4 py-2.5">
              ${m.subject && !m.from_admin ? `<p class="text-xs font-bold text-blue-400 mb-1">${m.subject}</p>` : ''}
              <p class="text-sm text-gray-200">${m.message}</p>
              <p class="text-[10px] text-gray-500 mt-1">${formatDateTime(m.created_at)}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <!-- Send form -->
      <form id="msg-form" class="space-y-3 pt-4 border-t border-blue-500/10">
        <input type="text" id="msg-subject" placeholder="Subject" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        <textarea id="msg-body" rows="3" placeholder="Type your message..." class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"></textarea>
        <button type="submit" id="msg-send-btn" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
          <i data-lucide="send" class="w-4 h-4"></i> Send Message
        </button>
      </form>
    </div>
  `;
}

/* ════════════════════════════════════════════════════════════
   SECTION: Payment History
════════════════════════════════════════════════════════════ */
function renderPayments() {
  return `
    ${pageTitle('Payment History', 'All your payment transactions and their verification status.')}
    <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden slide-up">
      <div class="overflow-x-auto scrollbar-none">
        <table class="w-full">
          <thead><tr class="border-b border-blue-500/10 bg-blue-950/30">
            <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Order #</th>
            <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3 hidden sm:table-cell">Date</th>
            <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Amount</th>
            <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Status</th>
            <th class="text-left text-[10px] font-bold uppercase text-gray-500 tracking-wide px-4 py-3">Receipt</th>
          </tr></thead>
          <tbody>
            ${state.orders.length === 0 ? `<tr><td colspan="5" class="text-center text-sm text-gray-500 py-10">No payments yet.</td></tr>` : state.orders.map(o => `
              <tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition">
                <td class="px-4 py-3 text-xs font-mono text-blue-400">${o.order_number}</td>
                <td class="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">${formatDate(o.payment_date || o.created_at)}</td>
                <td class="px-4 py-3 text-xs text-amber-400 font-bold">${o.amount} ${o.currency}</td>
                <td class="px-4 py-3">${statusBadge(o.status)}</td>
                <td class="px-4 py-3">${o.receipt_file_path ? `<button onclick="downloadReceipt('${o.order_number}')" class="text-emerald-400 hover:text-emerald-300 transition"><i data-lucide="download" class="w-4 h-4"></i></button>` : '<span class="text-gray-600 text-xs">—</span>'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/* ════════════════════════════════════════════════════════════
   SECTION: Payment Methods
════════════════════════════════════════════════════════════ */
const AVAILABLE_PAYMENT_METHODS = [
  { type: 'manual_transfer', label: 'Manual Bank Transfer', icon: 'landmark', color: 'text-blue-400', available: true, desc: 'Transfer directly to our bank account' },
  { type: 'atm_card', label: 'ATM / Debit Card', icon: 'credit-card', color: 'text-emerald-400', available: true, desc: 'Visa, Mastercard, Verve' },
  { type: 'bank_transfer', label: 'Bank Transfer', icon: 'building-2', color: 'text-cyan-400', available: true, desc: 'Online banking transfer' },
  { type: 'mobile_money', label: 'Mobile Money Transfer', icon: 'smartphone', color: 'text-orange-400', available: true, desc: 'Send money from your mobile wallet' },
  { type: 'wallet', label: 'Wallet', icon: 'wallet', color: 'text-amber-400', available: true, desc: 'Use your KCO wallet balance' },
  { type: 'paypal', label: 'PayPal', icon: 'wallet', color: 'text-blue-400', available: false, desc: 'Pay with your PayPal account' },
];

function renderPaymentMethods() {
  const saved = state.paymentMethods || [];
  const hasSaved = saved.length > 0;

  return `
    ${pageTitle('Payment Methods', 'Manage your saved payment methods and view all available options.')}
    <div class="space-y-5">
      ${hasSaved ? `
        <div class="glass border border-blue-500/20 rounded-2xl p-4 sm:p-5 slide-up">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-white uppercase tracking-wide">Saved Payment Methods</h3>
            <button onclick="openPaymentMethodModal()" class="btn-press inline-flex items-center gap-1.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 font-bold text-xs px-3 py-2 rounded-lg transition relative overflow-hidden">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add New
            </button>
          </div>
          <div class="space-y-3">
            ${saved.map(m => renderSavedMethodCard(m)).join('')}
          </div>
        </div>
      ` : `
        ${renderEmptyState('No Saved Payment Methods', 'You haven\'t saved any payment methods yet. Add one to speed up checkout.', 'credit-card', 'Add Payment Method', 'openPaymentMethodModal()')}
      `}

      <div class="glass border border-blue-500/20 rounded-2xl p-4 sm:p-5 slide-up">
        <div class="flex items-center gap-2 mb-4">
          <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="grid-3x3" class="w-4 h-4 text-blue-400"></i></div>
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">Available Payment Options</h3>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${AVAILABLE_PAYMENT_METHODS.map(m => `
            <div class="relative bg-blue-950/40 border ${m.available ? 'border-blue-500/20' : 'border-gray-700/40'} rounded-xl p-4 ${m.available ? '' : 'opacity-60'}">
              ${!m.available ? '<span class="absolute top-2 right-2 bg-gray-700 text-gray-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full">Soon</span>' : ''}
              <div class="flex items-center gap-3 mb-2">
                <div class="p-2 ${m.available ? 'bg-blue-500/10' : 'bg-gray-700/20'} rounded-lg"><i data-lucide="${m.icon}" class="w-5 h-5 ${m.color}"></i></div>
                <div>
                  <h4 class="text-sm font-bold text-white">${m.label}</h4>
                  ${m.available ? '<span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400"><i data-lucide="check-circle" class="w-3 h-3"></i> Available</span>' : '<span class="text-[10px] text-gray-500 font-medium">Coming Soon</span>'}
                </div>
              </div>
              <p class="text-xs text-gray-500">${m.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderSavedMethodCard(m) {
  const meta = AVAILABLE_PAYMENT_METHODS.find(x => x.type === m.method_type) || { icon: 'credit-card', color: 'text-blue-400' };
  return `
    <div class="bg-blue-950/40 border ${m.is_default ? 'border-blue-500/50' : 'border-blue-500/15'} rounded-xl p-4 flex items-center gap-3">
      <div class="p-2.5 bg-blue-500/10 rounded-lg shrink-0"><i data-lucide="${meta.icon}" class="w-5 h-5 ${meta.color}"></i></div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <h4 class="text-sm font-bold text-white truncate">${escapeHtml(m.label)}</h4>
          ${m.is_default ? '<span class="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border border-emerald-500/20"><i data-lucide="check" class="w-2.5 h-2.5"></i> Default</span>' : ''}
        </div>
        <p class="text-xs text-gray-400 mt-0.5 truncate">${escapeHtml(m.provider || m.method_type)} ${m.identifier ? '· ' + escapeHtml(m.identifier) : ''}</p>
        ${m.account_holder ? `<p class="text-[11px] text-gray-500 mt-0.5">Account Holder: ${escapeHtml(m.account_holder)}</p>` : ''}
      </div>
      <div class="flex items-center gap-1 shrink-0">
        ${!m.is_default ? `<button onclick="setDefaultPaymentMethod('${m.id}')" title="Set as default" class="btn-press p-2 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition relative overflow-hidden"><i data-lucide="star" class="w-4 h-4 text-gray-400"></i></button>` : ''}
        <button onclick="editPaymentMethod('${m.id}')" title="Edit" class="btn-press p-2 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition relative overflow-hidden"><i data-lucide="pencil" class="w-4 h-4 text-gray-400"></i></button>
        <button onclick="deletePaymentMethod('${m.id}')" title="Remove" class="btn-press p-2 bg-red-900/40 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-lg transition relative overflow-hidden"><i data-lucide="trash-2" class="w-4 h-4 text-red-400"></i></button>
      </div>
    </div>
  `;
}

window.openPaymentMethodModal = function (existingId) {
  const existing = existingId ? (state.paymentMethods || []).find(m => m.id === existingId) : null;
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4';
  overlay.innerHTML = `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto slide-up">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-bold text-white">${existing ? 'Edit' : 'Add'} Payment Method</h3>
        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <form onsubmit="savePaymentMethod(event, '${existingId || ''}')" class="space-y-3">
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Method Type</label>
          <select id="pm-type" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            ${AVAILABLE_PAYMENT_METHODS.filter(m => m.available).map(m => `<option value="${m.type}" ${existing && existing.method_type === m.type ? 'selected' : ''}>${m.label}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Nickname / Label</label>
          <input id="pm-label" type="text" required value="${existing ? escapeHtml(existing.label) : ''}" placeholder="e.g. My GTBank Account" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Provider / Bank Name</label>
          <input id="pm-provider" type="text" value="${existing ? escapeHtml(existing.provider || '') : ''}" placeholder="e.g. GTBank, Visa, MTN Mobile Money" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Account Holder Name</label>
          <input id="pm-holder" type="text" value="${existing ? escapeHtml(existing.account_holder || '') : ''}" placeholder="Account holder name" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Identifier (last 4 digits / masked)</label>
          <input id="pm-identifier" type="text" value="${existing ? escapeHtml(existing.identifier || '') : ''}" placeholder="e.g. ****1234" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div class="flex items-center gap-2">
          <input id="pm-default" type="checkbox" ${existing && existing.is_default ? 'checked' : ''} class="w-4 h-4 rounded border-blue-500/30 bg-blue-950/40 text-blue-500 focus:ring-blue-500">
          <label for="pm-default" class="text-xs text-gray-300">Set as default payment method</label>
        </div>
        <button type="submit" class="btn-press w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">${existing ? 'Save Changes' : 'Add Payment Method'}</button>
      </form>
    </div>
  `;
  document.body.appendChild(overlay);
  if (window.lucide) lucide.createIcons();
};

window.savePaymentMethod = async function (e, existingId) {
  e.preventDefault();
  const payload = {
    method_type: document.getElementById('pm-type').value,
    label: document.getElementById('pm-label').value.trim(),
    provider: document.getElementById('pm-provider').value.trim() || null,
    account_holder: document.getElementById('pm-holder').value.trim() || null,
    identifier: document.getElementById('pm-identifier').value.trim() || null,
    is_default: document.getElementById('pm-default').checked,
  };
  e.target.closest('.fixed').remove();
  try {
    if (payload.is_default) {
      await supabase.from('customer_payment_methods').update({ is_default: false }).eq('user_id', state.user.id);
    }
    if (existingId) {
      const { error } = await supabase.from('customer_payment_methods').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', existingId).eq('user_id', state.user.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('customer_payment_methods').insert({ ...payload, user_id: state.user.id });
      if (error) throw error;
    }
    await loadPaymentMethods();
    navigateTo('payment-methods');
    showToast('Payment method saved successfully.');
  } catch (err) {
    showToast('Failed to save payment method: ' + (err.message || 'Unknown error'));
  }
};

window.editPaymentMethod = function (id) {
  openPaymentMethodModal(id);
};

window.deletePaymentMethod = async function (id) {
  if (!confirm('Remove this payment method?')) return;
  try {
    const { error } = await supabase.from('customer_payment_methods').delete().eq('id', id).eq('user_id', state.user.id);
    if (error) throw error;
    await loadPaymentMethods();
    navigateTo('payment-methods');
    showToast('Payment method removed.');
  } catch (err) {
    showToast('Failed to remove: ' + (err.message || 'Unknown error'));
  }
};

window.setDefaultPaymentMethod = async function (id) {
  try {
    await supabase.from('customer_payment_methods').update({ is_default: false }).eq('user_id', state.user.id).neq('id', id);
    const { error } = await supabase.from('customer_payment_methods').update({ is_default: true, updated_at: new Date().toISOString() }).eq('id', id).eq('user_id', state.user.id);
    if (error) throw error;
    await loadPaymentMethods();
    navigateTo('payment-methods');
    showToast('Default payment method updated.');
  } catch (err) {
    showToast('Failed to set default: ' + (err.message || 'Unknown error'));
  }
};

/* ════════════════════════════════════════════════════════════
   SECTION: Shipping Addresses
════════════════════════════════════════════════════════════ */
function renderAddresses() {
  return `
    ${pageTitle('Shipping Addresses', 'Manage your saved shipping addresses.')}
    <button onclick="showAddressForm()" class="btn-press mb-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
      <i data-lucide="plus" class="w-4 h-4"></i> Add New Address
    </button>
    <div id="address-form-container"></div>
    <div id="addresses-list" class="space-y-3">
      ${state.addresses.length === 0 ? renderEmptyState('No Addresses', 'You haven\'t saved any shipping addresses yet.', 'map-pin', null) : state.addresses.map(a => {
        const country = getCountryByCode(a.country_code);
        return `
          <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-2">
                <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="map-pin" class="w-4 h-4 text-blue-400"></i></div>
                <div>
                  <h3 class="text-sm font-bold text-white">${a.label}</h3>
                  ${a.is_default ? '<span class="text-[10px] text-emerald-400 font-bold uppercase">Default</span>' : ''}
                </div>
              </div>
              <div class="flex gap-2">
                <button onclick="editAddress('${a.id}')" class="btn-press p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 transition relative overflow-hidden"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
                <button onclick="deleteAddress('${a.id}')" class="btn-press p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 transition relative overflow-hidden"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
              </div>
            </div>
            <div class="text-sm text-gray-300 space-y-0.5">
              <p class="font-bold text-white">${a.full_name}</p>
              <p>${a.address_line1}${a.address_line2 ? ', ' + a.address_line2 : ''}</p>
              <p>${a.city}, ${a.state} ${a.postal_code}</p>
              <p>${country ? country.flag + ' ' + country.name : a.country_code}</p>
              <p class="text-gray-400 mt-1">${a.phone}</p>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

window.showAddressForm = (existing) => {
  const container = document.getElementById('address-form-container');
  const a = existing || {};
  container.innerHTML = `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-4 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">${existing ? 'Edit Address' : 'New Shipping Address'}</h3>
      <form id="address-form" class="space-y-4">
        <input type="hidden" id="addr-id" value="${a.id || ''}">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Label</label><input type="text" id="addr-label" value="${a.label || 'Home'}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Full Name</label><input type="text" id="addr-name" value="${a.full_name || ''}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        </div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Address Line 1</label><input type="text" id="addr-line1" value="${a.address_line1 || ''}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Address Line 2 (Optional)</label><input type="text" id="addr-line2" value="${a.address_line2 || ''}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">City</label><input type="text" id="addr-city" value="${a.city || ''}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">State</label><input type="text" id="addr-state" value="${a.state || ''}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Postal Code</label><input type="text" id="addr-postal" value="${a.postal_code || ''}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Country</label><select id="addr-country" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">${COUNTRIES.map(c => `<option value="${c.code}" ${a.country_code === c.code ? 'selected' : ''}>${c.flag} ${c.name}</option>`).join('')}</select></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Phone</label><input type="text" id="addr-phone" value="${a.phone || ''}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        </div>
        <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="addr-default" ${a.is_default ? 'checked' : ''} class="w-4 h-4 rounded border-gray-700 bg-[#0a1124] text-blue-500 focus:ring-blue-500"><span class="text-xs text-gray-400">Set as default address</span></label>
        <div class="flex gap-3">
          <button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden"><i data-lucide="save" class="w-4 h-4"></i> ${existing ? 'Update' : 'Save'} Address</button>
          <button type="button" onclick="cancelAddressForm()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">Cancel</button>
        </div>
      </form>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  document.getElementById('address-form').addEventListener('submit', saveAddress);
};

window.cancelAddressForm = () => { document.getElementById('address-form-container').innerHTML = ''; };

window.editAddress = (id) => {
  const a = state.addresses.find(x => x.id === id);
  showAddressForm(a);
  document.getElementById('address-form-container').scrollIntoView({ behavior: 'smooth' });
};

async function saveAddress(e) {
  e.preventDefault();
  const id = document.getElementById('addr-id').value;
  const data = {
    user_id: state.user.id,
    label: document.getElementById('addr-label').value,
    full_name: document.getElementById('addr-name').value,
    address_line1: document.getElementById('addr-line1').value,
    address_line2: document.getElementById('addr-line2').value || null,
    city: document.getElementById('addr-city').value,
    state: document.getElementById('addr-state').value,
    postal_code: document.getElementById('addr-postal').value,
    country_code: document.getElementById('addr-country').value,
    phone: document.getElementById('addr-phone').value,
    is_default: document.getElementById('addr-default').checked,
  };
  if (data.is_default) {
    await supabase.from('shipping_addresses').update({ is_default: false }).eq('user_id', state.user.id);
  }
  if (id) {
    await supabase.from('shipping_addresses').update(data).eq('id', id);
  } else {
    await supabase.from('shipping_addresses').insert(data);
  }
  await loadAddresses();
  renderSection('addresses');
  showToast('Address saved successfully.');
}

window.deleteAddress = async (id) => {
  await supabase.from('shipping_addresses').delete().eq('id', id);
  await loadAddresses();
  renderSection('addresses');
  showToast('Address deleted.');
};

/* ════════════════════════════════════════════════════════════
   SECTION: Download Receipts
════════════════════════════════════════════════════════════ */
function renderReceipts() {
  const withReceipts = state.orders.filter(o => o.receipt_file_path);
  return `
    ${pageTitle('Download Receipts', 'Download your payment receipts and invoices.')}
    ${withReceipts.length === 0 ? renderEmptyState('No Receipts', 'Receipts from your payments will appear here once available.', 'file-text', null) : `
      <div class="space-y-3">
        ${withReceipts.map(o => `
          <div class="glass border border-blue-500/20 rounded-2xl p-4 slide-up flex items-center gap-4">
            <div class="p-3 bg-emerald-500/10 rounded-xl shrink-0"><i data-lucide="file-text" class="w-6 h-6 text-emerald-400"></i></div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-bold text-white truncate">${o.listing_title}</h3>
              <p class="text-xs text-gray-500 font-mono">${o.order_number}</p>
              <p class="text-xs text-amber-400 font-bold mt-0.5">${o.amount} ${o.currency}</p>
            </div>
            <button onclick="downloadReceipt('${o.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-xs font-bold text-emerald-400 transition relative overflow-hidden"><i data-lucide="download" class="w-4 h-4"></i> Download</button>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

window.downloadReceipt = async (orderNumber) => {
  const order = state.orders.find(o => o.order_number === orderNumber);
  if (!order?.receipt_file_path) { showToast('Receipt not available.'); return; }
  const { data, error } = await supabase.storage.from('payment-receipts').createSignedUrl(order.receipt_file_path, 300);
  if (error || !data?.signedUrl) { showToast('Could not generate download link.'); return; }
  window.open(data.signedUrl, '_blank');
};

/* ════════════════════════════════════════════════════════════
   SECTION: Email Preferences
════════════════════════════════════════════════════════════ */
function renderEmailPrefs() {
  const p = state.emailPrefs || { order_updates: true, payment_updates: true, shipping_updates: true, promotional_emails: false, security_alerts: true, newsletter: false };
  const prefs = [
    { key: 'order_updates', label: 'Order Updates', desc: 'Notifications about your order status changes', icon: 'shopping-bag' },
    { key: 'payment_updates', label: 'Payment Updates', desc: 'Payment receipt and verification notifications', icon: 'credit-card' },
    { key: 'shipping_updates', label: 'Shipping Updates', desc: 'Shipping and delivery notifications', icon: 'truck' },
    { key: 'security_alerts', label: 'Security Alerts', desc: 'Important account security notifications', icon: 'shield-alert' },
    { key: 'promotional_emails', label: 'Promotional Emails', desc: 'Special offers and promotions', icon: 'tag' },
    { key: 'newsletter', label: 'Newsletter', desc: 'Monthly newsletter with marketplace updates', icon: 'newspaper' },
  ];
  return `
    ${pageTitle('Email Preferences', 'Choose which email notifications you want to receive.')}
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <div class="space-y-3">
        ${prefs.map(pref => `
          <div class="flex items-center justify-between p-4 bg-blue-950/30 border border-blue-500/10 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="${pref.icon}" class="w-4 h-4 text-blue-400"></i></div>
              <div><p class="text-sm font-bold text-white">${pref.label}</p><p class="text-xs text-gray-500">${pref.desc}</p></div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="toggle sr-only" data-pref="${pref.key}" ${p[pref.key] ? 'checked' : ''}>
              <div class="toggle-bg w-11 h-6 bg-gray-700 rounded-full relative"><div class="toggle-dot absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div></div>
            </label>
          </div>
        `).join('')}
      </div>
      <button onclick="saveEmailPrefs()" class="btn-press mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
        <i data-lucide="save" class="w-4 h-4"></i> Save Preferences
      </button>
    </div>
  `;
}

window.saveEmailPrefs = async () => {
  const prefs = { user_id: state.user.id };
  document.querySelectorAll('[data-pref]').forEach(el => { prefs[el.dataset.pref] = el.checked; });
  if (state.emailPrefs) {
    await supabase.from('email_preferences').update(prefs).eq('user_id', state.user.id);
  } else {
    await supabase.from('email_preferences').insert(prefs);
  }
  await loadEmailPrefs();
  showToast('Email preferences saved.');
};

/* ════════════════════════════════════════════════════════════
   SECTION: Customer Support
════════════════════════════════════════════════════════════ */
function renderSupport() {
  return `
    ${pageTitle('Customer Support', 'Get help with your orders and account.')}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div class="lg:col-span-2 glass border border-blue-500/20 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="message-square" class="w-4 h-4 text-blue-400"></i> Send a Support Request</h3>
        <form id="support-form" class="space-y-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Subject</label><input type="text" id="support-subject" required placeholder="How can we help?" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Order Number (Optional)</label><input type="text" id="support-order" placeholder="KCO-XXXXXX" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Message</label><textarea id="support-message" rows="4" required placeholder="Describe your issue..." class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"></textarea></div>
          <button type="submit" id="support-submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden"><i data-lucide="send" class="w-4 h-4"></i> Submit Request</button>
        </form>
      </div>
      <div class="space-y-4">
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-3"><i data-lucide="mail" class="w-4 h-4 text-blue-400"></i> Email Us</h3>
          <a href="mailto:support@kcoglobalonlinemarket.com" class="text-sm text-blue-400 hover:text-blue-300 transition">support@kcoglobalonlinemarket.com</a>
        </div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-3"><i data-lucide="clock" class="w-4 h-4 text-amber-400"></i> Support Hours</h3>
          <p class="text-sm text-gray-400">Monday — Friday</p>
          <p class="text-sm text-gray-400">9:00 AM — 6:00 PM (UTC)</p>
          <p class="text-xs text-gray-500 mt-2">Response within 24 hours</p>
        </div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-3"><i data-lucide="message-circle" class="w-4 h-4 text-emerald-400"></i> Recent Messages</h3>
          <p class="text-xs text-gray-500">${state.messages.length} message${state.messages.length === 1 ? '' : 's'}</p>
          <button onclick="navigateTo('messages')" class="text-xs text-blue-400 hover:text-blue-300 font-bold transition mt-1">View Messages →</button>
        </div>
      </div>
    </div>
  `;
}

/* ════════════════════════════════════════════════════════════
   SECTION: Help Center
════════════════════════════════════════════════════════════ */
function renderHelp() {
  const faqs = [
    { q: 'How do I track my order?', a: 'Go to Order Tracking in your dashboard. You\'ll see a real-time progress tracker showing each stage from Order Placed to Delivered.' },
    { q: 'How do I pay for my order?', a: 'After clicking Buy Now, you\'ll be taken to checkout where you can complete a manual bank transfer. Upload your payment receipt for verification.' },
    { q: 'How long does payment verification take?', a: 'Verification typically takes between a few minutes and 24 hours. You\'ll receive an email notification once approved.' },
    { q: 'Can I change my shipping address?', a: 'Yes. Go to Shipping Addresses in your dashboard to add, edit, or set a default address.' },
    { q: 'How do I download my receipt?', a: 'Go to Download Receipts in your dashboard. Click the Download button next to any order with a receipt on file.' },
    { q: 'How do I update my email preferences?', a: 'Go to Email Preferences in your dashboard to toggle which notification emails you receive.' },
    { q: 'Is my account secure?', a: 'Yes. Your account is protected with SSL encryption and secure authentication. We never share your personal information.' },
    { q: 'How do I contact support?', a: 'Use the Customer Support section in your dashboard to send a message, or email us at support@kcoglobalonlinemarket.com.' },
  ];
  return `
    ${pageTitle('Help Center', 'Frequently asked questions and guides.')}
    <div class="space-y-3">
      ${faqs.map((f, i) => `
        <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden slide-up">
          <button onclick="toggleFaq(${i})" class="w-full flex items-center justify-between p-4 text-left hover:bg-blue-500/5 transition">
            <span class="text-sm font-bold text-white">${f.q}</span>
            <i data-lucide="chevron-down" id="faq-icon-${i}" class="w-5 h-5 text-gray-500 shrink-0 transition-transform"></i>
          </button>
          <div id="faq-${i}" class="hidden px-4 pb-4 text-sm text-gray-400 leading-relaxed">${f.a}</div>
        </div>
      `).join('')}
    </div>
  `;
}

window.toggleFaq = (i) => {
  const body = document.getElementById(`faq-${i}`);
  const icon = document.getElementById(`faq-icon-${i}`);
  body.classList.toggle('hidden');
  icon.style.transform = body.classList.contains('hidden') ? '' : 'rotate(180deg)';
};

/* ════════════════════════════════════════════════════════════
   SECTION: Privacy & Security
════════════════════════════════════════════════════════════ */
function renderPrivacy() {
  return `
    ${pageTitle('Privacy & Security', 'Your account security and privacy settings.')}
    <div class="space-y-5">
      <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Security Status</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
            <div class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i><span class="text-sm text-white">SSL Encryption</span></div>
            <span class="text-xs text-emerald-400 font-bold uppercase">Active</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
            <div class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i><span class="text-sm text-white">Secure Authentication</span></div>
            <span class="text-xs text-emerald-400 font-bold uppercase">Active</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
            <div class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i><span class="text-sm text-white">Row Level Security</span></div>
            <span class="text-xs text-emerald-400 font-bold uppercase">Active</span>
          </div>
        </div>
      </div>

      <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="lock" class="w-4 h-4 text-blue-400"></i> Account Security</h3>
        <div class="space-y-3">
          <button onclick="navigateTo('change-password')" class="btn-press w-full flex items-center justify-between p-3 bg-blue-950/30 border border-blue-500/10 hover:border-blue-500/30 rounded-xl transition relative overflow-hidden">
            <div class="flex items-center gap-2"><i data-lucide="key-round" class="w-4 h-4 text-blue-400"></i><span class="text-sm text-white">Change Password</span></div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-gray-500"></i>
          </button>
          <button onclick="navigateTo('email-prefs')" class="btn-press w-full flex items-center justify-between p-3 bg-blue-950/30 border border-blue-500/10 hover:border-blue-500/30 rounded-xl transition relative overflow-hidden">
            <div class="flex items-center gap-2"><i data-lucide="settings" class="w-4 h-4 text-blue-400"></i><span class="text-sm text-white">Email Preferences</span></div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-gray-500"></i>
          </button>
        </div>
      </div>

      <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="eye-off" class="w-4 h-4 text-blue-400"></i> Privacy Policy</h3>
        <p class="text-sm text-gray-400 leading-relaxed mb-3">We take your privacy seriously. Your personal information is encrypted and never shared with third parties.</p>
        <ul class="space-y-2 text-sm text-gray-400">
          <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i> Your data is protected with SSL encryption</li>
          <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i> We never share your information with third parties</li>
          <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i> You control your email notification preferences</li>
          <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i> Your order history is permanently and securely saved</li>
          <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i> Only you can access your account data</li>
        </ul>
      </div>

      <div class="glass border border-red-500/20 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4"><i data-lucide="alert-triangle" class="w-4 h-4 text-red-400"></i> Danger Zone</h3>
        <p class="text-sm text-gray-400 mb-3">Sign out of your account on this device.</p>
        <button onclick="doSignOut()" class="btn-press inline-flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
          <i data-lucide="log-out" class="w-4 h-4"></i> Logout
        </button>
      </div>
    </div>
  `;
}

/* ── Empty state ───────────────────────────────────────────── */
function renderEmptyState(title, desc, icon, btnLabel, btnOnclick) {
  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-10 text-center slide-up">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4"><i data-lucide="${icon}" class="w-8 h-8 text-blue-400"></i></div>
      <h3 class="text-lg font-bold text-white mb-2">${title}</h3>
      <p class="text-sm text-gray-500 mb-6 max-w-sm mx-auto">${desc}</p>
      ${btnLabel ? (btnOnclick ? `<button onclick="${btnOnclick}" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 relative overflow-hidden"><i data-lucide="plus" class="w-4 h-4"></i> ${btnLabel}</button>` : `<a href="/" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 relative overflow-hidden"><i data-lucide="shopping-bag" class="w-4 h-4"></i> ${btnLabel}</a>`) : ''}
    </div>
  `;
}

/* ── Section handlers ───────────────────────────────────────── */
function attachSectionHandlers(section) {
  if (section === 'edit-profile') {
    document.getElementById('avatar-file')?.addEventListener('change', handleAvatarUpload);
    document.getElementById('edit-profile-form')?.addEventListener('submit', saveProfile);
  }
  if (section === 'change-password') {
    document.getElementById('change-password-form')?.addEventListener('submit', changePassword);
  }
  if (section === 'messages') {
    document.getElementById('msg-form')?.addEventListener('submit', sendMessage);
    const thread = document.getElementById('msg-thread');
    if (thread) thread.scrollTop = thread.scrollHeight;
  }
  if (section === 'support') {
    document.getElementById('support-form')?.addEventListener('submit', sendSupportRequest);
  }
}

/* ── Avatar upload ──────────────────────────────────────────── */
let avatarFile = null;
async function handleAvatarUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showToast('Image must be 5 MB or less.'); return; }
  avatarFile = file;
  const preview = document.getElementById('edit-avatar-preview');
  preview.innerHTML = `<img src="${URL.createObjectURL(file)}" class="w-full h-full object-cover">`;
}

/* ── Save profile ──────────────────────────────────────────── */
async function saveProfile(e) {
  e.preventDefault();
  const btn = document.getElementById('ep-save-btn');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Saving...';
  if (window.lucide) lucide.createIcons();

  let avatarUrl = state.profile?.avatar_url;
  if (avatarFile) {
    const ext = avatarFile.name.split('.').pop();
    const path = `${state.user.id}/avatar-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('avatars').upload(path, avatarFile, { upsert: true });
    if (!upErr) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(path);
      avatarUrl = data.publicUrl;
    }
    avatarFile = null;
  }

  const data = {
    user_id: state.user.id,
    first_name: document.getElementById('ep-first-name').value,
    last_name: document.getElementById('ep-last-name').value,
    display_name: document.getElementById('ep-display-name').value,
    phone_code: document.getElementById('ep-phone-code').value,
    phone_number: document.getElementById('ep-phone-number').value,
    country_code: document.getElementById('ep-country').value,
    bio: document.getElementById('ep-bio').value,
    avatar_url: avatarUrl,
  };

  if (state.profile) {
    await supabase.from('profiles').update(data).eq('user_id', state.user.id);
  } else {
    await supabase.from('profiles').insert(data);
  }

  await loadProfile();
  renderSidebarProfile();
  navigateTo('profile');
  showToast('Profile updated successfully.');
}

/* ── Change password ───────────────────────────────────────── */
async function changePassword(e) {
  e.preventDefault();
  const errBox = document.getElementById('cp-error');
  errBox.classList.add('hidden');
  const current = document.getElementById('cp-current').value;
  const newPw = document.getElementById('cp-new').value;
  const confirm = document.getElementById('cp-confirm').value;

  if (newPw !== confirm) { errBox.textContent = 'New passwords do not match.'; errBox.classList.remove('hidden'); return; }
  if (newPw.length < 6) { errBox.textContent = 'Password must be at least 6 characters.'; errBox.classList.remove('hidden'); return; }

  const btn = document.getElementById('cp-submit');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Updating...';
  if (window.lucide) lucide.createIcons();

  const { error } = await supabase.auth.updateUser({ password: newPw });
  btn.disabled = false;
  btn.innerHTML = '<i data-lucide="key-round" class="w-4 h-4"></i> Update Password';
  if (window.lucide) lucide.createIcons();

  if (error) { errBox.textContent = error.message; errBox.classList.remove('hidden'); return; }
  document.getElementById('change-password-form').reset();
  showToast('Password updated successfully.');
}

/* ── Send message ───────────────────────────────────────────── */
async function sendMessage(e) {
  e.preventDefault();
  const subject = document.getElementById('msg-subject').value.trim();
  const body = document.getElementById('msg-body').value.trim();
  if (!body) return;
  const btn = document.getElementById('msg-send-btn');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Sending...';
  if (window.lucide) lucide.createIcons();

  await supabase.from('support_messages').insert({
    user_id: state.user.id,
    subject: subject || 'Message',
    message: body,
    from_admin: false,
    read: false,
  });

  await loadMessages();
  renderSection('messages');
  showToast('Message sent to support.');
}

/* ── Send support request ──────────────────────────────────── */
async function sendSupportRequest(e) {
  e.preventDefault();
  const subject = document.getElementById('support-subject').value.trim();
  const orderNumber = document.getElementById('support-order').value.trim();
  const message = document.getElementById('support-message').value.trim();
  if (!subject || !message) return;
  const btn = document.getElementById('support-submit');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Sending...';
  if (window.lucide) lucide.createIcons();

  await supabase.from('support_messages').insert({
    user_id: state.user.id,
    order_number: orderNumber || null,
    subject,
    message,
    from_admin: false,
    read: false,
  });

  await loadMessages();
  document.getElementById('support-form').reset();
  btn.disabled = false;
  btn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Submit Request';
  if (window.lucide) lucide.createIcons();
  showToast('Support request submitted. We\'ll respond within 24 hours.');
}

/* ── Global handlers ────────────────────────────────────────── */
function attachGlobalHandlers() {
  document.getElementById('btn-signout-desktop')?.addEventListener('click', doSignOut);
  document.getElementById('btn-signout-mobile')?.addEventListener('click', doSignOut);
  document.getElementById('btn-mobile-menu')?.addEventListener('click', openMobileDrawer);
  document.getElementById('btn-mobile-close')?.addEventListener('click', closeMobileDrawer);
  document.getElementById('mobile-backdrop')?.addEventListener('click', closeMobileDrawer);
}

async function doSignOut() {
  await signOut();
  window.location.href = '/';
}

function openMobileDrawer() { document.getElementById('mobile-drawer').classList.remove('hidden'); }
function closeMobileDrawer() { document.getElementById('mobile-drawer').classList.add('hidden'); }

window.navigateTo = navigateTo;
window.copyToClipboard = copyToClipboard;
window.contactSupport = (orderNumber) => {
  const subject = encodeURIComponent(`Order ${orderNumber} — Support Request`);
  const body = encodeURIComponent(`Hello K.C.O Global Online Marketplace Support,\n\nI need assistance with my order ${orderNumber}.\n\nThank you.`);
  window.location.href = `mailto:support@kcoglobalonlinemarket.com?subject=${subject}&body=${body}`;
};

init();

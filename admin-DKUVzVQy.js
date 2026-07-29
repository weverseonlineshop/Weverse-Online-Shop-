import{s as n}from"./supabase-client-BJmMa02L.js";import"./native-bridge-DwBvLOUN.js";import{s as X}from"./preload-helper-CqA7KWtz.js";const Z=[{id:"dashboard",label:"Dashboard",icon:"layout-dashboard",group:"main"},{id:"products",label:"Products",icon:"package",group:"main"},{id:"orders",label:"Orders",icon:"shopping-bag",group:"main"},{id:"special-orders",label:"Special Orders",icon:"package-plus",group:"main"},{id:"customers",label:"Customers",icon:"users",group:"main"},{id:"payments",label:"Payments",icon:"credit-card",group:"main"},{id:"shipping",label:"Shipping",icon:"truck",group:"main"},{id:"promotions",label:"Promotions",icon:"megaphone",group:"main"},{id:"content",label:"Content",icon:"file-text",group:"main"},{id:"email",label:"Email",icon:"mail",group:"main"},{id:"analytics",label:"Analytics",icon:"bar-chart-3",group:"main"},{id:"ai",label:"AI Assistant",icon:"sparkles",group:"main"},{id:"security",label:"Security",icon:"shield",group:"system"},{id:"settings",label:"Website Settings",icon:"settings",group:"system"},{id:"ai-settings",label:"AI Settings",icon:"bot",group:"system"},{id:"integrations",label:"Integrations",icon:"plug",group:"system"},{id:"publish",label:"Publish & Deploy",icon:"rocket",group:"system"}],ee={dashboard:"Dashboard",products:"Product Management",orders:"Order Management",customers:"Customer Management",payments:"Payment Management",shipping:"Shipping Management",promotions:"Promotions",content:"Content Management",email:"Email Management",analytics:"Analytics",ai:"AI Admin Assistant",security:"Security & Logs",settings:"Website Settings",integrations:"Integrations","special-orders":"Special Order Requests","ai-settings":"AI Settings",publish:"Publish & Deploy"};let m={user:null,isAdmin:!1,currentSection:"dashboard",data:{},loading:!0};function c(s){const e=document.getElementById("toast");document.getElementById("toast-msg").textContent=s,e.classList.remove("translate-y-20","opacity-0"),clearTimeout(e._t),e._t=setTimeout(()=>e.classList.add("translate-y-20","opacity-0"),3e3),window.lucide&&lucide.createIcons()}function o(s){if(s==null)return"";const e=document.createElement("div");return e.textContent=String(s),e.innerHTML}function v(s,e="USD"){return`${(parseFloat(s)||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} ${e}`}function M(s){return s?new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"—"}function $(s){return s?new Date(s).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}function y(s){return`<span class="inline-flex items-center gap-1 ${{order_placed:"bg-amber-500/10 text-amber-400 border-amber-500/20",payment_approved:"bg-blue-500/10 text-blue-400 border-blue-500/20",processing:"bg-indigo-500/10 text-indigo-400 border-indigo-500/20",shipped:"bg-violet-500/10 text-violet-400 border-violet-500/20",in_transit:"bg-violet-500/10 text-violet-400 border-violet-500/20",delivered:"bg-emerald-500/10 text-emerald-400 border-emerald-500/20",cancelled:"bg-red-500/10 text-red-400 border-red-500/20",pending:"bg-amber-500/10 text-amber-400 border-amber-500/20",active:"bg-emerald-500/10 text-emerald-400 border-emerald-500/20",inactive:"bg-gray-500/10 text-gray-400 border-gray-500/20"}[s]||"bg-gray-500/10 text-gray-400 border-gray-500/20"} border text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">${o(s?.replace(/_/g," "))}</span>`}function x(s){s.addEventListener("click",function(e){const t=this.getBoundingClientRect(),a=document.createElement("span");a.className="ripple";const r=Math.max(t.width,t.height);a.style.width=a.style.height=r+"px",a.style.left=e.clientX-t.left-r/2+"px",a.style.top=e.clientY-t.top-r/2+"px",this.appendChild(a),setTimeout(()=>a.remove(),600)})}function _(s){s&&s.target!==s.currentTarget||(document.getElementById("modal-container").innerHTML="")}window.closeModal=_;async function te(){const[s,e,t,a,r,i,l]=await Promise.all([n.from("showroom_listings").select("id,category,is_active,stock_quantity,price,currency,listing_type"),n.from("payment_receipts").select("id,status,amount,currency,payment_method,created_at"),n.from("profiles").select("user_id,created_at",{count:"exact"}),n.from("promotions").select("id,is_active,promo_type"),n.from("payment_gateways").select("id,is_active"),n.from("product_reviews").select("id",{count:"exact"}),n.from("site_settings").select("*").limit(1).maybeSingle()]),d=s.data||[],p=e.data||[],b=new Set(d.map(u=>u.category).filter(Boolean)),f=d.filter(u=>u.stock_quantity!=null&&u.stock_quantity>0&&u.stock_quantity<10),I=d.filter(u=>u.stock_quantity===0),j=p.filter(u=>["payment_approved","delivered"].includes(u.status)).reduce((u,S)=>u+(parseFloat(S.amount)||0),0),E=new Date,k=p.filter(u=>u.created_at&&new Date(u.created_at).getMonth()===E.getMonth()&&new Date(u.created_at).getFullYear()===E.getFullYear()).filter(u=>["payment_approved","delivered"].includes(u.status)).reduce((u,S)=>u+(parseFloat(S.amount)||0),0),Q=p.filter(u=>u.created_at&&new Date(u.created_at).toDateString()===E.toDateString()).filter(u=>["payment_approved","delivered"].includes(u.status)).reduce((u,S)=>u+(parseFloat(S.amount)||0),0),K=p.filter(u=>u.payment_method==="manual_bank_transfer"&&u.status==="order_placed");return{totalProducts:d.length,activeProducts:d.filter(u=>u.is_active).length,totalCategories:b.size,totalOrders:p.length,pendingOrders:p.filter(u=>u.status==="order_placed").length,completedOrders:p.filter(u=>u.status==="delivered").length,cancelledOrders:p.filter(u=>u.status==="cancelled").length,totalRevenue:j,monthlyRevenue:k,dailyRevenue:Q,pendingManualPayments:K.length,activeCoupons:(a.data||[]).filter(u=>u.is_active&&u.promo_type==="coupon").length,totalReviews:i.count||0,totalCustomers:t.count||0,activeGateways:(r.data||[]).filter(u=>u.is_active).length,activePromotions:(a.data||[]).filter(u=>u.is_active).length,lowStock:f.length,outOfStock:I.length,lowStockItems:f,settings:l.data}}function N(){const s=document.getElementById("sidebar-nav"),e={main:[],system:[]};Z.forEach(t=>e[t.group].push(t)),s.innerHTML=`
    ${e.main.map(t=>`
      <button onclick="navigate('${t.id}')" class="nav-item ${m.currentSection===t.id?"active":""} w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold text-gray-400 rounded-xl">
        <i data-lucide="${t.icon}" class="w-4 h-4 shrink-0"></i> ${t.label}
      </button>
    `).join("")}
    <div class="pt-3 mt-3 border-t border-blue-500/10">
      <p class="text-[9px] font-bold text-gray-600 uppercase tracking-wider px-3 mb-1">System</p>
      ${e.system.map(t=>`
        <button onclick="navigate('${t.id}')" class="nav-item ${m.currentSection===t.id?"active":""} w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold text-gray-400 rounded-xl">
          <i data-lucide="${t.icon}" class="w-4 h-4 shrink-0"></i> ${t.label}
        </button>
      `).join("")}
    </div>
  `,window.lucide&&lucide.createIcons()}function se(){const s=document.getElementById("admin-user-info");m.user&&(s.innerHTML=`
      <div class="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
        <i data-lucide="user" class="w-4 h-4 text-blue-400"></i>
      </div>
      <div class="min-w-0">
        <p class="text-xs font-bold text-white truncate">${o(m.user.email)}</p>
        <p class="text-[10px] text-emerald-400 font-bold uppercase">Admin</p>
      </div>
    `),window.lucide&&lucide.createIcons()}async function F(){const s=document.getElementById("content");s.innerHTML='<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading dashboard...</div></div>',window.lucide&&lucide.createIcons();try{const e=await te();m.data.stats=e,s.innerHTML=`
      <div class="fade-in space-y-6">
        <!-- Stat cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          ${g("Total Customers",e.totalCustomers,"users","blue")}
          ${g("Total Products",e.totalProducts,"package","amber")}
          ${g("Categories",e.totalCategories,"layers","violet")}
          ${g("Total Orders",e.totalOrders,"shopping-bag","emerald")}
          ${g("Pending Orders",e.pendingOrders,"clock","amber")}
          ${g("Completed",e.completedOrders,"check-circle","emerald")}
          ${g("Cancelled",e.cancelledOrders,"x-circle","red")}
          ${g("Total Revenue",v(e.totalRevenue),"dollar-sign","emerald")}
          ${g("Monthly Revenue",v(e.monthlyRevenue),"trending-up","blue")}
          ${g("Daily Revenue",v(e.dailyRevenue),"calendar","amber")}
          ${g("Pending Manual",e.pendingManualPayments,"alert-triangle","orange")}
          ${g("Active Coupons",e.activeCoupons,"ticket","violet")}
          ${g("Total Reviews",e.totalReviews,"star","amber")}
          ${g("Low Stock",e.lowStock,"alert-circle","orange")}
          ${g("Out of Stock",e.outOfStock,"package-x","red")}
          ${g("Active Gateways",e.activeGateways,"credit-card","blue")}
          ${g("Active Promos",e.activePromotions,"megaphone","violet")}
          ${g("Active Products",e.activeProducts,"check","emerald")}
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
        ${e.lowStock>0?`
          <div class="glass border border-orange-500/20 rounded-2xl p-5 slide-up">
            <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-3 flex items-center gap-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-orange-400"></i> Low Stock Alert (${e.lowStock})</h3>
            <div class="space-y-2">
              ${e.lowStockItems.slice(0,5).map(r=>`
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-300">${o(r.title||"Untitled")} <span class="text-gray-600">(${r.property_id||"—"})</span></span>
                  <span class="text-orange-400 font-bold">Stock: ${r.stock_quantity}</span>
                </div>
              `).join("")}
            </div>
            <button onclick="navigate('products')" class="btn-press mt-3 text-xs font-bold text-blue-400 hover:text-blue-300 transition">View all products →</button>
          </div>
        `:""}

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
    `,window.lucide&&lucide.createIcons();const{data:t}=await n.from("admin_activity_logs").select("action,entity_type,entity_id,created_at,user_id").order("created_at",{ascending:!1}).limit(10),a=document.getElementById("recent-activity");t&&t.length>0?a.innerHTML=t.map(r=>`<div class="flex items-center gap-2 text-xs text-gray-400 py-1.5 border-b border-blue-500/5 last:border-0"><span class="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span><span class="font-bold text-gray-300">${o(r.action)}</span> ${r.entity_type?`<span class="text-gray-600">on ${o(r.entity_type)}</span>`:""} <span class="text-gray-600 ml-auto">${$(r.created_at)}</span></div>`).join(""):a.innerHTML='<p class="text-xs text-gray-600 text-center py-4">No recent activity.</p>';try{const{data:r}=await n.from("showroom_listings").select("category").eq("is_active",!0),i=["Real Estate","Apartments","Villas","Mansions","Beach Houses","Luxury Condominiums","Farm Houses","Commercial Buildings","Hotels","Cars","Motorhomes","Trucks","Electronics","Phones","Computers","Fashion","Home & Garden","Sports","Beauty","Toys","Books","Automotive","Groceries","Health","Jewelry","Art","Music","Other"],l=new Set((r||[]).map(f=>f.category)),d=i.filter(f=>!l.has(f)),p=document.getElementById("empty-categories-alert"),b=document.getElementById("empty-categories-list");p&&b&&d.length>0&&(b.innerHTML=d.map(f=>`<div class="text-xs text-gray-300 py-1">• ${o(f)}</div>`).join(""),p.classList.remove("hidden"))}catch{}ae(e),re(e)}catch(e){s.innerHTML=`<div class="glass border border-red-500/20 rounded-2xl p-6 text-center"><p class="text-sm text-red-400">Failed to load dashboard: ${o(e.message)}</p></div>`}}function g(s,e,t,a){const r={blue:"bg-blue-500/10 text-blue-400",amber:"bg-amber-500/10 text-amber-400",violet:"bg-violet-500/10 text-violet-400",emerald:"bg-emerald-500/10 text-emerald-400",red:"bg-red-500/10 text-red-400",orange:"bg-orange-500/10 text-orange-400",gray:"bg-gray-500/10 text-gray-400",dollar:"bg-emerald-500/10 text-emerald-400",star:"bg-amber-500/10 text-amber-400",ticket:"bg-violet-500/10 text-violet-400",megaphone:"bg-violet-500/10 text-violet-400",credit:"bg-blue-500/10 text-blue-400"};return`<div class="stat-card glass border border-blue-500/15 rounded-2xl p-4 slide-up"><div class="flex items-center justify-between mb-2"><div class="p-2 ${r[a]||r.blue} rounded-lg"><i data-lucide="${t}" class="w-4 h-4"></i></div></div><p class="text-xl font-black text-white">${typeof e=="string"&&e.length>12,e}</p><p class="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">${s}</p></div>`}function ae(s){const e=document.getElementById("chart-revenue");if(!e)return;const t=["Total","Monthly","Daily"],a=[s.totalRevenue,s.monthlyRevenue,s.dailyRevenue];new Chart(e,{type:"bar",data:{labels:t,datasets:[{label:"Revenue",data:a,backgroundColor:["rgba(59,130,246,.6)","rgba(168,85,247,.6)","rgba(245,158,11,.6)"],borderColor:["rgb(59,130,246)","rgb(168,85,247)","rgb(245,158,11)"],borderWidth:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{ticks:{color:"#64748b"},grid:{color:"rgba(59,130,246,.05)"}},x:{ticks:{color:"#64748b"},grid:{display:!1}}}}})}function re(s){const e=document.getElementById("chart-orders");e&&new Chart(e,{type:"doughnut",data:{labels:["Pending","Completed","Cancelled"],datasets:[{data:[s.pendingOrders,s.completedOrders,s.cancelledOrders],backgroundColor:["rgba(245,158,11,.6)","rgba(16,185,129,.6)","rgba(239,68,68,.6)"],borderColor:["rgb(245,158,11)","rgb(16,185,129)","rgb(239,68,68)"],borderWidth:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:"#94a3b8",font:{size:11}}}}}})}async function A(){const s=document.getElementById("content");s.innerHTML='<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading products...</div></div>',window.lucide&&lucide.createIcons();const{data:e}=await n.from("showroom_listings").select("*").order("created_at",{ascending:!1}).limit(100);s.innerHTML=`
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
            <tbody id="products-tbody">${(e||[]).map(t=>oe(t)).join("")}</tbody>
          </table>
        </div>
      </div>
    </div>
  `,window.lucide&&lucide.createIcons(),m.data.products=e||[],document.querySelectorAll(".btn-press").forEach(x)}function oe(s){return`<tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition" data-search="${o((s.title||"").toLowerCase())}" data-type="${s.listing_type||""}">
    <td class="px-4 py-3 text-xs font-mono text-blue-400">${s.property_id||"—"}</td>
    <td class="px-4 py-3 text-xs text-white font-bold max-w-[200px] truncate">${o(s.title||"Untitled")}</td>
    <td class="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">${o(s.listing_type||"—")}</td>
    <td class="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">${o(s.category||"—")}</td>
    <td class="px-4 py-3 text-xs text-amber-400 font-bold">${v(s.price,s.currency)}</td>
    <td class="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">${s.stock_quantity!=null?s.stock_quantity:"—"}</td>
    <td class="px-4 py-3">${s.is_active?y("active"):y("inactive")}</td>
    <td class="px-4 py-3 text-right">
      <div class="flex items-center justify-end gap-1">
        <button onclick="toggleProductActive('${s.property_id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 transition" title="${s.is_active?"Hide":"Publish"}"><i data-lucide="${s.is_active?"eye-off":"eye"}" class="w-4 h-4"></i></button>
        <button onclick="duplicateProduct('${s.property_id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 transition" title="Duplicate"><i data-lucide="copy" class="w-4 h-4"></i></button>
        <button onclick="showProductModal('${s.property_id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition" title="Edit"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
        <button onclick="confirmDeleteProduct('${s.property_id}')" class="btn-press p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition" title="Delete"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>
    </td>
  </tr>`}window.filterProducts=()=>{const s=document.getElementById("product-search").value.toLowerCase(),e=document.getElementById("product-filter-type").value;document.querySelectorAll("#products-tbody tr").forEach(t=>{const a=!s||t.dataset.search.includes(s),r=!e||t.dataset.type===e;t.style.display=a&&r?"":"none"})};window.showProductModal=async s=>{const e=document.getElementById("modal-container");let t=null;if(s){const{data:r}=await n.from("showroom_listings").select("*").eq("property_id",s).maybeSingle();t=r}const a=t||{};e.innerHTML=`<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
    <div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin" onclick="event.stopPropagation()">
      <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="${s?"edit-3":"plus"}" class="w-5 h-5 text-blue-400"></i> ${s?"Edit Product":"Add Product"}</h3>
      <form id="product-form" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Title *</label><input type="text" id="pf-title" required value="${o(a.title||"")}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Category</label><input type="text" id="pf-category" value="${o(a.category||"")}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        </div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Description</label><textarea id="pf-description" rows="3" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none">${o(a.description||"")}</textarea></div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Price *</label><input type="number" id="pf-price" step="0.01" required value="${a.price||0}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Currency</label><select id="pf-currency" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"><option value="USD" ${a.currency==="USD"?"selected":""}>USD</option><option value="NGN" ${a.currency==="NGN"?"selected":""}>NGN</option><option value="GBP" ${a.currency==="GBP"?"selected":""}>GBP</option><option value="EUR" ${a.currency==="EUR"?"selected":""}>EUR</option></select></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Stock</label><input type="number" id="pf-stock" value="${a.stock_quantity??""}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Type</label><select id="pf-type" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"><option value="product" ${a.listing_type==="product"?"selected":""}>Product</option><option value="property" ${a.listing_type==="property"?"selected":""}>Property</option><option value="vehicle" ${a.listing_type==="vehicle"?"selected":""}>Vehicle</option></select></div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">SKU</label><input type="text" id="pf-sku" value="${o(a.sku||"")}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Subcategory</label><input type="text" id="pf-subcategory" value="${o(a.subcategory||"")}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        </div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Features (comma-separated)</label><input type="text" id="pf-features" value="${o((a.features||[]).join(", "))}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Tags (comma-separated)</label><input type="text" id="pf-tags" value="${o((a.tags||[]).join(", "))}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">SEO Keywords (comma-separated)</label><input type="text" id="pf-seo" value="${o((a.seo_keywords||[]).join(", "))}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div class="flex items-center gap-2"><input type="checkbox" id="pf-active" ${a.is_active!==!1?"checked":""} class="w-4 h-4 rounded border-blue-500/20 bg-[#0a1124]"><label for="pf-active" class="text-xs font-bold text-gray-400">Active (visible to customers)</label></div>
        <div class="flex gap-3 pt-2">
          <button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">${s?"Save Changes":"Add Product"}</button>
          <button type="button" onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition">Cancel</button>
        </div>
      </form>
    </div>
  </div>`,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x),document.getElementById("product-form").addEventListener("submit",r=>saveProduct(r,s))};window.saveProduct=async(s,e)=>{s.preventDefault();const t=document.getElementById("pf-features").value.split(",").map(l=>l.trim()).filter(Boolean),a=document.getElementById("pf-tags").value.split(",").map(l=>l.trim()).filter(Boolean),r=document.getElementById("pf-seo").value.split(",").map(l=>l.trim()).filter(Boolean),i={title:document.getElementById("pf-title").value.trim(),category:document.getElementById("pf-category").value.trim()||"Electronics",description:document.getElementById("pf-description").value.trim(),price:parseFloat(document.getElementById("pf-price").value)||0,currency:document.getElementById("pf-currency").value,stock_quantity:document.getElementById("pf-stock").value?parseInt(document.getElementById("pf-stock").value):null,listing_type:document.getElementById("pf-type").value,sku:document.getElementById("pf-sku").value.trim()||null,subcategory:document.getElementById("pf-subcategory").value.trim()||null,features:t,tags:a,seo_keywords:r,is_active:document.getElementById("pf-active").checked};try{if(e){const{error:l}=await n.from("showroom_listings").update(i).eq("property_id",e);if(l)throw l;c("Product updated successfully.")}else{const l="KCO-"+Date.now().toString().slice(-6)+Math.random().toString(36).slice(2,4).toUpperCase(),{error:d}=await n.from("showroom_listings").insert({...i,property_id:l,country:"",country_code:"",listing_status:"sale",images:[]});if(d)throw d;c("Product added successfully.")}_(),A(),await h(e?"update_product":"add_product","product",e||"new")}catch(l){c("Error: "+l.message)}};window.toggleProductActive=async s=>{const e=m.data.products?.find(t=>t.property_id===s);if(e)try{const{error:t}=await n.from("showroom_listings").update({is_active:!e.is_active}).eq("property_id",s);if(t)throw t;c(`Product ${e.is_active?"hidden":"published"}.`),A(),await h("toggle_product","product",s)}catch(t){c("Error: "+t.message)}};window.duplicateProduct=async s=>{const e=m.data.products?.find(t=>t.property_id===s);if(e)try{const t="KCO-"+Date.now().toString().slice(-6)+Math.random().toString(36).slice(2,4).toUpperCase(),{id:a,created_at:r,property_id:i,...l}=e,{error:d}=await n.from("showroom_listings").insert({...l,property_id:t,title:e.title+" (Copy)",is_active:!1});if(d)throw d;c("Product duplicated successfully."),A(),await h("duplicate_product","product",s)}catch(t){c("Error: "+t.message)}};window.confirmDeleteProduct=s=>{const e=document.getElementById("modal-container");e.innerHTML=`<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
    <div class="modal-content glass border border-red-500/20 rounded-2xl p-6 max-w-sm w-full" onclick="event.stopPropagation()">
      <div class="text-center mb-4"><div class="inline-flex items-center justify-center w-14 h-14 bg-red-500/10 rounded-2xl mb-3"><i data-lucide="alert-triangle" class="w-7 h-7 text-red-400"></i></div><h3 class="text-lg font-bold text-white mb-1">Delete Product?</h3><p class="text-sm text-gray-400">Are you sure you want to delete product <span class="font-mono text-blue-400">${s}</span>? This cannot be undone.</p></div>
      <div class="flex gap-3"><button onclick="deleteProduct('${s}')" class="btn-press flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition">Delete</button><button onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition">Cancel</button></div>
    </div>
  </div>`,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x)};window.deleteProduct=async s=>{try{const{error:e}=await n.from("showroom_listings").delete().eq("property_id",s);if(e)throw e;_(),c("Product deleted successfully."),A(),await h("delete_product","product",s)}catch(e){c("Error: "+e.message)}};async function T(){const s=document.getElementById("content");s.innerHTML='<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading orders...</div></div>',window.lucide&&lucide.createIcons();const{data:e}=await n.from("payment_receipts").select("*").order("created_at",{ascending:!1}).limit(100);s.innerHTML=`
    <div class="fade-in space-y-4">
      <div class="flex gap-2 flex-wrap">
        <button onclick="filterOrders('')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl border transition ${m.data.orderFilter===""?"bg-blue-500/15 text-blue-400 border-blue-500/30":"bg-blue-950/50 text-gray-400 border-blue-500/15"}">All</button>
        <button onclick="filterOrders('order_placed')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl border transition ${m.data.orderFilter==="order_placed"?"bg-blue-500/15 text-blue-400 border-blue-500/30":"bg-blue-950/50 text-gray-400 border-blue-500/15"}">Pending</button>
        <button onclick="filterOrders('payment_approved')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl border transition ${m.data.orderFilter==="payment_approved"?"bg-blue-500/15 text-blue-400 border-blue-500/30":"bg-blue-950/50 text-gray-400 border-blue-500/15"}">Approved</button>
        <button onclick="filterOrders('delivered')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl border transition ${m.data.orderFilter==="delivered"?"bg-blue-500/15 text-blue-400 border-blue-500/30":"bg-blue-950/50 text-gray-400 border-blue-500/15"}">Delivered</button>
        <button onclick="filterOrders('cancelled')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl border transition ${m.data.orderFilter==="cancelled"?"bg-blue-500/15 text-blue-400 border-blue-500/30":"bg-blue-950/50 text-gray-400 border-blue-500/15"}">Cancelled</button>
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
            <tbody>${(e||[]).map(t=>`
              <tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition">
                <td class="px-4 py-3 text-xs font-mono text-blue-400">${t.order_number||"—"}</td>
                <td class="px-4 py-3 text-xs text-gray-300 hidden sm:table-cell">${o(t.full_name||t.customer_name||"—")}</td>
                <td class="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">${o(t.payment_method||"—")}</td>
                <td class="px-4 py-3 text-xs text-amber-400 font-bold">${v(t.amount,t.currency)}</td>
                <td class="px-4 py-3">${y(t.status)}</td>
                <td class="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell">${M(t.created_at)}</td>
                <td class="px-4 py-3 text-right"><button onclick="showOrderModal('${t.order_number}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition"><i data-lucide="eye" class="w-4 h-4"></i></button></td>
              </tr>
            `).join("")}</tbody>
          </table>
        </div>
      </div>
    </div>`,window.lucide&&lucide.createIcons(),m.data.orders=e||[],document.querySelectorAll(".btn-press").forEach(x)}window.filterOrders=s=>{m.data.orderFilter=s,T()};window.showOrderModal=async s=>{const e=document.getElementById("modal-container"),t=m.data.orders?.find(l=>l.order_number===s);if(!t)return;let a=null;if(t.receipt_file_path)try{const{data:l}=await n.storage.from("payment-receipts").createSignedUrl(t.receipt_file_path,3600);l?.signedUrl&&(a=l.signedUrl)}catch{}const r=t.receipt_file_name?/\.(jpg|jpeg|png|webp)$/i.test(t.receipt_file_name):!1,i=a?`<div class="bg-blue-950/30 border border-blue-500/15 rounded-xl p-4">
        <p class="text-[10px] font-bold uppercase text-gray-500 mb-2">Payment Receipt</p>
        ${r?`<img src="${a}" alt="Receipt" class="w-full rounded-lg border border-blue-500/10 max-h-64 object-contain mb-3">`:`<div class="flex items-center gap-3 mb-3 p-3 bg-blue-950/50 rounded-lg"><i data-lucide="file-text" class="w-8 h-8 text-blue-400"></i><span class="text-xs text-gray-300">${o(t.receipt_file_name||"receipt.pdf")}</span></div>`}
        <div class="flex gap-2">
          <a href="${a}" target="_blank" download="${o(t.receipt_file_name||"receipt")}" class="btn-press flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 font-bold py-2 rounded-lg text-xs uppercase transition flex items-center justify-center gap-1.5"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download</a>
          <a href="${a}" target="_blank" class="btn-press flex-1 bg-blue-950/60 hover:bg-blue-900/40 text-gray-300 border border-blue-500/20 font-bold py-2 rounded-lg text-xs uppercase transition flex items-center justify-center gap-1.5"><i data-lucide="external-link" class="w-3.5 h-3.5"></i> Open</a>
        </div>
      </div>`:'<div class="bg-blue-950/20 border border-blue-500/10 rounded-xl p-4 text-center"><p class="text-xs text-gray-500">No receipt file uploaded</p></div>';e.innerHTML=`<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
    <div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-thin" onclick="event.stopPropagation()">
      <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="shopping-bag" class="w-5 h-5 text-blue-400"></i> Order ${t.order_number}</h3>
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div><p class="text-[10px] text-gray-500 uppercase">Customer</p><p class="text-white font-bold">${o(t.full_name||t.customer_name||"—")}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">Email</p><p class="text-gray-300">${o(t.email||"—")}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">Amount</p><p class="text-amber-400 font-bold">${v(t.amount,t.currency)}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">Method</p><p class="text-gray-300">${o(t.payment_method||"—")}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">Tx Reference</p><p class="text-gray-300 text-xs font-mono">${o(t.transaction_reference||"—")}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">Status</p>${y(t.status)}</div>
          <div><p class="text-[10px] text-gray-500 uppercase">Date</p><p class="text-gray-300">${$(t.created_at)}</p></div>
          <div><p class="text-[10px] text-gray-500 uppercase">File</p><p class="text-gray-400 text-xs truncate">${o(t.receipt_file_name||"—")}</p></div>
        </div>
        ${t.additional_notes?`<div class="bg-blue-950/30 border border-blue-500/10 rounded-xl p-3"><p class="text-[10px] text-gray-500 uppercase mb-1">Customer Notes</p><p class="text-xs text-gray-300">${o(t.additional_notes)}</p></div>`:""}
        ${i}
        ${t.admin_notes?`<div class="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3"><p class="text-[10px] text-amber-500 uppercase mb-1">Admin Notes</p><p class="text-xs text-gray-300">${o(t.admin_notes)}</p></div>`:""}
        <div class="pt-3 border-t border-blue-500/10">
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Admin Notes (for rejection explanation)</label>
          <textarea id="admin-notes-input" rows="2" placeholder="Add notes for the customer..." class="w-full bg-blue-950/40 border border-blue-500/20 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition">${o(t.admin_notes||"")}</textarea>
        </div>
        <div class="pt-3 border-t border-blue-500/10">
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Update Status</label>
          <div class="flex gap-2 flex-wrap">
            <button onclick="updateOrderStatus('${t.order_number}','pending_verification')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 transition">Pending</button>
            <button onclick="updateOrderStatus('${t.order_number}','payment_approved')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 transition">Approve</button>
            <button onclick="updateOrderStatus('${t.order_number}','rejected')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 transition">Reject</button>
            <button onclick="updateOrderStatus('${t.order_number}','delivered')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 transition">Delivered</button>
            <button onclick="updateOrderStatus('${t.order_number}','cancelled')" class="btn-press text-xs font-bold px-3 py-2 rounded-xl bg-gray-500/10 text-gray-400 border border-gray-500/20 transition">Cancel</button>
          </div>
        </div>
        <div class="flex gap-3 pt-2">
          <button onclick="printInvoice('${t.order_number}')" class="btn-press flex-1 bg-blue-950/60 border border-blue-500/20 text-blue-400 font-bold py-2.5 rounded-xl text-xs uppercase transition flex items-center justify-center gap-2"><i data-lucide="printer" class="w-4 h-4"></i> Print Invoice</button>
          <button onclick="closeModal()" class="btn-press px-5 py-2.5 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-xs uppercase transition">Close</button>
        </div>
      </div>
    </div>
  </div>`,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x)};window.updateOrderStatus=async(s,e)=>{try{const t=document.getElementById("admin-notes-input"),a=t?t.value.trim():null,r={status:e,admin_reviewed_at:new Date().toISOString()};a&&(r.admin_notes=a);const{error:i}=await n.from("payment_receipts").update(r).eq("order_number",s);if(i)throw i;c(`Order status updated to ${e.replace(/_/g," ")}.`),_(),await h("update_order_status","order",s,{status:e,admin_notes:a});try{m.data.orders?.find(d=>d.order_number===s)?.email&&await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/send-order-notification",{method:"POST",headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y2diY3lqd3BzYW5ycWR4aGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzE2MDMsImV4cCI6MjEwMDUwNzYwM30.evpJi44si4yjRIu49ILNWctcJUAfoi-V6ti5BJLluwM","Content-Type":"application/json"},body:JSON.stringify({order_number:s})})}catch{}T()}catch(t){c("Error: "+t.message)}};window.printInvoice=s=>{const e=m.data.orders?.find(a=>a.order_number===s);if(!e)return;const t=window.open("","_blank");t.document.write(`<html><head><title>Invoice ${s}</title><style>body{font-family:Arial;padding:40px;color:#1e293b}h1{color:#2563eb}.row{margin:8px 0}.label{color:#64748b;font-size:12px;text-transform:uppercase}</style></head><body><h1>K.C.O Global Online Marketplace</h1><h2>Invoice</h2><div class="row"><span class="label">Order Number:</span> ${s}</div><div class="row"><span class="label">Customer:</span> ${o(e.full_name||"")}</div><div class="row"><span class="label">Amount:</span> ${v(e.amount,e.currency)}</div><div class="row"><span class="label">Payment Method:</span> ${o(e.payment_method||"")}</div><div class="row"><span class="label">Status:</span> ${e.status}</div><div class="row"><span class="label">Date:</span> ${$(e.created_at)}</div></body></html>`),t.document.close(),t.print()};async function q(){const s=document.getElementById("content");s.innerHTML='<div class="fade-in"><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-black text-white tracking-tight">Special Order Requests</h2><p class="text-sm text-gray-500 mt-1">Review and process customer product sourcing requests</p></div><button onclick="renderSpecialOrders()" class="btn-press px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-bold transition flex items-center gap-2"><i data-lucide="refresh-cw" class="w-4 h-4"></i> Refresh</button></div><div id="special-orders-list" class="space-y-3"><div class="flex items-center justify-center py-20 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin mr-2"></i> Loading requests...</div></div></div>',window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x);try{const{data:e,error:t}=await n.from("product_requests").select("*").order("created_at",{ascending:!1});if(t)throw t;const a=document.getElementById("special-orders-list");if(!e||e.length===0){a.innerHTML='<div class="flex flex-col items-center justify-center py-20 text-gray-500"><i data-lucide="package-search" class="w-12 h-12 mb-3 opacity-50"></i><p class="text-sm">No special order requests yet.</p></div>',window.lucide&&lucide.createIcons();return}const r={pending_review:"bg-yellow-500/10 text-yellow-400 border-yellow-500/30",under_review:"bg-blue-500/10 text-blue-400 border-blue-500/30",approved:"bg-emerald-500/10 text-emerald-400 border-emerald-500/30",rejected:"bg-red-500/10 text-red-400 border-red-500/30",quoted:"bg-cyan-500/10 text-cyan-400 border-cyan-500/30",fulfilled:"bg-green-500/10 text-green-400 border-green-500/30",cancelled:"bg-gray-500/10 text-gray-400 border-gray-500/30"};a.innerHTML=e.map(i=>{const l=r[i.status]||r.pending_review,d=i.status.replace(/_/g," "),p=i.target_price?`${i.currency} ${Number(i.target_price).toLocaleString()}`:"—",b=i.quoted_price?`${i.quoted_currency} ${Number(i.quoted_price).toLocaleString()}`:null;return`<div class="glass border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition">
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1.5">
              <h4 class="text-sm font-bold text-white truncate">${o(i.request_title)}</h4>
              <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${l}">${o(d)}</span>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
              <span><i data-lucide="tag" class="w-3 h-3 inline mr-1"></i>${o(i.category||"Uncategorized")}</span>
              <span><i data-lucide="award" class="w-3 h-3 inline mr-1"></i>${o(i.brand||"Any")}</span>
              <span><i data-lucide="circle-dollar-sign" class="w-3 h-3 inline mr-1"></i>${p}</span>
              <span><i data-lucide="hash" class="w-3 h-3 inline mr-1"></i>Qty: ${i.quantity}</span>
              <span><i data-lucide="calendar" class="w-3 h-3 inline mr-1"></i>${M(i.created_at)}</span>
            </div>
            ${i.request_description?`<p class="text-xs text-gray-500 mt-2 line-clamp-2">${o(i.request_description)}</p>`:""}
            ${b?`<p class="text-xs text-cyan-400 font-bold mt-2">Quoted: ${b} (${o(i.payment_status)})</p>`:""}
            <div class="text-xs text-gray-500 mt-2"><i data-lucide="map-pin" class="w-3 h-3 inline mr-1"></i>${o(i.delivery_full_name||"")}, ${o(i.delivery_address||"")}, ${o(i.delivery_city||"")}, ${o(i.delivery_country||"")}${i.delivery_phone?" &middot; "+o(i.delivery_phone):""}</div>
          </div>
          <div class="flex flex-wrap gap-2 shrink-0">
            <button onclick="viewSpecialOrder('${i.id}')" class="btn-press px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5"><i data-lucide="eye" class="w-3.5 h-3.5"></i> View</button>
            <button onclick="updateSpecialOrderStatus('${i.id}','under_review')" class="btn-press px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-bold transition">Review</button>
            <button onclick="updateSpecialOrderStatus('${i.id}','approved')" class="btn-press px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold transition">Approve</button>
            <button onclick="updateSpecialOrderStatus('${i.id}','rejected')" class="btn-press px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-bold transition">Reject</button>
          </div>
        </div>
      </div>`}).join(""),window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x)}catch(e){document.getElementById("special-orders-list").innerHTML=`<div class="text-red-400 text-sm p-4">Error loading requests: ${o(e.message)}</div>`}}window.viewSpecialOrder=async s=>{try{const{data:e,error:t}=await n.from("product_requests").select("*").eq("id",s).maybeSingle();if(t)throw t;if(!e){c("Request not found.");return}const{data:a}=await n.from("product_request_status_updates").select("*").eq("request_id",s).order("created_at",{ascending:!0}),r={pending_review:"bg-yellow-500/10 text-yellow-400 border-yellow-500/30",under_review:"bg-blue-500/10 text-blue-400 border-blue-500/30",approved:"bg-emerald-500/10 text-emerald-400 border-emerald-500/30",rejected:"bg-red-500/10 text-red-400 border-red-500/30",quoted:"bg-cyan-500/10 text-cyan-400 border-cyan-500/30",fulfilled:"bg-green-500/10 text-green-400 border-green-500/30",cancelled:"bg-gray-500/10 text-gray-400 border-gray-500/30"},i=r[e.status]||r.pending_review,l=(a||[]).map(b=>`<div class="flex gap-3 py-2 border-b border-gray-800 last:border-0"><div class="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div><div class="flex-1"><p class="text-xs font-bold text-white">${o(b.status.replace(/_/g," "))}</p>${b.message?`<p class="text-xs text-gray-400 mt-0.5">${o(b.message)}</p>`:""}<p class="text-[10px] text-gray-600 mt-0.5">${$(b.created_at)}</p></div></div>`).join("");let d=document.getElementById("special-order-modal");d||(d=document.createElement("div"),d.id="special-order-modal",d.className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md overflow-y-auto",document.body.appendChild(d)),d.innerHTML=`<div class="max-w-2xl mx-auto px-4 py-6 sm:py-10"><div class="glass bg-[#0f172a] border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
      <div class="flex items-center justify-between p-5 border-b border-gray-800"><h3 class="text-lg font-bold text-white">Special Order Details</h3><button onclick="document.getElementById('special-order-modal').style.display='none';document.body.style.overflow=''" class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"><i data-lucide="x" class="w-5 h-5"></i></button></div>
      <div class="p-5 space-y-4">
        <div class="flex items-center gap-2"><span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${i}">${o(e.status.replace(/_/g," "))}</span>${e.payment_status!=="unpaid"?`<span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border bg-cyan-500/10 text-cyan-400 border-cyan-500/30">${o(e.payment_status)}</span>`:""}</div>
        <div class="bg-gray-900/50 rounded-xl p-4 space-y-2 border border-gray-800">
          <div><span class="text-xs text-gray-500 uppercase font-bold">Product</span><p class="text-sm text-white font-semibold mt-0.5">${o(e.request_title)}</p></div>
          ${e.request_description?`<div class="pt-2"><span class="text-xs text-gray-500 uppercase font-bold">Description</span><p class="text-sm text-gray-300 mt-0.5">${o(e.request_description)}</p></div>`:""}
          <div class="grid grid-cols-2 gap-3 pt-2">
            <div><span class="text-xs text-gray-500 uppercase font-bold">Category</span><p class="text-sm text-gray-300 mt-0.5">${o(e.category||"—")}</p></div>
            <div><span class="text-xs text-gray-500 uppercase font-bold">Brand</span><p class="text-sm text-gray-300 mt-0.5">${o(e.brand||"—")}</p></div>
            <div><span class="text-xs text-gray-500 uppercase font-bold">Target Price</span><p class="text-sm text-orange-400 font-bold mt-0.5">${e.currency} ${e.target_price?Number(e.target_price).toLocaleString():"—"}</p></div>
            <div><span class="text-xs text-gray-500 uppercase font-bold">Quantity</span><p class="text-sm text-gray-300 mt-0.5">${e.quantity}</p></div>
          </div>
          ${e.quoted_price?`<div class="pt-2"><span class="text-xs text-gray-500 uppercase font-bold">Quoted Price</span><p class="text-sm text-cyan-400 font-bold mt-0.5">${e.quoted_currency} ${Number(e.quoted_price).toLocaleString()}</p></div>`:""}
        </div>
        <div class="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
          <p class="text-xs text-gray-500 uppercase font-bold mb-2">Delivery Information</p>
          <p class="text-sm text-white font-semibold">${o(e.delivery_full_name||"—")}</p>
          <p class="text-sm text-gray-400">${o(e.delivery_address||"—")}</p>
          <p class="text-sm text-gray-400">${o(e.delivery_city||"—")}, ${o(e.delivery_state||"—")}</p>
          <p class="text-sm text-gray-400">${o(e.delivery_postal_code||"—")} ${o(e.delivery_country||"—")}</p>
          <p class="text-sm text-gray-400 mt-1"><i data-lucide="phone" class="w-3.5 h-3.5 inline mr-1"></i>${o(e.delivery_phone||"—")}</p>
        </div>
        <div class="bg-gray-900/50 rounded-xl p-4 border border-gray-800"><p class="text-xs text-gray-500 uppercase font-bold mb-2">Status History</p>${l||'<p class="text-xs text-gray-600">No updates yet.</p>'}</div>
        <div class="space-y-2">
          <label class="block text-xs font-bold text-gray-400 uppercase tracking-wide">Update Status</label>
          <select id="so-status-select" class="w-full bg-gray-900/80 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-orange-500 focus:outline-none transition">
            <option value="pending_review">Pending Review</option><option value="under_review">Under Review</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="quoted">Quoted</option><option value="fulfilled">Fulfilled</option><option value="cancelled">Cancelled</option>
          </select>
          <input id="so-quote-price" type="number" min="0" step="0.01" placeholder="Quoted price (optional)" class="w-full bg-gray-900/80 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition">
          <textarea id="so-admin-message" rows="2" placeholder="Message to customer (optional)" class="w-full bg-gray-900/80 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-orange-500 focus:outline-none transition"></textarea>
          <button onclick="saveSpecialOrderUpdate('${e.id}')" class="btn-press w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-orange-500/30">Update Request</button>
        </div>
      </div>
    </div></div>`,d.style.display="block",document.body.style.overflow="hidden";const p=document.getElementById("so-status-select");p&&(p.value=e.status),window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x)}catch(e){c("Error loading request: "+e.message)}};window.updateSpecialOrderStatus=async(s,e)=>{try{const{error:t}=await n.from("product_requests").update({status:e}).eq("id",s);if(t)throw t;await n.from("product_request_status_updates").insert({request_id:s,status:e,message:`Status updated to: ${e.replace(/_/g," ")}`}),c("Request status updated to: "+e.replace(/_/g," ")),q()}catch(t){c("Error updating request: "+t.message)}};window.saveSpecialOrderUpdate=async s=>{const e=document.getElementById("so-status-select").value,t=parseFloat(document.getElementById("so-quote-price").value)||null,a=document.getElementById("so-admin-message").value.trim()||null;try{const r={status:e};t!==null&&(r.quoted_price=t,r.payment_status="pending");const{error:i}=await n.from("product_requests").update(r).eq("id",s);if(i)throw i;await n.from("product_request_status_updates").insert({request_id:s,status:e,message:a||`Status updated to: ${e.replace(/_/g," ")}`}),c("Request updated successfully."),document.getElementById("special-order-modal").style.display="none",document.body.style.overflow="",q()}catch(r){c("Error updating request: "+r.message)}};async function U(){const s=document.getElementById("content");s.innerHTML='<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading customers...</div></div>',window.lucide&&lucide.createIcons();const{data:e}=await n.from("profiles").select("*").order("created_at",{ascending:!1}).limit(100);s.innerHTML=`
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
            <tbody>${(e||[]).map(t=>`
              <tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition" data-search="${o((t.display_name||"").toLowerCase())}">
                <td class="px-4 py-3 text-xs text-white font-bold">${o(t.display_name||"Unknown")}</td>
                <td class="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">${o(t.country_code||"—")}</td>
                <td class="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">${o(t.phone_number||"—")}</td>
                <td class="px-4 py-3">${t.is_admin?y("active"):y("inactive")}</td>
                <td class="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell">${M(t.created_at)}</td>
                <td class="px-4 py-3 text-right"><button onclick="toggleAdmin('${t.user_id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg ${t.is_admin?"text-amber-400":"text-gray-400"} transition" title="Toggle Admin"><i data-lucide="shield" class="w-4 h-4"></i></button></td>
              </tr>
            `).join("")}</tbody>
          </table>
        </div>
      </div>
    </div>`,window.lucide&&lucide.createIcons(),m.data.profiles=e||[],document.querySelectorAll(".btn-press").forEach(x)}window.filterCustomers=()=>{const s=document.getElementById("customer-search").value.toLowerCase();document.querySelectorAll("#content tbody tr").forEach(e=>{e.style.display=!s||e.dataset.search.includes(s)?"":"none"})};window.toggleAdmin=async s=>{const e=m.data.profiles?.find(t=>t.user_id===s);if(e)try{const{error:t}=await n.from("profiles").update({is_admin:!e.is_admin}).eq("user_id",s);if(t)throw t;c(`Admin status ${e.is_admin?"removed":"granted"}.`),await h("toggle_admin","customer",s),U()}catch(t){c("Error: "+t.message)}};async function O(){const s=document.getElementById("content");s.innerHTML='<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading payments...</div></div>',window.lucide&&lucide.createIcons();const[e,t]=await Promise.all([n.from("payment_gateways").select("*").order("display_order",{ascending:!0}),n.from("payment_receipts").select("*").order("created_at",{ascending:!1}).limit(50)]);s.innerHTML=`
    <div class="fade-in space-y-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-1 glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="credit-card" class="w-4 h-4 text-blue-400"></i> Payment Gateways</h3>
          <div class="space-y-2">
            ${(e.data||[]).map(a=>`
              <div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between">
                <div><p class="text-sm font-bold text-white">${o(a.name)}</p><p class="text-[10px] text-gray-500 uppercase">${a.code}</p></div>
                <div class="flex items-center gap-2">
                  ${a.is_default?'<span class="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase">Default</span>':""}
                  <button onclick="toggleGateway('${a.id}',${!a.is_active})" class="btn-press relative w-10 h-5 rounded-full transition ${a.is_active?"bg-blue-500":"bg-gray-600"}">
                    <span class="absolute top-0.5 ${a.is_active?"left-5":"left-0.5"} w-4 h-4 bg-white rounded-full transition-all"></span>
                  </button>
                </div>
              </div>
            `).join("")}
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
              <tbody>${(t.data||[]).map(a=>`
                <tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition">
                  <td class="px-4 py-3 text-xs font-mono text-blue-400">${a.order_number||"—"}</td>
                  <td class="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">${o(a.payment_method||"—")}</td>
                  <td class="px-4 py-3 text-xs text-amber-400 font-bold">${v(a.amount,a.currency)}</td>
                  <td class="px-4 py-3">${y(a.status)}</td>
                  <td class="px-4 py-3 text-right">
                    <button onclick="updateOrderStatus('${a.order_number}','payment_approved')" class="btn-press p-2 hover:bg-emerald-500/10 rounded-lg text-emerald-400 transition" title="Verify"><i data-lucide="check-circle" class="w-4 h-4"></i></button>
                    <button onclick="updateOrderStatus('${a.order_number}','cancelled')" class="btn-press p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition" title="Reject"><i data-lucide="x-circle" class="w-4 h-4"></i></button>
                  </td>
                </tr>
              `).join("")}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`,window.lucide&&lucide.createIcons(),m.data.gateways=e.data||[],document.querySelectorAll(".btn-press").forEach(x)}window.toggleGateway=async(s,e)=>{try{const{error:t}=await n.from("payment_gateways").update({is_active:e}).eq("id",s);if(t)throw t;c(`Gateway ${e?"enabled":"disabled"}.`),await h("toggle_gateway","gateway",s,{active:e}),O()}catch(t){c("Error: "+t.message)}};window.showAddGatewayModal=()=>{const s=document.getElementById("modal-container");s.innerHTML=`<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
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
  </div>`,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x),document.getElementById("gateway-form").addEventListener("submit",async e=>{e.preventDefault();try{const{error:t}=await n.from("payment_gateways").insert({name:document.getElementById("gw-name").value.trim(),code:document.getElementById("gw-code").value.trim().toLowerCase(),api_key:document.getElementById("gw-api-key").value.trim()||null,secret_key:document.getElementById("gw-secret-key").value.trim()||null,webhook_url:document.getElementById("gw-webhook").value.trim()||null,is_active:document.getElementById("gw-active").checked,display_order:99});if(t)throw t;_(),c("Gateway added successfully."),await h("add_gateway","gateway",document.getElementById("gw-code").value),O()}catch(t){c("Error: "+t.message)}})};async function P(){const s=document.getElementById("content");s.innerHTML='<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading promotions...</div></div>',window.lucide&&lucide.createIcons();const{data:e}=await n.from("promotions").select("*").order("created_at",{ascending:!1});s.innerHTML=`
    <div class="fade-in space-y-4">
      <div class="flex justify-end"><button onclick="showPromoModal()" class="btn-press flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30"><i data-lucide="plus" class="w-4 h-4"></i> Create Promotion</button></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${(e||[]).map(t=>`
          <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
            <div class="flex items-center justify-between mb-3">
              <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="${t.promo_type==="coupon"?"ticket":t.promo_type==="flash_sale"?"zap":"megaphone"}" class="w-5 h-5 text-blue-400"></i></div>
              ${t.is_active?y("active"):y("inactive")}
            </div>
            <h3 class="text-sm font-bold text-white mb-1">${o(t.title)}</h3>
            <p class="text-xs text-gray-500 mb-2">${o(t.description||"—")}</p>
            <div class="flex items-center gap-2 text-[10px] text-gray-500">
              <span class="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full uppercase font-bold">${o(t.promo_type)}</span>
              ${t.discount_value?`<span class="text-amber-400">${t.discount_value}${t.discount_type==="percentage"?"%":""} off</span>`:""}
              ${t.coupon_code?`<span class="text-emerald-400 font-mono">${o(t.coupon_code)}</span>`:""}
            </div>
            <div class="flex gap-2 mt-3">
              <button onclick="togglePromo('${t.id}',${!t.is_active})" class="btn-press flex-1 text-xs font-bold py-2 rounded-xl ${t.is_active?"bg-red-500/10 text-red-400 border border-red-500/20":"bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"} transition">${t.is_active?"Deactivate":"Activate"}</button>
              <button onclick="deletePromo('${t.id}')" class="btn-press p-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>`,window.lucide&&lucide.createIcons(),m.data.promos=e||[],document.querySelectorAll(".btn-press").forEach(x)}window.showPromoModal=()=>{const s=document.getElementById("modal-container");s.innerHTML=`<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
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
  </div>`,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x),document.getElementById("promo-form").addEventListener("submit",async e=>{e.preventDefault();try{const{error:t}=await n.from("promotions").insert({title:document.getElementById("pr-title").value.trim(),promo_type:document.getElementById("pr-type").value,description:document.getElementById("pr-desc").value.trim()||null,discount_value:parseFloat(document.getElementById("pr-value").value)||null,discount_type:document.getElementById("pr-dtype").value,coupon_code:document.getElementById("pr-code").value.trim()||null,banner_text:document.getElementById("pr-banner").value.trim()||null,is_active:!0});if(t)throw t;_(),c("Promotion created successfully."),await h("create_promotion","promotion","new"),P()}catch(t){c("Error: "+t.message)}})};window.togglePromo=async(s,e)=>{try{const{error:t}=await n.from("promotions").update({is_active:e}).eq("id",s);if(t)throw t;c(`Promotion ${e?"activated":"deactivated"}.`),P()}catch(t){c("Error: "+t.message)}};window.deletePromo=async s=>{try{const{error:e}=await n.from("promotions").delete().eq("id",s);if(e)throw e;c("Promotion deleted."),P()}catch(e){c("Error: "+e.message)}};async function ie(){const s=[{name:"Homepage",path:"/index.html",icon:"home"},{name:"About Us",path:"/about.html",icon:"info"},{name:"Contact Us",path:"/contact.html",icon:"mail"},{name:"FAQ / Help Center",path:"/help.html",icon:"help-circle"},{name:"Privacy Policy",path:"/privacy.html",icon:"shield"},{name:"Terms & Conditions",path:"/terms.html",icon:"file-text"},{name:"Refund Policy",path:"/refund-policy.html",icon:"refresh-cw"},{name:"Shipping Policy",path:"/shipping-policy.html",icon:"truck"}];document.getElementById("content").innerHTML=`
    <div class="fade-in">
      <div class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-blue-400"></i> Content Pages</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          ${s.map(e=>`
            <a href="${e.path}" target="_blank" class="btn-press glass-soft border border-blue-500/15 hover:border-blue-500/40 rounded-xl p-4 transition group">
              <div class="p-2 bg-blue-500/10 rounded-lg w-fit mb-2 group-hover:bg-blue-500/20 transition"><i data-lucide="${e.icon}" class="w-5 h-5 text-blue-400"></i></div>
              <p class="text-sm font-bold text-white">${e.name}</p>
              <p class="text-[10px] text-gray-500 mt-1">${e.path}</p>
            </a>
          `).join("")}
        </div>
      </div>
    </div>`,window.lucide&&lucide.createIcons()}async function J(){const{data:s}=await n.from("email_templates").select("*").order("template_key",{ascending:!0});document.getElementById("content").innerHTML=`
    <div class="fade-in space-y-4">
      <div class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-blue-400"></i> Email Templates</h3>
        <div class="space-y-2">
          ${(s||[]).map(e=>`
            <div class="glass-soft border border-blue-500/10 rounded-xl p-4 flex items-center justify-between">
              <div class="min-w-0 flex-1"><p class="text-sm font-bold text-white">${o(e.template_key.replace(/_/g," "))}</p><p class="text-xs text-gray-500 truncate">${o(e.subject)}</p></div>
              <button onclick="editTemplate('${e.id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
            </div>
          `).join("")}
        </div>
      </div>
    </div>`,window.lucide&&lucide.createIcons(),m.data.templates=s||[]}window.editTemplate=s=>{const e=m.data.templates?.find(a=>a.id===s);if(!e)return;const t=document.getElementById("modal-container");t.innerHTML=`<div class="modal-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeModal(event)">
    <div class="modal-content glass border border-blue-500/20 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-thin" onclick="event.stopPropagation()">
      <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="edit-3" class="w-5 h-5 text-blue-400"></i> Edit Template</h3>
      <form id="template-form" class="space-y-4">
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Subject</label><input type="text" id="tp-subject" value="${o(e.subject)}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Body (supports {{variables}})</label><textarea id="tp-body" rows="8" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none">${o(e.body)}</textarea></div>
        <div class="flex gap-3 pt-2"><button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">Save</button><button type="button" onclick="closeModal()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase transition">Cancel</button></div>
      </form>
    </div>
  </div>`,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x),document.getElementById("template-form").addEventListener("submit",async a=>{a.preventDefault();try{const{error:r}=await n.from("email_templates").update({subject:document.getElementById("tp-subject").value.trim(),body:document.getElementById("tp-body").value.trim()}).eq("id",s);if(r)throw r;_(),c("Template updated."),J()}catch(r){c("Error: "+r.message)}})};async function le(){const s=document.getElementById("content");s.innerHTML='<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading analytics...</div></div>',window.lucide&&lucide.createIcons();const[e,t,a]=await Promise.all([n.from("showroom_listings").select("category,price,currency,listing_type"),n.from("payment_receipts").select("amount,currency,status,created_at"),n.from("profiles").select("country_code,created_at")]),r={};(e.data||[]).forEach(f=>{r[f.category]=(r[f.category]||0)+1});const i=new Date,l=[],d=[];for(let f=5;f>=0;f--){const I=new Date(i.getFullYear(),i.getMonth()-f,1),j=I.toLocaleString("en-US",{month:"short"});l.push(j);const E=(t.data||[]).filter(w=>w.status==="payment_approved"||w.status==="delivered").filter(w=>{const k=new Date(w.created_at);return k.getMonth()===I.getMonth()&&k.getFullYear()===I.getFullYear()}).reduce((w,k)=>w+(parseFloat(k.amount)||0),0);d.push(E)}s.innerHTML=`
    <div class="fade-in space-y-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up"><h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="trending-up" class="w-4 h-4 text-blue-400"></i> Revenue (6 months)</h3><canvas id="chart-rev-line" height="200"></canvas></div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up" style="animation-delay:.1s"><h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="layers" class="w-4 h-4 text-blue-400"></i> Products by Category</h3><canvas id="chart-cat" height="200"></canvas></div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up"><h3 class="text-sm font-bold text-white uppercase tracking-wide mb-3">Products</h3><p class="text-3xl font-black text-amber-400">${(e.data||[]).length}</p></div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up" style="animation-delay:.1s"><h3 class="text-sm font-bold text-white uppercase tracking-wide mb-3">Orders</h3><p class="text-3xl font-black text-blue-400">${(t.data||[]).length}</p></div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up" style="animation-delay:.2s"><h3 class="text-sm font-bold text-white uppercase tracking-wide mb-3">Customers</h3><p class="text-3xl font-black text-emerald-400">${(a.data||[]).length}</p></div>
      </div>
    </div>`,window.lucide&&lucide.createIcons();const p=document.getElementById("chart-rev-line");p&&new Chart(p,{type:"line",data:{labels:l,datasets:[{label:"Revenue",data:d,borderColor:"rgb(59,130,246)",backgroundColor:"rgba(59,130,246,.1)",fill:!0,tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{ticks:{color:"#64748b"},grid:{color:"rgba(59,130,246,.05)"}},x:{ticks:{color:"#64748b"},grid:{display:!1}}}}});const b=document.getElementById("chart-cat");b&&new Chart(b,{type:"doughnut",data:{labels:Object.keys(r),datasets:[{data:Object.values(r),backgroundColor:["rgba(59,130,246,.6)","rgba(168,85,247,.6)","rgba(245,158,11,.6)","rgba(16,185,129,.6)","rgba(239,68,68,.6)","rgba(99,102,241,.6)","rgba(236,72,153,.6)","rgba(20,184,166,.6)"]}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"right",labels:{color:"#94a3b8",font:{size:10}}}}}})}async function D(){const s=document.getElementById("content");s.innerHTML='<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading security logs...</div></div>',window.lucide&&lucide.createIcons();const[e,t,a]=await Promise.all([n.from("admin_activity_logs").select("*").order("created_at",{ascending:!1}).limit(50),n.from("admin_security_logs").select("*").order("created_at",{ascending:!1}).limit(50),n.from("admin_roles").select("*")]);let r=!1,i=!1;try{const{data:l}=await n.auth.getSession(),d=l?.session?.access_token,b=await(await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/admin-2fa",{method:"POST",headers:{Authorization:`Bearer ${d}`,"Content-Type":"application/json"},body:JSON.stringify({action:"status"})})).json();r=!!b.enabled,i=!!b.setup}catch{}s.innerHTML=`
    <div class="fade-in space-y-4">
      <!-- 2FA Management -->
      <div class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Two-Factor Authentication (2FA)</h3>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm font-bold ${r?"text-emerald-400":"text-gray-400"}">${r?"2FA is Active":"2FA is Not Enabled"}</span>
              ${r?'<span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">Protected</span>':'<span class="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase">Vulnerable</span>'}
            </div>
            <p class="text-xs text-gray-500 max-w-md">${r?"Your admin dashboard is protected with authenticator app verification. A 6-digit code is required on every login.":"Protect your admin dashboard with Google Authenticator or Microsoft Authenticator. A 6-digit code will be required on every login."}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            ${r?`
              <button onclick="regenerateBackupCodes()" class="btn-press flex items-center gap-1.5 px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold rounded-xl text-xs transition border border-amber-500/20">
                <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i> Regenerate Backup Codes
              </button>
              <button onclick="disable2FA()" class="btn-press flex items-center gap-1.5 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl text-xs transition border border-red-500/20">
                <i data-lucide="shield-off" class="w-3.5 h-3.5"></i> Disable 2FA
              </button>
            `:`
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
            ${(e.data||[]).map(l=>`<div class="flex items-center gap-2 text-xs py-2 border-b border-blue-500/5 last:border-0"><span class="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span><span class="font-bold text-gray-300">${o(l.action)}</span>${l.entity_type?`<span class="text-gray-600">${o(l.entity_type)}</span>`:""}<span class="text-gray-600 ml-auto">${$(l.created_at)}</span></div>`).join("")||'<p class="text-xs text-gray-600 text-center py-4">No activity logged yet.</p>'}
          </div>
        </div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="shield" class="w-4 h-4 text-emerald-400"></i> Security Logs</h3>
          <div class="space-y-1 max-h-96 overflow-y-auto scrollbar-thin">
            ${(t.data||[]).map(l=>`<div class="flex items-center gap-2 text-xs py-2 border-b border-blue-500/5 last:border-0"><span class="w-2 h-2 rounded-full ${l.event_type?.includes("failed")||l.event_type?.includes("locked")?"bg-red-400":"bg-emerald-400"} shrink-0"></span><span class="font-bold text-gray-300">${o(l.event_type)}</span><span class="text-gray-600 ml-auto">${$(l.created_at)}</span></div>`).join("")||'<p class="text-xs text-gray-600 text-center py-4">No security events yet.</p>'}
          </div>
        </div>
      </div>
      <div class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="users" class="w-4 h-4 text-violet-400"></i> Admin Roles</h3>
        <div class="space-y-2">
          ${(a.data||[]).map(l=>`<div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between"><div><p class="text-sm font-bold text-white">${o(l.role.replace(/_/g," "))}</p><p class="text-[10px] text-gray-500">${(l.permissions||[]).length} permissions</p></div><span class="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full uppercase">${o(l.role)}</span></div>`).join("")||'<p class="text-xs text-gray-600 text-center py-4">No roles assigned yet.</p>'}
        </div>
      </div>
    </div>`,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x)}async function ne(){const s=document.getElementById("content");s.innerHTML='<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading settings...</div></div>',window.lucide&&lucide.createIcons();const{data:e}=await n.from("site_settings").select("*").limit(1).maybeSingle();if(!e){s.innerHTML='<p class="text-sm text-red-400">Failed to load settings.</p>';return}s.innerHTML=`
    <div class="fade-in space-y-4">
      <div class="glass border border-blue-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="settings" class="w-4 h-4 text-blue-400"></i> General Settings</h3>
        <form id="settings-form" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Site Name</label><input type="text" id="st-site-name" value="${o(e.site_name)}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Marketplace Name</label><input type="text" id="st-mp-name" value="${o(e.marketplace_name)}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Default Currency</label><input type="text" id="st-currency" value="${o(e.default_currency)}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Support Email</label><input type="email" id="st-email" value="${o(e.support_email)}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Tax Rate (%)</label><input type="number" id="st-tax" step="0.01" value="${e.tax_rate}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Supported Currencies (comma-separated)</label><input type="text" id="st-currencies" value="${(e.supported_currencies||[]).join(", ")}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Supported Languages (comma-separated)</label><input type="text" id="st-languages" value="${(e.supported_languages||[]).join(", ")}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          </div>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2"><input type="checkbox" id="st-tax-enabled" ${e.tax_enabled?"checked":""} class="w-4 h-4 rounded border-blue-500/20 bg-[#0a1124]"><span class="text-xs font-bold text-gray-400">Enable Tax</span></label>
            <label class="flex items-center gap-2"><input type="checkbox" id="st-maintenance" ${e.maintenance_mode?"checked":""} class="w-4 h-4 rounded border-blue-500/20 bg-[#0a1124]"><span class="text-xs font-bold text-gray-400">Maintenance Mode</span></label>
          </div>
          <div class="pt-3 border-t border-blue-500/10">
            <h4 class="text-xs font-bold text-white uppercase mb-3">Integration Keys</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Cloudinary Cloud Name</label><input type="text" id="st-cloud-name" value="${o(e.cloudinary_cloud_name||"")}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
              <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Cloudinary API Key</label><input type="password" id="st-cloud-key" value="${o(e.cloudinary_api_key||"")}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
              <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Cloudinary API Secret</label><input type="password" id="st-cloud-secret" value="${o(e.cloudinary_api_secret||"")}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
              <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Resend API Key</label><input type="password" id="st-resend" value="${o(e.resend_api_key||"")}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            </div>
          </div>
          <button type="submit" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30">Save Settings</button>
        </form>
      </div>
      <div class="glass border border-orange-500/20 rounded-2xl p-5">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="globe" class="w-4 h-4 text-orange-400"></i> Global Smart Search Settings</h3>
        <div id="global-search-settings" class="space-y-4"><div class="flex items-center justify-center py-8 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin mr-2"></i> Loading...</div></div>
      </div>
    </div>`,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x),fe(),document.getElementById("settings-form").addEventListener("submit",async t=>{t.preventDefault();try{const{error:a}=await n.from("site_settings").update({site_name:document.getElementById("st-site-name").value.trim(),marketplace_name:document.getElementById("st-mp-name").value.trim(),default_currency:document.getElementById("st-currency").value.trim(),support_email:document.getElementById("st-email").value.trim(),tax_rate:parseFloat(document.getElementById("st-tax").value)||0,tax_enabled:document.getElementById("st-tax-enabled").checked,maintenance_mode:document.getElementById("st-maintenance").checked,supported_currencies:document.getElementById("st-currencies").value.split(",").map(r=>r.trim()).filter(Boolean),supported_languages:document.getElementById("st-languages").value.split(",").map(r=>r.trim()).filter(Boolean),cloudinary_cloud_name:document.getElementById("st-cloud-name").value.trim()||null,cloudinary_api_key:document.getElementById("st-cloud-key").value.trim()||null,cloudinary_api_secret:document.getElementById("st-cloud-secret").value.trim()||null,resend_api_key:document.getElementById("st-resend").value.trim()||null}).neq("id","00000000-0000-0000-0000-000000000000");if(a)throw a;c("Settings saved successfully."),await h("update_settings","settings","site")}catch(a){c("Error: "+a.message)}})}async function de(){const s=document.getElementById("content");s.innerHTML='<div class="flex items-center justify-center py-20"><div class="flex items-center gap-3 text-gray-500 text-sm"><i data-lucide="loader-2" class="w-5 h-5 animate-spin text-blue-400"></i> Loading integrations...</div></div>',window.lucide&&lucide.createIcons();const[e,t,a]=await Promise.all([n.from("payment_gateways").select("*").order("display_order",{ascending:!0}),n.from("site_settings").select("*").limit(1).maybeSingle(),n.from("ai_settings").select("*").limit(1).maybeSingle()]),r=t.data||{},i=a.data||{};s.innerHTML=`
    <div class="fade-in space-y-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="credit-card" class="w-4 h-4 text-blue-400"></i> Payment Providers</h3>
          <div class="space-y-2">${(e.data||[]).map(l=>`<div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between"><div><p class="text-sm font-bold text-white">${o(l.name)}</p><p class="text-[10px] text-gray-500">${l.api_key?"Configured":"Not configured"}</p></div>${l.is_active?y("active"):y("inactive")}</div>`).join("")}</div>
          <a href="/admin.html" onclick="navigate('payments')" class="btn-press mt-3 block text-center text-xs font-bold text-blue-400 hover:text-blue-300 transition">Manage Payment Gateways →</a>
        </div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="sparkles" class="w-4 h-4 text-violet-400"></i> AI Providers</h3>
          <div class="space-y-2">
            <div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between"><div><p class="text-sm font-bold text-white">OpenAI</p><p class="text-[10px] text-gray-500">${i.openai_api_key?"Configured":"Not configured"} · ${i.openai_model||"gpt-4o"}</p></div>${i.active_provider==="openai"?'<span class="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">Active</span>':""}</div>
            <div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between"><div><p class="text-sm font-bold text-white">Google Gemini</p><p class="text-[10px] text-gray-500">${i.gemini_api_key?"Configured":"Not configured"} · ${i.gemini_model||"gemini-1.5-flash"}</p></div>${i.active_provider==="gemini"?'<span class="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">Active</span>':""}</div>
            <div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between"><div><p class="text-sm font-bold text-white">Anthropic Claude</p><p class="text-[10px] text-gray-500">${i.anthropic_api_key?"Configured":"Not configured"} · ${i.anthropic_model||"claude-3-5-sonnet"}</p></div>${i.active_provider==="anthropic"?'<span class="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">Active</span>':""}</div>
          </div>
          <a href="/admin-ai-settings.html" class="btn-press mt-3 block text-center text-xs font-bold text-blue-400 hover:text-blue-300 transition">Configure AI Providers →</a>
        </div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="image" class="w-4 h-4 text-amber-400"></i> Cloud Storage (Cloudinary)</h3>
          <div class="space-y-2"><div class="glass-soft border border-blue-500/10 rounded-xl p-3"><p class="text-sm font-bold text-white">Cloudinary</p><p class="text-[10px] text-gray-500">${r.cloudinary_cloud_name?"Configured":"Not configured"}</p></div></div>
          <a href="/admin.html" onclick="navigate('settings')" class="btn-press mt-3 block text-center text-xs font-bold text-blue-400 hover:text-blue-300 transition">Configure Cloudinary →</a>
        </div>
        <div class="glass border border-blue-500/20 rounded-2xl p-5">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-emerald-400"></i> Email Provider (Resend)</h3>
          <div class="space-y-2"><div class="glass-soft border border-blue-500/10 rounded-xl p-3"><p class="text-sm font-bold text-white">Resend</p><p class="text-[10px] text-gray-500">${r.resend_api_key?"Configured":"Not configured"}</p></div></div>
          <a href="/admin.html" onclick="navigate('settings')" class="btn-press mt-3 block text-center text-xs font-bold text-blue-400 hover:text-blue-300 transition">Configure Resend →</a>
        </div>
      </div>
    </div>`,window.lucide&&lucide.createIcons()}function ce(){document.getElementById("content").innerHTML=`
    <div class="fade-in">
      <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden" style="height: calc(100vh - 8rem)">
        <iframe src="/admin-ai.html" class="w-full h-full border-0" title="AI Admin Assistant"></iframe>
      </div>
    </div>`}function ue(){document.getElementById("content").innerHTML=`
    <div class="fade-in">
      <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden" style="height: calc(100vh - 8rem)">
        <iframe src="/admin-ai-settings.html" class="w-full h-full border-0" title="AI Settings"></iframe>
      </div>
    </div>`}const C="https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/publish-deploy";let B=null;async function pe(){const s=document.getElementById("content");s.innerHTML=`
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
          ${["Preparing","Building","Deploying","Live"].map((e,t)=>`
            <div class="flex-1 flex flex-col items-center gap-1.5">
              <div id="deploy-step-${t}" class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${t===0?"border-blue-500 bg-blue-500/20 text-blue-300":"border-gray-700 bg-gray-800/50 text-gray-600"}">
                ${t<4?t+1:'<i data-lucide="check" class="w-4 h-4"></i>'}
              </div>
              <span id="deploy-step-label-${t}" class="text-[10px] font-bold ${t===0?"text-blue-300":"text-gray-600"}">${e}</span>
            </div>
          `).join("")}
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
  `,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x),await G(),await z(),await be()}async function G(){const s=document.getElementById("deploy-pending-content");if(s)try{const e=await L(),t=await fetch(C,{method:"POST",headers:e,body:JSON.stringify({action:"pending_changes"})});if(!t.ok){const b=await t.json().catch(()=>({}));s.innerHTML=`<p class="text-xs text-red-400">Error: ${o(b.error||t.statusText)}</p>`;return}const a=await t.json(),r=a.new_products||[],i=a.updated_products||[],l=a.deleted_products||[],d=a.total_pending||0;if(d===0){s.innerHTML=`
        <div class="flex items-center gap-3 py-4">
          <div class="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
          </div>
          <p class="text-sm text-gray-400">All changes are published. No pending updates.</p>
        </div>`,window.lucide&&lucide.createIcons();return}const p=[];r.length>0&&p.push(`
        <div>
          <p class="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
            <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> New Products (${r.length})
          </p>
          <div class="space-y-1.5">
            ${r.map(b=>`
              <div class="flex items-center justify-between gap-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-3 py-2">
                <div class="min-w-0">
                  <p class="text-xs font-bold text-white truncate">${o(b.title)}</p>
                  <p class="text-[10px] text-gray-500">${o(b.property_id)} · ${o(b.category||"")}</p>
                </div>
                <span class="text-xs font-bold text-emerald-400 shrink-0">${o(String(b.price||""))} ${o(b.currency||"")}</span>
              </div>
            `).join("")}
          </div>
        </div>`),i.length>0&&p.push(`
        <div>
          <p class="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Updated Products (${i.length})
          </p>
          <div class="space-y-1.5">
            ${i.map(b=>`
              <div class="flex items-center justify-between gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
                <div class="min-w-0">
                  <p class="text-xs font-bold text-white truncate">${o(b.title)}</p>
                  <p class="text-[10px] text-gray-500">${o(b.property_id)} · ${o(b.category||"")}</p>
                </div>
                <span class="text-xs font-bold text-amber-400 shrink-0">${o(String(b.price||""))} ${o(b.currency||"")}</span>
              </div>
            `).join("")}
          </div>
        </div>`),l.length>0&&p.push(`
        <div>
          <p class="text-xs font-bold text-red-400 mb-2 flex items-center gap-1.5">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Deleted Products (${l.length})
          </p>
          <div class="space-y-1.5">
            ${l.map(b=>`
              <div class="flex items-center justify-between gap-2 bg-red-500/5 border border-red-500/10 rounded-lg px-3 py-2">
                <div class="min-w-0">
                  <p class="text-xs font-bold text-white truncate">${o(b.title)}</p>
                  <p class="text-[10px] text-gray-500">${o(b.property_id||"")}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>`),s.innerHTML=`
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">${d} pending change${d!==1?"s":""}</span>
      </div>
      <div class="space-y-4">${p.join("")}</div>`,window.lucide&&lucide.createIcons()}catch(e){s.innerHTML=`<p class="text-xs text-red-400">Error: ${o(e.message)}</p>`}}async function L(){const{data:s}=await n.auth.getSession();return{Authorization:`Bearer ${s.session?.access_token||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y2diY3lqd3BzYW5ycWR4aGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzE2MDMsImV4cCI6MjEwMDUwNzYwM30.evpJi44si4yjRIu49ILNWctcJUAfoi-V6ti5BJLluwM"}`,"Content-Type":"application/json"}}async function z(){const s=document.getElementById("deploy-history");if(s)try{const e=await L(),t=await fetch(C,{method:"POST",headers:e,body:JSON.stringify({action:"history"})});if(!t.ok){const i=await t.json().catch(()=>({}));s.innerHTML=`<p class="text-xs text-red-400">Error loading history: ${o(i.error||t.statusText)}</p>`;return}const r=(await t.json()).deployments||[];if(r.length===0){s.innerHTML='<p class="text-xs text-gray-500 text-center py-6">No deployments yet. Click "Publish Website" to deploy your marketplace.</p>';return}s.innerHTML=r.map(i=>{const d={live:"emerald",failed:"red",preparing:"blue",building:"amber",deploying:"violet"}[i.status]||"gray",p=new Date(i.started_at).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}),b=i.completed_at?`${Math.round((new Date(i.completed_at)-new Date(i.started_at))/1e3)}s`:"—";return`
        <div class="glass-soft border border-blue-500/10 rounded-xl p-3 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-${d}-500/10">
              <i data-lucide="${i.status==="live"?"check-circle":i.status==="failed"?"alert-triangle":"loader-2"}" class="w-4 h-4 text-${d}-400 ${i.status==="preparing"||i.status==="building"||i.status==="deploying"?"animate-spin":""}"></i>
            </div>
            <div class="min-w-0">
              <p class="text-sm font-bold text-white truncate">v${o(i.version)}</p>
              <p class="text-[10px] text-gray-500">${p} · ${b} · ${o(i.triggered_by_email||"Unknown")}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-[9px] font-bold text-${d}-400 bg-${d}-500/10 px-2 py-0.5 rounded-full uppercase">${i.status}</span>
            ${i.status==="live"?`<button onclick="republish('${i.id}')" class="btn-press p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition" title="Republish"><i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i></button>`:""}
          </div>
        </div>
      `}).join(""),window.lucide&&lucide.createIcons()}catch(e){s.innerHTML=`<p class="text-xs text-red-400">Error: ${o(e.message)}</p>`}}async function be(){try{const s=await L(),e=await fetch(C,{method:"POST",headers:s,body:JSON.stringify({action:"status"})});if(!e.ok)return;const t=await e.json();t.inProgress&&(me(t.latest||{}),Y())}catch{}}function me(s){const e=document.getElementById("deploy-progress"),t=document.getElementById("publish-btn");!e||!t||(e.classList.remove("hidden"),t.disabled=!0,t.classList.add("opacity-50","pointer-events-none"),t.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Deploying...',window.lucide&&lucide.createIcons(),H(s.status||"preparing"),s.version&&(document.getElementById("deploy-version").textContent=`v${s.version}`))}function H(s){const t=["preparing","building","deploying","live"].indexOf(s),a=["Preparing","Building","Deploying","Live"];for(let l=0;l<4;l++){const d=document.getElementById(`deploy-step-${l}`),p=document.getElementById(`deploy-step-label-${l}`);!d||!p||(l<t||s==="live"?(d.className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 border-emerald-500 bg-emerald-500/20 text-emerald-300",d.innerHTML='<i data-lucide="check" class="w-4 h-4"></i>',p.className="text-[10px] font-bold text-emerald-300"):l===t?(d.className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 border-blue-500 bg-blue-500/20 text-blue-300",d.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>',p.className="text-[10px] font-bold text-blue-300"):(d.className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 border-gray-700 bg-gray-800/50 text-gray-600",d.innerHTML=String(l+1),p.className="text-[10px] font-bold text-gray-600"),p.textContent=a[l])}const r=document.getElementById("deploy-progress-title"),i=document.getElementById("deploy-detail");if(r&&(r.textContent=s.charAt(0).toUpperCase()+s.slice(1)+"..."),i){const l={preparing:"Gathering product changes from the database...",building:"Verifying product updates and pending changes...",deploying:"Publishing changes to the live marketplace...",live:"Deployment is live! Your marketplace has been updated."};i.textContent=l[s]||""}window.lucide&&lucide.createIcons()}function Y(){B&&clearInterval(B),B=setInterval(async()=>{try{const s=await L(),e=await fetch(C,{method:"POST",headers:s,body:JSON.stringify({action:"status"})});if(!e.ok)return;const t=await e.json();if(t.latest&&(H(t.latest.status),t.latest.version)){const a=document.getElementById("deploy-version");a&&(a.textContent=`v${t.latest.version}`)}!t.inProgress&&t.latest&&(clearInterval(B),B=null,await xe(t.latest))}catch{}},2e3)}async function xe(s){const e=document.getElementById("deploy-progress"),t=document.getElementById("publish-btn"),a=document.getElementById("deploy-success"),r=document.getElementById("deploy-error");if(t&&(t.disabled=!1,t.classList.remove("opacity-50","pointer-events-none"),t.innerHTML='<i data-lucide="rocket" class="w-4 h-4"></i> Publish Website'),window.lucide&&lucide.createIcons(),s.status==="live"){if(e&&e.classList.add("hidden"),a){a.classList.remove("hidden");const i=document.getElementById("deploy-success-msg");i&&(i.textContent=`Version ${s.version} is now live. Your marketplace has been successfully deployed.`)}c("Deployment successful! Your marketplace is live."),await G()}else if(s.status==="failed"){if(e&&e.classList.add("hidden"),r){r.classList.remove("hidden");const i=document.getElementById("deploy-error-msg"),l=document.getElementById("deploy-error-fix");if(i&&(i.textContent=s.error_message||"Unknown error occurred."),l){const d=(s.error_message||"").toLowerCase();let p="Check the error message above and try again. If the issue persists, verify your project configuration.";d.includes("build failed")?p="There was a build error. Check your code for syntax errors or missing dependencies, then try publishing again.":d.includes("dist")||d.includes("deploy")?p="The build completed but deployment failed. Ensure the build output is valid and try again.":d.includes("already in progress")&&(p="Wait for the current deployment to finish before starting a new one."),l.textContent=p}}c("Deployment failed. See error details below.")}await z()}window.startPublish=async()=>{const s=document.getElementById("publish-btn");if(s){s.disabled=!0,s.classList.add("opacity-50","pointer-events-none"),s.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Starting...',window.lucide&&lucide.createIcons(),document.getElementById("deploy-success")?.classList.add("hidden"),document.getElementById("deploy-error")?.classList.add("hidden");try{const e=await L(),t=await fetch(C,{method:"POST",headers:e,body:JSON.stringify({action:"publish"})}),a=await t.json();if(!t.ok)throw new Error(a.error||`Request failed (${t.status})`);const r=document.getElementById("deploy-progress");r&&r.classList.remove("hidden");const i=document.getElementById("deploy-version");i&&(i.textContent=`v${a.version}`),H("preparing"),Y(),c("Deployment started. Building your marketplace...")}catch(e){s.disabled=!1,s.classList.remove("opacity-50","pointer-events-none"),s.innerHTML='<i data-lucide="rocket" class="w-4 h-4"></i> Publish Website',window.lucide&&lucide.createIcons();const t=document.getElementById("deploy-error");if(t){t.classList.remove("hidden");const a=document.getElementById("deploy-error-msg"),r=document.getElementById("deploy-error-fix");if(a&&(a.textContent=e.message),r){const i=e.message.toLowerCase();let l="Check the error message above and try again.";i.includes("already in progress")?l="A deployment is already running. Wait for it to complete before starting a new one.":(i.includes("unauthorized")||i.includes("admin"))&&(l="You need Super Admin privileges to publish. Sign in with an admin account."),r.textContent=l}}c("Failed to start deployment: "+e.message)}}};window.republish=async s=>{await window.startPublish()};function ge(){document.getElementById("content").innerHTML=`
    <div class="fade-in">
      <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden" style="height: calc(100vh - 8rem)">
        <iframe src="/admin-shipping.html" class="w-full h-full border-0" title="Shipping Management"></iframe>
      </div>
    </div>`}async function h(s,e,t,a){try{await n.rpc("log_admin_activity",{p_user_id:m.user.id,p_action:s,p_entity_type:e,p_entity_id:t,p_details:a||{}})}catch{}}async function fe(){const s=document.getElementById("global-search-settings");if(s)try{const{data:e,error:t}=await n.from("global_search_settings").select("*").eq("id",1).maybeSingle();if(t)throw t;const a=e||{enabled:!0,auto_source_from_suppliers:!0,allow_special_orders:!0,default_profit_margin_pct:15,default_service_fee_pct:3,default_shipping_fee:0,default_tax_pct:0,special_order_badge_label:"Available by Special Order"};s.innerHTML=`
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label class="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-800 cursor-pointer">
          <input type="checkbox" id="gss-enabled" ${a.enabled?"checked":""} class="w-4 h-4 accent-orange-500">
          <div><p class="text-xs font-bold text-white">Enable Global Search</p><p class="text-[10px] text-gray-500">Allow worldwide product search</p></div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-800 cursor-pointer">
          <input type="checkbox" id="gss-auto-source" ${a.auto_source_from_suppliers?"checked":""} class="w-4 h-4 accent-orange-500">
          <div><p class="text-xs font-bold text-white">Auto-Source from Suppliers</p><p class="text-[10px] text-gray-500">Search connected suppliers</p></div>
        </label>
        <label class="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-800 cursor-pointer">
          <input type="checkbox" id="gss-special-orders" ${a.allow_special_orders?"checked":""} class="w-4 h-4 accent-orange-500">
          <div><p class="text-xs font-bold text-white">Allow Special Orders</p><p class="text-[10px] text-gray-500">Let customers request products</p></div>
        </label>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div><label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Profit Margin %</label><input type="number" id="gss-margin" value="${a.default_profit_margin_pct}" min="0" step="0.1" class="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"></div>
        <div><label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Service Fee %</label><input type="number" id="gss-service" value="${a.default_service_fee_pct}" min="0" step="0.1" class="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"></div>
        <div><label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Shipping Fee</label><input type="number" id="gss-shipping" value="${a.default_shipping_fee}" min="0" step="0.01" class="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"></div>
        <div><label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Tax %</label><input type="number" id="gss-tax" value="${a.default_tax_pct}" min="0" step="0.1" class="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"></div>
      </div>
      <div><label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Special Order Badge Label</label><input type="text" id="gss-badge" value="${o(a.special_order_badge_label)}" class="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"></div>
      <button onclick="saveGlobalSearchSettings()" class="btn-press px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-orange-500/30 flex items-center gap-2"><i data-lucide="save" class="w-4 h-4"></i> Save Settings</button>
    `,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(x)}catch(e){s.innerHTML=`<div class="text-red-400 text-sm">Error loading settings: ${o(e.message)}</div>`}}window.saveGlobalSearchSettings=async()=>{const s={id:1,enabled:document.getElementById("gss-enabled").checked,auto_source_from_suppliers:document.getElementById("gss-auto-source").checked,allow_special_orders:document.getElementById("gss-special-orders").checked,default_profit_margin_pct:parseFloat(document.getElementById("gss-margin").value)||0,default_service_fee_pct:parseFloat(document.getElementById("gss-service").value)||0,default_shipping_fee:parseFloat(document.getElementById("gss-shipping").value)||0,default_tax_pct:parseFloat(document.getElementById("gss-tax").value)||0,special_order_badge_label:document.getElementById("gss-badge").value.trim()||"Available by Special Order"};try{const{error:e}=await n.from("global_search_settings").upsert(s).eq("id",1);if(e)throw e;c("Global search settings saved.")}catch(e){c("Error saving settings: "+e.message)}};window.navigate=s=>{m.currentSection=s,document.getElementById("page-title").textContent=ee[s]||s,N(),window.innerWidth<1024&&(document.getElementById("sidebar").classList.add("-translate-x-full"),document.getElementById("sidebar-overlay").classList.add("hidden")),({dashboard:F,products:A,orders:T,"special-orders":q,customers:U,payments:O,shipping:ge,promotions:P,content:ie,email:J,analytics:le,ai:ce,security:D,settings:ne,integrations:de,"ai-settings":ue,publish:pe}[s]||F)()};window.toggleSidebar=()=>{const s=document.getElementById("sidebar"),e=document.getElementById("sidebar-overlay");s.classList.toggle("-translate-x-full"),e.classList.toggle("hidden")};window.adminSignOut=async()=>{await X(),window.location.href="/auth.html"};n.auth.onAuthStateChange((s,e)=>{(async()=>{if(!e&&!window.location.pathname.includes("auth.html")){const t=window.location.pathname+window.location.search;window.location.href=`/auth.html?redirect=${encodeURIComponent(t)}`}})()});function R(){const s=document.getElementById("live-clock");s&&(s.innerHTML=`<i data-lucide="clock" class="w-3 h-3"></i> ${new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`),window.lucide&&lucide.createIcons()}async function ye(){const{data:s}=await n.auth.getSession();if(m.user=s?.session?.user||null,!m.user){const a=window.location.pathname+window.location.search;window.location.href=`/auth.html?redirect=${encodeURIComponent(a)}`;return}const{data:e}=await n.rpc("is_current_user_admin");if(e){m.isAdmin=!0,m.loading=!1;try{const{data:a}=await n.auth.getSession(),r=a?.session?.access_token;if((await(await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/admin-2fa",{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({action:"status"})})).json()).enabled){m.user._accessToken=r,await he(r);return}}catch(a){console.warn("2FA status check failed:",a)}W();return}const{data:t}=await n.rpc("has_any_admin");t?V("You are signed in, but this account does not have administrator privileges. Please sign in with an admin account."):ve()}function V(s){const e=document.getElementById("access-denied");e.classList.remove("hidden"),document.getElementById("access-denied-msg").textContent=s;const t=e.querySelector("#bootstrap-btn");t&&(t.outerHTML=`<a href="/auth.html?redirect=${encodeURIComponent(window.location.pathname)}" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30"><i data-lucide="log-in" class="w-4 h-4"></i> Sign In</a>`),window.lucide&&lucide.createIcons()}function W(){N(),se(),navigate("dashboard"),setInterval(R,1e3),R();try{n.from("admin_security_logs").insert({user_id:m.user.id,event_type:"admin_login"}).then(()=>{},()=>{})}catch{}}async function he(s){const e=document.getElementById("admin-root")||document.body;e.innerHTML=`
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
          <button id="twofa-verify-btn" onclick="verify2FAGate('${s}')" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
            <i data-lucide="shield-check" class="w-4 h-4"></i> Verify & Access Dashboard
          </button>
          <div class="pt-2 border-t border-white/5">
            <button onclick="document.getElementById('twofa-backup-section').classList.toggle('hidden')" class="text-xs font-bold text-gray-500 hover:text-gray-300 transition w-full text-center">
              Lost your phone? Use a backup code
            </button>
            <div id="twofa-backup-section" class="hidden mt-3 space-y-3">
              <input type="text" id="twofa-backup-code" placeholder="xxxx-xxxx-xxxx-xxxx"
                class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500">
              <button onclick="verify2FAGate('${s}', true)" class="btn-press w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-sm transition">
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
  `,window.lucide&&lucide.createIcons();const t=document.getElementById("twofa-code");t&&t.focus(),t?.addEventListener("keypress",a=>{a.key==="Enter"&&verify2FAGate(s)})}window.verify2FAGate=async(s,e=!1)=>{const t=document.getElementById("twofa-error"),a=document.getElementById("twofa-attempts"),r=document.getElementById("twofa-verify-btn");t?.classList.add("hidden");const i=e?document.getElementById("twofa-backup-code")?.value.trim():document.getElementById("twofa-code")?.value.trim();if(!i){t&&(t.textContent="Please enter a code.",t.classList.remove("hidden"));return}r&&(r.disabled=!0,r.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Verifying...',window.lucide&&lucide.createIcons());try{const l=e?{action:"verify",backup_code:i}:{action:"verify",code:i},d=await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/admin-2fa",{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify(l)}),p=await d.json();if(d.ok&&p.success)r&&(r.innerHTML='<i data-lucide="check" class="w-4 h-4"></i> Verified!',window.lucide&&lucide.createIcons()),setTimeout(()=>{W()},600);else{r&&(r.disabled=!1,r.innerHTML='<i data-lucide="shield-check" class="w-4 h-4"></i> Verify & Access Dashboard',window.lucide&&lucide.createIcons()),t&&(t.textContent=p.error||"Verification failed.",t.classList.remove("hidden")),a&&p.attempts_remaining!==void 0&&(a.textContent=`${p.attempts_remaining} attempt(s) remaining`);const b=document.getElementById(e?"twofa-backup-code":"twofa-code");b&&(b.value="",b.focus())}}catch{r&&(r.disabled=!1,r.innerHTML='<i data-lucide="shield-check" class="w-4 h-4"></i> Verify & Access Dashboard',window.lucide&&lucide.createIcons()),t&&(t.textContent="Network error. Please try again.",t.classList.remove("hidden"))}};window.signOut2FA=async()=>{try{await n.auth.signOut()}catch{}window.location.href="/auth.html?redirect=/admin.html"};window.setup2FA=async()=>{const s=document.getElementById("twofa-setup-modal");if(s){s.classList.remove("hidden"),s.innerHTML=`
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
  `,window.lucide&&lucide.createIcons();try{const{data:e}=await n.auth.getSession(),t=e?.session?.access_token,a=await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/admin-2fa",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({action:"setup"})}),r=await a.json();if(!a.ok)throw new Error(r.error||"Setup failed");const i=document.getElementById("twofa-setup-content");i.innerHTML=`
      <div class="text-center space-y-4">
        <div class="bg-white rounded-xl p-4 inline-block">
          <img src="${r.qr_url}" alt="QR Code" class="w-48 h-48 mx-auto" />
        </div>
        <div>
          <p class="text-sm text-gray-400 mb-2">1. Scan this QR code with Google Authenticator or Microsoft Authenticator</p>
          <p class="text-xs text-gray-500 mb-1">Or enter this secret key manually:</p>
          <div class="bg-[#0a1124] border border-blue-500/20 rounded-lg p-2 font-mono text-xs text-blue-300 break-all select-all cursor-pointer" onclick="navigator.clipboard?.writeText('${r.secret}')">${r.secret}</div>
        </div>
        <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-left">
          <p class="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Save Your Backup Codes</p>
          <p class="text-xs text-gray-400 mb-2">Store these safely. Each can be used once if you lose your phone:</p>
          <div class="grid grid-cols-2 gap-1.5 font-mono text-xs text-amber-300">
            ${r.backup_codes.map(l=>`<div class="bg-[#0a1124] rounded px-2 py-1">${l}</div>`).join("")}
          </div>
        </div>
        <div>
          <p class="text-sm text-gray-400 mb-2">2. Enter the 6-digit code from your app to confirm:</p>
          <input type="text" id="twofa-setup-confirm" inputmode="numeric" maxlength="6" placeholder="000000"
            class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-3 text-center text-xl tracking-[0.5em] text-white font-bold focus:outline-none focus:border-blue-500"
            oninput="this.value = this.value.replace(/[^0-9]/g,'')">
        </div>
        <button onclick="confirm2FASetup('${t}')" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition flex items-center justify-center gap-2">
          <i data-lucide="shield-check" class="w-4 h-4"></i> Confirm & Enable 2FA
        </button>
        <div id="twofa-setup-error" class="hidden text-xs text-red-400 text-center font-bold"></div>
      </div>
    `,window.lucide&&lucide.createIcons(),document.getElementById("twofa-setup-confirm")?.focus()}catch(e){document.getElementById("twofa-setup-content").innerHTML=`<p class="text-sm text-red-400 text-center">${o(e.message)}</p>`}}};window.confirm2FASetup=async s=>{const e=document.getElementById("twofa-setup-confirm")?.value.trim(),t=document.getElementById("twofa-setup-error");if(!e||!/^\d{6}$/.test(e)){t&&(t.textContent="Enter a valid 6-digit code.",t.classList.remove("hidden"));return}try{const a=await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/admin-2fa",{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify({action:"verify_setup",code:e})}),r=await a.json();a.ok&&r.success?(c("2FA enabled successfully!"),document.getElementById("twofa-setup-modal")?.classList.add("hidden"),D()):t&&(t.textContent=r.error||"Invalid code.",t.classList.remove("hidden"))}catch{t&&(t.textContent="Network error.",t.classList.remove("hidden"))}};window.disable2FA=async()=>{const s=prompt("Enter your current 6-digit authentication code to disable 2FA:");if(s)try{const{data:e}=await n.auth.getSession(),t=e?.session?.access_token,a=await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/admin-2fa",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({action:"disable",code:s})}),r=await a.json();a.ok&&r.success?(c("2FA disabled."),D()):c(r.error||"Failed to disable 2FA.")}catch(e){c("Error: "+e.message)}};window.regenerateBackupCodes=async()=>{const s=prompt("Enter your current 6-digit authentication code to regenerate backup codes:");if(s)try{const{data:e}=await n.auth.getSession(),t=e?.session?.access_token,a=await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/admin-2fa",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({action:"regenerate_backup_codes",code:s})}),r=await a.json();a.ok&&r.success?(alert(`New backup codes (save these — they replace all old ones):

`+r.backup_codes.join(`
`)),c("Backup codes regenerated.")):c(r.error||"Failed to regenerate backup codes.")}catch(e){c("Error: "+e.message)}};function ve(){const s=document.getElementById("access-denied");s.classList.remove("hidden"),document.getElementById("access-denied-msg").textContent="No administrator has been set up yet. You can promote your account to become the first admin.",s.querySelector("a").outerHTML='<button onclick="bootstrapAdmin()" id="bootstrap-btn" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-amber-600/30"><i data-lucide="shield" class="w-4 h-4"></i> Become Admin</button>',window.lucide&&lucide.createIcons(),document.querySelector("#bootstrap-btn").addEventListener("click",x)}window.bootstrapAdmin=async()=>{const s=document.getElementById("bootstrap-btn");if(s){s.disabled=!0,s.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Promoting...',window.lucide&&lucide.createIcons();try{const{data:e}=await n.auth.getSession(),t=await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/ai-admin-assistant",{method:"POST",headers:{Authorization:`Bearer ${e?.session?.access_token||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y2diY3lqd3BzYW5ycWR4aGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzE2MDMsImV4cCI6MjEwMDUwNzYwM30.evpJi44si4yjRIu49ILNWctcJUAfoi-V6ti5BJLluwM"}`,"Content-Type":"application/json"},body:JSON.stringify({action:"bootstrap_admin"})}),a=await t.json();t.ok&&a.success?(c("You are now an admin!"),setTimeout(()=>window.location.reload(),1e3)):a.error&&a.error.toLowerCase().includes("already exists")?V("An administrator already exists. Please sign in with an admin account."):(c(a.error||"Failed"),s.disabled=!1,s.innerHTML='<i data-lucide="shield" class="w-4 h-4"></i> Become Admin',window.lucide&&lucide.createIcons())}catch(e){c("Error: "+e.message),s.disabled=!1,s.innerHTML='<i data-lucide="shield" class="w-4 h-4"></i> Become Admin',window.lucide&&lucide.createIcons()}}};ye();

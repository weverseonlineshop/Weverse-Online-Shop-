import{s as d,C as N,g as E}from"./supabase-client-BJmMa02L.js";import{g as Y,s as G}from"./preload-helper-CqA7KWtz.js";import"./native-bridge-DwBvLOUN.js";import"./customer-ai-widget-BZg4go_M.js";async function V(){return!1}async function z(){return await V(),null}const b="/fallback.svg",W=[{group:"Overview",items:[{id:"home",label:"Dashboard Home",icon:"layout-dashboard"},{id:"profile",label:"My Profile",icon:"user"},{id:"edit-profile",label:"Edit Profile",icon:"user-cog"},{id:"change-password",label:"Change Password",icon:"key-round"}]},{group:"Orders & Shopping",items:[{id:"orders",label:"My Orders",icon:"shopping-bag"},{id:"special-orders",label:"Special Orders",icon:"package-plus"},{id:"tracking",label:"Order Tracking",icon:"truck"},{id:"history",label:"Order History",icon:"history"},{id:"cart",label:"Shopping Cart",icon:"shopping-cart"}]},{group:"Account",items:[{id:"notifications",label:"Notifications",icon:"bell"},{id:"messages",label:"Messages",icon:"mail"},{id:"payment-methods",label:"Payment Methods",icon:"credit-card"},{id:"payments",label:"Payment History",icon:"receipt"},{id:"addresses",label:"Shipping Addresses",icon:"map-pin"},{id:"receipts",label:"Download Receipts",icon:"download"}]},{group:"Support & Settings",items:[{id:"email-prefs",label:"Email Preferences",icon:"settings"},{id:"support",label:"Customer Support",icon:"headphones"},{id:"help",label:"Help Center",icon:"help-circle"},{id:"privacy",label:"Privacy & Security",icon:"shield-check"}]}],p=[{id:"order_placed",label:"Order Placed",icon:"shopping-bag",color:"text-blue-400",bg:"bg-blue-500/15"},{id:"payment_received",label:"Payment Received",icon:"credit-card",color:"text-cyan-400",bg:"bg-cyan-500/15"},{id:"pending_verification",label:"Pending Verification",icon:"shield-alert",color:"text-amber-400",bg:"bg-amber-500/15"},{id:"payment_approved",label:"Approved",icon:"check-circle",color:"text-emerald-400",bg:"bg-emerald-500/15"},{id:"order_processing",label:"Processing",icon:"package",color:"text-blue-400",bg:"bg-blue-500/15"},{id:"order_shipped",label:"Shipped",icon:"truck",color:"text-indigo-400",bg:"bg-indigo-500/15"},{id:"out_for_delivery",label:"Out for Delivery",icon:"bike",color:"text-orange-400",bg:"bg-orange-500/15"},{id:"order_delivered",label:"Delivered",icon:"package-check",color:"text-emerald-400",bg:"bg-emerald-500/15"}],X={approved:"payment_approved",submitted:"payment_received",placed:"order_placed"};function w(e){return X[e]||e}function Q(e){const t=p.findIndex(r=>r.id===w(e));return t>=0?t:0}function f(e){return e?new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"—"}function S(e){return e?new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}function B(e){return(e||"?").slice(0,2).toUpperCase()}function n(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function o(e){const t=document.getElementById("toast");document.getElementById("toast-msg").textContent=e,t.classList.remove("translate-y-20","opacity-0"),clearTimeout(t._t),t._t=setTimeout(()=>t.classList.add("translate-y-20","opacity-0"),3e3),window.lucide&&lucide.createIcons()}function J(e){const t=()=>{const r=document.createElement("textarea");r.value=e,document.body.appendChild(r),r.select();try{document.execCommand("copy")}catch{}document.body.removeChild(r)};navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(e).catch(()=>t()):t(),o("Copied to clipboard.")}function $(e){const t=w(e),r=p.find(u=>u.id===t)||p[0],s={"text-blue-400":"bg-blue-500/10 text-blue-400 border-blue-500/20","text-cyan-400":"bg-cyan-500/10 text-cyan-400 border-cyan-500/20","text-amber-400":"bg-amber-500/10 text-amber-400 border-amber-500/20","text-emerald-400":"bg-emerald-500/10 text-emerald-400 border-emerald-500/20","text-indigo-400":"bg-indigo-500/10 text-indigo-400 border-indigo-500/20","text-orange-400":"bg-orange-500/10 text-orange-400 border-orange-500/20","text-red-400":"bg-red-500/10 text-red-400 border-red-500/20"},l=s[r.color]||s["text-blue-400"],i=e==="rejected"?"Rejected":r.label;return`<span class="inline-flex items-center gap-1 ${l} border text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">${i}</span>`}function j(e){e.addEventListener("click",function(t){if(this.disabled)return;const r=this.getBoundingClientRect(),s=document.createElement("span");s.className="ripple";const l=Math.max(r.width,r.height);s.style.width=s.style.height=l+"px",s.style.left=t.clientX-r.left-l/2+"px",s.style.top=t.clientY-r.top-l/2+"px",this.appendChild(s),setTimeout(()=>s.remove(),600)})}let a={user:null,profile:null,orders:[],events:{},notifications:[],addresses:[],emailPrefs:null,messages:[],paymentMethods:[],activeSection:"home"};function K(){const e=document.getElementById("particles");if(e)for(let t=0;t<12;t++){const r=document.createElement("div"),s=Math.random()*3+1;r.className="particle",r.style.width=r.style.height=s+"px",r.style.left=Math.random()*100+"%",r.style.bottom="-10px",r.style.background=Math.random()>.5?"rgba(59,130,246,.4)":"rgba(251,191,36,.3)",r.style.animationDuration=Math.random()*20+15+"s",r.style.animationDelay=Math.random()*20+"s",e.appendChild(r)}}K();async function Z(){if(document.getElementById("dashboard-root"),a.user=await Y(),!a.user){window.location.href="/auth.html?redirect=/account.html";return}await H(),await ee(),await C(),await D(),await q(),await I(),te(),R(),Me(),m("home"),z().then(e=>{e&&console.log("Push notifications enabled")})}async function H(){const{data:e}=await d.from("profiles").select("*").eq("user_id",a.user.id).maybeSingle();a.profile=e}async function ee(){const{data:e}=await d.from("payment_receipts").select("*").eq("user_id",a.user.id).order("created_at",{ascending:!1});if(a.orders=e||[],a.orders.length){const t=a.orders.map(l=>l.order_number),{data:r}=await d.from("order_events").select("*").in("order_number",t).order("created_at",{ascending:!0});a.events={},(r||[]).forEach(l=>{(a.events[l.order_number]||=[]).push(l)});const{data:s}=await d.from("notification_log").select("*").in("order_number",t).order("created_at",{ascending:!1});a.notifications=s||[]}}async function C(){const{data:e}=await d.from("shipping_addresses").select("*").eq("user_id",a.user.id).order("created_at",{ascending:!1});a.addresses=e||[]}async function D(){const{data:e}=await d.from("email_preferences").select("*").eq("user_id",a.user.id).maybeSingle();a.emailPrefs=e}async function q(){const{data:e}=await d.from("support_messages").select("*").eq("user_id",a.user.id).order("created_at",{ascending:!1});a.messages=e||[]}async function I(){const{data:e}=await d.from("customer_payment_methods").select("*").eq("user_id",a.user.id).order("is_default",{ascending:!1}).order("created_at",{ascending:!1});a.paymentMethods=e||[]}function te(){const e=W.map(t=>`
    <div class="mb-3">
      <p class="text-[10px] font-bold uppercase tracking-wider text-gray-600 px-3 mb-1.5">${t.group}</p>
      ${t.items.map(r=>`
        <button data-section="${r.id}" class="nav-item w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-blue-500/5 rounded-xl transition border border-transparent ${a.activeSection===r.id?"active":""}">
          <i data-lucide="${r.icon}" class="nav-icon w-4 h-4 shrink-0 text-gray-500"></i>
          <span class="truncate">${r.label}</span>
        </button>
      `).join("")}
    </div>
  `).join("");document.getElementById("nav-menu").innerHTML=e,document.getElementById("mobile-nav-menu").innerHTML=e,document.querySelectorAll("[data-section]").forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.section;h(r)})}),window.lucide&&lucide.createIcons()}function h(e){a.activeSection=e,document.querySelectorAll("[data-section]").forEach(t=>{t.classList.toggle("active",t.dataset.section===e)}),m(e),M(),window.scrollTo({top:0,behavior:"smooth"})}function R(){const e=a.profile?.display_name||a.profile?.first_name||"Customer",t=a.user.email,r=a.profile?.avatar_url?`<img src="${a.profile.avatar_url}" class="w-full h-full object-cover" onerror="this.style.display='none'">`:B(t);["sidebar-avatar","mobile-avatar"].forEach(s=>{const l=document.getElementById(s);l&&(l.innerHTML=r)}),["sidebar-name","mobile-name"].forEach(s=>{const l=document.getElementById(s);l&&(l.textContent=e)}),["sidebar-email","mobile-email"].forEach(s=>{const l=document.getElementById(s);l&&(l.textContent=t)})}async function m(e){const t=document.getElementById("dashboard-root");let r="";switch(e){case"home":r=O();break;case"profile":r=ae();break;case"edit-profile":r=se();break;case"change-password":r=le();break;case"orders":r=de();break;case"special-orders":r=await ie();break;case"tracking":r=oe();break;case"history":r=ne();break;case"cart":r=ce();break;case"notifications":r=ue();break;case"messages":r=pe();break;case"payments":r=be();break;case"payment-methods":r=me();break;case"addresses":r=ge();break;case"receipts":r=he();break;case"email-prefs":r=ve();break;case"support":r=ye();break;case"help":r=we();break;case"privacy":r=$e();break;default:r=O()}t.innerHTML=`<div class="section active fade-in">${r}</div>`,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(j),ke(e)}function c(e,t){return`
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">${e}</h1>
      ${t?`<p class="text-sm text-gray-500 mt-1">${t}</p>`:""}
    </div>
  `}function re(){const e=a.orders.length,t=a.orders.filter(l=>["order_placed","payment_received","pending_verification","order_processing"].includes(w(l.status))).length,r=a.orders.filter(l=>w(l.status)==="order_delivered").length,s=a.orders.filter(l=>l.status==="rejected").length;return{total:e,pending:t,completed:r,cancelled:s}}function k(e,t,r,s){return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <div class="flex items-center justify-between mb-3">
        <div class="p-2.5 ${s.bg} rounded-xl"><i data-lucide="${r}" class="w-5 h-5 ${s.text}"></i></div>
      </div>
      <p class="text-3xl font-black text-white">${t}</p>
      <p class="text-xs text-gray-500 uppercase tracking-wide mt-1">${e}</p>
    </div>
  `}function O(){const e=re(),t=a.profile?.display_name||a.profile?.first_name||"Customer",r=a.profile?.country_code?E(a.profile.country_code):null,s=a.orders.slice(0,4),l=a.notifications.slice(0,5);return`
    ${c("Dashboard Home",`Welcome back, ${t}! Here's your account overview.`)}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      ${k("Total Orders",e.total,"shopping-bag",{bg:"bg-blue-500/10",text:"text-blue-400"})}
      ${k("Pending Orders",e.pending,"clock",{bg:"bg-amber-500/10",text:"text-amber-400"})}
      ${k("Completed",e.completed,"check-circle",{bg:"bg-emerald-500/10",text:"text-emerald-400"})}
      ${k("Cancelled",e.cancelled,"x-circle",{bg:"bg-red-500/10",text:"text-red-400"})}
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
        ${s.length===0?'<p class="text-sm text-gray-500 text-center py-8">No orders yet. <a href="/" class="text-blue-400 font-bold">Start shopping</a></p>':s.map(i=>`
          <div class="flex items-center gap-3 p-3 bg-blue-950/30 border border-blue-500/10 rounded-xl mb-2 hover:border-blue-500/30 transition cursor-pointer" onclick="navigateTo('orders')">
            <div class="w-12 h-12 rounded-lg bg-gray-900 overflow-hidden shrink-0 ring-1 ring-blue-500/10">
              <img src="${i.listing_image||b}" class="w-full h-full object-cover" onerror="this.src='${b}'">
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-white truncate">${i.listing_title}</p>
              <p class="text-xs text-gray-500 font-mono">${i.order_number}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="text-sm font-bold text-amber-400">${i.amount} ${i.currency}</p>
              ${$(i.status)}
            </div>
          </div>
        `).join("")}
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
          ${l.length===0?'<p class="text-xs text-gray-500 text-center py-4">No notifications yet.</p>':l.map(i=>{const u=p.find(v=>v.id===i.event_type)||p[0];return`
              <div class="flex items-start gap-2.5 p-2.5 hover:bg-blue-500/5 rounded-xl transition cursor-pointer" onclick="navigateTo('notifications')">
                <div class="w-7 h-7 ${u.bg} rounded-lg flex items-center justify-center shrink-0">
                  <i data-lucide="${u.icon}" class="w-3.5 h-3.5 ${u.color}"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-white truncate">${i.subject}</p>
                  <p class="text-[10px] text-gray-500">${S(i.created_at)}</p>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    </div>

    <!-- Account info -->
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mt-5 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="user" class="w-4 h-4 text-blue-400"></i> Account Information
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Email</p><p class="text-sm text-white truncate">${a.user.email}</p></div>
        <div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Country</p><p class="text-sm text-white">${r?r.flag+" "+r.name:"—"}</p></div>
        <div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Member Since</p><p class="text-sm text-white">${f(a.user.created_at)}</p></div>
      </div>
    </div>
  `}function ae(){const e=a.profile||{},t=e.country_code?E(e.country_code):null,r=e.avatar_url?`<img src="${e.avatar_url}" class="w-full h-full object-cover" onerror="this.style.display='none'">`:`<span class="text-2xl font-black">${B(a.user.email)}</span>`;return`
    ${c("My Profile","View your account details and personal information.")}
    <div class="glass border border-blue-500/20 rounded-2xl p-6 slide-up">
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
        <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white overflow-hidden shrink-0 ring-2 ring-blue-500/20 shadow-lg shadow-blue-600/30">
          ${r}
        </div>
        <div class="flex-1 text-center sm:text-left">
          <h2 class="text-xl font-black text-white">${e.display_name||e.first_name||"Customer"}</h2>
          <p class="text-sm text-gray-400">${a.user.email}</p>
          <div class="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
            ${t?`<span class="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs text-blue-400 font-medium">${t.flag} ${t.name}</span>`:""}
            <span class="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-xs text-emerald-400 font-medium"><i data-lucide="shield-check" class="w-3 h-3"></i> Verified</span>
            <span class="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 text-xs text-amber-400 font-medium"><i data-lucide="calendar" class="w-3 h-3"></i> ${f(a.user.created_at)}</span>
          </div>
          <button onclick="navigateTo('edit-profile')" class="btn-press mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
            <i data-lucide="edit-3" class="w-4 h-4"></i> Edit Profile
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-blue-500/10">
        ${g("First Name",e.first_name||"—")}
        ${g("Last Name",e.last_name||"—")}
        ${g("Display Name",e.display_name||"—")}
        ${g("Phone",e.phone_code&&e.phone_number?`+${e.phone_code} ${e.phone_number}`:"—")}
        ${g("Country",t?t.name:"—")}
        ${g("Email",a.user.email)}
      </div>
      ${e.bio?`<div class="pt-5 border-t border-blue-500/10 mt-4"><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Bio</p><p class="text-sm text-gray-300">${e.bio}</p></div>`:""}
    </div>
  `}function g(e,t){return`<div><p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">${e}</p><p class="text-sm text-white">${t}</p></div>`}function se(){const e=a.profile||{},t=e.country_code?E(e.country_code):null;return`
    ${c("Edit Profile","Update your personal information and profile picture.")}
    <div class="glass border border-blue-500/20 rounded-2xl p-6 slide-up max-w-2xl">
      <form id="edit-profile-form" class="space-y-5">
        <!-- Avatar -->
        <div class="flex items-center gap-4">
          <div id="edit-avatar-preview" class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-xl overflow-hidden shrink-0 ring-2 ring-blue-500/20">
            ${e.avatar_url?`<img src="${e.avatar_url}" class="w-full h-full object-cover" onerror="this.style.display='none'">`:B(a.user.email)}
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
            <input type="text" id="ep-first-name" value="${e.first_name||""}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Last Name</label>
            <input type="text" id="ep-last-name" value="${e.last_name||""}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Display Name</label>
          <input type="text" id="ep-display-name" value="${e.display_name||""}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Phone Code</label>
            <input type="text" id="ep-phone-code" value="${e.phone_code||(t?t.dial:"")}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Phone Number</label>
            <input type="text" id="ep-phone-number" value="${e.phone_number||""}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Country</label>
          <select id="ep-country" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            ${N.map(r=>`<option value="${r.code}" ${e.country_code===r.code?"selected":""}>${r.flag} ${r.name} (+${r.dial})</option>`).join("")}
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Bio</label>
          <textarea id="ep-bio" rows="3" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none" placeholder="Tell us about yourself...">${e.bio||""}</textarea>
        </div>
        <div class="flex gap-3">
          <button type="submit" id="ep-save-btn" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
            <i data-lucide="save" class="w-4 h-4"></i> Save Changes
          </button>
          <button type="button" onclick="navigateTo('profile')" class="btn-press px-5 py-3 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">Cancel</button>
        </div>
      </form>
    </div>
  `}function le(){return`
    ${c("Change Password","Update your account password to keep your account secure.")}
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
  `}function de(){return`
    ${c("My Orders","View and manage all your orders. Click an order to see full details.")}
    <div id="orders-list" class="space-y-4">
      ${a.orders.length===0?x("No Orders Yet","You haven't placed any orders yet.","shopping-bag","Start Shopping"):a.orders.map(e=>U(e,!1)).join("")}
    </div>
  `}function U(e,t){const r=e.listing_image||b,s=a.events[e.order_number]||[],l=t===e.order_number;return`
    <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden slide-up">
      <div class="p-4 sm:p-5 cursor-pointer hover:bg-blue-500/5 transition" onclick="toggleOrder('${e.order_number}')">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-900 shrink-0 ring-1 ring-blue-500/10">
            <img src="${r}" class="w-full h-full object-cover" onerror="this.src='${b}'">
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 mb-1">
              <h3 class="text-sm font-bold text-white truncate">${e.listing_title}</h3>
              ${$(e.status)}
            </div>
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              <span class="font-mono text-blue-400">${e.order_number}</span>
              <span>·</span><span>${f(e.created_at)}</span>
              <span>·</span><span class="text-amber-400 font-bold">${e.amount} ${e.currency}</span>
            </div>
          </div>
          <i data-lucide="chevron-${l?"up":"down"}" class="w-5 h-5 text-gray-500 shrink-0 mt-2"></i>
        </div>
      </div>
      <div class="${l?"":"hidden"} border-t border-blue-500/10 p-4 sm:p-5 bg-blue-950/20">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          ${_("Order Number",e.order_number,"mono")}
          ${_("Order Date",f(e.created_at))}
          ${_("Total Amount",`${e.amount} ${e.currency}`,"amber")}
          ${_("Quantity","1")}
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wide mb-3 flex items-center gap-2"><i data-lucide="git-branch" class="w-4 h-4 text-blue-400"></i> Order Progress</h4>
            ${F(e.status)}
          </div>
          <div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wide mb-3 flex items-center gap-2"><i data-lucide="history" class="w-4 h-4 text-blue-400"></i> Order History</h4>
            <div class="space-y-2 max-h-64 overflow-y-auto scrollbar-none">
              ${s.length===0?'<p class="text-xs text-gray-600">No events yet.</p>':s.map(i=>`
                <div class="flex items-start gap-2.5 p-2.5 bg-blue-950/30 border border-blue-500/10 rounded-xl">
                  <div class="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                  <div class="flex-1 min-w-0"><p class="text-xs text-gray-200 font-medium">${i.message}</p><p class="text-[10px] text-gray-500 mt-0.5">${S(i.created_at)}</p></div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-5 pt-4 border-t border-blue-500/10">
          <button onclick="event.stopPropagation();copyToClipboard('${e.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-xs font-bold text-blue-400 transition relative overflow-hidden"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Order #</button>
          <button onclick="event.stopPropagation();contactSupport('${e.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg text-xs font-bold text-amber-400 transition relative overflow-hidden"><i data-lucide="headphones" class="w-3.5 h-3.5"></i> Contact Support</button>
          ${e.receipt_file_path?`<button onclick="event.stopPropagation();downloadReceipt('${e.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-xs font-bold text-emerald-400 transition relative overflow-hidden"><i data-lucide="download" class="w-3.5 h-3.5"></i> Download Receipt</button>`:""}
        </div>
      </div>
    </div>
  `}function _(e,t,r){return`<div class="bg-blue-950/40 border border-blue-500/10 rounded-xl p-3"><div class="text-[10px] text-gray-500 uppercase tracking-wide mb-1">${e}</div><div class="text-sm ${r==="mono"?"font-mono text-blue-400":r==="amber"?"text-amber-400 font-bold":"text-white"} break-all">${t}</div></div>`}function F(e){const t=Q(e);return`
    <div class="relative pt-2">
      <div class="absolute left-4 top-6 bottom-6 w-0.5 bg-blue-500/10"></div>
      <div class="absolute left-4 top-6 w-0.5 bg-blue-500 transition-all duration-500" style="height: calc(${t/(p.length-1)*100}% - 1rem)"></div>
      <div class="space-y-3">
        ${p.map((r,s)=>{const l=s<=t,i=s===t;return`<div class="flex items-center gap-3 relative"><div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${l?r.bg+" border border-blue-500/30":"bg-blue-950/40 border border-blue-500/10"} ${i?"pulse-glow":""}"><i data-lucide="${r.icon}" class="w-4 h-4 ${l?r.color:"text-gray-600"} ${i?"animate-pulse":""}"></i></div><div class="flex-1 flex items-center justify-between"><span class="text-sm font-medium ${l?"text-white":"text-gray-600"}">${r.label}</span>${l&&!i?'<i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0"></i>':""}${i?'<span class="text-[10px] text-blue-400 font-bold uppercase shrink-0">Current</span>':""}</div></div>`}).join("")}
      </div>
    </div>
  `}let P=null;window.toggleOrder=e=>{P=P===e?null:e;const t=document.getElementById("orders-list");t&&(t.innerHTML=a.orders.map(r=>U(r,P)).join(""),window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(j))};async function ie(){try{const{data:e,error:t}=await d.from("product_requests").select("*").eq("user_id",a.user.id).order("created_at",{ascending:!1});if(t)throw t;const r={pending_review:"bg-yellow-500/10 text-yellow-400 border-yellow-500/30",under_review:"bg-blue-500/10 text-blue-400 border-blue-500/30",approved:"bg-emerald-500/10 text-emerald-400 border-emerald-500/30",rejected:"bg-red-500/10 text-red-400 border-red-500/30",quoted:"bg-cyan-500/10 text-cyan-400 border-cyan-500/30",fulfilled:"bg-green-500/10 text-green-400 border-green-500/30",cancelled:"bg-gray-500/10 text-gray-400 border-gray-500/30"};if(!e||e.length===0)return`<div class="text-center py-16"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4"><i data-lucide="package-plus" class="w-8 h-8 text-gray-500"></i></div><h3 class="text-lg font-bold text-white mb-2">No Special Orders yet</h3><p class="text-sm text-gray-500 mb-5">When you can't find a product in our marketplace, you can request it as a Special Order and we'll source it for you.</p><a href="/" class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-orange-500/30"><i data-lucide="search" class="w-4 h-4"></i> Search Products</a></div>`;let s='<div class="mb-4"><p class="text-sm text-gray-400">Track your special order requests and their status updates.</p></div><div class="space-y-3">';return e.forEach(l=>{const i=r[l.status]||r.pending_review,u=l.status.replace(/_/g," "),v=l.target_price?`${l.currency} ${Number(l.target_price).toLocaleString()}`:"—",T=l.quoted_price?`${l.quoted_currency} ${Number(l.quoted_price).toLocaleString()}`:null;s+=`<div class="glass border border-gray-800 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2"><h4 class="text-sm font-bold text-white truncate">${n(l.request_title)}</h4><span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${i}">${n(u)}</span></div>
        <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-2">
          <span><i data-lucide="tag" class="w-3 h-3 inline mr-1"></i>${n(l.category||"Uncategorized")}</span>
          <span><i data-lucide="award" class="w-3 h-3 inline mr-1"></i>${n(l.brand||"Any")}</span>
          <span><i data-lucide="circle-dollar-sign" class="w-3 h-3 inline mr-1"></i>${v}</span>
          <span><i data-lucide="hash" class="w-3 h-3 inline mr-1"></i>Qty: ${l.quantity}</span>
          <span><i data-lucide="calendar" class="w-3 h-3 inline mr-1"></i>${new Date(l.created_at).toLocaleDateString()}</span>
        </div>
        ${l.request_description?`<p class="text-xs text-gray-500 mb-2">${n(l.request_description)}</p>`:""}
        ${T?`<p class="text-xs text-cyan-400 font-bold mb-2">Quoted Price: ${T} (${n(l.payment_status)})</p>`:""}
        <div class="text-xs text-gray-500"><i data-lucide="map-pin" class="w-3 h-3 inline mr-1"></i>${n(l.delivery_full_name||"")}, ${n(l.delivery_city||"")}, ${n(l.delivery_country||"")}</div>
      </div>`}),s+="</div>",s}catch(e){return`<div class="text-red-400 text-sm p-4">Error loading special orders: ${n(e.message)}</div>`}}function oe(){const e=a.orders.filter(t=>!["order_delivered","rejected"].includes(w(t.status)));return`
    ${c("Order Tracking","Track your active orders in real time.")}
    ${e.length===0?x("No Active Orders","All your orders have been delivered.","check-circle","Browse Marketplace"):`
      <div class="space-y-4">
        ${e.map(t=>`
          <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-gray-900 overflow-hidden ring-1 ring-blue-500/10">
                  <img src="${t.listing_image||b}" class="w-full h-full object-cover" onerror="this.src='${b}'">
                </div>
                <div><h3 class="text-sm font-bold text-white">${t.listing_title}</h3><p class="text-xs text-gray-500 font-mono">${t.order_number}</p></div>
              </div>
              ${$(t.status)}
            </div>
            ${F(t.status)}
          </div>
        `).join("")}
      </div>
    `}
  `}function ne(){return`
    ${c("Order History","Your complete, permanently saved order history.")}
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
            ${a.orders.length===0?'<tr><td colspan="5" class="text-center text-sm text-gray-500 py-10">No orders yet.</td></tr>':a.orders.map(e=>`
              <tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition cursor-pointer" onclick="navigateTo('orders')">
                <td class="px-4 py-3 text-xs font-mono text-blue-400">${e.order_number}</td>
                <td class="px-4 py-3 text-xs text-white font-medium max-w-[160px] truncate">${e.listing_title}</td>
                <td class="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">${f(e.created_at)}</td>
                <td class="px-4 py-3 text-xs text-amber-400 font-bold">${e.amount} ${e.currency}</td>
                <td class="px-4 py-3">${$(e.status)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
    <p class="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1.5"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Your complete order history is permanently saved and secured.</p>
  `}function ce(){const e=JSON.parse(localStorage.getItem("kco_cart")||"[]");return`
    ${c("Shopping Cart","Items in your shopping cart.")}
    ${e.length===0?x("Cart is Empty","Your shopping cart is empty.","shopping-cart","Browse Marketplace"):`
      <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
        <div class="space-y-3">
          ${e.map(t=>{const r=window.SHOWROOM_LISTINGS?.find(s=>s.property_id===t);return r?`<div class="flex items-center gap-3 p-3 bg-blue-950/30 border border-blue-500/10 rounded-xl">
              <div class="w-14 h-14 rounded-lg bg-gray-900 overflow-hidden shrink-0"><img src="${r.images?.[0]||b}" class="w-full h-full object-cover" onerror="this.src='${b}'"></div>
              <div class="flex-1 min-w-0"><h3 class="text-sm font-bold text-white truncate">${r.title}</h3><p class="text-xs text-amber-400 font-bold">${r.price} ${r.currency}</p></div>
              <button onclick="removeFromCart('${r.property_id}')" class="btn-press p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition relative overflow-hidden"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>`:""}).join("")}
        </div>
        <button onclick="clearCart()" class="btn-press w-full mt-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold py-2.5 rounded-xl text-xs uppercase transition relative overflow-hidden">Clear Cart</button>
      </div>
    `}
  `}window.removeFromCart=e=>{let t=JSON.parse(localStorage.getItem("kco_cart")||"[]");t=t.filter(r=>r!==e),localStorage.setItem("kco_cart",JSON.stringify(t)),m("cart"),o("Removed from cart.")};window.clearCart=()=>{localStorage.removeItem("kco_cart"),m("cart"),o("Cart cleared.")};function ue(){return`
    ${c("Notifications","All email notifications related to your orders.")}
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      ${a.notifications.length===0?x("No Notifications","You haven't received any notifications yet.","bell-off",null):`
        <div class="space-y-2">
          ${a.notifications.map(e=>{const t=p.find(r=>r.id===e.event_type)||p[0];return`
              <div class="flex items-start gap-3 p-3 bg-blue-950/30 border border-blue-500/10 rounded-xl hover:border-blue-500/30 transition">
                <div class="w-9 h-9 ${t.bg} rounded-xl flex items-center justify-center shrink-0"><i data-lucide="${t.icon}" class="w-4 h-4 ${t.color}"></i></div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-white truncate">${e.subject}</p>
                  <p class="text-xs text-gray-500 mt-0.5">${S(e.created_at)}</p>
                  <div class="flex items-center gap-2 mt-1.5">
                    <span class="text-[10px] ${e.status==="sent"?"text-emerald-400":e.status==="failed"?"text-red-400":"text-amber-400"} font-bold uppercase">${e.status}</span>
                    <span class="text-[10px] text-gray-600">·</span>
                    <span class="text-[10px] text-gray-500 font-mono">${e.order_number}</span>
                  </div>
                </div>
              </div>
            `}).join("")}
        </div>
      `}
    </div>
  `}function pe(){return`
    ${c("Messages","Your conversation with customer support.")}
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <!-- Message thread -->
      <div id="msg-thread" class="space-y-3 mb-5 max-h-96 overflow-y-auto scrollbar-none">
        ${a.messages.length===0?'<p class="text-sm text-gray-500 text-center py-8">No messages yet. Send a message to start a conversation with support.</p>':a.messages.map(e=>`
          <div class="flex ${e.from_admin?"justify-start":"justify-end"}">
            <div class="max-w-[80%] ${e.from_admin?"bg-blue-950/60 border-blue-500/20":"bg-blue-600/20 border-blue-500/30"} border rounded-2xl px-4 py-2.5">
              ${e.subject&&!e.from_admin?`<p class="text-xs font-bold text-blue-400 mb-1">${e.subject}</p>`:""}
              <p class="text-sm text-gray-200">${e.message}</p>
              <p class="text-[10px] text-gray-500 mt-1">${S(e.created_at)}</p>
            </div>
          </div>
        `).join("")}
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
  `}function be(){return`
    ${c("Payment History","All your payment transactions and their verification status.")}
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
            ${a.orders.length===0?'<tr><td colspan="5" class="text-center text-sm text-gray-500 py-10">No payments yet.</td></tr>':a.orders.map(e=>`
              <tr class="border-b border-blue-500/5 hover:bg-blue-500/5 transition">
                <td class="px-4 py-3 text-xs font-mono text-blue-400">${e.order_number}</td>
                <td class="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">${f(e.payment_date||e.created_at)}</td>
                <td class="px-4 py-3 text-xs text-amber-400 font-bold">${e.amount} ${e.currency}</td>
                <td class="px-4 py-3">${$(e.status)}</td>
                <td class="px-4 py-3">${e.receipt_file_path?`<button onclick="downloadReceipt('${e.order_number}')" class="text-emerald-400 hover:text-emerald-300 transition"><i data-lucide="download" class="w-4 h-4"></i></button>`:'<span class="text-gray-600 text-xs">—</span>'}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}const A=[{type:"manual_transfer",label:"Manual Bank Transfer",icon:"landmark",color:"text-blue-400",available:!0,desc:"Transfer directly to our bank account"},{type:"atm_card",label:"ATM / Debit Card",icon:"credit-card",color:"text-emerald-400",available:!0,desc:"Visa, Mastercard, Verve"},{type:"bank_transfer",label:"Bank Transfer",icon:"building-2",color:"text-cyan-400",available:!0,desc:"Online banking transfer"},{type:"mobile_money",label:"Mobile Money Transfer",icon:"smartphone",color:"text-orange-400",available:!0,desc:"Send money from your mobile wallet"},{type:"wallet",label:"Wallet",icon:"wallet",color:"text-amber-400",available:!0,desc:"Use your KCO wallet balance"},{type:"paypal",label:"PayPal",icon:"wallet",color:"text-blue-400",available:!1,desc:"Pay with your PayPal account"}];function me(){const e=a.paymentMethods||[],t=e.length>0;return`
    ${c("Payment Methods","Manage your saved payment methods and view all available options.")}
    <div class="space-y-5">
      ${t?`
        <div class="glass border border-blue-500/20 rounded-2xl p-4 sm:p-5 slide-up">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-white uppercase tracking-wide">Saved Payment Methods</h3>
            <button onclick="openPaymentMethodModal()" class="btn-press inline-flex items-center gap-1.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 font-bold text-xs px-3 py-2 rounded-lg transition relative overflow-hidden">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add New
            </button>
          </div>
          <div class="space-y-3">
            ${e.map(r=>xe(r)).join("")}
          </div>
        </div>
      `:`
        ${x("No Saved Payment Methods","You haven't saved any payment methods yet. Add one to speed up checkout.","credit-card","Add Payment Method","openPaymentMethodModal()")}
      `}

      <div class="glass border border-blue-500/20 rounded-2xl p-4 sm:p-5 slide-up">
        <div class="flex items-center gap-2 mb-4">
          <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="grid-3x3" class="w-4 h-4 text-blue-400"></i></div>
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">Available Payment Options</h3>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${A.map(r=>`
            <div class="relative bg-blue-950/40 border ${r.available?"border-blue-500/20":"border-gray-700/40"} rounded-xl p-4 ${r.available?"":"opacity-60"}">
              ${r.available?"":'<span class="absolute top-2 right-2 bg-gray-700 text-gray-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full">Soon</span>'}
              <div class="flex items-center gap-3 mb-2">
                <div class="p-2 ${r.available?"bg-blue-500/10":"bg-gray-700/20"} rounded-lg"><i data-lucide="${r.icon}" class="w-5 h-5 ${r.color}"></i></div>
                <div>
                  <h4 class="text-sm font-bold text-white">${r.label}</h4>
                  ${r.available?'<span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400"><i data-lucide="check-circle" class="w-3 h-3"></i> Available</span>':'<span class="text-[10px] text-gray-500 font-medium">Coming Soon</span>'}
                </div>
              </div>
              <p class="text-xs text-gray-500">${r.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `}function xe(e){const t=A.find(r=>r.type===e.method_type)||{icon:"credit-card",color:"text-blue-400"};return`
    <div class="bg-blue-950/40 border ${e.is_default?"border-blue-500/50":"border-blue-500/15"} rounded-xl p-4 flex items-center gap-3">
      <div class="p-2.5 bg-blue-500/10 rounded-lg shrink-0"><i data-lucide="${t.icon}" class="w-5 h-5 ${t.color}"></i></div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <h4 class="text-sm font-bold text-white truncate">${n(e.label)}</h4>
          ${e.is_default?'<span class="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border border-emerald-500/20"><i data-lucide="check" class="w-2.5 h-2.5"></i> Default</span>':""}
        </div>
        <p class="text-xs text-gray-400 mt-0.5 truncate">${n(e.provider||e.method_type)} ${e.identifier?"· "+n(e.identifier):""}</p>
        ${e.account_holder?`<p class="text-[11px] text-gray-500 mt-0.5">Account Holder: ${n(e.account_holder)}</p>`:""}
      </div>
      <div class="flex items-center gap-1 shrink-0">
        ${e.is_default?"":`<button onclick="setDefaultPaymentMethod('${e.id}')" title="Set as default" class="btn-press p-2 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition relative overflow-hidden"><i data-lucide="star" class="w-4 h-4 text-gray-400"></i></button>`}
        <button onclick="editPaymentMethod('${e.id}')" title="Edit" class="btn-press p-2 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition relative overflow-hidden"><i data-lucide="pencil" class="w-4 h-4 text-gray-400"></i></button>
        <button onclick="deletePaymentMethod('${e.id}')" title="Remove" class="btn-press p-2 bg-red-900/40 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-lg transition relative overflow-hidden"><i data-lucide="trash-2" class="w-4 h-4 text-red-400"></i></button>
      </div>
    </div>
  `}window.openPaymentMethodModal=function(e){const t=e?(a.paymentMethods||[]).find(s=>s.id===e):null,r=document.createElement("div");r.className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4",r.innerHTML=`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto slide-up">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-bold text-white">${t?"Edit":"Add"} Payment Method</h3>
        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <form onsubmit="savePaymentMethod(event, '${e||""}')" class="space-y-3">
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Method Type</label>
          <select id="pm-type" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            ${A.filter(s=>s.available).map(s=>`<option value="${s.type}" ${t&&t.method_type===s.type?"selected":""}>${s.label}</option>`).join("")}
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Nickname / Label</label>
          <input id="pm-label" type="text" required value="${t?n(t.label):""}" placeholder="e.g. My GTBank Account" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Provider / Bank Name</label>
          <input id="pm-provider" type="text" value="${t?n(t.provider||""):""}" placeholder="e.g. GTBank, Visa, MTN Mobile Money" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Account Holder Name</label>
          <input id="pm-holder" type="text" value="${t?n(t.account_holder||""):""}" placeholder="Account holder name" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Identifier (last 4 digits / masked)</label>
          <input id="pm-identifier" type="text" value="${t?n(t.identifier||""):""}" placeholder="e.g. ****1234" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div class="flex items-center gap-2">
          <input id="pm-default" type="checkbox" ${t&&t.is_default?"checked":""} class="w-4 h-4 rounded border-blue-500/30 bg-blue-950/40 text-blue-500 focus:ring-blue-500">
          <label for="pm-default" class="text-xs text-gray-300">Set as default payment method</label>
        </div>
        <button type="submit" class="btn-press w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">${t?"Save Changes":"Add Payment Method"}</button>
      </form>
    </div>
  `,document.body.appendChild(r),window.lucide&&lucide.createIcons()};window.savePaymentMethod=async function(e,t){e.preventDefault();const r={method_type:document.getElementById("pm-type").value,label:document.getElementById("pm-label").value.trim(),provider:document.getElementById("pm-provider").value.trim()||null,account_holder:document.getElementById("pm-holder").value.trim()||null,identifier:document.getElementById("pm-identifier").value.trim()||null,is_default:document.getElementById("pm-default").checked};e.target.closest(".fixed").remove();try{if(r.is_default&&await d.from("customer_payment_methods").update({is_default:!1}).eq("user_id",a.user.id),t){const{error:s}=await d.from("customer_payment_methods").update({...r,updated_at:new Date().toISOString()}).eq("id",t).eq("user_id",a.user.id);if(s)throw s}else{const{error:s}=await d.from("customer_payment_methods").insert({...r,user_id:a.user.id});if(s)throw s}await I(),h("payment-methods"),o("Payment method saved successfully.")}catch(s){o("Failed to save payment method: "+(s.message||"Unknown error"))}};window.editPaymentMethod=function(e){openPaymentMethodModal(e)};window.deletePaymentMethod=async function(e){if(confirm("Remove this payment method?"))try{const{error:t}=await d.from("customer_payment_methods").delete().eq("id",e).eq("user_id",a.user.id);if(t)throw t;await I(),h("payment-methods"),o("Payment method removed.")}catch(t){o("Failed to remove: "+(t.message||"Unknown error"))}};window.setDefaultPaymentMethod=async function(e){try{await d.from("customer_payment_methods").update({is_default:!1}).eq("user_id",a.user.id).neq("id",e);const{error:t}=await d.from("customer_payment_methods").update({is_default:!0,updated_at:new Date().toISOString()}).eq("id",e).eq("user_id",a.user.id);if(t)throw t;await I(),h("payment-methods"),o("Default payment method updated.")}catch(t){o("Failed to set default: "+(t.message||"Unknown error"))}};function ge(){return`
    ${c("Shipping Addresses","Manage your saved shipping addresses.")}
    <button onclick="showAddressForm()" class="btn-press mb-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2.5 px-5 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
      <i data-lucide="plus" class="w-4 h-4"></i> Add New Address
    </button>
    <div id="address-form-container"></div>
    <div id="addresses-list" class="space-y-3">
      ${a.addresses.length===0?x("No Addresses","You haven't saved any shipping addresses yet.","map-pin",null):a.addresses.map(e=>{const t=E(e.country_code);return`
          <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-2">
                <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="map-pin" class="w-4 h-4 text-blue-400"></i></div>
                <div>
                  <h3 class="text-sm font-bold text-white">${e.label}</h3>
                  ${e.is_default?'<span class="text-[10px] text-emerald-400 font-bold uppercase">Default</span>':""}
                </div>
              </div>
              <div class="flex gap-2">
                <button onclick="editAddress('${e.id}')" class="btn-press p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 transition relative overflow-hidden"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
                <button onclick="deleteAddress('${e.id}')" class="btn-press p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 transition relative overflow-hidden"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
              </div>
            </div>
            <div class="text-sm text-gray-300 space-y-0.5">
              <p class="font-bold text-white">${e.full_name}</p>
              <p>${e.address_line1}${e.address_line2?", "+e.address_line2:""}</p>
              <p>${e.city}, ${e.state} ${e.postal_code}</p>
              <p>${t?t.flag+" "+t.name:e.country_code}</p>
              <p class="text-gray-400 mt-1">${e.phone}</p>
            </div>
          </div>
        `}).join("")}
    </div>
  `}window.showAddressForm=e=>{const t=document.getElementById("address-form-container"),r=e||{};t.innerHTML=`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-4 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">${e?"Edit Address":"New Shipping Address"}</h3>
      <form id="address-form" class="space-y-4">
        <input type="hidden" id="addr-id" value="${r.id||""}">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Label</label><input type="text" id="addr-label" value="${r.label||"Home"}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Full Name</label><input type="text" id="addr-name" value="${r.full_name||""}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        </div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Address Line 1</label><input type="text" id="addr-line1" value="${r.address_line1||""}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Address Line 2 (Optional)</label><input type="text" id="addr-line2" value="${r.address_line2||""}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">City</label><input type="text" id="addr-city" value="${r.city||""}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">State</label><input type="text" id="addr-state" value="${r.state||""}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Postal Code</label><input type="text" id="addr-postal" value="${r.postal_code||""}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Country</label><select id="addr-country" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">${N.map(s=>`<option value="${s.code}" ${r.country_code===s.code?"selected":""}>${s.flag} ${s.name}</option>`).join("")}</select></div>
          <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Phone</label><input type="text" id="addr-phone" value="${r.phone||""}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
        </div>
        <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="addr-default" ${r.is_default?"checked":""} class="w-4 h-4 rounded border-gray-700 bg-[#0a1124] text-blue-500 focus:ring-blue-500"><span class="text-xs text-gray-400">Set as default address</span></label>
        <div class="flex gap-3">
          <button type="submit" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden"><i data-lucide="save" class="w-4 h-4"></i> ${e?"Update":"Save"} Address</button>
          <button type="button" onclick="cancelAddressForm()" class="btn-press px-5 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">Cancel</button>
        </div>
      </form>
    </div>
  `,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(j),document.getElementById("address-form").addEventListener("submit",fe)};window.cancelAddressForm=()=>{document.getElementById("address-form-container").innerHTML=""};window.editAddress=e=>{const t=a.addresses.find(r=>r.id===e);showAddressForm(t),document.getElementById("address-form-container").scrollIntoView({behavior:"smooth"})};async function fe(e){e.preventDefault();const t=document.getElementById("addr-id").value,r={user_id:a.user.id,label:document.getElementById("addr-label").value,full_name:document.getElementById("addr-name").value,address_line1:document.getElementById("addr-line1").value,address_line2:document.getElementById("addr-line2").value||null,city:document.getElementById("addr-city").value,state:document.getElementById("addr-state").value,postal_code:document.getElementById("addr-postal").value,country_code:document.getElementById("addr-country").value,phone:document.getElementById("addr-phone").value,is_default:document.getElementById("addr-default").checked};r.is_default&&await d.from("shipping_addresses").update({is_default:!1}).eq("user_id",a.user.id),t?await d.from("shipping_addresses").update(r).eq("id",t):await d.from("shipping_addresses").insert(r),await C(),m("addresses"),o("Address saved successfully.")}window.deleteAddress=async e=>{await d.from("shipping_addresses").delete().eq("id",e),await C(),m("addresses"),o("Address deleted.")};function he(){const e=a.orders.filter(t=>t.receipt_file_path);return`
    ${c("Download Receipts","Download your payment receipts and invoices.")}
    ${e.length===0?x("No Receipts","Receipts from your payments will appear here once available.","file-text",null):`
      <div class="space-y-3">
        ${e.map(t=>`
          <div class="glass border border-blue-500/20 rounded-2xl p-4 slide-up flex items-center gap-4">
            <div class="p-3 bg-emerald-500/10 rounded-xl shrink-0"><i data-lucide="file-text" class="w-6 h-6 text-emerald-400"></i></div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-bold text-white truncate">${t.listing_title}</h3>
              <p class="text-xs text-gray-500 font-mono">${t.order_number}</p>
              <p class="text-xs text-amber-400 font-bold mt-0.5">${t.amount} ${t.currency}</p>
            </div>
            <button onclick="downloadReceipt('${t.order_number}')" class="btn-press flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-xs font-bold text-emerald-400 transition relative overflow-hidden"><i data-lucide="download" class="w-4 h-4"></i> Download</button>
          </div>
        `).join("")}
      </div>
    `}
  `}window.downloadReceipt=async e=>{const t=a.orders.find(l=>l.order_number===e);if(!t?.receipt_file_path){o("Receipt not available.");return}const{data:r,error:s}=await d.storage.from("payment-receipts").createSignedUrl(t.receipt_file_path,300);if(s||!r?.signedUrl){o("Could not generate download link.");return}window.open(r.signedUrl,"_blank")};function ve(){const e=a.emailPrefs||{order_updates:!0,payment_updates:!0,shipping_updates:!0,promotional_emails:!1,security_alerts:!0,newsletter:!1},t=[{key:"order_updates",label:"Order Updates",desc:"Notifications about your order status changes",icon:"shopping-bag"},{key:"payment_updates",label:"Payment Updates",desc:"Payment receipt and verification notifications",icon:"credit-card"},{key:"shipping_updates",label:"Shipping Updates",desc:"Shipping and delivery notifications",icon:"truck"},{key:"security_alerts",label:"Security Alerts",desc:"Important account security notifications",icon:"shield-alert"},{key:"promotional_emails",label:"Promotional Emails",desc:"Special offers and promotions",icon:"tag"},{key:"newsletter",label:"Newsletter",desc:"Monthly newsletter with marketplace updates",icon:"newspaper"}];return`
    ${c("Email Preferences","Choose which email notifications you want to receive.")}
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <div class="space-y-3">
        ${t.map(r=>`
          <div class="flex items-center justify-between p-4 bg-blue-950/30 border border-blue-500/10 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="${r.icon}" class="w-4 h-4 text-blue-400"></i></div>
              <div><p class="text-sm font-bold text-white">${r.label}</p><p class="text-xs text-gray-500">${r.desc}</p></div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="toggle sr-only" data-pref="${r.key}" ${e[r.key]?"checked":""}>
              <div class="toggle-bg w-11 h-6 bg-gray-700 rounded-full relative"><div class="toggle-dot absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div></div>
            </label>
          </div>
        `).join("")}
      </div>
      <button onclick="saveEmailPrefs()" class="btn-press mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
        <i data-lucide="save" class="w-4 h-4"></i> Save Preferences
      </button>
    </div>
  `}window.saveEmailPrefs=async()=>{const e={user_id:a.user.id};document.querySelectorAll("[data-pref]").forEach(t=>{e[t.dataset.pref]=t.checked}),a.emailPrefs?await d.from("email_preferences").update(e).eq("user_id",a.user.id):await d.from("email_preferences").insert(e),await D(),o("Email preferences saved.")};function ye(){return`
    ${c("Customer Support","Get help with your orders and account.")}
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
          <p class="text-xs text-gray-500">${a.messages.length} message${a.messages.length===1?"":"s"}</p>
          <button onclick="navigateTo('messages')" class="text-xs text-blue-400 hover:text-blue-300 font-bold transition mt-1">View Messages →</button>
        </div>
      </div>
    </div>
  `}function we(){const e=[{q:"How do I track my order?",a:"Go to Order Tracking in your dashboard. You'll see a real-time progress tracker showing each stage from Order Placed to Delivered."},{q:"How do I pay for my order?",a:"After clicking Buy Now, you'll be taken to checkout where you can complete a manual bank transfer. Upload your payment receipt for verification."},{q:"How long does payment verification take?",a:"Verification typically takes between a few minutes and 24 hours. You'll receive an email notification once approved."},{q:"Can I change my shipping address?",a:"Yes. Go to Shipping Addresses in your dashboard to add, edit, or set a default address."},{q:"How do I download my receipt?",a:"Go to Download Receipts in your dashboard. Click the Download button next to any order with a receipt on file."},{q:"How do I update my email preferences?",a:"Go to Email Preferences in your dashboard to toggle which notification emails you receive."},{q:"Is my account secure?",a:"Yes. Your account is protected with SSL encryption and secure authentication. We never share your personal information."},{q:"How do I contact support?",a:"Use the Customer Support section in your dashboard to send a message, or email us at support@kcoglobalonlinemarket.com."}];return`
    ${c("Help Center","Frequently asked questions and guides.")}
    <div class="space-y-3">
      ${e.map((t,r)=>`
        <div class="glass border border-blue-500/20 rounded-2xl overflow-hidden slide-up">
          <button onclick="toggleFaq(${r})" class="w-full flex items-center justify-between p-4 text-left hover:bg-blue-500/5 transition">
            <span class="text-sm font-bold text-white">${t.q}</span>
            <i data-lucide="chevron-down" id="faq-icon-${r}" class="w-5 h-5 text-gray-500 shrink-0 transition-transform"></i>
          </button>
          <div id="faq-${r}" class="hidden px-4 pb-4 text-sm text-gray-400 leading-relaxed">${t.a}</div>
        </div>
      `).join("")}
    </div>
  `}window.toggleFaq=e=>{const t=document.getElementById(`faq-${e}`),r=document.getElementById(`faq-icon-${e}`);t.classList.toggle("hidden"),r.style.transform=t.classList.contains("hidden")?"":"rotate(180deg)"};function $e(){return`
    ${c("Privacy & Security","Your account security and privacy settings.")}
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
  `}function x(e,t,r,s,l){return`
    <div class="glass border border-blue-500/20 rounded-2xl p-10 text-center slide-up">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4"><i data-lucide="${r}" class="w-8 h-8 text-blue-400"></i></div>
      <h3 class="text-lg font-bold text-white mb-2">${e}</h3>
      <p class="text-sm text-gray-500 mb-6 max-w-sm mx-auto">${t}</p>
      ${s?l?`<button onclick="${l}" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 relative overflow-hidden"><i data-lucide="plus" class="w-4 h-4"></i> ${s}</button>`:`<a href="/" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 relative overflow-hidden"><i data-lucide="shopping-bag" class="w-4 h-4"></i> ${s}</a>`:""}
    </div>
  `}function ke(e){if(e==="edit-profile"&&(document.getElementById("avatar-file")?.addEventListener("change",_e),document.getElementById("edit-profile-form")?.addEventListener("submit",Ee)),e==="change-password"&&document.getElementById("change-password-form")?.addEventListener("submit",Se),e==="messages"){document.getElementById("msg-form")?.addEventListener("submit",Ie);const t=document.getElementById("msg-thread");t&&(t.scrollTop=t.scrollHeight)}e==="support"&&document.getElementById("support-form")?.addEventListener("submit",Pe)}let y=null;async function _e(e){const t=e.target.files[0];if(!t)return;if(t.size>5*1024*1024){o("Image must be 5 MB or less.");return}y=t;const r=document.getElementById("edit-avatar-preview");r.innerHTML=`<img src="${URL.createObjectURL(t)}" class="w-full h-full object-cover">`}async function Ee(e){e.preventDefault();const t=document.getElementById("ep-save-btn");t.disabled=!0,t.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Saving...',window.lucide&&lucide.createIcons();let r=a.profile?.avatar_url;if(y){const l=y.name.split(".").pop(),i=`${a.user.id}/avatar-${Date.now()}.${l}`,{error:u}=await d.storage.from("avatars").upload(i,y,{upsert:!0});if(!u){const{data:v}=d.storage.from("avatars").getPublicUrl(i);r=v.publicUrl}y=null}const s={user_id:a.user.id,first_name:document.getElementById("ep-first-name").value,last_name:document.getElementById("ep-last-name").value,display_name:document.getElementById("ep-display-name").value,phone_code:document.getElementById("ep-phone-code").value,phone_number:document.getElementById("ep-phone-number").value,country_code:document.getElementById("ep-country").value,bio:document.getElementById("ep-bio").value,avatar_url:r};a.profile?await d.from("profiles").update(s).eq("user_id",a.user.id):await d.from("profiles").insert(s),await H(),R(),h("profile"),o("Profile updated successfully.")}async function Se(e){e.preventDefault();const t=document.getElementById("cp-error");t.classList.add("hidden"),document.getElementById("cp-current").value;const r=document.getElementById("cp-new").value,s=document.getElementById("cp-confirm").value;if(r!==s){t.textContent="New passwords do not match.",t.classList.remove("hidden");return}if(r.length<6){t.textContent="Password must be at least 6 characters.",t.classList.remove("hidden");return}const l=document.getElementById("cp-submit");l.disabled=!0,l.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Updating...',window.lucide&&lucide.createIcons();const{error:i}=await d.auth.updateUser({password:r});if(l.disabled=!1,l.innerHTML='<i data-lucide="key-round" class="w-4 h-4"></i> Update Password',window.lucide&&lucide.createIcons(),i){t.textContent=i.message,t.classList.remove("hidden");return}document.getElementById("change-password-form").reset(),o("Password updated successfully.")}async function Ie(e){e.preventDefault();const t=document.getElementById("msg-subject").value.trim(),r=document.getElementById("msg-body").value.trim();if(!r)return;const s=document.getElementById("msg-send-btn");s.disabled=!0,s.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Sending...',window.lucide&&lucide.createIcons(),await d.from("support_messages").insert({user_id:a.user.id,subject:t||"Message",message:r,from_admin:!1,read:!1}),await q(),m("messages"),o("Message sent to support.")}async function Pe(e){e.preventDefault();const t=document.getElementById("support-subject").value.trim(),r=document.getElementById("support-order").value.trim(),s=document.getElementById("support-message").value.trim();if(!t||!s)return;const l=document.getElementById("support-submit");l.disabled=!0,l.innerHTML='<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Sending...',window.lucide&&lucide.createIcons(),await d.from("support_messages").insert({user_id:a.user.id,order_number:r||null,subject:t,message:s,from_admin:!1,read:!1}),await q(),document.getElementById("support-form").reset(),l.disabled=!1,l.innerHTML='<i data-lucide="send" class="w-4 h-4"></i> Submit Request',window.lucide&&lucide.createIcons(),o("Support request submitted. We'll respond within 24 hours.")}function Me(){document.getElementById("btn-signout-desktop")?.addEventListener("click",L),document.getElementById("btn-signout-mobile")?.addEventListener("click",L),document.getElementById("btn-mobile-menu")?.addEventListener("click",Be),document.getElementById("btn-mobile-close")?.addEventListener("click",M),document.getElementById("mobile-backdrop")?.addEventListener("click",M)}async function L(){await G(),window.location.href="/"}function Be(){document.getElementById("mobile-drawer").classList.remove("hidden")}function M(){document.getElementById("mobile-drawer").classList.add("hidden")}window.navigateTo=h;window.copyToClipboard=J;window.contactSupport=e=>{const t=encodeURIComponent(`Order ${e} — Support Request`),r=encodeURIComponent(`Hello K.C.O Global Online Marketplace Support,

I need assistance with my order ${e}.

Thank you.`);window.location.href=`mailto:support@kcoglobalonlinemarket.com?subject=${t}&body=${r}`};Z();

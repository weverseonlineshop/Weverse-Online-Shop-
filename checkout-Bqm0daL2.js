import{s as m,d as $,g as _,C as E,S as T}from"./supabase-client-BJmMa02L.js";import{g as A}from"./preload-helper-CqA7KWtz.js";import{S as v,f as M}from"./showroom-data-C2Fqj8mU.js";import"./native-bridge-DwBvLOUN.js";import"./customer-ai-widget-BZg4go_M.js";const g="/fallback.svg",x={USD:{currency:"USD",currencyName:"United States Dollar",flag:"🇺🇸",country:"United States",bankName:"Citibank",transferType:"Local & International",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"70589490002447647",accountType:"Checking",iban:"",swift:"CITIUS33",routing:"031100209",sortCode:"",branchCode:"",institutionNumber:"",transitNumber:"",bsbCode:"",address:"111 Wall Street, New York, NY 10043, USA"},GBP:{currency:"GBP",currencyName:"British Pound",flag:"🇬🇧",country:"United Kingdom",bankName:"Citibank",transferType:"Local & International",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"56468624",accountType:"",iban:"GB94CITI18500856468624",swift:"CITIGB2L",routing:"",sortCode:"185008",branchCode:"",institutionNumber:"",transitNumber:"",bsbCode:"",address:"Canada Square, Canary Wharf, London E14 5LB, United Kingdom"},EUR:{currency:"EUR",currencyName:"Euro",flag:"🇪🇺",country:"Eurozone",bankName:"Citibank",transferType:"Local & International",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"",accountType:"",iban:"IE70CITI99005171297018",swift:"CITIIE2X",routing:"",sortCode:"",branchCode:"",institutionNumber:"",transitNumber:"",bsbCode:"",address:"1 North Wall Quay, IFSC, Dublin 1, Ireland"},CAD:{currency:"CAD",currencyName:"Canadian Dollar",flag:"🇨🇦",country:"Canada",bankName:"Citibank NA Canadian Branch",transferType:"Local Transfer",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"3001440544",accountType:"Checking",iban:"",swift:"",routing:"",sortCode:"",branchCode:"",institutionNumber:"0328",transitNumber:"20012",bsbCode:"",address:"123 Front St. West, Toronto, ON M5J 2M3, Canada"},AUD:{currency:"AUD",currencyName:"Australian Dollar",flag:"🇦🇺",country:"Australia",bankName:"Citibank",transferType:"Local & International",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"10674571",accountType:"",iban:"",swift:"",routing:"",sortCode:"",branchCode:"",institutionNumber:"",transitNumber:"",bsbCode:"248024",address:"2 Park Street, Sydney NSW 2000, Australia"},SGD:{currency:"SGD",currencyName:"Singapore Dollar",flag:"🇸🇬",country:"Singapore",bankName:"Citibank N.A. Singapore Branch",transferType:"Local & International",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"44990709533",accountType:"",iban:"",swift:"CITISGSG",routing:"",sortCode:"",bankCode:"7214",branchCode:"001",institutionNumber:"",transitNumber:"",bsbCode:"",address:"8 Marina View, #17-01 Asia Square Tower 1, Singapore 018960"},JPY:{currency:"JPY",currencyName:"Japanese Yen",flag:"🇯🇵",country:"Japan",bankName:"MUFG Bank Ltd.",transferType:"Local Transfer",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"4682719",accountType:"Savings / Futsu",iban:"",swift:"",routing:"",sortCode:"",bankCode:"0005",branchCode:"869",institutionNumber:"",transitNumber:"",bsbCode:"",address:"7-1 Marunouchi 2-Chome, Chiyoda-ku, Tokyo, Japan"},MXN:{currency:"MXN",currencyName:"Mexican Peso",flag:"🇲🇽",country:"Mexico",bankName:"Sistema de Transferencias y Pagos",transferType:"Local Transfer",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"646010504200345127",accountType:"",iban:"",swift:"",routing:"",sortCode:"",bankCode:"646",branchCode:"010",institutionNumber:"",transitNumber:"",bsbCode:"",address:"Av. Insurgentes Sur 1425, Ciudad de México, México"},IDR:{currency:"IDR",currencyName:"Indonesian Rupiah",flag:"🇮🇩",country:"Indonesia",bankName:"Deutsche Bank AG Jakarta Branch",transferType:"Local Transfer",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"974400000904",accountType:"",iban:"",swift:"",routing:"",sortCode:"",branchCode:"0670304",institutionNumber:"",transitNumber:"",bsbCode:"",address:"Jl. Imam Bonjol 80, Jakarta 10310, Indonesia"}};let e={user:null,isGuest:!1,listing:null,quantity:1,selectedCurrency:"USD",countryCode:"US",cartItems:[],step:1,paymentMethod:"flutterwave",addresses:[],selectedAddressId:null,billingSame:!0,billingAddress:"",fullName:"",email:"",phone:"",shippingAddr1:"",shippingAddr2:"",shippingCity:"",shippingState:"",shippingPostal:"",shippingCountry:"US",orderNumber:"",processing:!1};function B(){const t=Date.now().toString(36).toUpperCase().slice(-6),i=Math.random().toString(36).toUpperCase().slice(2,6);return`KCO-${t}${i}`}function b(t){const i=document.getElementById("toast");document.getElementById("toast-msg").textContent=t,i.classList.remove("translate-y-20","opacity-0"),clearTimeout(i._t),i._t=setTimeout(()=>i.classList.add("translate-y-20","opacity-0"),3e3),window.lucide&&lucide.createIcons()}function C(t){t.addEventListener("click",function(i){if(this.disabled)return;const r=this.getBoundingClientRect(),s=document.createElement("span");s.className="ripple";const o=Math.max(r.width,r.height);s.style.width=s.style.height=o+"px",s.style.left=i.clientX-r.left-o/2+"px",s.style.top=i.clientY-r.top-o/2+"px",this.appendChild(s),setTimeout(()=>s.remove(),600)})}function p(t,i){return`${(parseFloat(t)||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} ${i}`}function D(t){const i=()=>{const r=document.createElement("textarea");r.value=t,document.body.appendChild(r),r.select();try{document.execCommand("copy")}catch{}document.body.removeChild(r)};navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(t).catch(()=>i()):i(),b("Copied to clipboard.")}function j(){const t=document.getElementById("particles");if(t)for(let i=0;i<12;i++){const r=document.createElement("div"),s=Math.random()*3+1;r.className="particle",r.style.width=r.style.height=s+"px",r.style.left=Math.random()*100+"%",r.style.bottom="-10px",r.style.background=Math.random()>.5?"rgba(59,130,246,.4)":"rgba(251,191,36,.3)",r.style.animationDuration=Math.random()*20+15+"s",r.style.animationDelay=Math.random()*20+"s",t.appendChild(r)}}j();async function P(){const t=document.getElementById("checkout-root"),i=new URLSearchParams(window.location.search),r=i.get("status"),s=i.get("transaction_id"),o=i.get("tx_ref"),u=i.get("order_number");if(r==="verify"&&s){await z(s,o,u||localStorage.getItem("kco_pending_order"));return}if(e.isGuest=i.get("guest")==="1",!e.isGuest&&(e.user=await A(),!e.user)){window.location.href="/auth.html?redirect=/checkout.html";return}const a=i.get("id");if(a){if(e.listing=v.find(d=>d.property_id===a),!e.listing){t.innerHTML='<div class="text-center py-20 text-gray-500">Listing not found.</div>';return}e.cartItems=[{listing:e.listing,quantity:1}]}else{const d=JSON.parse(localStorage.getItem("kco_cart")||"[]");if(e.cartItems=d.map(l=>{const n=v.find(y=>y.property_id===l);return n?{listing:n,quantity:1}:null}).filter(Boolean),e.cartItems.length===0){t.innerHTML=k(),window.lucide&&lucide.createIcons();return}e.listing=e.cartItems[0].listing}if(e.countryCode=localStorage.getItem("kco_country")||"US",e.user&&!e.isGuest){const{data:d}=await m.from("profiles").select("country_code").eq("user_id",e.user.id).maybeSingle();d?.country_code&&(e.countryCode=d.country_code)}if(e.selectedCurrency=$(e.countryCode)||"USD",e.user&&!e.isGuest){const{data:d}=await m.from("shipping_addresses").select("*").eq("user_id",e.user.id).order("created_at",{ascending:!1});e.addresses=d||[];const l=e.addresses.find(y=>y.is_default);l&&(e.selectedAddressId=l.id);const{data:n}=await m.from("profiles").select("*").eq("user_id",e.user.id).maybeSingle();n&&(e.fullName=n.display_name||`${n.first_name||""} ${n.last_name||""}`.trim(),e.email=e.user.email,e.phone=n.phone_code&&n.phone_number?`+${n.phone_code} ${n.phone_number}`:"",e.shippingCountry=n.country_code||e.countryCode)}e.orderNumber=B(),c()}function f(){return e.cartItems.reduce((t,i)=>t+i.listing.price*i.quantity,0)}function L(){return 0}function O(){return 0}function w(){return Math.round(f()*O()*100)/100}function h(){return f()+L()+w()}function c(){const t=document.getElementById("checkout-root");t.innerHTML=`
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-400 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-blue-400">Checkout</span>
      </div>

      <!-- Step indicator -->
      ${U()}

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        <div class="lg:col-span-2 space-y-5">
          ${e.step===1?J():""}
          ${e.step===2?R():""}
          ${e.step===3?Y():""}
        </div>
        <div class="lg:col-span-1">
          ${H()}
        </div>
      </div>
    </div>
  `,window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(C)}function U(){const t=[{num:1,label:"Review Cart",icon:"shopping-cart"},{num:2,label:"Shipping & Billing",icon:"map-pin"},{num:3,label:"Payment",icon:"credit-card"}];return`
    <div class="flex items-center justify-center gap-2 sm:gap-4 mb-6">
      ${t.map((i,r)=>`
        <div class="flex items-center gap-2 sm:gap-4">
          <div class="flex items-center gap-2">
            <div class="step-bar w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${e.step>=i.num?"bg-blue-500/20 border border-blue-500/50 text-blue-400":"bg-blue-950/40 border border-blue-500/10 text-gray-600"} ${e.step===i.num?"pulse-glow":""}">
              ${e.step>i.num?'<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>':`<i data-lucide="${i.icon}" class="w-4 h-4"></i>`}
            </div>
            <span class="text-xs font-bold ${e.step>=i.num?"text-white":"text-gray-600"} hidden sm:inline">${i.label}</span>
          </div>
          ${r<t.length-1?`<div class="step-bar w-8 sm:w-16 h-0.5 ${e.step>i.num?"bg-blue-500":"bg-blue-500/10"}"></div>`:""}
        </div>
      `).join("")}
    </div>
  `}function J(){return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="shopping-cart" class="w-4 h-4 text-blue-400"></i> Shopping Cart (${e.cartItems.length})
      </h3>
      <div class="space-y-3">
        ${e.cartItems.map((t,i)=>`
            <div class="flex items-center gap-3 p-3 bg-blue-950/30 border border-blue-500/10 rounded-xl">
              <div class="w-16 h-16 rounded-lg bg-gray-900 overflow-hidden shrink-0 ring-1 ring-blue-500/10">
                <img src="${t.listing.images?.[0]||g}" class="w-full h-full object-cover" onerror="this.src='${g}'">
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-bold text-white truncate">${t.listing.title}</h4>
                <p class="text-xs text-gray-500">${t.listing.property_id}</p>
                <p class="text-sm font-bold text-amber-400 mt-1">${M(t.listing)}</p>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button onclick="changeQty(${i}, -1)" class="w-7 h-7 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-gray-400 hover:text-white transition flex items-center justify-center"><i data-lucide="minus" class="w-3.5 h-3.5"></i></button>
                <span class="text-sm font-bold text-white w-6 text-center">${t.quantity}</span>
                <button onclick="changeQty(${i}, 1)" class="w-7 h-7 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-gray-400 hover:text-white transition flex items-center justify-center"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button>
              </div>
              <button onclick="removeCartItem(${i})" class="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 transition shrink-0"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
          `).join("")}
      </div>
    </div>

    <div class="flex justify-end">
      <button onclick="goToStep(2)" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
        Continue to Shipping <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
    </div>
  `}function R(){const t=e.addresses.length>0&&!e.isGuest?`
    <div class="mb-5">
      <h4 class="text-xs font-bold text-white uppercase tracking-wide mb-3">Saved Addresses</h4>
      <div class="space-y-2">
        ${e.addresses.map(r=>{const s=_(r.country_code);return`
            <div onclick="selectAddress('${r.id}')" class="cursor-pointer p-3 border rounded-xl transition ${e.selectedAddressId===r.id?"bg-blue-500/15 border-blue-500/50":"bg-blue-950/30 border-blue-500/10 hover:border-blue-500/30"}">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-bold text-white">${r.label}</span>
                ${r.is_default?'<span class="text-[10px] text-emerald-400 font-bold uppercase">Default</span>':""}
              </div>
              <p class="text-xs text-gray-400">${r.full_name} · ${r.address_line1}, ${r.city}, ${r.state} ${r.postal_code} · ${s?s.flag+" "+s.name:r.country_code}</p>
              <p class="text-xs text-gray-500 mt-0.5">${r.phone}</p>
            </div>
          `}).join("")}
        <button onclick="selectAddress('')" class="w-full text-left p-3 border border-dashed border-blue-500/30 hover:border-blue-500/50 rounded-xl text-sm text-blue-400 font-bold transition flex items-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i> Enter a new address
        </button>
      </div>
    </div>
  `:"",i=!e.selectedAddressId||e.isGuest;return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="map-pin" class="w-4 h-4 text-blue-400"></i> Shipping Address
      </h3>
      ${t}
      ${i?`
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Full Name *</label>
              <input type="text" id="ship-name" value="${e.fullName}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Phone *</label>
              <input type="tel" id="ship-phone" value="${e.phone}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            </div>
          </div>
          ${e.isGuest?`
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Email *</label>
              <input type="email" id="ship-email" value="${e.email}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            </div>
          `:""}
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Address Line 1 *</label>
            <input type="text" id="ship-addr1" value="${e.shippingAddr1}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Address Line 2 (Optional)</label>
            <input type="text" id="ship-addr2" value="${e.shippingAddr2}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">City *</label><input type="text" id="ship-city" value="${e.shippingCity}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">State *</label><input type="text" id="ship-state" value="${e.shippingState}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Postal *</label><input type="text" id="ship-postal" value="${e.shippingPostal}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Country *</label>
            <select id="ship-country" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
              ${E.map(r=>`<option value="${r.code}" ${e.shippingCountry===r.code?"selected":""}>${r.flag} ${r.name}</option>`).join("")}
            </select>
          </div>
        </div>
      `:""}
    </div>

    <!-- Billing -->
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="file-text" class="w-4 h-4 text-blue-400"></i> Billing Information
      </h3>
      <label class="flex items-center gap-2 cursor-pointer mb-4">
        <input type="checkbox" id="billing-same" ${e.billingSame?"checked":""} onchange="toggleBilling()" class="w-4 h-4 rounded border-gray-700 bg-[#0a1124] text-blue-500 focus:ring-blue-500">
        <span class="text-sm text-gray-300">Billing address is the same as shipping address</span>
      </label>
      <div id="billing-fields" class="${e.billingSame?"hidden":""}">
        <textarea id="billing-address" rows="3" placeholder="Enter full billing address..." class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none">${e.billingAddress}</textarea>
      </div>
    </div>

    <div class="flex justify-between">
      <button onclick="goToStep(1)" class="btn-press inline-flex items-center gap-2 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/20 text-gray-400 font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
        <i data-lucide="arrow-left" class="w-4 h-4"></i> Back
      </button>
      <button onclick="goToStep(3)" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
        Continue to Payment <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
    </div>
  `}function Y(){const t=x[e.selectedCurrency]||x.USD;return`
    <!-- Payment method selection -->
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="credit-card" class="w-4 h-4 text-blue-400"></i> Payment Method
      </h3>
      <div class="space-y-3">
        <!-- Flutterwave -->
        <div onclick="selectPaymentMethod('flutterwave')" class="pay-method cursor-pointer p-4 border rounded-xl transition ${e.paymentMethod==="flutterwave"?"selected":"bg-blue-950/30 border-blue-500/10 hover:border-blue-500/30"}">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange-500/15 rounded-lg flex items-center justify-center"><i data-lucide="zap" class="w-5 h-5 text-orange-400"></i></div>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-white">Flutterwave</h4>
              <p class="text-xs text-gray-500">Pay with card, bank transfer, USSD, or mobile money</p>
            </div>
            <div class="w-5 h-5 rounded-full border-2 ${e.paymentMethod==="flutterwave"?"border-blue-500 bg-blue-500":"border-gray-600"} flex items-center justify-center">
              ${e.paymentMethod==="flutterwave"?'<div class="w-2 h-2 bg-white rounded-full"></div>':""}
            </div>
          </div>
        </div>

        <!-- Manual Bank Transfer -->
        <div onclick="selectPaymentMethod('manual_bank_transfer')" class="pay-method cursor-pointer p-4 border rounded-xl transition ${e.paymentMethod==="manual_bank_transfer"?"selected":"bg-blue-950/30 border-blue-500/10 hover:border-blue-500/30"}">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-500/15 rounded-lg flex items-center justify-center"><i data-lucide="landmark" class="w-5 h-5 text-blue-400"></i></div>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-white">Manual Bank Transfer</h4>
              <p class="text-xs text-gray-500">Pay directly to our bank account and upload receipt</p>
            </div>
            <div class="w-5 h-5 rounded-full border-2 ${e.paymentMethod==="manual_bank_transfer"?"border-blue-500 bg-blue-500":"border-gray-600"} flex items-center justify-center">
              ${e.paymentMethod==="manual_bank_transfer"?'<div class="w-2 h-2 bg-white rounded-full"></div>':""}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Currency selector -->
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-3">
        <i data-lucide="globe" class="w-4 h-4 text-blue-400"></i> Payment Currency
      </h3>
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
        ${T.map(i=>{const r=x[i];return r?`<button onclick="selectCurrency('${i}')" class="btn-press flex flex-col items-center gap-1 p-2.5 rounded-xl border transition relative overflow-hidden ${i===e.selectedCurrency?"bg-blue-500/15 border-blue-500/50 text-blue-400":"bg-blue-950/40 border-blue-500/10 text-gray-400 hover:border-blue-500/30"}">
            <span class="text-xl">${r.flag}</span><span class="text-xs font-bold">${i}</span>
          </button>`:""}).join("")}
      </div>
    </div>

    <!-- Bank account details (if manual) -->
    ${e.paymentMethod==="manual_bank_transfer"?q(t):""}

    <!-- Place order button -->
    <div class="space-y-3">
      ${e.paymentMethod==="flutterwave"?`
        <button onclick="payWithFlutterwave()" id="flw-pay-btn" class="btn-press w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
          <i data-lucide="zap" class="w-5 h-5"></i> Pay ${p(h(),e.selectedCurrency)} with Flutterwave
        </button>
      `:`
        <button onclick="placeOrderManual()" id="manual-pay-btn" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
          <i data-lucide="check-circle" class="w-5 h-5"></i> Place Order & Upload Receipt
        </button>
      `}
      <button onclick="goToStep(2)" class="btn-press w-full bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/20 text-gray-400 font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
        <i data-lucide="arrow-left" class="w-4 h-4 inline mr-2"></i> Back to Shipping
      </button>
    </div>

    <p class="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5 mt-3">
      <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Your payment is secured with SSL encryption.
    </p>
  `}function q(t){const i=[{label:"Beneficiary Name",value:t.beneficiary},{label:"Bank Name",value:t.bankName},{label:"Account Number",value:t.accountNumber},{label:"IBAN",value:t.iban},{label:"SWIFT / BIC",value:t.swift},{label:"Routing (ABA)",value:t.routing},{label:"Sort Code",value:t.sortCode},{label:"Bank Code",value:t.bankCode},{label:"Branch Code",value:t.branchCode},{label:"Institution Number",value:t.institutionNumber},{label:"Transit Number",value:t.transitNumber},{label:"BSB Code",value:t.bsbCode},{label:"Bank Address",value:t.address}].filter(r=>r.value&&r.value.trim()!=="");return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2.5 bg-blue-500/10 rounded-lg"><i data-lucide="landmark" class="w-5 h-5 text-blue-400"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">Receiving Bank Account</h3>
          <p class="text-gray-500 text-xs">${t.flag} ${t.currencyName} (${t.currency})</p>
        </div>
        <span class="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20"><i data-lucide="shield-check" class="w-3 h-3"></i> Verified</span>
      </div>
      <div class="space-y-2">
        ${i.map(r=>`
          <div class="flex items-center justify-between gap-3 bg-blue-950/40 border border-blue-500/10 rounded-xl px-4 py-2.5">
            <div class="min-w-0 flex-1"><div class="text-gray-500 text-[11px] uppercase tracking-wide">${r.label}</div><div class="text-gray-100 text-sm font-medium font-mono break-all">${r.value}</div></div>
            <button onclick="copyToClipboard('${r.value.replace(/'/g,"\\'")}')" class="shrink-0 p-2 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition"><i data-lucide="copy" class="w-4 h-4 text-gray-400"></i></button>
          </div>
        `).join("")}
      </div>
    </div>
  `}function H(){const t=f(),i=h();return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up lg:sticky lg:top-20">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="receipt" class="w-4 h-4 text-blue-400"></i> Order Summary
      </h3>
      <div class="space-y-3 mb-4">
        ${e.cartItems.map(r=>`
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-gray-900 overflow-hidden shrink-0 ring-1 ring-blue-500/10">
                <img src="${r.listing.images?.[0]||g}" class="w-full h-full object-cover" onerror="this.src='${g}'">
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-white truncate">${r.listing.title}</p>
                <p class="text-xs text-gray-500">Qty: ${r.quantity}</p>
              </div>
              <p class="text-xs font-bold text-amber-400 shrink-0">${p(r.listing.price*r.quantity,r.listing.currency||"USD")}</p>
            </div>
          `).join("")}
      </div>
      <div class="space-y-2 pt-4 border-t border-blue-500/10">
        <div class="flex justify-between text-sm"><span class="text-gray-500">Subtotal</span><span class="text-white font-bold">${p(t,e.cartItems[0]?.listing?.currency||"USD")}</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-500">Shipping</span><span class="text-emerald-400 font-bold">Free</span></div>
        ${w()>0?`<div class="flex justify-between text-sm"><span class="text-gray-500">Tax</span><span class="text-white font-bold">${p(w(),e.cartItems[0]?.listing?.currency||"USD")}</span></div>`:""}
        <div class="flex justify-between text-lg pt-2 border-t border-blue-500/10"><span class="text-white font-bold">Total</span><span class="text-amber-400 font-black">${p(i,e.cartItems[0]?.listing?.currency||"USD")}</span></div>
      </div>
      <div class="mt-4 p-3 bg-blue-950/30 border border-blue-500/10 rounded-xl">
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
          <span>Secured with SSL encryption</span>
        </div>
      </div>
      <div class="mt-3 p-3 bg-blue-950/30 border border-blue-500/10 rounded-xl">
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <i data-lucide="package" class="w-4 h-4 text-blue-400"></i>
          <span>Order #: <span class="text-blue-400 font-mono font-bold">${e.orderNumber}</span></span>
        </div>
      </div>
      ${e.step<3?`
        <button onclick="goToStep(${e.step+1})" class="btn-press w-full mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3.5 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
          ${e.step===1?"Proceed to Checkout":"Continue to Payment"} <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      `:""}
    </div>
  `}function k(){return`
    <div class="glass border border-blue-500/20 rounded-2xl p-10 text-center slide-up">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4"><i data-lucide="shopping-cart" class="w-8 h-8 text-blue-400"></i></div>
      <h3 class="text-lg font-bold text-white mb-2">Your Cart is Empty</h3>
      <p class="text-sm text-gray-500 mb-6">Add items to your cart before checking out.</p>
      <a href="/" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 relative overflow-hidden"><i data-lucide="shopping-bag" class="w-4 h-4"></i> Browse Marketplace</a>
    </div>
  `}window.changeQty=(t,i)=>{e.cartItems[t].quantity=Math.max(1,e.cartItems[t].quantity+i),c()};window.removeCartItem=t=>{if(e.cartItems.splice(t,1),e.cartItems.length===0){document.getElementById("checkout-root").innerHTML=k(),window.lucide&&lucide.createIcons();return}c()};window.goToStep=t=>{t===3&&!G()||(t===2&&N(),e.step=t,c(),window.scrollTo({top:0,behavior:"smooth"}))};function N(){(e.isGuest||!e.selectedAddressId)&&(e.fullName=document.getElementById("ship-name")?.value||e.fullName,e.phone=document.getElementById("ship-phone")?.value||e.phone,e.email=document.getElementById("ship-email")?.value||e.email||e.user?.email||"",e.shippingAddr1=document.getElementById("ship-addr1")?.value||"",e.shippingAddr2=document.getElementById("ship-addr2")?.value||"",e.shippingCity=document.getElementById("ship-city")?.value||"",e.shippingState=document.getElementById("ship-state")?.value||"",e.shippingPostal=document.getElementById("ship-postal")?.value||"",e.shippingCountry=document.getElementById("ship-country")?.value||e.shippingCountry),e.billingSame=document.getElementById("billing-same")?.checked??!0,e.billingSame||(e.billingAddress=document.getElementById("billing-address")?.value||"")}function G(){return N(),e.selectedAddressId&&!e.isGuest?!0:!e.fullName||!e.phone||!e.shippingAddr1||!e.shippingCity||!e.shippingState||!e.shippingPostal?(b("Please fill in all required shipping fields."),!1):e.isGuest&&!e.email?(b("Please enter your email address."),!1):!0}window.selectAddress=t=>{if(e.selectedAddressId=t||null,t){const i=e.addresses.find(r=>r.id===t);i&&(e.fullName=i.full_name,e.phone=i.phone,e.shippingAddr1=i.address_line1,e.shippingAddr2=i.address_line2||"",e.shippingCity=i.city,e.shippingState=i.state,e.shippingPostal=i.postal_code,e.shippingCountry=i.country_code)}c()};window.toggleBilling=()=>{e.billingSame=document.getElementById("billing-same").checked,document.getElementById("billing-fields").classList.toggle("hidden",e.billingSame)};window.selectPaymentMethod=t=>{e.paymentMethod=t,c()};window.selectCurrency=t=>{e.selectedCurrency=t,c()};window.copyToClipboard=D;async function S(t,i={}){const r=f(),s=h(),o=e.selectedAddressId&&e.addresses.length?(()=>{const l=e.addresses.find(n=>n.id===e.selectedAddressId);return l?`${l.address_line1}, ${l.city}, ${l.state} ${l.postal_code}, ${l.country_code}`:""})():`${e.shippingAddr1}${e.shippingAddr2?", "+e.shippingAddr2:""}, ${e.shippingCity}, ${e.shippingState} ${e.shippingPostal}, ${e.shippingCountry}`,u=e.billingSame?o:e.billingAddress||o,a={order_number:e.orderNumber,listing_id:e.listing.property_id,listing_title:e.listing.title,amount:s,currency:e.selectedCurrency,full_name:e.fullName,email:e.email||e.user?.email||"",phone:e.phone,status:"order_placed",payment_method:t,subtotal:r,quantity:e.cartItems.reduce((l,n)=>l+n.quantity,0),billing_address:u,...i};e.isGuest?(a.is_guest=!0,a.user_id=null,a.guest_shipping_address=o,a.guest_country=e.shippingCountry,a.guest_state=e.shippingState,a.guest_city=e.shippingCity,a.guest_postal_code=e.shippingPostal):(a.user_id=e.user.id,e.selectedAddressId&&(a.shipping_address_id=e.selectedAddressId));const{error:d}=await m.from("payment_receipts").insert(a);if(d)throw new Error("Failed to create order: "+d.message);return a}window.payWithFlutterwave=async()=>{const t=document.getElementById("flw-pay-btn");t.disabled=!0,t.innerHTML='<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Initializing payment...',window.lucide&&lucide.createIcons();try{await S("flutterwave"),localStorage.setItem("kco_pending_order",e.orderNumber);const r=await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/flutterwave-payment?action=initialize",{method:"POST",headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y2diY3lqd3BzYW5ycWR4aGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzE2MDMsImV4cCI6MjEwMDUwNzYwM30.evpJi44si4yjRIu49ILNWctcJUAfoi-V6ti5BJLluwM","Content-Type":"application/json"},body:JSON.stringify({amount:h(),currency:e.selectedCurrency,customer_name:e.fullName,customer_email:e.email||e.user?.email,customer_phone:e.phone,order_number:e.orderNumber,redirect_url:`${window.location.origin}/checkout.html?status=verify&order_number=${e.orderNumber}`})}),s=await r.json();if(!r.ok||s.error)throw new Error(s.error||"Failed to initialize payment");window.location.href=s.payment_link}catch(i){t.disabled=!1,t.innerHTML='<i data-lucide="zap" class="w-5 h-5"></i> Pay with Flutterwave',window.lucide&&lucide.createIcons(),b(i.message||"Payment initialization failed.")}};async function z(t,i,r){const s=document.getElementById("checkout-root");s.innerHTML=`
    <div class="flex flex-col items-center justify-center py-20 fade-in">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-full mb-6 pulse-glow">
        <i data-lucide="loader-2" class="w-10 h-10 text-blue-400 animate-spin"></i>
      </div>
      <h1 class="text-2xl font-black text-white mb-2">Verifying Payment...</h1>
      <p class="text-gray-400 text-sm">Please wait while we confirm your payment.</p>
    </div>
  `,window.lucide&&lucide.createIcons();try{const u=await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/flutterwave-payment?action=verify",{method:"POST",headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y2diY3lqd3BzYW5ycWR4aGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzE2MDMsImV4cCI6MjEwMDUwNzYwM30.evpJi44si4yjRIu49ILNWctcJUAfoi-V6ti5BJLluwM","Content-Type":"application/json"},body:JSON.stringify({transaction_id:t,tx_ref:i,order_number:r})}),a=await u.json();if(!u.ok||a.error||a.status==="failed"){s.innerHTML=I(a.message||a.error||"Payment verification failed."),window.lucide&&lucide.createIcons();return}s.innerHTML=F(r),window.lucide&&lucide.createIcons(),document.querySelectorAll(".btn-press").forEach(C),localStorage.removeItem("kco_pending_order"),localStorage.removeItem("kco_cart")}catch(o){s.innerHTML=I(o.message),window.lucide&&lucide.createIcons()}}function F(t){return`
    <div class="fade-in text-center py-8 max-w-lg mx-auto">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6 check-pop">
        <i data-lucide="check-circle" class="w-12 h-12 text-emerald-400"></i>
      </div>
      <h1 class="text-2xl font-black text-white mb-2">Payment Successful!</h1>
      <p class="text-gray-400 text-sm mb-6">Your order has been confirmed and an email receipt has been sent.</p>
      <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 text-left">
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Order Number</span><span class="text-blue-400 font-mono font-bold">${t}</span></div>
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Status</span><span class="text-emerald-400 font-bold">Payment Received</span></div>
        <div class="border-t border-blue-500/10 pt-3 mt-3">
          <p class="text-xs text-gray-400">You will receive email notifications at each stage: processing, shipping, and delivery.</p>
        </div>
      </div>
      <div class="flex gap-3 justify-center">
        <a href="/account.html" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
          <i data-lucide="package" class="w-4 h-4"></i> Track Order
        </a>
        <a href="/" class="btn-press inline-flex items-center gap-2 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
          Continue Shopping
        </a>
      </div>
    </div>
  `}function I(t){return`
    <div class="fade-in text-center py-8 max-w-lg mx-auto">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full mb-6 check-pop">
        <i data-lucide="x-circle" class="w-12 h-12 text-red-400"></i>
      </div>
      <h1 class="text-2xl font-black text-white mb-2">Payment Failed</h1>
      <p class="text-gray-400 text-sm mb-2">${t}</p>
      <p class="text-gray-500 text-xs mb-6">Your order has been saved. You can retry payment from your account dashboard.</p>
      <div class="flex gap-3 justify-center">
        <a href="/checkout.html" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
          <i data-lucide="refresh-cw" class="w-4 h-4"></i> Try Again
        </a>
        <a href="/account.html" class="btn-press inline-flex items-center gap-2 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition relative overflow-hidden">
          View Orders
        </a>
      </div>
    </div>
  `}window.placeOrderManual=async()=>{const t=document.getElementById("manual-pay-btn");t.disabled=!0,t.innerHTML='<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Creating order...',window.lucide&&lucide.createIcons();try{await S("manual_bank_transfer");try{await fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/send-order-notification",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y2diY3lqd3BzYW5ycWR4aGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzE2MDMsImV4cCI6MjEwMDUwNzYwM30.evpJi44si4yjRIu49ILNWctcJUAfoi-V6ti5BJLluwM"},body:JSON.stringify({order_number:e.orderNumber})})}catch{}const i=new URLSearchParams({id:e.listing.property_id,order:e.orderNumber});e.isGuest&&i.set("guest","1"),window.location.href=`/payment.html?${i.toString()}`}catch(i){t.disabled=!1,t.innerHTML='<i data-lucide="check-circle" class="w-5 h-5"></i> Place Order & Upload Receipt',window.lucide&&lucide.createIcons(),b(i.message||"Failed to create order.")}};P();

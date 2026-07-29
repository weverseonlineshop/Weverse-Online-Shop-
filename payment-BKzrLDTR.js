import{s as S,g as _,S as Y,d as q}from"./supabase-client-BJmMa02L.js";import{S as U,f as B,b as G}from"./showroom-data-C2Fqj8mU.js";import{g as z}from"./preload-helper-CqA7KWtz.js";import"./native-bridge-DwBvLOUN.js";import"./customer-ai-widget-BZg4go_M.js";const O="/fallback.svg",v={USD:{currency:"USD",currencyName:"United States Dollar",flag:"🇺🇸",country:"United States",bankName:"Citibank",transferType:"Local & International",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"70589490002447647",accountType:"Checking",iban:"",swift:"CITIUS33",routing:"031100209",sortCode:"",branchCode:"",institutionNumber:"",transitNumber:"",bsbCode:"",address:"111 Wall Street, New York, NY 10043, USA"},GBP:{currency:"GBP",currencyName:"British Pound",flag:"🇬🇧",country:"United Kingdom",bankName:"Citibank",transferType:"Local & International",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"56468624",accountType:"",iban:"GB94CITI18500856468624",swift:"CITIGB2L",routing:"",sortCode:"185008",branchCode:"",institutionNumber:"",transitNumber:"",bsbCode:"",address:"Canada Square, Canary Wharf, London E14 5LB, United Kingdom"},EUR:{currency:"EUR",currencyName:"Euro",flag:"🇪🇺",country:"Eurozone",bankName:"Citibank",transferType:"Local & International",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"",accountType:"",iban:"IE70CITI99005171297018",swift:"CITIIE2X",routing:"",sortCode:"",branchCode:"",institutionNumber:"",transitNumber:"",bsbCode:"",address:"1 North Wall Quay, IFSC, Dublin 1, Ireland"},CAD:{currency:"CAD",currencyName:"Canadian Dollar",flag:"🇨🇦",country:"Canada",bankName:"Citibank NA Canadian Branch",transferType:"Local Transfer",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"3001440544",accountType:"Checking",iban:"",swift:"",routing:"",sortCode:"",branchCode:"",institutionNumber:"0328",transitNumber:"20012",bsbCode:"",address:"123 Front St. West, Toronto, ON M5J 2M3, Canada"},AUD:{currency:"AUD",currencyName:"Australian Dollar",flag:"🇦🇺",country:"Australia",bankName:"Citibank",transferType:"Local & International",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"10674571",accountType:"",iban:"",swift:"",routing:"",sortCode:"",branchCode:"",institutionNumber:"",transitNumber:"",bsbCode:"248024",address:"2 Park Street, Sydney NSW 2000, Australia"},SGD:{currency:"SGD",currencyName:"Singapore Dollar",flag:"🇸🇬",country:"Singapore",bankName:"Citibank N.A. Singapore Branch",transferType:"Local & International",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"44990709533",accountType:"",iban:"",swift:"CITISGSG",routing:"",sortCode:"",bankCode:"7214",branchCode:"001",institutionNumber:"",transitNumber:"",bsbCode:"",address:"8 Marina View, #17-01 Asia Square Tower 1, Singapore 018960"},JPY:{currency:"JPY",currencyName:"Japanese Yen",flag:"🇯🇵",country:"Japan",bankName:"MUFG Bank Ltd.",transferType:"Local Transfer",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"4682719",accountType:"Savings / Futsu",iban:"",swift:"",routing:"",sortCode:"",bankCode:"0005",branchCode:"869",institutionNumber:"",transitNumber:"",bsbCode:"",address:"7-1 Marunouchi 2-Chome, Chiyoda-ku, Tokyo, Japan"},MXN:{currency:"MXN",currencyName:"Mexican Peso",flag:"🇲🇽",country:"Mexico",bankName:"Sistema de Transferencias y Pagos",transferType:"Local Transfer",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"646010504200345127",accountType:"",iban:"",swift:"",routing:"",sortCode:"",bankCode:"646",branchCode:"010",institutionNumber:"",transitNumber:"",bsbCode:"",address:"Av. Insurgentes Sur 1425, Ciudad de México, México"},IDR:{currency:"IDR",currencyName:"Indonesian Rupiah",flag:"🇮🇩",country:"Indonesia",bankName:"Deutsche Bank AG Jakarta Branch",transferType:"Local Transfer",beneficiary:"KENNETH CHIDERA ODENYI",accountNumber:"974400000904",accountType:"",iban:"",swift:"",routing:"",sortCode:"",branchCode:"0670304",institutionNumber:"",transitNumber:"",bsbCode:"",address:"Jl. Imam Bonjol 80, Jakarta 10310, Indonesia"}},K=[{name:"PayPal",icon:"wallet",color:"text-blue-400"},{name:"Stripe",icon:"credit-card",color:"text-violet-400"},{name:"Flutterwave",icon:"zap",color:"text-orange-400"},{name:"Paystack",icon:"layers",color:"text-cyan-400"},{name:"Apple Pay",icon:"smartphone",color:"text-gray-300"},{name:"Google Pay",icon:"smartphone",color:"text-green-400"},{name:"Visa",icon:"credit-card",color:"text-blue-500"},{name:"Mastercard",icon:"credit-card",color:"text-red-500"},{name:"American Express",icon:"credit-card",color:"text-blue-300"},{name:"Discover",icon:"credit-card",color:"text-orange-500"},{name:"Verve",icon:"credit-card",color:"text-green-500"},{name:"Bitcoin (BTC)",icon:"bitcoin",color:"text-yellow-500"},{name:"Ethereum (ETH)",icon:"bitcoin",color:"text-indigo-400"},{name:"USDT",icon:"bitcoin",color:"text-green-400"}],N=[{id:"placed",label:"Order Placed",icon:"shopping-bag",color:"text-blue-400",bg:"bg-blue-500/15"},{id:"submitted",label:"Payment Submitted",icon:"upload",color:"text-cyan-400",bg:"bg-cyan-500/15"},{id:"verification",label:"Pending Verification",icon:"loader",color:"text-amber-400",bg:"bg-amber-500/15"},{id:"approved",label:"Approved",icon:"check-circle",color:"text-emerald-400",bg:"bg-emerald-500/15"},{id:"processing",label:"Processing",icon:"package",color:"text-blue-400",bg:"bg-blue-500/15"},{id:"shipped",label:"Shipped",icon:"truck",color:"text-indigo-400",bg:"bg-indigo-500/15"},{id:"delivered",label:"Delivered",icon:"package-check",color:"text-emerald-400",bg:"bg-emerald-500/15"}];function W(){return new URLSearchParams(window.location.search).get("id")}function V(){return localStorage.getItem("kco_country")||"US"}function X(){const e=Date.now().toString(36).toUpperCase().slice(-6),t=Math.random().toString(36).toUpperCase().slice(2,6);return`KCO-${e}${t}`}function M(e,t){const r=()=>{const a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select();try{document.execCommand("copy")}catch{}document.body.removeChild(a)};if(navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(e).catch(()=>r()):r(),t){const a=t.innerHTML;t.innerHTML='<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>',window.lucide&&lucide.createIcons(),setTimeout(()=>{t.innerHTML=a,window.lucide&&lucide.createIcons()},1500)}R("Copied Successfully.")}function R(e){let t=document.getElementById("payment-toast");t||(t=document.createElement("div"),t.id="payment-toast",t.className="fixed bottom-5 right-5 z-[100] transform translate-y-20 opacity-0 bg-gray-900 border border-blue-500/30 text-white px-5 py-3 rounded-xl shadow-xl text-xs flex items-center gap-2 font-medium transition-all duration-300",t.innerHTML='<i data-lucide="info" class="w-4 h-4 text-blue-400"></i><span id="payment-toast-msg">Action</span>',document.body.appendChild(t)),t.querySelector("#payment-toast-msg").textContent=e,t.classList.remove("translate-y-20","opacity-0"),clearTimeout(t._t),t._t=setTimeout(()=>t.classList.add("translate-y-20","opacity-0"),3e3),window.lucide&&lucide.createIcons()}function Z(){const e=document.getElementById("particles");if(e)for(let t=0;t<14;t++){const r=document.createElement("div"),a=Math.random()*3+1;r.className="particle",r.style.width=a+"px",r.style.height=a+"px",r.style.left=Math.random()*100+"%",r.style.bottom="-10px",r.style.background=Math.random()>.5?"rgba(59,130,246,.4)":"rgba(251,191,36,.3)",r.style.animationDuration=Math.random()*20+15+"s",r.style.animationDelay=Math.random()*20+"s",e.appendChild(r)}}Z();function Q(e,t,r){const a=B(e);return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-2 mb-4">
        <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="shopping-bag" class="w-4 h-4 text-blue-400"></i></div>
        <h3 class="text-sm font-bold text-white uppercase tracking-wide">Order Summary</h3>
      </div>
      <div class="flex gap-4">
        <div class="w-24 h-24 rounded-xl overflow-hidden bg-gray-900 shrink-0 ring-1 ring-blue-500/10">
          <img src="${t}" alt="${e.title}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='${O}'">
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-white truncate">${e.title}</h4>
          <p class="text-gray-500 text-xs mt-0.5">ID: <span class="text-blue-400 font-mono">${e.property_id}</span></p>
          ${r&&e.city?`<p class="text-gray-400 text-xs mt-0.5">${G(e.country_code)} ${e.city}, ${e.country}</p>`:""}
          <p class="text-2xl font-black text-blue-400 mt-2">${a}</p>
        </div>
      </div>
    </div>
  `}function T(e){const t=[{label:"Country",value:e.country},{label:"Bank Name",value:e.bankName},{label:"Transfer Type",value:e.transferType},{label:"Beneficiary Name",value:e.beneficiary},{label:"Account Number",value:e.accountNumber},{label:"Account Type",value:e.accountType},{label:"IBAN",value:e.iban},{label:"SWIFT / BIC Code",value:e.swift},{label:"Routing (ABA)",value:e.routing},{label:"Sort Code",value:e.sortCode},{label:"Bank Code",value:e.bankCode},{label:"Branch Code",value:e.branchCode},{label:"Institution Number",value:e.institutionNumber},{label:"Transit Number",value:e.transitNumber},{label:"BSB Code",value:e.bsbCode},{label:"Bank Address",value:e.address}].filter(a=>a.value&&a.value.trim()!==""),r=t.map(a=>({label:a.label,value:a.value}));return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-3 mb-5">
        <div class="p-2.5 bg-blue-500/10 rounded-lg"><i data-lucide="landmark" class="w-5 h-5 text-blue-400"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">Receiving Bank Account</h3>
          <p class="text-gray-500 text-xs">${e.flag} ${e.currencyName} (${e.currency})</p>
        </div>
        <span class="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20">
          <i data-lucide="shield-check" class="w-3 h-3"></i> Verified
        </span>
      </div>
      <div class="space-y-2">
        ${t.map(a=>`
          <div class="flex items-center justify-between gap-3 bg-blue-950/40 border border-blue-500/10 rounded-xl px-4 py-2.5">
            <div class="min-w-0 flex-1">
              <div class="text-gray-500 text-[11px] uppercase tracking-wide">${a.label}</div>
              <div class="text-gray-100 text-sm font-medium font-mono break-all">${a.value}</div>
            </div>
            <button onclick="copyToClipboard('${a.value.replace(/'/g,"\\'")}', this)" class="shrink-0 p-2 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition group" title="Copy ${a.label}">
              <i data-lucide="copy" class="w-4 h-4 text-gray-400 group-hover:text-blue-400"></i>
            </button>
          </div>
        `).join("")}
      </div>
      <button onclick='copyAllDetails(${JSON.stringify(r).replace(/'/g,"&#39;")})' class="btn-press w-full mt-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold py-2.5 rounded-xl uppercase text-xs tracking-wider transition flex items-center justify-center gap-2 relative overflow-hidden">
        <i data-lucide="copy-check" class="w-4 h-4"></i> Copy All Account Details
      </button>
    </div>
  `}function j(){const e=v.USD;return`
    <div class="glass border border-amber-500/30 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-start gap-3 mb-4">
        <div class="p-2.5 bg-amber-500/10 rounded-lg shrink-0"><i data-lucide="info" class="w-5 h-5 text-amber-400"></i></div>
        <div class="text-sm text-gray-300 leading-relaxed">
          <p class="font-bold text-amber-400 mb-2">Hello Customer,</p>
          <p class="mb-2">Your local currency is not currently supported by our Manual Bank Transfer system.</p>
          <p class="mb-2">Please complete your payment using our official United States Dollar (USD) bank account.</p>
          <p class="mb-2">Your bank will automatically convert your local currency into USD during the international transfer.</p>
          <p class="mb-2">After completing your payment, please upload your payment receipt for verification.</p>
          <p class="font-bold text-amber-400">Thank you for choosing K.C.O Global Online Marketplace.</p>
        </div>
      </div>
    </div>
    ${T(e)}
  `}function ee(e,t,r){const a=Y,n=r?_(r):null;return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2.5 bg-blue-500/10 rounded-lg"><i data-lucide="globe" class="w-5 h-5 text-blue-400"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">Payment Currency</h3>
          <p class="text-gray-500 text-xs">${n?n.flag+" "+t:t||"Select currency"} ${"→ "+e}</p>
        </div>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
        ${a.map(l=>{const d=v[l];return`
            <button onclick="selectCurrency('${l}')" class="btn-press flex flex-col items-center gap-1 p-3 rounded-xl border transition relative overflow-hidden ${l===e?"bg-blue-500/15 border-blue-500/50 text-blue-400 pulse-glow":"bg-blue-950/40 border-blue-500/10 text-gray-400 hover:border-blue-500/30 hover:text-white"}">
              <span class="text-2xl">${d.flag}</span>
              <span class="text-xs font-bold">${l}</span>
              <span class="text-[10px] text-gray-500">${d.currencyName}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function te(){return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-blue-500/10 rounded-lg"><i data-lucide="landmark" class="w-6 h-6 text-blue-400"></i></div>
          <div>
            <h3 class="text-sm font-bold text-white">Manual Bank Transfer</h3>
            <p class="text-gray-500 text-xs">Pay directly to our bank account</p>
          </div>
        </div>
        <span class="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
          <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Available
        </span>
      </div>
    </div>
  `}function ae(){return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2.5 bg-gray-700/30 rounded-lg"><i data-lucide="lock" class="w-5 h-5 text-gray-500"></i></div>
        <div>
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">More Payment Methods</h3>
          <p class="text-gray-500 text-xs">Coming soon to K.C.O Global Online Marketplace</p>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        ${K.map(e=>`
          <div class="relative bg-blue-950/30 border border-blue-500/10 rounded-xl p-3 opacity-50 cursor-not-allowed select-none">
            <span class="absolute top-1.5 right-1.5 bg-gray-700 text-gray-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full">Soon</span>
            <div class="flex items-center gap-2 mb-0.5">
              <i data-lucide="${e.icon}" class="w-4 h-4 ${e.color}"></i>
              <span class="text-xs font-bold text-gray-400">${e.name}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function H(e){const t=N.findIndex(r=>r.id===e);return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-2 mb-5">
        <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="git-branch" class="w-4 h-4 text-blue-400"></i></div>
        <h3 class="text-sm font-bold text-white uppercase tracking-wide">Order Progress</h3>
      </div>
      <div class="relative">
        <!-- Progress line -->
        <div class="absolute left-4 top-4 bottom-4 w-0.5 bg-blue-500/10"></div>
        <div class="absolute left-4 top-4 w-0.5 bg-blue-500 transition-all duration-500" style="height: ${t>=0?t/(N.length-1)*100:0}%; min-height: 0; max-height: calc(100% - 2rem)"></div>
        <div class="space-y-4">
          ${N.map((r,a)=>{const n=a<=t,l=a===t;return`
              <div class="flex items-center gap-3 relative">
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${n?r.bg+" border border-blue-500/30":"bg-blue-950/40 border border-blue-500/10"} ${l?"pulse-glow":""}">
                  <i data-lucide="${r.icon}" class="w-4 h-4 ${n?r.color:"text-gray-600"} ${l?"animate-pulse":""}"></i>
                </div>
                <div class="flex-1">
                  <div class="text-sm font-medium ${n?"text-white":"text-gray-600"}">${r.label}</div>
                </div>
                ${n&&!l?'<i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0"></i>':""}
                ${l?'<span class="text-[10px] text-blue-400 font-bold uppercase shrink-0">Current</span>':""}
              </div>
            `}).join("")}
        </div>
      </div>
    </div>
  `}function re(e,t,r,a,n){const l=n?`
        <div class="glass-soft border border-blue-500/15 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-4">
            <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="truck" class="w-4 h-4 text-blue-400"></i></div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wide">Shipping Information</h4>
            <span class="ml-auto bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">Guest Checkout</span>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Full Name *</label>
              <input type="text" id="form-full-name" required placeholder="John Doe" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Email Address *</label>
                <input type="email" id="form-email" required placeholder="you@example.com" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Phone Number *</label>
                <input type="tel" id="form-phone" required placeholder="+1 234 567 890" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Shipping Address *</label>
              <input type="text" id="form-shipping-address" required placeholder="123 Main Street, Apt 4B" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Country *</label>
                <input type="text" id="form-guest-country" required placeholder="United States" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">State / Province *</label>
                <input type="text" id="form-guest-state" required placeholder="New York" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">City *</label>
                <input type="text" id="form-guest-city" required placeholder="New York City" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Postal Code *</label>
                <input type="text" id="form-guest-postal" required placeholder="10001" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
              </div>
            </div>
          </div>
        </div>
  `:"",d=n?"":`
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Full Name *</label>
            <input type="text" id="form-full-name" required placeholder="John Doe" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Phone Number *</label>
            <input type="tel" id="form-phone" required placeholder="+1 234 567 890" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Email Address *</label>
          <input type="email" id="form-email" required placeholder="you@example.com" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
  `;return`
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up" id="upload-section">
      <div class="flex items-center gap-3 mb-5">
        <div class="p-2.5 bg-blue-500/10 rounded-lg"><i data-lucide="upload-cloud" class="w-5 h-5 text-blue-400"></i></div>
        <div>
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">Upload Payment Receipt</h3>
          <p class="text-gray-500 text-xs">After making your payment, upload your receipt for verification.</p>
        </div>
      </div>

      <form id="receipt-form" class="space-y-4">
        <input type="hidden" id="form-order-number" value="${e}">
        <input type="hidden" id="form-listing-id" value="${t.property_id}">
        <input type="hidden" id="form-listing-title" value="${t.title}">
        <input type="hidden" id="form-amount" value="${r}">
        <input type="hidden" id="form-currency" value="${a}">
        <input type="hidden" id="form-is-guest" value="${n?"1":"0"}">

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Order Number</label>
            <input type="text" value="${e}" disabled class="w-full bg-[#0a1124]/80 border border-blue-500/10 rounded-xl px-4 py-2.5 text-sm text-blue-400 font-mono font-bold">
          </div>
          <div class="flex items-end">
            <div class="text-xs text-gray-500 pb-2">Save your order number to track your payment status.</div>
          </div>
        </div>

        ${l}
        ${d}

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Selected Currency</label>
            <input type="text" id="form-currency-display" value="${a}" disabled class="w-full bg-[#0a1124]/80 border border-blue-500/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Amount Paid *</label>
            <input type="number" id="form-amount-paid" required step="0.01" value="${r}" placeholder="0.00" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Payment Date *</label>
            <input type="date" id="form-payment-date" required value="${new Date().toISOString().slice(0,10)}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Transaction Reference *</label>
          <input type="text" id="form-tx-ref" required placeholder="Bank transfer reference / confirmation number" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Additional Notes</label>
          <textarea id="form-notes" rows="2" placeholder="Any additional information about your payment (optional)" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"></textarea>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Upload Receipt *</label>
          <div id="file-drop-zone" class="border-2 border-dashed border-blue-500/20 hover:border-blue-500/50 rounded-2xl p-8 text-center cursor-pointer transition group">
            <input type="file" id="form-receipt-file" accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf" capture="environment" class="hidden">
            <div id="file-prompt">
              <div class="inline-flex items-center justify-center w-14 h-14 bg-blue-500/10 rounded-2xl mb-3 group-hover:bg-blue-500/20 transition">
                <i data-lucide="upload-cloud" class="w-7 h-7 text-blue-400 group-hover:scale-110 transition"></i>
              </div>
              <p class="text-sm text-gray-300 font-medium">Click to upload, take a photo, or drag and drop</p>
              <p class="text-xs text-gray-600 mt-1">JPG, JPEG, PNG, WEBP, or PDF — Max 20 MB</p>
              <div class="flex items-center justify-center gap-2 mt-3">
                <button type="button" id="btn-take-photo" class="btn-press text-[11px] font-bold px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition flex items-center gap-1.5">
                  <i data-lucide="camera" class="w-3.5 h-3.5"></i> Take Photo
                </button>
                <button type="button" id="btn-choose-file" class="btn-press text-[11px] font-bold px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition flex items-center gap-1.5">
                  <i data-lucide="folder-open" class="w-3.5 h-3.5"></i> Choose File
                </button>
              </div>
            </div>
            <div id="file-info" class="hidden">
              <div class="flex flex-col items-center gap-3">
                <div id="file-preview-container" class="hidden">
                  <img id="file-preview-img" class="max-h-40 rounded-xl border border-blue-500/20 object-contain" alt="Receipt preview">
                </div>
                <div class="flex items-center justify-center gap-3">
                  <div class="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 rounded-xl check-pop">
                    <i data-lucide="file-text" class="w-6 h-6 text-emerald-400"></i>
                  </div>
                  <div class="text-left">
                    <p id="file-name-display" class="text-sm text-white font-medium truncate max-w-[200px]"></p>
                    <p id="file-size-display" class="text-xs text-gray-500"></p>
                  </div>
                  <button type="button" onclick="removeReceiptFile()" class="p-2 bg-blue-900/40 hover:bg-red-500/20 rounded-lg transition">
                    <i data-lucide="x" class="w-4 h-4 text-gray-400 hover:text-red-400"></i>
                  </button>
                </div>
                <button type="button" onclick="removeReceiptFile();document.getElementById('form-receipt-file').click()" class="text-[11px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wide flex items-center gap-1.5 transition">
                  <i data-lucide="refresh-cw" class="w-3 h-3"></i> Replace Receipt
                </button>
              </div>
            </div>
          </div>
          <div id="file-error" class="hidden text-xs text-red-400 mt-1.5"></div>
        </div>

        <div id="upload-progress" class="hidden">
          <div class="flex items-center gap-3 mb-2">
            <i data-lucide="loader-2" class="w-4 h-4 text-blue-400 animate-spin"></i>
            <span class="text-xs text-gray-400" id="upload-progress-text">Uploading receipt...</span>
          </div>
          <div class="w-full bg-blue-950/60 rounded-full h-2 overflow-hidden">
            <div id="upload-progress-bar" class="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300" style="width:0%"></div>
          </div>
        </div>

        <button type="submit" id="submit-receipt-btn" class="btn-press w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3.5 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden">
          <i data-lucide="send" class="w-5 h-5"></i> Submit Payment
        </button>
      </form>
    </div>
  `}function ie(e,t,r,a){const n=B(t);return`
    <div class="fade-in text-center py-8">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6 check-pop">
        <i data-lucide="check-circle" class="w-12 h-12 text-emerald-400"></i>
      </div>
      <h1 class="text-2xl font-black text-white mb-2">Receipt Submitted</h1>
      <p class="text-gray-400 text-sm mb-6">Your payment receipt has been received successfully.</p>

      <div class="glass border border-blue-500/20 rounded-2xl p-5 max-w-md mx-auto mb-5 text-left">
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Order Number</span><span class="text-blue-400 font-mono font-bold">${e}</span></div>
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Item</span><span class="text-white font-bold truncate ml-2">${t.title}</span></div>
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Amount</span><span class="text-white font-bold">${n}</span></div>
        <div class="flex justify-between text-sm mb-4"><span class="text-gray-500">Currency</span><span class="text-white font-bold">${a}</span></div>
        <div class="border-t border-blue-500/10 pt-3">
          <div class="flex items-center gap-2 text-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span class="text-amber-400 font-bold">Pending Verification</span>
          </div>
        </div>
      </div>

      ${H("verification")}

      <div class="glass border border-blue-500/20 rounded-2xl p-5 max-w-md mx-auto mb-6 text-left">
        <div class="flex items-start gap-2.5">
          <i data-lucide="info" class="w-5 h-5 text-blue-400 shrink-0 mt-0.5"></i>
          <div class="text-sm text-gray-400 leading-relaxed">
            <p class="mb-2">Our finance team will verify your payment.</p>
            <p class="mb-2">Verification usually takes between a few minutes and 24 hours.</p>
            <p>You will receive a notification once your payment has been approved.</p>
          </div>
        </div>
      </div>

      <a href="/" class="btn-press inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30">Back to Marketplace</a>
    </div>
  `}async function le(){const e=document.getElementById("payment-content"),r=new URLSearchParams(window.location.search).get("guest")==="1",a=r?null:await z();if(!a&&!r){window.location.href="/";return}const n=W(),l=U.find(g=>g.property_id===n);if(!l){e.innerHTML='<div class="text-center py-20 text-gray-500">Listing not found.</div>';return}B(l);const d=l.listing_type==="property",h=l.images?.[0]||O;let p=V();if(a&&!r){const{data:g}=await S.from("profiles").select("country_code").eq("user_id",a.id).single();g?.country_code&&(p=g.country_code,localStorage.setItem("kco_country",p))}const w=_(p),I=w?w.name:p,b=q(p),k=X(),x=l.price;let f=b||"USD";e.innerHTML=`
    <div class="fade-in">
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-400 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Checkout</span>
      </div>

      <h1 class="text-2xl sm:text-3xl font-black text-white mb-2">Secure Checkout</h1>
      <p class="text-gray-500 text-sm mb-6">Complete your purchase using manual bank transfer. Upload your receipt after payment for verification.</p>

      ${Q(l,h,d)}

      ${te()}

      <div id="currency-selector-container">${ee(f,I,p)}</div>

      <div id="bank-account-container">${v[f]?T(v[f]):j()}</div>

      <div id="upload-form-container">${re(k,l,x,f,r)}</div>

      ${ae()}

      ${H("submitted")}

      <p class="text-center text-xs text-gray-500 mb-6 flex items-center justify-center gap-1.5">
        <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Your payment is secured with SSL encryption. Manual verification by our finance team.
      </p>
    </div>
  `,window.lucide&&lucide.createIcons(),ne(l,x,k,a,r)}function ne(e,t,r,a,n){document.querySelectorAll(".btn-press").forEach(i=>{i.addEventListener("click",function(o){if(this.disabled)return;const s=this.getBoundingClientRect(),c=document.createElement("span");c.className="ripple";const u=Math.max(s.width,s.height);c.style.width=c.style.height=u+"px",c.style.left=o.clientX-s.left-u/2+"px",c.style.top=o.clientY-s.top-u/2+"px",this.appendChild(c),setTimeout(()=>c.remove(),600)})}),window.selectCurrency=i=>{const o=document.getElementById("bank-account-container");v[i]?o.innerHTML=T(v[i]):o.innerHTML=j(),document.querySelectorAll("#currency-selector-container button").forEach(u=>{u.getAttribute("onclick")?.includes(`'${i}'`)?u.className=u.className.replace("bg-blue-950/40 border-blue-500/10 text-gray-400 hover:border-blue-500/30 hover:text-white","bg-blue-500/15 border-blue-500/50 text-blue-400 pulse-glow"):u.className=u.className.replace("bg-blue-500/15 border-blue-500/50 text-blue-400 pulse-glow","bg-blue-950/40 border-blue-500/10 text-gray-400 hover:border-blue-500/30 hover:text-white")});const s=document.getElementById("form-currency-display");s&&(s.value=i);const c=document.getElementById("form-currency");c&&(c.value=i),window.lucide&&lucide.createIcons()},window.copyAllDetails=i=>{const o=i.map(s=>`${s.label}: ${s.value}`).join(`
`);M(o)},window.copyToClipboard=M;const l=document.getElementById("file-drop-zone"),d=document.getElementById("form-receipt-file"),h=document.getElementById("file-prompt"),p=document.getElementById("file-info"),w=document.getElementById("file-name-display"),I=document.getElementById("file-size-display"),b=document.getElementById("file-error");window.removeReceiptFile=()=>{d.value="",h.classList.remove("hidden"),p.classList.add("hidden"),b.classList.add("hidden"),x.classList.add("hidden")};const k=document.getElementById("file-preview-img"),x=document.getElementById("file-preview-container"),f=i=>{if(b.classList.add("hidden"),!i)return;const o=["image/jpeg","image/jpg","image/png","image/webp","application/pdf"],s=i.name.split(".").pop()?.toLowerCase(),c=["jpg","jpeg","png","webp","pdf"].includes(s);if(!o.includes(i.type)||!c){b.textContent="Please upload a JPG, JPEG, PNG, WEBP, or PDF file.",b.classList.remove("hidden");return}if(i.size>20*1024*1024){b.textContent="File size must be 20 MB or less.",b.classList.remove("hidden");return}if(w.textContent=i.name,I.textContent=(i.size/1024/1024).toFixed(2)+" MB",h.classList.add("hidden"),p.classList.remove("hidden"),i.type.startsWith("image/")){const u=new FileReader;u.onload=C=>{k.src=C.target.result,x.classList.remove("hidden")},u.readAsDataURL(i)}else x.classList.add("hidden");window.lucide&&lucide.createIcons()},g=document.getElementById("btn-take-photo"),$=document.getElementById("btn-choose-file");l.addEventListener("click",i=>{i.target.closest("#btn-take-photo")||i.target.closest("#btn-choose-file")||i.target.closest("#file-info")||d.click()}),g&&g.addEventListener("click",i=>{i.stopPropagation(),d.setAttribute("capture","environment"),d.click()}),$&&$.addEventListener("click",i=>{i.stopPropagation(),d.removeAttribute("capture"),d.click()}),d.addEventListener("change",i=>f(i.target.files[0])),l.addEventListener("dragover",i=>{i.preventDefault(),l.classList.add("border-blue-500/50","bg-blue-500/5")}),l.addEventListener("dragleave",()=>{l.classList.remove("border-blue-500/50","bg-blue-500/5")}),l.addEventListener("drop",i=>{if(i.preventDefault(),l.classList.remove("border-blue-500/50","bg-blue-500/5"),i.dataTransfer.files.length){const o=new DataTransfer;o.items.add(i.dataTransfer.files[0]),d.files=o.files,f(i.dataTransfer.files[0])}}),document.getElementById("receipt-form").addEventListener("submit",async i=>{i.preventDefault();const o=document.getElementById("submit-receipt-btn"),s=d.files[0];if(!s){b.textContent="Please upload your payment receipt.",b.classList.remove("hidden");return}o.disabled=!0,o.innerHTML='<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Submitting...',window.lucide&&lucide.createIcons();const c=document.getElementById("upload-progress"),u=document.getElementById("upload-progress-bar"),C=document.getElementById("upload-progress-text");c.classList.remove("hidden");try{const E=s.name.split(".").pop(),D=`${n?"guest":a.id}/${r}-${Date.now()}.${E}`,{error:P}=await S.storage.from("payment-receipts").upload(D,s,{onUploadProgress:y=>{const A=Math.round(y.loaded/y.total*100);u.style.width=A+"%",C.textContent=`Uploading receipt... ${A}%`}});if(P)throw new Error("Failed to upload receipt: "+P.message);u.style.width="100%",C.textContent="Saving payment record...";const m={order_number:r,listing_id:document.getElementById("form-listing-id").value,listing_title:document.getElementById("form-listing-title").value,amount:parseFloat(document.getElementById("form-amount-paid").value),currency:document.getElementById("form-currency").value,full_name:document.getElementById("form-full-name").value,email:document.getElementById("form-email").value,phone:document.getElementById("form-phone").value,payment_date:document.getElementById("form-payment-date").value,transaction_reference:document.getElementById("form-tx-ref").value,receipt_file_path:D,receipt_file_name:s.name,additional_notes:document.getElementById("form-notes").value||null,status:"pending_verification"};n?(m.is_guest=!0,m.user_id=null,m.guest_shipping_address=document.getElementById("form-shipping-address")?.value||null,m.guest_country=document.getElementById("form-guest-country")?.value||null,m.guest_state=document.getElementById("form-guest-state")?.value||null,m.guest_city=document.getElementById("form-guest-city")?.value||null,m.guest_postal_code=document.getElementById("form-guest-postal")?.value||null):m.user_id=a.id;const{error:L}=await S.from("payment_receipts").insert(m);if(L)throw new Error("Failed to save payment: "+L.message);try{fetch("https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/send-order-notification",{method:"POST",headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y2diY3lqd3BzYW5ycWR4aGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzE2MDMsImV4cCI6MjEwMDUwNzYwM30.evpJi44si4yjRIu49ILNWctcJUAfoi-V6ti5BJLluwM","Content-Type":"application/json"},body:JSON.stringify({order_number:r})}).catch(()=>{})}catch{}const F=document.getElementById("payment-content"),J=U.find(y=>y.property_id===document.getElementById("form-listing-id").value);F.innerHTML=ie(r,J,parseFloat(document.getElementById("form-amount-paid").value),document.getElementById("form-currency").value),window.lucide&&lucide.createIcons(),R("Payment receipt submitted successfully.")}catch(E){c.classList.add("hidden"),o.disabled=!1,o.innerHTML='<i data-lucide="send" class="w-5 h-5"></i> Submit Payment',window.lucide&&lucide.createIcons(),b.textContent=E.message||"Something went wrong. Please try again.",b.classList.remove("hidden")}})}le();

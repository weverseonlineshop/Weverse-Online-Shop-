import"./supabase-client-BJmMa02L.js";import{S as $,l as k,a as I,f as _,b as T}from"./showroom-data-C2Fqj8mU.js";import{g as B,f as S}from"./truck-data-CXeZJZHb.js";import{g as f,f as w}from"./preload-helper-CqA7KWtz.js";import"./customer-ai-widget-BZg4go_M.js";const b="/fallback.svg";function E(){return new URLSearchParams(window.location.search).get("id")}function M(e){const l=document.getElementById("details-content"),i=S(e),n=e.images.map((r,o)=>`<button class="gallery-thumb rounded-lg overflow-hidden border-2 ${o===0?"active border-orange-500":"border-gray-800"} shrink-0" data-img="${r}">
      <img src="${r}" alt="View ${o+1}" loading="lazy" class="w-20 h-16 object-cover" onerror="this.onerror=null;this.src='${b}'">
    </button>`).join(""),u=["Front View","Rear View","Left Side","Right Side","Interior Dashboard","Driver Seat","Cargo Area / Truck Bed","Engine","Wheels / Tires","Additional View"],m=[{icon:"building-2",label:"Brand",value:e.brand},{icon:"car",label:"Model",value:e.model},{icon:"calendar",label:"Model Year",value:e.model_year},{icon:"badge-check",label:"Condition",value:e.condition},{icon:"gauge",label:"Mileage",value:e.mileage},{icon:"cog",label:"Transmission",value:e.transmission},{icon:"fuel",label:"Fuel Type",value:e.fuel_type},{icon:"zap",label:"Engine",value:e.engine},{icon:"truck",label:"Drive Type",value:e.drive_type},{icon:"palette",label:"Colour",value:e.color},{icon:"package",label:"Payload Capacity",value:e.payload_capacity},{icon:"link",label:"Towing Capacity",value:e.towing_capacity},{icon:"barcode",label:"VIN",value:e.vin},{icon:"tag",label:"Stock Number",value:e.stock_number}].filter(r=>r.value!=null&&r.value!==""&&r.value!=="N/A"),d=e.features?.length?`
    <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Features</h3>
      <div class="flex flex-wrap gap-2">
        ${e.features.map(r=>`<span class="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700">${r}</span>`).join("")}
      </div>
    </div>`:"",s=`
    <div class="flex items-center gap-4 mb-6">
      <div class="flex items-center gap-1.5">
        <i data-lucide="star" class="w-5 h-5 fill-orange-500 text-orange-500"></i>
        <span class="text-lg font-bold text-white">${e.rating.toFixed(1)}</span>
        <span class="text-gray-500 text-sm">(${e.rating_count} ratings)</span>
      </div>
    </div>`;l.innerHTML=`
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-orange-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Trucks</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-300 truncate">${e.title}</span>
      </div>

      <!-- Title & ID -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-white leading-tight">${e.title}</h1>
          <p class="text-gray-500 text-sm mt-1">Stock #: <span class="text-orange-500 font-mono font-bold">${e.stock_number}</span> &middot; VIN: <span class="text-gray-400 font-mono">${e.vin}</span></p>
        </div>
        <div class="text-right shrink-0">
          <div class="text-3xl font-black text-orange-500">${i}</div>
          <span class="inline-block bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full mt-1">${e.condition} &middot; For Sale</span>
        </div>
      </div>

      ${s}

      <!-- Main Image -->
      <div class="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-900 mb-3 hero-zoom">
        <img id="hero-image" src="${e.images[0]}" alt="${e.title}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='${b}'">
        <span id="gallery-label" class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">${u[0]}</span>
      </div>

      <!-- Gallery -->
      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${n}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mb-8">
        <button id="buy-now-btn" class="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold py-3.5 rounded-xl uppercase text-sm tracking-wider transition flex items-center justify-center gap-2">
          <i data-lucide="shopping-bag" class="w-5 h-5"></i> Buy Now
        </button>
        <button id="share-btn" class="px-5 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Share">
          <i data-lucide="share-2" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Description -->
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-3">Description</h3>
        <p class="text-gray-400 text-sm leading-relaxed">${e.description}</p>
      </div>

      <!-- Truck Information -->
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Truck Information</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          ${m.map(r=>`
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-gray-500 text-xs"><i data-lucide="${r.icon}" class="w-3.5 h-3.5"></i>${r.label}</div>
              <div class="text-gray-200 font-medium text-sm">${r.value}</div>
            </div>
          `).join("")}
        </div>
      </div>

      ${d}
    </div>
  `;const v=document.getElementById("hero-image"),g=document.getElementById("gallery-label");l.querySelectorAll(".gallery-thumb").forEach((r,o)=>{r.addEventListener("click",()=>{l.querySelectorAll(".gallery-thumb").forEach(t=>t.classList.remove("active","border-orange-500")),l.querySelectorAll(".gallery-thumb").forEach(t=>t.classList.add("border-gray-800")),r.classList.add("active","border-orange-500"),r.classList.remove("border-gray-800"),v.src=r.dataset.img,g.textContent=u[o]||`View ${o+1}`})}),document.getElementById("buy-now-btn").addEventListener("click",async()=>{await f()?window.location.href=`/checkout.html?id=${e.property_id}`:(w(`/checkout.html?id=${e.property_id}`),window.location.href=`/auth.html?redirect=${encodeURIComponent("/checkout.html?id="+e.property_id)}`)}),document.getElementById("share-btn").addEventListener("click",async()=>{const r=window.location.href;try{if(navigator.share)await navigator.share({title:e.title,url:r});else{await navigator.clipboard.writeText(r);const o=document.getElementById("share-btn"),t=o.innerHTML;o.innerHTML='<i data-lucide="check" class="w-5 h-5"></i> Copied!',window.lucide&&lucide.createIcons(),setTimeout(()=>{o.innerHTML=t,window.lucide&&lucide.createIcons()},2e3)}}catch{}}),window.lucide&&lucide.createIcons()}function j(e){const l=document.getElementById("details-content"),i=e.listing_type==="property",n=_(e),u=T(e.country_code),m=e.images.map((t,a)=>`<button class="gallery-thumb rounded-lg overflow-hidden border-2 ${a===0?"active border-orange-500":"border-gray-800"} shrink-0" data-img="${t}">
      <img src="${t}" alt="View ${a+1}" loading="lazy" class="w-20 h-16 object-cover" onerror="this.onerror=null;this.src='${b}'">
    </button>`).join("");let d="";i?d=`
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Location</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${[{icon:"globe",label:"Country",value:`${u} ${e.country}`},{icon:"map-pin",label:"State / Province",value:e.state},{icon:"building",label:"City",value:e.city},{icon:"navigation",label:"Town / Local Area",value:e.town}].filter(a=>a.value).map(a=>`
            <div class="flex items-center gap-2.5 text-sm">
              <div class="p-2 bg-gray-800 rounded-lg"><i data-lucide="${a.icon}" class="w-4 h-4 text-orange-500"></i></div>
              <div><div class="text-gray-500 text-xs">${a.label}</div><div class="text-gray-200 font-medium">${a.value}</div></div>
            </div>
          `).join("")}
        </div>
        <div id="listing-map" class="mt-4 rounded-xl overflow-hidden border border-gray-800" style="height:280px"></div>
      </div>`:(e.listing_type==="vehicle"||e.listing_type==="product")&&(d=`
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Location</h3>
        <div class="flex items-center gap-2.5 text-sm">
          <div class="p-2 bg-gray-800 rounded-lg"><i data-lucide="map-pin" class="w-4 h-4 text-orange-500"></i></div>
          <div><div class="text-gray-500 text-xs">Location</div><div class="text-gray-200 font-medium">${e.city||e.state||e.country||"—"}${e.country?", "+e.country:""}</div></div>
        </div>
        <div id="listing-map" class="mt-4 rounded-xl overflow-hidden border border-gray-800" style="height:280px"></div>
      </div>`);let s="";i?s=`
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Property Information</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${[{icon:"bed-double",label:"Bedrooms",value:e.bedrooms},{icon:"bath",label:"Bathrooms",value:e.bathrooms},{icon:"building",label:"Building Size",value:e.building_size},{icon:"ruler",label:"Land Size",value:e.land_size},{icon:"car",label:"Parking Spaces",value:e.parking_spaces},{icon:"home",label:"Property Type",value:e.property_type},{icon:"sofa",label:"Furnished",value:e.furnished},{icon:"calendar",label:"Year Built",value:e.year_built},{icon:"tag",label:"Status",value:e.listing_status==="rent"?"For Rent":"For Sale"}].filter(a=>a.value!=null&&a.value!=="").map(a=>`
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-gray-500 text-xs"><i data-lucide="${a.icon}" class="w-3.5 h-3.5"></i>${a.label}</div>
              <div class="text-gray-200 font-medium text-sm">${a.value}</div>
            </div>
          `).join("")}
        </div>
      </div>`:e.category==="Motorhomes"?s=`
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Vehicle Information</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${[{icon:"factory",label:"Brand",value:e.brand},{icon:"car",label:"Model",value:e.model},{icon:"calendar",label:"Year",value:e.model_year},{icon:"badge-check",label:"Condition",value:e.condition},{icon:"gauge",label:"Mileage",value:e.mileage},{icon:"cog",label:"Transmission",value:e.transmission},{icon:"fuel",label:"Fuel Type",value:e.fuel_type},{icon:"zap",label:"Engine",value:e.engine},{icon:"bus",label:"Type",value:e.property_type},{icon:"moon",label:"Sleeping Capacity",value:e.sleeping_capacity},{icon:"users",label:"Seating Capacity",value:e.seating_capacity},{icon:"shower-head",label:"Bathroom",value:e.bathroom},{icon:"utensils",label:"Kitchen",value:e.kitchen},{icon:"droplet",label:"Water Tank",value:e.water_tank}].filter(a=>a.value!=null&&a.value!=="").map(a=>`
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-gray-500 text-xs"><i data-lucide="${a.icon}" class="w-3.5 h-3.5"></i>${a.label}</div>
              <div class="text-gray-200 font-medium text-sm">${a.value}</div>
            </div>
          `).join("")}
        </div>
      </div>`:e.listing_type==="product"&&(s=`
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Product Information</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${[{icon:"factory",label:"Brand",value:e.brand},{icon:"palette",label:"Colour",value:e.color},{icon:"ruler",label:"Size",value:e.size},{icon:"layers",label:"Material",value:e.material},{icon:"tag",label:"Status",value:"New"}].filter(a=>a.value!=null&&a.value!=="").map(a=>`
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-gray-500 text-xs"><i data-lucide="${a.icon}" class="w-3.5 h-3.5"></i>${a.label}</div>
              <div class="text-gray-200 font-medium text-sm">${a.value}</div>
            </div>
          `).join("")}
        </div>
      </div>`);const v=e.features?.length?`
    <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Features & Amenities</h3>
      <div class="flex flex-wrap gap-2">
        ${e.features.map(t=>`<span class="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700">${t}</span>`).join("")}
      </div>
    </div>`:"",g=`
    <div class="flex items-center gap-4 mb-6">
      <div class="flex items-center gap-1.5">
        <i data-lucide="star" class="w-5 h-5 fill-orange-500 text-orange-500"></i>
        <span class="text-lg font-bold text-white">${e.rating.toFixed(1)}</span>
        <span class="text-gray-500 text-sm">(${e.rating_count} ratings)</span>
      </div>
    </div>`;l.innerHTML=`
    <div class="fade-in">
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-orange-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>${e.category}</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-300 truncate">${e.title}</span>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-white leading-tight">${e.title}</h1>
          <p class="text-gray-500 text-sm mt-1">Property ID: <span class="text-orange-500 font-mono font-bold">${e.property_id}</span></p>
        </div>
        <div class="text-right shrink-0">
          <div class="text-3xl font-black text-orange-500">${n}</div>
          <span class="inline-block bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full mt-1">${e.listing_status==="rent"?"For Rent":"For Sale"}</span>
        </div>
      </div>

      ${g}

      <div class="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-900 mb-3 hero-zoom">
        <img id="hero-image" src="${e.images[0]}" alt="${e.title}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='${b}'">
      </div>

      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${m}
      </div>

      <div class="flex gap-3 mb-8">
        <button id="buy-now-btn" class="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold py-3.5 rounded-xl uppercase text-sm tracking-wider transition flex items-center justify-center gap-2">
          <i data-lucide="shopping-bag" class="w-5 h-5"></i> Buy Now
        </button>
        <button id="share-btn" class="px-5 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2" aria-label="Share">
          <i data-lucide="share-2" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-3">Description</h3>
        <p class="text-gray-400 text-sm leading-relaxed">${e.description}</p>
      </div>

      ${d}
      ${s}
      ${v}
    </div>
  `;const r=document.getElementById("hero-image");l.querySelectorAll(".gallery-thumb").forEach(t=>{t.addEventListener("click",()=>{l.querySelectorAll(".gallery-thumb").forEach(a=>a.classList.remove("active","border-orange-500")),l.querySelectorAll(".gallery-thumb").forEach(a=>a.classList.add("border-gray-800")),t.classList.add("active","border-orange-500"),t.classList.remove("border-gray-800"),r.src=t.dataset.img})}),document.getElementById("buy-now-btn").addEventListener("click",async()=>{await f()?window.location.href=`/checkout.html?id=${e.property_id}`:(w(`/checkout.html?id=${e.property_id}`),window.location.href=`/auth.html?redirect=${encodeURIComponent("/checkout.html?id="+e.property_id)}`)}),document.getElementById("share-btn").addEventListener("click",async()=>{const t=window.location.href;try{if(navigator.share)await navigator.share({title:e.title,url:t});else{await navigator.clipboard.writeText(t);const a=document.getElementById("share-btn"),p=a.innerHTML;a.innerHTML='<i data-lucide="check" class="w-5 h-5"></i> Copied!',window.lucide&&lucide.createIcons(),setTimeout(()=>{a.innerHTML=p,window.lucide&&lucide.createIcons()},2e3)}}catch{}}),window.lucide&&lucide.createIcons(),e.property_id,e.title,parseFloat(e.price),e.currency;const o=document.getElementById("listing-map");if(o&&window.L){const t=parseFloat(e.latitude)||null,a=parseFloat(e.longitude)||null,p=[e.town,e.city,e.state,e.country].filter(Boolean).join(", ");if(t&&a){const c=L.map(o).setView([t,a],13);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(c),L.marker([t,a]).addTo(c).bindPopup(e.title)}else p?fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(p)).then(c=>c.json()).then(c=>{if(c&&c[0]){const y=parseFloat(c[0].lat),x=parseFloat(c[0].lon),h=L.map(o).setView([y,x],12);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(h),L.marker([y,x]).addTo(h).bindPopup(e.title)}else o.style.display="none"}).catch(()=>{o.style.display="none"}):o.style.display="none"}}async function C(){const e=E();if(!e){document.getElementById("details-content").innerHTML='<div class="text-center py-20 text-gray-500">Listing not found.</div>';return}const l=B(e);if(l){document.title=`${l.title} | K.C.O Global Online Marketplace`,M(l);return}let i=$.find(n=>n.property_id===e);if(i||(await k(),i=I(e)),!i){document.getElementById("details-content").innerHTML='<div class="text-center py-20 text-gray-500">Listing not found.</div>';return}document.title=`${i.title} | K.C.O Global Online Marketplace`,j(i)}C();

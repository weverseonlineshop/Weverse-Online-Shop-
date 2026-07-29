import { SHOWROOM_LISTINGS, formatPrice, flagEmoji, findListingById, loadDBListings } from './showroom-data.js';
import { getTruckById, formatTruckPrice } from './truck-data.js';
import { getCurrentUser, setRedirectAfterAuth } from './auth.js';
import { trackEvent } from './analytics.js';

const FALLBACK_IMG = '/fallback.svg';

function getListingId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderTruck(listing) {
  const root = document.getElementById('details-content');
  const price = formatTruckPrice(listing);

  const galleryThumbs = listing.images.map((img, i) =>
    `<button class="gallery-thumb rounded-lg overflow-hidden border-2 ${i === 0 ? 'active border-orange-500' : 'border-gray-800'} shrink-0" data-img="${img}">
      <img src="${img}" alt="View ${i + 1}" loading="lazy" class="w-20 h-16 object-cover" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
    </button>`
  ).join('');

  const galleryLabels = [
    'Front View', 'Rear View', 'Left Side', 'Right Side',
    'Interior Dashboard', 'Driver Seat', 'Cargo Area / Truck Bed',
    'Engine', 'Wheels / Tires', 'Additional View'
  ];

  const specs = [
    { icon: 'building-2', label: 'Brand', value: listing.brand },
    { icon: 'car', label: 'Model', value: listing.model },
    { icon: 'calendar', label: 'Model Year', value: listing.model_year },
    { icon: 'badge-check', label: 'Condition', value: listing.condition },
    { icon: 'gauge', label: 'Mileage', value: listing.mileage },
    { icon: 'cog', label: 'Transmission', value: listing.transmission },
    { icon: 'fuel', label: 'Fuel Type', value: listing.fuel_type },
    { icon: 'zap', label: 'Engine', value: listing.engine },
    { icon: 'truck', label: 'Drive Type', value: listing.drive_type },
    { icon: 'palette', label: 'Colour', value: listing.color },
    { icon: 'package', label: 'Payload Capacity', value: listing.payload_capacity },
    { icon: 'link', label: 'Towing Capacity', value: listing.towing_capacity },
    { icon: 'barcode', label: 'VIN', value: listing.vin },
    { icon: 'tag', label: 'Stock Number', value: listing.stock_number },
  ].filter(s => s.value != null && s.value !== '' && s.value !== 'N/A');

  const featuresBlock = listing.features?.length ? `
    <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Features</h3>
      <div class="flex flex-wrap gap-2">
        ${listing.features.map(f => `<span class="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700">${f}</span>`).join('')}
      </div>
    </div>` : '';

  const ratingsBlock = `
    <div class="flex items-center gap-4 mb-6">
      <div class="flex items-center gap-1.5">
        <i data-lucide="star" class="w-5 h-5 fill-orange-500 text-orange-500"></i>
        <span class="text-lg font-bold text-white">${listing.rating.toFixed(1)}</span>
        <span class="text-gray-500 text-sm">(${listing.rating_count} ratings)</span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-orange-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Trucks</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-300 truncate">${listing.title}</span>
      </div>

      <!-- Title & ID -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-white leading-tight">${listing.title}</h1>
          <p class="text-gray-500 text-sm mt-1">Stock #: <span class="text-orange-500 font-mono font-bold">${listing.stock_number}</span> &middot; VIN: <span class="text-gray-400 font-mono">${listing.vin}</span></p>
        </div>
        <div class="text-right shrink-0">
          <div class="text-3xl font-black text-orange-500">${price}</div>
          <span class="inline-block bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full mt-1">${listing.condition} &middot; For Sale</span>
        </div>
      </div>

      ${ratingsBlock}

      <!-- Main Image -->
      <div class="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-900 mb-3 hero-zoom">
        <img id="hero-image" src="${listing.images[0]}" alt="${listing.title}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
        <span id="gallery-label" class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">${galleryLabels[0]}</span>
      </div>

      <!-- Gallery -->
      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${galleryThumbs}
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
        <p class="text-gray-400 text-sm leading-relaxed">${listing.description}</p>
      </div>

      <!-- Truck Information -->
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Truck Information</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          ${specs.map(s => `
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-gray-500 text-xs"><i data-lucide="${s.icon}" class="w-3.5 h-3.5"></i>${s.label}</div>
              <div class="text-gray-200 font-medium text-sm">${s.value}</div>
            </div>
          `).join('')}
        </div>
      </div>

      ${featuresBlock}
    </div>
  `;

  const hero = document.getElementById('hero-image');
  const label = document.getElementById('gallery-label');
  root.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      root.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active', 'border-orange-500'));
      root.querySelectorAll('.gallery-thumb').forEach(t => t.classList.add('border-gray-800'));
      thumb.classList.add('active', 'border-orange-500');
      thumb.classList.remove('border-gray-800');
      hero.src = thumb.dataset.img;
      label.textContent = galleryLabels[i] || `View ${i + 1}`;
    });
  });

  document.getElementById('buy-now-btn').addEventListener('click', async () => {
    const user = await getCurrentUser();
    if (user) {
      window.location.href = `/checkout.html?id=${listing.property_id}`;
    } else {
      setRedirectAfterAuth(`/checkout.html?id=${listing.property_id}`);
      window.location.href = `/auth.html?redirect=${encodeURIComponent('/checkout.html?id=' + listing.property_id)}`;
    }
  });

  document.getElementById('share-btn').addEventListener('click', async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: listing.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        const btn = document.getElementById('share-btn');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i> Copied!';
        if (window.lucide) lucide.createIcons();
        setTimeout(() => { btn.innerHTML = orig; if (window.lucide) lucide.createIcons(); }, 2000);
      }
    } catch (e) { /* user cancelled */ }
  });

  if (window.lucide) lucide.createIcons();
}

function render(listing) {
  const root = document.getElementById('details-content');
  const isProperty = listing.listing_type === 'property';
  const price = formatPrice(listing);
  const flag = flagEmoji(listing.country_code);

  const galleryThumbs = listing.images.map((img, i) =>
    `<button class="gallery-thumb rounded-lg overflow-hidden border-2 ${i === 0 ? 'active border-orange-500' : 'border-gray-800'} shrink-0" data-img="${img}">
      <img src="${img}" alt="View ${i + 1}" loading="lazy" class="w-20 h-16 object-cover" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
    </button>`
  ).join('');

  let locationBlock = '';
  if (isProperty) {
    const locItems = [
      { icon: 'globe', label: 'Country', value: `${flag} ${listing.country}` },
      { icon: 'map-pin', label: 'State / Province', value: listing.state },
      { icon: 'building', label: 'City', value: listing.city },
      { icon: 'navigation', label: 'Town / Local Area', value: listing.town },
    ].filter(item => item.value);
    locationBlock = `
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Location</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${locItems.map(item => `
            <div class="flex items-center gap-2.5 text-sm">
              <div class="p-2 bg-gray-800 rounded-lg"><i data-lucide="${item.icon}" class="w-4 h-4 text-orange-500"></i></div>
              <div><div class="text-gray-500 text-xs">${item.label}</div><div class="text-gray-200 font-medium">${item.value}</div></div>
            </div>
          `).join('')}
        </div>
        <div id="listing-map" class="mt-4 rounded-xl overflow-hidden border border-gray-800" style="height:280px"></div>
      </div>`;
  } else if (listing.listing_type === 'vehicle' || listing.listing_type === 'product') {
    locationBlock = `
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Location</h3>
        <div class="flex items-center gap-2.5 text-sm">
          <div class="p-2 bg-gray-800 rounded-lg"><i data-lucide="map-pin" class="w-4 h-4 text-orange-500"></i></div>
          <div><div class="text-gray-500 text-xs">Location</div><div class="text-gray-200 font-medium">${listing.city || listing.state || listing.country || '—'}${listing.country ? ', ' + listing.country : ''}</div></div>
        </div>
        <div id="listing-map" class="mt-4 rounded-xl overflow-hidden border border-gray-800" style="height:280px"></div>
      </div>`;
  }

  let specsBlock = '';
  if (isProperty) {
    const specs = [
      { icon: 'bed-double', label: 'Bedrooms', value: listing.bedrooms },
      { icon: 'bath', label: 'Bathrooms', value: listing.bathrooms },
      { icon: 'building', label: 'Building Size', value: listing.building_size },
      { icon: 'ruler', label: 'Land Size', value: listing.land_size },
      { icon: 'car', label: 'Parking Spaces', value: listing.parking_spaces },
      { icon: 'home', label: 'Property Type', value: listing.property_type },
      { icon: 'sofa', label: 'Furnished', value: listing.furnished },
      { icon: 'calendar', label: 'Year Built', value: listing.year_built },
      { icon: 'tag', label: 'Status', value: listing.listing_status === 'rent' ? 'For Rent' : 'For Sale' },
    ].filter(s => s.value != null && s.value !== '');
    specsBlock = `
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Property Information</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${specs.map(s => `
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-gray-500 text-xs"><i data-lucide="${s.icon}" class="w-3.5 h-3.5"></i>${s.label}</div>
              <div class="text-gray-200 font-medium text-sm">${s.value}</div>
            </div>
          `).join('')}
        </div>
      </div>`;
  } else if (listing.category === 'Motorhomes') {
    const specs = [
      { icon: 'factory', label: 'Brand', value: listing.brand },
      { icon: 'car', label: 'Model', value: listing.model },
      { icon: 'calendar', label: 'Year', value: listing.model_year },
      { icon: 'badge-check', label: 'Condition', value: listing.condition },
      { icon: 'gauge', label: 'Mileage', value: listing.mileage },
      { icon: 'cog', label: 'Transmission', value: listing.transmission },
      { icon: 'fuel', label: 'Fuel Type', value: listing.fuel_type },
      { icon: 'zap', label: 'Engine', value: listing.engine },
      { icon: 'bus', label: 'Type', value: listing.property_type },
      { icon: 'moon', label: 'Sleeping Capacity', value: listing.sleeping_capacity },
      { icon: 'users', label: 'Seating Capacity', value: listing.seating_capacity },
      { icon: 'shower-head', label: 'Bathroom', value: listing.bathroom },
      { icon: 'utensils', label: 'Kitchen', value: listing.kitchen },
      { icon: 'droplet', label: 'Water Tank', value: listing.water_tank },
    ].filter(s => s.value != null && s.value !== '');
    specsBlock = `
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Vehicle Information</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${specs.map(s => `
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-gray-500 text-xs"><i data-lucide="${s.icon}" class="w-3.5 h-3.5"></i>${s.label}</div>
              <div class="text-gray-200 font-medium text-sm">${s.value}</div>
            </div>
          `).join('')}
        </div>
      </div>`;
  } else if (listing.listing_type === 'product') {
    const specs = [
      { icon: 'factory', label: 'Brand', value: listing.brand },
      { icon: 'palette', label: 'Colour', value: listing.color },
      { icon: 'ruler', label: 'Size', value: listing.size },
      { icon: 'layers', label: 'Material', value: listing.material },
      { icon: 'tag', label: 'Status', value: 'New' },
    ].filter(s => s.value != null && s.value !== '');
    specsBlock = `
      <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Product Information</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${specs.map(s => `
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-1.5 text-gray-500 text-xs"><i data-lucide="${s.icon}" class="w-3.5 h-3.5"></i>${s.label}</div>
              <div class="text-gray-200 font-medium text-sm">${s.value}</div>
            </div>
          `).join('')}
        </div>
      </div>`;
  }

  const featuresBlock = listing.features?.length ? `
    <div class="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 mb-6">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4">Features & Amenities</h3>
      <div class="flex flex-wrap gap-2">
        ${listing.features.map(f => `<span class="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700">${f}</span>`).join('')}
      </div>
    </div>` : '';

  const ratingsBlock = `
    <div class="flex items-center gap-4 mb-6">
      <div class="flex items-center gap-1.5">
        <i data-lucide="star" class="w-5 h-5 fill-orange-500 text-orange-500"></i>
        <span class="text-lg font-bold text-white">${listing.rating.toFixed(1)}</span>
        <span class="text-gray-500 text-sm">(${listing.rating_count} ratings)</span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="fade-in">
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-orange-500 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>${listing.category}</span>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-gray-300 truncate">${listing.title}</span>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-white leading-tight">${listing.title}</h1>
          <p class="text-gray-500 text-sm mt-1">Property ID: <span class="text-orange-500 font-mono font-bold">${listing.property_id}</span></p>
        </div>
        <div class="text-right shrink-0">
          <div class="text-3xl font-black text-orange-500">${price}</div>
          <span class="inline-block bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full mt-1">${listing.listing_status === 'rent' ? 'For Rent' : 'For Sale'}</span>
        </div>
      </div>

      ${ratingsBlock}

      <div class="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-900 mb-3 hero-zoom">
        <img id="hero-image" src="${listing.images[0]}" alt="${listing.title}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
      </div>

      <div class="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
        ${galleryThumbs}
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
        <p class="text-gray-400 text-sm leading-relaxed">${listing.description}</p>
      </div>

      ${locationBlock}
      ${specsBlock}
      ${featuresBlock}
    </div>
  `;

  const hero = document.getElementById('hero-image');
  root.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      root.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active', 'border-orange-500'));
      root.querySelectorAll('.gallery-thumb').forEach(t => t.classList.add('border-gray-800'));
      thumb.classList.add('active', 'border-orange-500');
      thumb.classList.remove('border-gray-800');
      hero.src = thumb.dataset.img;
    });
  });

  document.getElementById('buy-now-btn').addEventListener('click', async () => {
    const user = await getCurrentUser();
    if (user) {
      window.location.href = `/checkout.html?id=${listing.property_id}`;
    } else {
      setRedirectAfterAuth(`/checkout.html?id=${listing.property_id}`);
      window.location.href = `/auth.html?redirect=${encodeURIComponent('/checkout.html?id=' + listing.property_id)}`;
    }
  });

  document.getElementById('share-btn').addEventListener('click', async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: listing.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        const btn = document.getElementById('share-btn');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i> Copied!';
        if (window.lucide) lucide.createIcons();
        setTimeout(() => { btn.innerHTML = orig; if (window.lucide) lucide.createIcons(); }, 2000);
      }
    } catch (e) { /* user cancelled */ }
  });

  if (window.lucide) lucide.createIcons();

  trackEvent('view_item', { item_id: listing.property_id, item_name: listing.title, value: parseFloat(listing.price) || 0, currency: listing.currency || 'USD' });

  const mapEl = document.getElementById('listing-map');
  if (mapEl && window.L) {
    const lat = parseFloat(listing.latitude) || null;
    const lng = parseFloat(listing.longitude) || null;
    const query = [listing.town, listing.city, listing.state, listing.country].filter(Boolean).join(', ');
    if (lat && lng) {
      const map = L.map(mapEl).setView([lat, lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
      L.marker([lat, lng]).addTo(map).bindPopup(listing.title);
    } else if (query) {
      fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(query))
        .then(r => r.json())
        .then(data => {
          if (data && data[0]) {
            const ml = parseFloat(data[0].lat);
            const mln = parseFloat(data[0].lon);
            const map = L.map(mapEl).setView([ml, mln], 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
            L.marker([ml, mln]).addTo(map).bindPopup(listing.title);
          } else {
            mapEl.style.display = 'none';
          }
        })
        .catch(() => { mapEl.style.display = 'none'; });
    } else {
      mapEl.style.display = 'none';
    }
  }
}

async function init() {
  const id = getListingId();
  if (!id) {
    document.getElementById('details-content').innerHTML = '<div class="text-center py-20 text-gray-500">Listing not found.</div>';
    return;
  }

  const truck = getTruckById(id);
  if (truck) {
    document.title = `${truck.title} | K.C.O Global Online Marketplace`;
    renderTruck(truck);
    return;
  }

  let listing = SHOWROOM_LISTINGS.find(l => l.property_id === id);
  if (!listing) {
    // Try loading from the database (AI-created products)
    await loadDBListings();
    listing = findListingById(id);
  }
  if (!listing) {
    document.getElementById('details-content').innerHTML = '<div class="text-center py-20 text-gray-500">Listing not found.</div>';
    return;
  }
  document.title = `${listing.title} | K.C.O Global Online Marketplace`;
  render(listing);
}

init();

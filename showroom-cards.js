import { SHOWROOM_LISTINGS, formatPrice, flagEmoji, getListingsByIds, getDBListings, loadDBListings } from './showroom-data.js';
import { TRUCK_LISTINGS, formatTruckPrice } from './truck-data.js';
import { getCurrentUser, setRedirectAfterAuth } from './auth.js';

const FALLBACK_IMG = '/fallback.svg';

// ── Section 1: Real Estate & Vehicles ──
// Each listing ID appears in exactly ONE row — no overlaps, no duplicates.
const REAL_ESTATE_SECTIONS = [
  {
    id: 'local-houses', label: 'Local Houses & Real Estate', icon: 'home',
    subtitle: 'Affordable homes, apartments, and land for sale or rent near you.',
    rows: [
      { id: 'affordable-homes', label: 'Affordable Homes', icon: 'home', ids: ['KCO-000001', 'KCO-000013', 'KCO-000016'] },
      { id: 'apartment-homes', label: 'Apartments', icon: 'building', ids: ['KCO-000006'] },
      { id: 'cape-cod', label: 'Cape Cod & Duplex', icon: 'house', ids: ['KCO-000003', 'KCO-000004'] },
      { id: 'beach-houses', label: 'Beach Houses', icon: 'palmtree', ids: ['KCO-000009', 'KCO-000015'] },
    ],
  },
  {
    id: 'modern-luxury', label: 'Modern Homes & Luxury Properties', icon: 'building-2',
    subtitle: 'Contemporary villas, mansions, and new-build family homes.',
    rows: [
      { id: 'new-homes', label: 'New Homes', icon: 'home', ids: ['KCO-000021', 'KCO-000022', 'KCO-000023', 'KCO-000024', 'KCO-000025', 'KCO-000026', 'KCO-000027', 'KCO-000028', 'KCO-000029', 'KCO-000030'] },
      { id: 'modern-homes', label: 'Modern Homes', icon: 'building-2', ids: ['KCO-000007', 'KCO-000010'] },
      { id: 'mansion-homes', label: 'Mansions', icon: 'landmark', ids: ['KCO-000008'] },
      { id: 'farm-house', label: 'Farm Houses', icon: 'wheat', ids: ['KCO-000011'] },
    ],
  },
  {
    id: 'commercial-land', label: 'Commercial Properties & Land', icon: 'briefcase',
    subtitle: 'Retail buildings, hotels, and investment-grade commercial real estate.',
    rows: [
      { id: 'commercial', label: 'Commercial Buildings', icon: 'store', ids: ['KCO-000012'] },
      { id: 'hotels', label: 'Hotels & Hospitality', icon: 'bed-double', ids: ['KCO-000014'] },
    ],
  },
  {
    id: 'cars-motorcycles', label: 'Cars & Motorcycles', icon: 'car-front',
    subtitle: 'New and pre-owned vehicles from trusted sellers worldwide.',
    rows: [
      { id: 'new-cars', label: 'New Cars', icon: 'car-front', ids: ['KCO-000018'] },
      { id: 'used-cars', label: 'Used Cars', icon: 'car', ids: ['KCO-000017'] },
    ],
  },
  {
    id: 'trucks-buses', label: 'Trucks & Buses', icon: 'truck',
    subtitle: 'Heavy-duty trucks and commercial transport vehicles.',
    rows: [
      { id: 'all-trucks', label: 'All Trucks', icon: 'truck', allTrucks: true },
    ],
  },
  {
    id: 'motorhomes-boats', label: 'Motorhomes & Boats', icon: 'bus',
    subtitle: 'Luxury motorhomes, RVs, and marine vehicles for travel and adventure.',
    rows: [
      { id: 'motorhomes', label: 'Motorhomes', icon: 'bus', ids: ['KCO-000019', 'KCO-000020', 'KCO-000031', 'KCO-000032', 'KCO-000033', 'KCO-000034', 'KCO-000035'] },
    ],
  },
  {
    id: 'heavy-equipment', label: 'Heavy Equipment & Auto Parts', icon: 'wrench',
    subtitle: 'Construction machinery, heavy equipment, and quality auto parts.',
    rows: [
      { id: 'heavy-equipment-all', label: 'Heavy Equipment', icon: 'tractor', ids: [] },
      { id: 'auto-parts-all', label: 'Auto Parts', icon: 'wrench', ids: [] },
    ],
  },
];

// ── Section 2: Shopping Marketplace ──
// Every other marketplace category. Empty ids arrays show "Coming Soon".
const MARKETPLACE_SECTIONS = [
  { id: 'mp-men', label: 'Men', icon: 'shirt', subtitle: 'Apparel, footwear, and accessories for men.', rows: [{ id: 'mp-men-all', label: 'All Men', icon: 'shirt', ids: ['KCO-000036','KCO-000037','KCO-000038','KCO-000039','KCO-000040','KCO-000041','KCO-000042','KCO-000043','KCO-000044','KCO-000045','KCO-000046','KCO-000047','KCO-000048','KCO-000049','KCO-000050','KCO-000051','KCO-000052','KCO-000053','KCO-000054','KCO-000055','KCO-000056','KCO-000057','KCO-000058','KCO-000059','KCO-000060','KCO-000061','KCO-000062','KCO-000063','KCO-000064','KCO-000065','KCO-000066','KCO-000067','KCO-000068','KCO-000069','KCO-000070'] }] },
  { id: 'mp-women', label: 'Women', icon: 'shirt', subtitle: 'Fashion, footwear, and accessories for women.', rows: [{ id: 'mp-women-all', label: 'All Women', icon: 'shirt', ids: ['KCO-000071','KCO-000072','KCO-000073','KCO-000074','KCO-000075','KCO-000076','KCO-000077','KCO-000078','KCO-000079','KCO-000080','KCO-000081','KCO-000082','KCO-000083','KCO-000084','KCO-000085','KCO-000086','KCO-000087','KCO-000088','KCO-000089','KCO-000090','KCO-000091','KCO-000092','KCO-000093','KCO-000094','KCO-000095','KCO-000096','KCO-000097','KCO-000098','KCO-000099','KCO-000100','KCO-000101','KCO-000102','KCO-000103','KCO-000104','KCO-000105'] }] },
  { id: 'mp-kids', label: 'Kids', icon: 'baby', subtitle: 'Clothing, toys, and essentials for children.', rows: [{ id: 'mp-kids-all', label: 'All Kids', icon: 'baby', ids: [] }] },
  { id: 'mp-fashion', label: 'Fashion', icon: 'shirt', subtitle: 'Trendy apparel and designer fashion for everyone.', rows: [{ id: 'mp-fashion-all', label: 'All Fashion', icon: 'shirt', ids: [] }] },
  { id: 'mp-jewelry', label: 'Jewelry', icon: 'gem', subtitle: 'Fine jewelry, watches, and luxury accessories.', rows: [{ id: 'mp-jewelry-all', label: 'All Jewelry', icon: 'gem', ids: [] }] },
  { id: 'mp-beauty', label: 'Beauty', icon: 'sparkles', subtitle: 'Skincare, makeup, and personal care products.', rows: [{ id: 'mp-beauty-all', label: 'All Beauty', icon: 'sparkles', ids: [] }] },
  { id: 'mp-home', label: 'Home', icon: 'home', subtitle: 'Everything for your living space and home decor.', rows: [{ id: 'mp-home-all', label: 'All Home', icon: 'home', ids: [] }] },
  { id: 'mp-furniture', label: 'Furniture', icon: 'armchair', subtitle: 'Stylish furniture for every room in your home.', rows: [{ id: 'mp-furniture-all', label: 'All Furniture', icon: 'armchair', ids: [] }] },
  { id: 'mp-kitchen', label: 'Kitchen', icon: 'utensils', subtitle: 'Cookware, dining, and kitchen essentials.', rows: [{ id: 'mp-kitchen-all', label: 'All Kitchen', icon: 'utensils', ids: [] }] },
  { id: 'mp-appliances', label: 'Home Appliances', icon: 'refrigerator', subtitle: 'Reliable appliances to power your home.', rows: [{ id: 'mp-appliances-all', label: 'All Home Appliances', icon: 'refrigerator', ids: [] }] },
  { id: 'mp-electronics', label: 'Electronics', icon: 'cpu', subtitle: 'Latest electronics and gadgets for tech lovers.', rows: [{ id: 'mp-electronics-all', label: 'All Electronics', icon: 'cpu', ids: [] }] },
  { id: 'mp-phones', label: 'Phones', icon: 'smartphone', subtitle: 'Smartphones and mobile accessories from top brands.', rows: [{ id: 'mp-phones-all', label: 'All Phones', icon: 'smartphone', ids: [] }] },
  { id: 'mp-computers', label: 'Computers', icon: 'monitor', subtitle: 'Laptops, desktops, and computing accessories.', rows: [{ id: 'mp-computers-all', label: 'All Computers', icon: 'monitor', ids: [] }] },
  { id: 'mp-gaming', label: 'Gaming', icon: 'gamepad-2', subtitle: 'Consoles, games, and gaming accessories.', rows: [{ id: 'mp-gaming-all', label: 'All Gaming', icon: 'gamepad-2', ids: [] }] },
  { id: 'mp-sports', label: 'Sports', icon: 'dumbbell', subtitle: 'Sporting goods and fitness equipment for athletes.', rows: [{ id: 'mp-sports-all', label: 'All Sports', icon: 'dumbbell', ids: [] }] },
  { id: 'mp-food', label: 'Food & Groceries', icon: 'shopping-basket', subtitle: 'Fresh food, groceries, and everyday essentials.', rows: [{ id: 'mp-food-all', label: 'All Food & Groceries', icon: 'shopping-basket', ids: [] }] },
  { id: 'mp-baby', label: 'Baby', icon: 'baby', subtitle: 'Baby care products, clothing, and nursery items.', rows: [{ id: 'mp-baby-all', label: 'All Baby', icon: 'baby', ids: [] }] },
  { id: 'mp-pets', label: 'Pets', icon: 'paw-print', subtitle: 'Pet food, supplies, and accessories for your animals.', rows: [{ id: 'mp-pets-all', label: 'All Pets', icon: 'paw-print', ids: [] }] },
  { id: 'mp-agriculture', label: 'Agriculture', icon: 'wheat', subtitle: 'Seeds, tools, and equipment for farming.', rows: [{ id: 'mp-agriculture-all', label: 'All Agriculture', icon: 'wheat', ids: [] }] },
  { id: 'mp-books', label: 'Books', icon: 'book-open', subtitle: 'Bestsellers, textbooks, and digital reading.', rows: [{ id: 'mp-books-all', label: 'All Books', icon: 'book-open', ids: [] }] },
  { id: 'mp-office', label: 'Office', icon: 'briefcase', subtitle: 'Office supplies, stationery, and business essentials.', rows: [{ id: 'mp-office-all', label: 'All Office', icon: 'briefcase', ids: [] }] },
  { id: 'mp-business', label: 'Business & Industrial', icon: 'factory', subtitle: 'Industrial equipment and business supplies.', rows: [{ id: 'mp-business-all', label: 'All Business & Industrial', icon: 'factory', ids: [] }] },
  { id: 'mp-health', label: 'Health & Medical', icon: 'heart-pulse', subtitle: 'Health, wellness, and medical supplies.', rows: [{ id: 'mp-health-all', label: 'All Health & Medical', icon: 'heart-pulse', ids: [] }] },
  { id: 'mp-music', label: 'Musical Instruments', icon: 'music', subtitle: 'Instruments and gear for musicians.', rows: [{ id: 'mp-music-all', label: 'All Musical Instruments', icon: 'music', ids: [] }] },
  { id: 'mp-arts', label: 'Arts & Crafts', icon: 'palette', subtitle: 'Art supplies, crafts, and creative materials.', rows: [{ id: 'mp-arts-all', label: 'All Arts & Crafts', icon: 'palette', ids: [] }] },
  { id: 'mp-toys', label: 'Toys & Hobbies', icon: 'toy-brick', subtitle: 'Toys, games, and hobby supplies for all ages.', rows: [{ id: 'mp-toys-all', label: 'All Toys & Hobbies', icon: 'toy-brick', ids: [] }] },
  { id: 'mp-travel', label: 'Travel & Luggage', icon: 'plane', subtitle: 'Luggage, travel accessories, and outdoor gear.', rows: [{ id: 'mp-travel-all', label: 'All Travel & Luggage', icon: 'plane', ids: [] }] },
  { id: 'mp-watches', label: 'Watches & Accessories', icon: 'watch', subtitle: 'Premium watches and stylish accessories.', rows: [{ id: 'mp-watches-all', label: 'All Watches & Accessories', icon: 'watch', ids: [] }] },
  { id: 'mp-garden', label: 'Garden & Outdoor', icon: 'trees', subtitle: 'Garden tools, outdoor decor, and patio essentials.', rows: [{ id: 'mp-garden-all', label: 'All Garden & Outdoor', icon: 'trees', ids: [] }] },
  { id: 'mp-party', label: 'Party & Event Supplies', icon: 'party-popper', subtitle: 'Decorations and supplies for celebrations.', rows: [{ id: 'mp-party-all', label: 'All Party & Event Supplies', icon: 'party-popper', ids: [] }] },
  { id: 'mp-cameras', label: 'Cameras & Photography', icon: 'camera', subtitle: 'Cameras, lenses, and photography gear.', rows: [{ id: 'mp-cameras-all', label: 'All Cameras & Photography', icon: 'camera', ids: [] }] },
  { id: 'mp-software', label: 'Software & Digital Products', icon: 'download', subtitle: 'Software licenses, apps, and digital downloads.', rows: [{ id: 'mp-software-all', label: 'All Software & Digital', icon: 'download', ids: [] }] },
  { id: 'mp-collectibles', label: 'Collectibles & Memorabilia', icon: 'medal', subtitle: 'Rare collectibles and valuable memorabilia.', rows: [{ id: 'mp-collectibles-all', label: 'All Collectibles', icon: 'medal', ids: [] }] },
  { id: 'mp-safety', label: 'Safety & Security', icon: 'shield-check', subtitle: 'Security systems and safety equipment.', rows: [{ id: 'mp-safety-all', label: 'All Safety & Security', icon: 'shield-check', ids: [] }] },
  { id: 'mp-fitness', label: 'Fitness Equipment', icon: 'dumbbell', subtitle: 'Home gym and professional fitness equipment.', rows: [{ id: 'mp-fitness-all', label: 'All Fitness Equipment', icon: 'dumbbell', ids: [] }] },
  { id: 'mp-camping', label: 'Camping & Hiking', icon: 'tent', subtitle: 'Outdoor gear for camping and hiking adventures.', rows: [{ id: 'mp-camping-all', label: 'All Camping & Hiking', icon: 'tent', ids: [] }] },
  { id: 'mp-pool', label: 'Pool & Spa', icon: 'waves', subtitle: 'Pool, spa, and hot tub supplies and equipment.', rows: [{ id: 'mp-pool-all', label: 'All Pool & Spa', icon: 'waves', ids: [] }] },
  { id: 'mp-industrial', label: 'Industrial Tools & Equipment', icon: 'hammer', subtitle: 'Professional tools and industrial machinery.', rows: [{ id: 'mp-industrial-all', label: 'All Industrial Tools', icon: 'hammer', ids: [] }] },
  { id: 'mp-packaging', label: 'Packaging & Shipping Supplies', icon: 'package', subtitle: 'Boxes, mailers, and shipping materials.', rows: [{ id: 'mp-packaging-all', label: 'All Packaging & Shipping', icon: 'package', ids: [] }] },
  { id: 'mp-cleaning', label: 'Cleaning Supplies', icon: 'spray-can', subtitle: 'Cleaning products and janitorial supplies.', rows: [{ id: 'mp-cleaning-all', label: 'All Cleaning Supplies', icon: 'spray-can', ids: [] }] },
  { id: 'mp-religious', label: 'Religious & Spiritual Items', icon: 'church', subtitle: 'Religious items and spiritual products.', rows: [{ id: 'mp-religious-all', label: 'All Religious & Spiritual', icon: 'church', ids: [] }] },
  { id: 'mp-flowers', label: 'Flowers & Gifts', icon: 'flower', subtitle: 'Fresh flowers, bouquets, and gift items.', rows: [{ id: 'mp-flowers-all', label: 'All Flowers & Gifts', icon: 'flower', ids: [] }] },
  { id: 'mp-luxury', label: 'Luxury Goods', icon: 'crown', subtitle: 'Exclusive luxury items and premium goods.', rows: [{ id: 'mp-luxury-all', label: 'All Luxury Goods', icon: 'crown', ids: [] }] },
  { id: 'mp-wedding', label: 'Wedding Supplies', icon: 'heart', subtitle: 'Everything for your special day.', rows: [{ id: 'mp-wedding-all', label: 'All Wedding Supplies', icon: 'heart', ids: [] }] },
  { id: 'mp-costumes', label: 'Costumes & Cosplay', icon: 'theater', subtitle: 'Costumes, cosplay outfits, and accessories.', rows: [{ id: 'mp-costumes-all', label: 'All Costumes & Cosplay', icon: 'theater', ids: [] }] },
  { id: 'mp-coins', label: 'Coins & Bullion', icon: 'circle-dollar-sign', subtitle: 'Gold, silver coins, and precious metal bullion.', rows: [{ id: 'mp-coins-all', label: 'All Coins & Bullion', icon: 'circle-dollar-sign', ids: [] }] },
  { id: 'mp-fireplace', label: 'Fireplace & Heating', icon: 'flame', subtitle: 'Fireplaces, heaters, and home heating solutions.', rows: [{ id: 'mp-fireplace-all', label: 'All Fireplace & Heating', icon: 'flame', ids: [] }] },
  { id: 'mp-marine', label: 'Marine & Boating', icon: 'sailboat', subtitle: 'Boats, marine parts, and boating accessories.', rows: [{ id: 'mp-marine-all', label: 'All Marine & Boating', icon: 'sailboat', ids: [] }] },
  { id: 'mp-rv', label: 'RV & Camper Accessories', icon: 'bus', subtitle: 'Parts and accessories for RVs and campers.', rows: [{ id: 'mp-rv-all', label: 'All RV & Camper', icon: 'bus', ids: [] }] },
  { id: 'mp-educational', label: 'Educational Supplies', icon: 'graduation-cap', subtitle: 'Learning materials and educational resources.', rows: [{ id: 'mp-educational-all', label: 'All Educational Supplies', icon: 'graduation-cap', ids: [] }] },
  { id: 'mp-funeral', label: 'Funeral & Memorial Supplies', icon: 'flower', subtitle: 'Memorial products and funeral supplies.', rows: [{ id: 'mp-funeral-all', label: 'All Funeral & Memorial', icon: 'flower', ids: [] }] },
  { id: 'mp-bicycles', label: 'Bicycles', icon: 'bike', subtitle: 'Bicycles, e-bikes, and cycling accessories.', rows: [{ id: 'mp-bicycles-all', label: 'All Bicycles', icon: 'bike', ids: [] }] },
  { id: 'mp-future', label: 'Future Categories', icon: 'sparkles', subtitle: 'New categories coming soon to the marketplace.', rows: [{ id: 'mp-future-all', label: 'Coming Soon', icon: 'sparkles', ids: [] }] },
];

// ── Card rendering ──
export function renderCard(listing) {
  const isProperty = listing.listing_type === 'property';
  const isTruck = listing.listing_type === 'vehicle' && listing.category === 'Trucks';
  const listingId = listing.id || listing.property_id;
  const cover = listing.images?.[0] || FALLBACK_IMG;
  const price = isTruck ? formatTruckPrice(listing) : formatPrice(listing);
  const statusBadge = listing.listing_type === 'product' ? 'New' : (listing.listing_status === 'rent' ? 'For Rent' : 'For Sale');

  let locationHtml = '';
  if (isProperty) {
    const flag = flagEmoji(listing.country_code);
    const parts = [listing.city, listing.state].filter(Boolean);
    locationHtml = `<div class="flex items-center gap-1 text-gray-500 text-[11px] mb-1.5 truncate"><span>${flag}</span><span class="truncate">${parts.join(', ') || listing.country}</span></div>`;
  }

  let specsHtml = '';
  if (isProperty) {
    const specs = [];
    if (listing.bedrooms != null) specs.push(`<span class="flex items-center gap-0.5"><i data-lucide="bed-double" class="w-3 h-3"></i>${listing.bedrooms}</span>`);
    if (listing.bathrooms != null) specs.push(`<span class="flex items-center gap-0.5"><i data-lucide="bath" class="w-3 h-3"></i>${listing.bathrooms}</span>`);
    if (listing.land_size) specs.push(`<span class="flex items-center gap-0.5"><i data-lucide="ruler" class="w-3 h-3"></i>${listing.land_size}</span>`);
    if (specs.length) specsHtml = `<div class="flex items-center gap-2 text-gray-500 text-[11px] mb-2">${specs.join('')}</div>`;
  } else if (isTruck) {
    const specs = [];
    specs.push(`<span class="flex items-center gap-0.5"><i data-lucide="calendar" class="w-3 h-3"></i>${listing.model_year}</span>`);
    specs.push(`<span class="flex items-center gap-0.5"><i data-lucide="gauge" class="w-3 h-3"></i>${listing.mileage}</span>`);
    if (specs.length) specsHtml = `<div class="flex items-center gap-2 text-gray-500 text-[11px] mb-2">${specs.join('')}</div>`;
  } else if (listing.listing_type === 'product') {
    const specs = [];
    if (listing.brand) specs.push(`<span class="flex items-center gap-0.5"><i data-lucide="factory" class="w-3 h-3"></i>${listing.brand}</span>`);
    if (listing.color) specs.push(`<span class="flex items-center gap-0.5"><i data-lucide="palette" class="w-3 h-3"></i>${listing.color}</span>`);
    if (listing.size) specs.push(`<span class="flex items-center gap-0.5"><i data-lucide="ruler" class="w-3 h-3"></i>${listing.size}</span>`);
    if (specs.length) specsHtml = `<div class="flex items-center gap-2 text-gray-500 text-[11px] mb-2 flex-wrap">${specs.join('')}</div>`;
  }

  const ratingStars = listing.rating > 0
    ? `<div class="flex items-center gap-0.5 text-[11px]"><i data-lucide="star" class="w-3 h-3 fill-orange-500 text-orange-500"></i><span class="text-gray-300 font-medium">${listing.rating.toFixed(1)}</span><span class="text-gray-600">(${listing.rating_count})</span></div>`
    : '';

  const card = document.createElement('div');
  card.className = 'showroom-card group relative bg-[#0f172a]/80 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 flex flex-col';
  card.dataset.id = listingId;

  card.innerHTML = `
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-900">
      <img src="${cover}" alt="${listing.title}" loading="lazy" decoding="async"
           class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
           onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
      <span class="absolute top-1.5 left-1.5 bg-orange-500 text-black text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full">${statusBadge}</span>
    </div>
    <div class="p-2.5 flex flex-col flex-1">
      <h3 class="text-xs font-bold text-white leading-tight mb-1 line-clamp-2">${listing.title}</h3>
      ${locationHtml}
      ${specsHtml}
      <div class="flex items-center justify-between mt-auto pt-1.5">
        <span class="text-sm font-black text-orange-500">${price}</span>
        ${ratingStars}
      </div>
      <div class="flex gap-1.5 mt-2">
        <button class="view-btn flex-1 bg-gray-800 hover:bg-gray-700 text-white text-[10px] font-bold py-1.5 rounded-lg transition uppercase tracking-wide flex items-center justify-center gap-1">
          <i data-lucide="eye" class="w-3 h-3"></i> View
        </button>
        <button class="buy-btn flex-1 bg-orange-500 hover:bg-orange-600 text-black text-[10px] font-bold py-1.5 rounded-lg transition uppercase tracking-wide flex items-center justify-center gap-1">
          <i data-lucide="shopping-bag" class="w-3 h-3"></i> Buy Now
        </button>
      </div>
    </div>
  `;

  card.querySelector('.view-btn').addEventListener('click', () => {
    window.location.href = `/details.html?id=${listing.property_id}`;
  });
  card.querySelector('.buy-btn').addEventListener('click', () => handleBuyNow(listing));

  return card;
}

async function handleBuyNow(listing) {
  const user = await getCurrentUser();
  if (user) {
    window.location.href = `/checkout.html?id=${listing.property_id}`;
  } else {
    setRedirectAfterAuth(`/checkout.html?id=${listing.property_id}`);
    window.location.href = `/auth.html?redirect=${encodeURIComponent('/checkout.html?id=' + listing.property_id)}`;
  }
}

// ── Row rendering ──
function scrollRow(row, dir) {
  const track = row.querySelector('.hscroll');
  if (!track) return;
  track.scrollBy({ left: dir * 220 * 3, behavior: 'smooth' });
}

function renderRow(rowDef) {
  let listings;
  if (rowDef.allTrucks) {
    listings = TRUCK_LISTINGS;
  } else {
    listings = getListingsByIds(rowDef.ids);
  }
  const hasItems = listings.length > 0;

  const row = document.createElement('div');
  row.className = 'showroom-row relative';
  row.dataset.rowId = rowDef.id;

  row.innerHTML = `
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <i data-lucide="${rowDef.icon}" class="w-3.5 h-3.5 text-orange-500/80"></i>
        <h4 class="text-xs font-semibold text-gray-300 tracking-wide">${rowDef.label}</h4>
      </div>
      <div class="flex items-center gap-1 ${hasItems ? '' : 'hidden'}">
        <button class="scroll-left hscroll-btn p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition" aria-label="Scroll left">
          <i data-lucide="chevron-left" class="w-4 h-4"></i>
        </button>
        <button class="scroll-right hscroll-btn p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition" aria-label="Scroll right">
          <i data-lucide="chevron-right" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
    <div class="hscroll flex gap-3 overflow-x-auto scrollbar-none pb-1"></div>
  `;

  const track = row.querySelector('.hscroll');

  if (hasItems) {
    const frag = document.createDocumentFragment();
    listings.forEach(listing => frag.appendChild(renderCard(listing)));
    track.appendChild(frag);
  } else {
    track.innerHTML = `<div class="flex items-center justify-center w-full py-6 text-gray-600 text-xs uppercase tracking-widest">Coming Soon</div>`;
  }

  row.querySelector('.scroll-left')?.addEventListener('click', () => scrollRow(row, -1));
  row.querySelector('.scroll-right')?.addEventListener('click', () => scrollRow(row, 1));

  return row;
}

// ── Section rendering ──
// Clean section headings introduce each category; products flow continuously.
function renderSection(section, accentColor) {
  const sec = document.createElement('div');
  sec.className = 'showroom-section space-y-3';

  const accentText = accentColor === 'blue' ? 'text-blue-300' : 'text-emerald-300';
  const accentBg = accentColor === 'blue' ? 'bg-blue-500/10 border-blue-500/25' : 'bg-emerald-500/10 border-emerald-500/25';

  const header = document.createElement('div');
  header.className = 'flex items-center gap-3';
  header.innerHTML = `
    <div class="p-2 rounded-lg border ${accentBg} shrink-0">
      <i data-lucide="${section.icon}" class="w-4 h-4 ${accentText}"></i>
    </div>
    <div class="flex-1 min-w-0">
      <h3 class="text-base sm:text-lg font-black text-white tracking-tight leading-tight">${section.label}</h3>
      <p class="text-gray-500 text-[11px] leading-tight mt-0.5 truncate">${section.subtitle}</p>
    </div>
    <div class="flex-1 h-px bg-gradient-to-r from-gray-700/60 to-transparent ml-2 hidden sm:block"></div>
  `;
  sec.appendChild(header);

  section.rows.forEach(rowDef => {
    sec.appendChild(renderRow(rowDef));
  });

  return sec;
}

// ── Grid rendering ──
function renderGrid(gridName) {
  const container = document.querySelector(`[data-showroom-grid="${gridName}"]`);
  if (!container || container.dataset.initialized) return;
  container.dataset.initialized = 'true';
  container.innerHTML = '';

  const sections = gridName === 'real-estate' ? REAL_ESTATE_SECTIONS : MARKETPLACE_SECTIONS;
  const accent = gridName === 'real-estate' ? 'blue' : 'emerald';

  sections.forEach(section => {
    container.appendChild(renderSection(section, accent));
  });

  if (window.lucide) lucide.createIcons();
}

// ── Category filtering ──
function collectAllRows() {
  return [...REAL_ESTATE_SECTIONS, ...MARKETPLACE_SECTIONS]
    .flatMap(s => s.rows.map(r => ({ section: s, row: r })));
}

function categoryMatches(catName, sectionLabel, rowLabel) {
  if (catName === 'All') return true;
  const n = catName.toLowerCase();
  const s = (sectionLabel || '').toLowerCase();
  const r = (rowLabel || '').toLowerCase();
  const keywords = {
    'women': ['women', 'woman'], 'men': ['men', 'man'], 'kids': ['kids', 'kid', 'child', 'baby'],
    'home': ['home'], 'sports': ['sport', 'fitness', 'gym', 'athletic'], 'jewellery': ['jewel'],
    'electronics': ['electronic', 'gadget'], 'cars': ['car'], 'motorcycles': ['motorcycle', 'motor'],
    'phones': ['phone', 'smartphone', 'mobile'], 'computers': ['computer', 'laptop', 'monitor'],
    'furniture': ['furniture', 'armchair', 'chair', 'table', 'sofa'], 'beauty': ['beauty', 'cosmetic', 'makeup', 'skincare'],
    'fashion': ['fashion', 'apparel', 'clothing'], 'real estate': ['real estate', 'house', 'property', 'apartment', 'villa'],
    'bicycles': ['bicycle', 'bike', 'cycling'], 'trucks': ['truck'], 'land': ['land', 'commercial'],
    'kitchen': ['kitchen', 'cookware', 'utensil'], 'food': ['food', 'grocer', 'groceries'],
    'pets': ['pet'], 'books': ['book'], 'toys': ['toy', 'game', 'hobby'], 'services': ['service', 'industrial', 'equipment'],
  };
  const kws = keywords[n] || [n];
  return kws.some(k => s.includes(k) || r.includes(k));
}

export function filterShowroomByCategory(categoryName) {
  const realEstateGrid = document.querySelector('[data-showroom-grid="real-estate"]');
  const marketplaceGrid = document.querySelector('[data-showroom-grid="marketplace"]');
  const allRows = collectAllRows();
  allRows.forEach(({ section, row }) => {
    const gridName = REAL_ESTATE_SECTIONS.includes(section) ? 'real-estate' : 'marketplace';
    const grid = gridName === 'real-estate' ? realEstateGrid : marketplaceGrid;
    if (!grid) return;
    const rowEl = grid.querySelector(`[data-row-id="${row.id}"]`);
    if (!rowEl) return;
    const match = categoryMatches(categoryName, section.label, row.label);
    rowEl.style.display = match ? '' : 'none';
  });
  [realEstateGrid, marketplaceGrid].forEach(grid => {
    if (!grid) return;
    grid.querySelectorAll('.showroom-section').forEach(sec => {
      const visibleRows = sec.querySelectorAll('.showroom-row:not([style*="display: none"])');
      sec.style.display = visibleRows.length > 0 ? '' : 'none';
    });
  });
}

export function clearShowroomFilter() {
  const grids = document.querySelectorAll('[data-showroom-grid]');
  grids.forEach(grid => {
    grid.querySelectorAll('.showroom-row, .showroom-section').forEach(el => {
      el.style.display = '';
    });
  });
}

// ── Initialization ──
// Render all showroom grids immediately on page load so product cards,
// banners, and categories are visible without requiring a scroll event.
// The previous IntersectionObserver approach left the grids blank when
// they had zero height (nothing to intersect), producing a black gap
// after the Live Advertisement section.
let _dbSectionAdded = false;

// ── Category mapping ──────────────────────────────────────────
// Maps a product's category/subcategory field to the marketplace
// section row where it should appear.  This ensures AI-created
// products land in the correct section instead of only "New Arrivals".
const CATEGORY_TO_SECTION_ROW = {
  // Real estate & vehicles
  'Real Estate': { section: 'local-houses', row: 'affordable-homes' },
  'Apartments': { section: 'local-houses', row: 'apartment-homes' },
  'Villas': { section: 'modern-luxury', row: 'modern-homes' },
  'Mansions': { section: 'modern-luxury', row: 'mansion-homes' },
  'Beach Houses': { section: 'local-houses', row: 'beach-houses' },
  'Luxury Condominiums': { section: 'modern-luxury', row: 'modern-homes' },
  'Farm Houses': { section: 'modern-luxury', row: 'farm-house' },
  'Commercial Buildings': { section: 'commercial-land', row: 'commercial' },
  'Hotels': { section: 'commercial-land', row: 'hotels' },
  'Cars': { section: 'cars-motorcycles', row: 'new-cars' },
  'Motorhomes': { section: 'motorhomes-boats', row: 'motorhomes' },
  'Trucks': { section: 'trucks-buses', row: 'all-trucks' },
  // Marketplace categories
  'Men': { section: 'mp-men', row: 'mp-men-all' },
  'Women': { section: 'mp-women', row: 'mp-women-all' },
  'Kids': { section: 'mp-kids', row: 'mp-kids-all' },
  'Fashion': { section: 'mp-fashion', row: 'mp-fashion-all' },
  'Jewelry': { section: 'mp-jewelry', row: 'mp-jewelry-all' },
  'Beauty': { section: 'mp-beauty', row: 'mp-beauty-all' },
  'Home & Garden': { section: 'mp-home', row: 'mp-home-all' },
  'Home': { section: 'mp-home', row: 'mp-home-all' },
  'Furniture': { section: 'mp-furniture', row: 'mp-furniture-all' },
  'Kitchen': { section: 'mp-kitchen', row: 'mp-kitchen-all' },
  'Home Appliances': { section: 'mp-appliances', row: 'mp-appliances-all' },
  'Electronics': { section: 'mp-electronics', row: 'mp-electronics-all' },
  'Phones': { section: 'mp-phones', row: 'mp-phones-all' },
  'Computers': { section: 'mp-computers', row: 'mp-computers-all' },
  'Gaming': { section: 'mp-gaming', row: 'mp-gaming-all' },
  'Sports': { section: 'mp-sports', row: 'mp-sports-all' },
  'Food & Groceries': { section: 'mp-food', row: 'mp-food-all' },
  'Groceries': { section: 'mp-food', row: 'mp-food-all' },
  'Baby': { section: 'mp-baby', row: 'mp-baby-all' },
  'Pets': { section: 'mp-pets', row: 'mp-pets-all' },
  'Agriculture': { section: 'mp-agriculture', row: 'mp-agriculture-all' },
  'Books': { section: 'mp-books', row: 'mp-books-all' },
  'Office': { section: 'mp-office', row: 'mp-office-all' },
  'Business & Industrial': { section: 'mp-business', row: 'mp-business-all' },
  'Health': { section: 'mp-health', row: 'mp-health-all' },
  'Music': { section: 'mp-music', row: 'mp-music-all' },
  'Art': { section: 'mp-arts', row: 'mp-arts-all' },
  'Arts & Crafts': { section: 'mp-arts', row: 'mp-arts-all' },
  'Toys': { section: 'mp-toys', row: 'mp-toys-all' },
  'Travel & Luggage': { section: 'mp-travel', row: 'mp-travel-all' },
  'Watches & Accessories': { section: 'mp-watches', row: 'mp-watches-all' },
  'Garden & Outdoor': { section: 'mp-garden', row: 'mp-garden-all' },
  'Party & Event Supplies': { section: 'mp-party', row: 'mp-party-all' },
  'Cameras & Photography': { section: 'mp-cameras', row: 'mp-cameras-all' },
  'Software & Digital Products': { section: 'mp-software', row: 'mp-software-all' },
  'Collectibles & Memorabilia': { section: 'mp-collectibles', row: 'mp-collectibles-all' },
  'Safety & Security': { section: 'mp-safety', row: 'mp-safety-all' },
  'Fitness Equipment': { section: 'mp-fitness', row: 'mp-fitness-all' },
  'Camping & Hiking': { section: 'mp-camping', row: 'mp-camping-all' },
  'Pool & Spa': { section: 'mp-pool', row: 'mp-pool-all' },
  'Industrial Tools & Equipment': { section: 'mp-industrial', row: 'mp-industrial-all' },
  'Packaging & Shipping Supplies': { section: 'mp-packaging', row: 'mp-packaging-all' },
  'Cleaning Supplies': { section: 'mp-cleaning', row: 'mp-cleaning-all' },
  'Religious & Spiritual Items': { section: 'mp-religious', row: 'mp-religious-all' },
  'Flowers & Gifts': { section: 'mp-flowers', row: 'mp-flowers-all' },
  'Luxury Goods': { section: 'mp-luxury', row: 'mp-luxury-all' },
  'Wedding Supplies': { section: 'mp-wedding', row: 'mp-wedding-all' },
  'Costumes & Cosplay': { section: 'mp-costumes', row: 'mp-costumes-all' },
  'Coins & Bullion': { section: 'mp-coins', row: 'mp-coins-all' },
  'Fireplace & Heating': { section: 'mp-fireplace', row: 'mp-fireplace-all' },
  'Marine & Boating': { section: 'mp-marine', row: 'mp-marine-all' },
  'RV & Camper Accessories': { section: 'mp-rv', row: 'mp-rv-all' },
  'Educational Supplies': { section: 'mp-educational', row: 'mp-educational-all' },
  'Funeral & Memorial Supplies': { section: 'mp-funeral', row: 'mp-funeral-all' },
  'Bicycles': { section: 'mp-bicycles', row: 'mp-bicycles-all' },
};

// Fuzzy keyword matching for categories not found exactly
const CATEGORY_KEYWORDS = [
  { keywords: ['phone', 'smartphone', 'mobile'], target: { section: 'mp-phones', row: 'mp-phones-all' } },
  { keywords: ['computer', 'laptop', 'desktop', 'monitor'], target: { section: 'mp-computers', row: 'mp-computers-all' } },
  { keywords: ['electronic', 'gadget', 'tech'], target: { section: 'mp-electronics', row: 'mp-electronics-all' } },
  { keywords: ['fashion', 'apparel', 'clothing'], target: { section: 'mp-fashion', row: 'mp-fashion-all' } },
  { keywords: ['jewel', 'ring', 'necklace'], target: { section: 'mp-jewelry', row: 'mp-jewelry-all' } },
  { keywords: ['beauty', 'cosmetic', 'makeup', 'skincare'], target: { section: 'mp-beauty', row: 'mp-beauty-all' } },
  { keywords: ['home', 'decor'], target: { section: 'mp-home', row: 'mp-home-all' } },
  { keywords: ['furniture', 'chair', 'table', 'sofa'], target: { section: 'mp-furniture', row: 'mp-furniture-all' } },
  { keywords: ['kitchen', 'cookware', 'utensil'], target: { section: 'mp-kitchen', row: 'mp-kitchen-all' } },
  { keywords: ['appliance'], target: { section: 'mp-appliances', row: 'mp-appliances-all' } },
  { keywords: ['game', 'gaming', 'console'], target: { section: 'mp-gaming', row: 'mp-gaming-all' } },
  { keywords: ['sport', 'fitness', 'gym', 'athletic'], target: { section: 'mp-sports', row: 'mp-sports-all' } },
  { keywords: ['food', 'grocer'], target: { section: 'mp-food', row: 'mp-food-all' } },
  { keywords: ['baby', 'infant'], target: { section: 'mp-baby', row: 'mp-baby-all' } },
  { keywords: ['pet', 'dog', 'cat', 'animal'], target: { section: 'mp-pets', row: 'mp-pets-all' } },
  { keywords: ['agriculture', 'farm', 'seed'], target: { section: 'mp-agriculture', row: 'mp-agriculture-all' } },
  { keywords: ['book', 'reading'], target: { section: 'mp-books', row: 'mp-books-all' } },
  { keywords: ['office', 'stationery'], target: { section: 'mp-office', row: 'mp-office-all' } },
  { keywords: ['health', 'medical', 'wellness'], target: { section: 'mp-health', row: 'mp-health-all' } },
  { keywords: ['music', 'instrument'], target: { section: 'mp-music', row: 'mp-music-all' } },
  { keywords: ['art', 'craft', 'painting'], target: { section: 'mp-arts', row: 'mp-arts-all' } },
  { keywords: ['toy', 'hobby', 'game'], target: { section: 'mp-toys', row: 'mp-toys-all' } },
  { keywords: ['travel', 'luggage', 'suitcase'], target: { section: 'mp-travel', row: 'mp-travel-all' } },
  { keywords: ['watch', 'timepiece'], target: { section: 'mp-watches', row: 'mp-watches-all' } },
  { keywords: ['garden', 'outdoor', 'patio'], target: { section: 'mp-garden', row: 'mp-garden-all' } },
  { keywords: ['camera', 'photography', 'lens'], target: { section: 'mp-cameras', row: 'mp-cameras-all' } },
  { keywords: ['software', 'digital', 'app'], target: { section: 'mp-software', row: 'mp-software-all' } },
  { keywords: ['car', 'vehicle', 'auto', 'sedan', 'suv'], target: { section: 'cars-motorcycles', row: 'new-cars' } },
  { keywords: ['truck', 'pickup', 'lorry'], target: { section: 'trucks-buses', row: 'all-trucks' } },
  { keywords: ['motorhome', 'camper', 'rv'], target: { section: 'motorhomes-boats', row: 'motorhomes' } },
  { keywords: ['apartment', 'condo', 'flat'], target: { section: 'local-houses', row: 'apartment-homes' } },
  { keywords: ['villa', 'luxury home'], target: { section: 'modern-luxury', row: 'modern-homes' } },
  { keywords: ['mansion', 'estate'], target: { section: 'modern-luxury', row: 'mansion-homes' } },
  { keywords: ['beach', 'coastal'], target: { section: 'local-houses', row: 'beach-houses' } },
  { keywords: ['farm'], target: { section: 'modern-luxury', row: 'farm-house' } },
  { keywords: ['commercial', 'retail', 'store'], target: { section: 'commercial-land', row: 'commercial' } },
  { keywords: ['hotel', 'hospitality'], target: { section: 'commercial-land', row: 'hotels' } },
  { keywords: ['bicycle', 'bike', 'cycling'], target: { section: 'mp-bicycles', row: 'mp-bicycles-all' } },
];

function findSectionRowForCategory(category, subcategory) {
  if (!category) return null;
  // 1. Exact match
  const exact = CATEGORY_TO_SECTION_ROW[category];
  if (exact) return exact;
  // 2. Case-insensitive match
  const lower = category.toLowerCase();
  for (const [key, val] of Object.entries(CATEGORY_TO_SECTION_ROW)) {
    if (key.toLowerCase() === lower) return val;
  }
  // 3. Keyword fuzzy match
  for (const { keywords, target } of CATEGORY_KEYWORDS) {
    if (keywords.some(k => lower.includes(k))) return target;
  }
  // 4. Try subcategory
  if (subcategory) {
    const subLower = subcategory.toLowerCase();
    for (const { keywords, target } of CATEGORY_KEYWORDS) {
      if (keywords.some(k => subLower.includes(k))) return target;
    }
  }
  return null;
}

function findSectionAndRowById(id) {
  for (const section of [...REAL_ESTATE_SECTIONS, ...MARKETPLACE_SECTIONS]) {
    for (const row of section.rows) {
      if (row.ids && row.ids.includes(id)) {
        return { sectionId: section.id, rowId: row.id };
      }
    }
  }
  return null;
}

export async function initAllShowrooms() {
  // Load products from the database (created by AI Admin Assistant)
  // and merge them with the hardcoded seed data.
  await loadDBListings();
  const dbListings = getDBListings();
  const seedIds = new Set(SHOWROOM_LISTINGS.map(l => l.property_id));
  const dbOnly = dbListings.filter(l => !seedIds.has(l.property_id));

  if (dbOnly.length > 0 && !_dbSectionAdded) {
    _dbSectionAdded = true;

    // Distribute each DB product into its correct category section
    const newArrivalsIds = [];
    for (const listing of dbOnly) {
      const target = findSectionRowForCategory(listing.category, listing.subcategory);
      let placed = false;
      if (target) {
        // Find the section and row in the section definitions
        const allSections = [...REAL_ESTATE_SECTIONS, ...MARKETPLACE_SECTIONS];
        const section = allSections.find(s => s.id === target.section);
        if (section) {
          const row = section.rows.find(r => r.id === target.row);
          if (row) {
            // row.ids may be undefined for "all trucks" type rows
            if (!row.ids) row.ids = [];
            if (!row.ids.includes(listing.property_id)) {
              row.ids.push(listing.property_id);
            }
            placed = true;
          }
        }
      }
      // If we couldn't place it in a category, add it to New Arrivals
      if (!placed) {
        newArrivalsIds.push(listing.property_id);
      }
    }

    // Add "New Arrivals" section for uncategorised products
    if (newArrivalsIds.length > 0) {
      MARKETPLACE_SECTIONS.unshift({
        id: 'new-arrivals',
        label: 'New Arrivals',
        icon: 'sparkles',
        subtitle: 'Latest products added to the marketplace.',
        rows: [{
          id: 'new-arrivals-all',
          label: 'Recently Added',
          icon: 'sparkles',
          ids: newArrivalsIds,
        }],
      });
    }
  }

  const grids = document.querySelectorAll('[data-showroom-grid]');
  grids.forEach(g => renderGrid(g.dataset.showroomGrid));
}

if (document.querySelector('[data-showroom-grid]')) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAllShowrooms());
  } else {
    initAllShowrooms();
  }
}

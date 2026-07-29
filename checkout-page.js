import { supabase } from './supabase-client.js';
import { getCurrentUser } from './auth.js';
import { trackEvent } from './analytics.js';
import { SHOWROOM_LISTINGS, formatPrice, flagEmoji } from './showroom-data.js';
import { detectCurrency, getCountryByCode, COUNTRIES, SUPPORTED_CURRENCIES } from './country-data.js';

const FALLBACK_IMG = '/fallback.svg';

/* ── Bank accounts (same as payment-page) ──────────────────── */
const BANK_ACCOUNTS = {
  USD: { currency:'USD', currencyName:'United States Dollar', flag:'🇺🇸', country:'United States', bankName:'Citibank', transferType:'Local & International', beneficiary:'KENNETH CHIDERA ODENYI', accountNumber:'70589490002447647', accountType:'Checking', iban:'', swift:'CITIUS33', routing:'031100209', sortCode:'', branchCode:'', institutionNumber:'', transitNumber:'', bsbCode:'', address:'111 Wall Street, New York, NY 10043, USA' },
  GBP: { currency:'GBP', currencyName:'British Pound', flag:'🇬🇧', country:'United Kingdom', bankName:'Citibank', transferType:'Local & International', beneficiary:'KENNETH CHIDERA ODENYI', accountNumber:'56468624', accountType:'', iban:'GB94CITI18500856468624', swift:'CITIGB2L', routing:'', sortCode:'185008', branchCode:'', institutionNumber:'', transitNumber:'', bsbCode:'', address:'Canada Square, Canary Wharf, London E14 5LB, United Kingdom' },
  EUR: { currency:'EUR', currencyName:'Euro', flag:'🇪🇺', country:'Eurozone', bankName:'Citibank', transferType:'Local & International', beneficiary:'KENNETH CHIDERA ODENYI', accountNumber:'', accountType:'', iban:'IE70CITI99005171297018', swift:'CITIIE2X', routing:'', sortCode:'', branchCode:'', institutionNumber:'', transitNumber:'', bsbCode:'', address:'1 North Wall Quay, IFSC, Dublin 1, Ireland' },
  CAD: { currency:'CAD', currencyName:'Canadian Dollar', flag:'🇨🇦', country:'Canada', bankName:'Citibank NA Canadian Branch', transferType:'Local Transfer', beneficiary:'KENNETH CHIDERA ODENYI', accountNumber:'3001440544', accountType:'Checking', iban:'', swift:'', routing:'', sortCode:'', branchCode:'', institutionNumber:'0328', transitNumber:'20012', bsbCode:'', address:'123 Front St. West, Toronto, ON M5J 2M3, Canada' },
  AUD: { currency:'AUD', currencyName:'Australian Dollar', flag:'🇦🇺', country:'Australia', bankName:'Citibank', transferType:'Local & International', beneficiary:'KENNETH CHIDERA ODENYI', accountNumber:'10674571', accountType:'', iban:'', swift:'', routing:'', sortCode:'', branchCode:'', institutionNumber:'', transitNumber:'', bsbCode:'248024', address:'2 Park Street, Sydney NSW 2000, Australia' },
  SGD: { currency:'SGD', currencyName:'Singapore Dollar', flag:'🇸🇬', country:'Singapore', bankName:'Citibank N.A. Singapore Branch', transferType:'Local & International', beneficiary:'KENNETH CHIDERA ODENYI', accountNumber:'44990709533', accountType:'', iban:'', swift:'CITISGSG', routing:'', sortCode:'', bankCode:'7214', branchCode:'001', institutionNumber:'', transitNumber:'', bsbCode:'', address:'8 Marina View, #17-01 Asia Square Tower 1, Singapore 018960' },
  JPY: { currency:'JPY', currencyName:'Japanese Yen', flag:'🇯🇵', country:'Japan', bankName:'MUFG Bank Ltd.', transferType:'Local Transfer', beneficiary:'KENNETH CHIDERA ODENYI', accountNumber:'4682719', accountType:'Savings / Futsu', iban:'', swift:'', routing:'', sortCode:'', bankCode:'0005', branchCode:'869', institutionNumber:'', transitNumber:'', bsbCode:'', address:'7-1 Marunouchi 2-Chome, Chiyoda-ku, Tokyo, Japan' },
  MXN: { currency:'MXN', currencyName:'Mexican Peso', flag:'🇲🇽', country:'Mexico', bankName:'Sistema de Transferencias y Pagos', transferType:'Local Transfer', beneficiary:'KENNETH CHIDERA ODENYI', accountNumber:'646010504200345127', accountType:'', iban:'', swift:'', routing:'', sortCode:'', bankCode:'646', branchCode:'010', institutionNumber:'', transitNumber:'', bsbCode:'', address:'Av. Insurgentes Sur 1425, Ciudad de México, México' },
  IDR: { currency:'IDR', currencyName:'Indonesian Rupiah', flag:'🇮🇩', country:'Indonesia', bankName:'Deutsche Bank AG Jakarta Branch', transferType:'Local Transfer', beneficiary:'KENNETH CHIDERA ODENYI', accountNumber:'974400000904', accountType:'', iban:'', swift:'', routing:'', sortCode:'', branchCode:'0670304', institutionNumber:'', transitNumber:'', bsbCode:'', address:'Jl. Imam Bonjol 80, Jakarta 10310, Indonesia' },
};

/* ── State ──────────────────────────────────────────────────── */
let state = {
  user: null,
  isGuest: false,
  listing: null,
  quantity: 1,
  selectedCurrency: 'USD',
  countryCode: 'US',
  cartItems: [],
  step: 1, // 1=cart/review, 2=shipping/billing, 3=payment
  paymentMethod: 'flutterwave', // 'flutterwave' | 'manual_bank_transfer'
  addresses: [],
  selectedAddressId: null,
  billingSame: true,
  billingAddress: '',
  fullName: '',
  email: '',
  phone: '',
  shippingAddr1: '',
  shippingAddr2: '',
  shippingCity: '',
  shippingState: '',
  shippingPostal: '',
  shippingCountry: 'US',
  orderNumber: '',
  processing: false,
};

/* ── Helpers ────────────────────────────────────────────────── */
function generateOrderNumber() {
  const ts = Date.now().toString(36).toUpperCase().slice(-6);
  const rnd = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `KCO-${ts}${rnd}`;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
  if (window.lucide) lucide.createIcons();
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

function fmtMoney(amount, currency) {
  const n = parseFloat(amount) || 0;
  return `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

function copyToClipboard(text) {
  const fb = () => { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(t); };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).catch(() => fb()); else fb();
  showToast('Copied to clipboard.');
}

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
  const root = document.getElementById('checkout-root');
  const params = new URLSearchParams(window.location.search);

  // Check for Flutterwave redirect (verification)
  const status = params.get('status');
  const txId = params.get('transaction_id');
  const txRef = params.get('tx_ref');
  const orderNum = params.get('order_number');

  if (status === 'verify' && txId) {
    await handleFlwVerify(txId, txRef, orderNum || localStorage.getItem('kco_pending_order'));
    return;
  }

  state.isGuest = params.get('guest') === '1';
  if (!state.isGuest) {
    state.user = await getCurrentUser();
    if (!state.user) { window.location.href = '/auth.html?redirect=/checkout.html'; return; }
  }

  // Load listing from URL param or cart
  const listingId = params.get('id');
  if (listingId) {
    state.listing = SHOWROOM_LISTINGS.find(l => l.property_id === listingId);
    if (!state.listing) { root.innerHTML = '<div class="text-center py-20 text-gray-500">Listing not found.</div>'; return; }
    state.cartItems = [{ listing: state.listing, quantity: 1 }];
  } else {
    // Load from cart
    const cart = JSON.parse(localStorage.getItem('kco_cart') || '[]');
    state.cartItems = cart.map(id => {
      const l = SHOWROOM_LISTINGS.find(x => x.property_id === id);
      return l ? { listing: l, quantity: 1 } : null;
    }).filter(Boolean);
    if (state.cartItems.length === 0) {
      root.innerHTML = renderEmptyCart();
      if (window.lucide) lucide.createIcons();
      return;
    }
    state.listing = state.cartItems[0].listing;
  }

  // Currency detection
  state.countryCode = localStorage.getItem('kco_country') || 'US';
  if (state.user && !state.isGuest) {
    const { data: profile } = await supabase.from('profiles').select('country_code').eq('user_id', state.user.id).maybeSingle();
    if (profile?.country_code) state.countryCode = profile.country_code;
  }
  state.selectedCurrency = detectCurrency(state.countryCode) || 'USD';

  // Load saved addresses
  if (state.user && !state.isGuest) {
    const { data: addrs } = await supabase.from('shipping_addresses').select('*').eq('user_id', state.user.id).order('created_at', { ascending: false });
    state.addresses = addrs || [];
    const def = state.addresses.find(a => a.is_default);
    if (def) state.selectedAddressId = def.id;
    // Pre-fill from profile
    const { data: profile } = await supabase.from('profiles').select('*').eq('user_id', state.user.id).maybeSingle();
    if (profile) {
      state.fullName = profile.display_name || `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
      state.email = state.user.email;
      state.phone = profile.phone_code && profile.phone_number ? `+${profile.phone_code} ${profile.phone_number}` : '';
      state.shippingCountry = profile.country_code || state.countryCode;
    }
  }

  state.orderNumber = generateOrderNumber();
  render();
}

/* ── Calculations ───────────────────────────────────────────── */
function getSubtotal() {
  return state.cartItems.reduce((sum, item) => sum + (item.listing.price * item.quantity), 0);
}

function getShippingCost() {
  return 0;
}

function getTaxRate() {
  return 0;
}

function getTaxAmount() {
  return Math.round(getSubtotal() * getTaxRate() * 100) / 100;
}

function getTotal() {
  return getSubtotal() + getShippingCost() + getTaxAmount();
}

/* ── Render ──────────────────────────────────────────────────── */
function render() {
  const root = document.getElementById('checkout-root');
  root.innerHTML = `
    <div class="fade-in">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-400 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-blue-400">Checkout</span>
      </div>

      <!-- Step indicator -->
      ${renderStepIndicator()}

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        <div class="lg:col-span-2 space-y-5">
          ${state.step === 1 ? renderStep1() : ''}
          ${state.step === 2 ? renderStep2() : ''}
          ${state.step === 3 ? renderStep3() : ''}
        </div>
        <div class="lg:col-span-1">
          ${renderOrderSummary()}
        </div>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
  document.querySelectorAll('.btn-press').forEach(ripple);
  attachHandlers();
}

function renderStepIndicator() {
  const steps = [
    { num: 1, label: 'Review Cart', icon: 'shopping-cart' },
    { num: 2, label: 'Shipping & Billing', icon: 'map-pin' },
    { num: 3, label: 'Payment', icon: 'credit-card' },
  ];
  return `
    <div class="flex items-center justify-center gap-2 sm:gap-4 mb-6">
      ${steps.map((s, i) => `
        <div class="flex items-center gap-2 sm:gap-4">
          <div class="flex items-center gap-2">
            <div class="step-bar w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${state.step >= s.num ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400' : 'bg-blue-950/40 border border-blue-500/10 text-gray-600'} ${state.step === s.num ? 'pulse-glow' : ''}">
              ${state.step > s.num ? '<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>' : `<i data-lucide="${s.icon}" class="w-4 h-4"></i>`}
            </div>
            <span class="text-xs font-bold ${state.step >= s.num ? 'text-white' : 'text-gray-600'} hidden sm:inline">${s.label}</span>
          </div>
          ${i < steps.length - 1 ? `<div class="step-bar w-8 sm:w-16 h-0.5 ${state.step > s.num ? 'bg-blue-500' : 'bg-blue-500/10'}"></div>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

/* ── Step 1: Cart Review ────────────────────────────────────── */
function renderStep1() {
  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="shopping-cart" class="w-4 h-4 text-blue-400"></i> Shopping Cart (${state.cartItems.length})
      </h3>
      <div class="space-y-3">
        ${state.cartItems.map((item, i) => {
          const cover = item.listing.images?.[0] || FALLBACK_IMG;
          return `
            <div class="flex items-center gap-3 p-3 bg-blue-950/30 border border-blue-500/10 rounded-xl">
              <div class="w-16 h-16 rounded-lg bg-gray-900 overflow-hidden shrink-0 ring-1 ring-blue-500/10">
                <img src="${cover}" class="w-full h-full object-cover" onerror="this.src='${FALLBACK_IMG}'">
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-bold text-white truncate">${item.listing.title}</h4>
                <p class="text-xs text-gray-500">${item.listing.property_id}</p>
                <p class="text-sm font-bold text-amber-400 mt-1">${formatPrice(item.listing)}</p>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button onclick="changeQty(${i}, -1)" class="w-7 h-7 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-gray-400 hover:text-white transition flex items-center justify-center"><i data-lucide="minus" class="w-3.5 h-3.5"></i></button>
                <span class="text-sm font-bold text-white w-6 text-center">${item.quantity}</span>
                <button onclick="changeQty(${i}, 1)" class="w-7 h-7 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-gray-400 hover:text-white transition flex items-center justify-center"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button>
              </div>
              <button onclick="removeCartItem(${i})" class="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 transition shrink-0"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <div class="flex justify-end">
      <button onclick="goToStep(2)" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
        Continue to Shipping <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
    </div>
  `;
}

/* ── Step 2: Shipping & Billing ──────────────────────────────── */
function renderStep2() {
  const savedAddresses = state.addresses.length > 0 && !state.isGuest ? `
    <div class="mb-5">
      <h4 class="text-xs font-bold text-white uppercase tracking-wide mb-3">Saved Addresses</h4>
      <div class="space-y-2">
        ${state.addresses.map(a => {
          const c = getCountryByCode(a.country_code);
          return `
            <div onclick="selectAddress('${a.id}')" class="cursor-pointer p-3 border rounded-xl transition ${state.selectedAddressId === a.id ? 'bg-blue-500/15 border-blue-500/50' : 'bg-blue-950/30 border-blue-500/10 hover:border-blue-500/30'}">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-bold text-white">${a.label}</span>
                ${a.is_default ? '<span class="text-[10px] text-emerald-400 font-bold uppercase">Default</span>' : ''}
              </div>
              <p class="text-xs text-gray-400">${a.full_name} · ${a.address_line1}, ${a.city}, ${a.state} ${a.postal_code} · ${c ? c.flag + ' ' + c.name : a.country_code}</p>
              <p class="text-xs text-gray-500 mt-0.5">${a.phone}</p>
            </div>
          `;
        }).join('')}
        <button onclick="selectAddress('')" class="w-full text-left p-3 border border-dashed border-blue-500/30 hover:border-blue-500/50 rounded-xl text-sm text-blue-400 font-bold transition flex items-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i> Enter a new address
        </button>
      </div>
    </div>
  ` : '';

  const isNewAddress = !state.selectedAddressId || state.isGuest;

  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="map-pin" class="w-4 h-4 text-blue-400"></i> Shipping Address
      </h3>
      ${savedAddresses}
      ${isNewAddress ? `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Full Name *</label>
              <input type="text" id="ship-name" value="${state.fullName}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Phone *</label>
              <input type="tel" id="ship-phone" value="${state.phone}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            </div>
          </div>
          ${state.isGuest ? `
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Email *</label>
              <input type="email" id="ship-email" value="${state.email}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
            </div>
          ` : ''}
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Address Line 1 *</label>
            <input type="text" id="ship-addr1" value="${state.shippingAddr1}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Address Line 2 (Optional)</label>
            <input type="text" id="ship-addr2" value="${state.shippingAddr2}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">City *</label><input type="text" id="ship-city" value="${state.shippingCity}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">State *</label><input type="text" id="ship-state" value="${state.shippingState}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
            <div><label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Postal *</label><input type="text" id="ship-postal" value="${state.shippingPostal}" required class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"></div>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Country *</label>
            <select id="ship-country" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
              ${COUNTRIES.map(c => `<option value="${c.code}" ${state.shippingCountry === c.code ? 'selected' : ''}>${c.flag} ${c.name}</option>`).join('')}
            </select>
          </div>
        </div>
      ` : ''}
    </div>

    <!-- Billing -->
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="file-text" class="w-4 h-4 text-blue-400"></i> Billing Information
      </h3>
      <label class="flex items-center gap-2 cursor-pointer mb-4">
        <input type="checkbox" id="billing-same" ${state.billingSame ? 'checked' : ''} onchange="toggleBilling()" class="w-4 h-4 rounded border-gray-700 bg-[#0a1124] text-blue-500 focus:ring-blue-500">
        <span class="text-sm text-gray-300">Billing address is the same as shipping address</span>
      </label>
      <div id="billing-fields" class="${state.billingSame ? 'hidden' : ''}">
        <textarea id="billing-address" rows="3" placeholder="Enter full billing address..." class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none">${state.billingAddress}</textarea>
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
  `;
}

/* ── Step 3: Payment ─────────────────────────────────────────── */
function renderStep3() {
  const bankAcc = BANK_ACCOUNTS[state.selectedCurrency] || BANK_ACCOUNTS.USD;
  return `
    <!-- Payment method selection -->
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="credit-card" class="w-4 h-4 text-blue-400"></i> Payment Method
      </h3>
      <div class="space-y-3">
        <!-- Flutterwave -->
        <div onclick="selectPaymentMethod('flutterwave')" class="pay-method cursor-pointer p-4 border rounded-xl transition ${state.paymentMethod === 'flutterwave' ? 'selected' : 'bg-blue-950/30 border-blue-500/10 hover:border-blue-500/30'}">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange-500/15 rounded-lg flex items-center justify-center"><i data-lucide="zap" class="w-5 h-5 text-orange-400"></i></div>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-white">Flutterwave</h4>
              <p class="text-xs text-gray-500">Pay with card, bank transfer, USSD, or mobile money</p>
            </div>
            <div class="w-5 h-5 rounded-full border-2 ${state.paymentMethod === 'flutterwave' ? 'border-blue-500 bg-blue-500' : 'border-gray-600'} flex items-center justify-center">
              ${state.paymentMethod === 'flutterwave' ? '<div class="w-2 h-2 bg-white rounded-full"></div>' : ''}
            </div>
          </div>
        </div>

        <!-- Manual Bank Transfer -->
        <div onclick="selectPaymentMethod('manual_bank_transfer')" class="pay-method cursor-pointer p-4 border rounded-xl transition ${state.paymentMethod === 'manual_bank_transfer' ? 'selected' : 'bg-blue-950/30 border-blue-500/10 hover:border-blue-500/30'}">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-500/15 rounded-lg flex items-center justify-center"><i data-lucide="landmark" class="w-5 h-5 text-blue-400"></i></div>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-white">Manual Bank Transfer</h4>
              <p class="text-xs text-gray-500">Pay directly to our bank account and upload receipt</p>
            </div>
            <div class="w-5 h-5 rounded-full border-2 ${state.paymentMethod === 'manual_bank_transfer' ? 'border-blue-500 bg-blue-500' : 'border-gray-600'} flex items-center justify-center">
              ${state.paymentMethod === 'manual_bank_transfer' ? '<div class="w-2 h-2 bg-white rounded-full"></div>' : ''}
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
        ${SUPPORTED_CURRENCIES.map(c => {
          const acc = BANK_ACCOUNTS[c];
          if (!acc) return '';
          return `<button onclick="selectCurrency('${c}')" class="btn-press flex flex-col items-center gap-1 p-2.5 rounded-xl border transition relative overflow-hidden ${c === state.selectedCurrency ? 'bg-blue-500/15 border-blue-500/50 text-blue-400' : 'bg-blue-950/40 border-blue-500/10 text-gray-400 hover:border-blue-500/30'}">
            <span class="text-xl">${acc.flag}</span><span class="text-xs font-bold">${c}</span>
          </button>`;
        }).join('')}
      </div>
    </div>

    <!-- Bank account details (if manual) -->
    ${state.paymentMethod === 'manual_bank_transfer' ? renderBankDetails(bankAcc) : ''}

    <!-- Place order button -->
    <div class="space-y-3">
      ${state.paymentMethod === 'flutterwave' ? `
        <button onclick="payWithFlutterwave()" id="flw-pay-btn" class="btn-press w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 relative overflow-hidden">
          <i data-lucide="zap" class="w-5 h-5"></i> Pay ${fmtMoney(getTotal(), state.selectedCurrency)} with Flutterwave
        </button>
      ` : `
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
  `;
}

function renderBankDetails(acc) {
  const fields = [
    { label:'Beneficiary Name', value:acc.beneficiary },
    { label:'Bank Name', value:acc.bankName },
    { label:'Account Number', value:acc.accountNumber },
    { label:'IBAN', value:acc.iban },
    { label:'SWIFT / BIC', value:acc.swift },
    { label:'Routing (ABA)', value:acc.routing },
    { label:'Sort Code', value:acc.sortCode },
    { label:'Bank Code', value:acc.bankCode },
    { label:'Branch Code', value:acc.branchCode },
    { label:'Institution Number', value:acc.institutionNumber },
    { label:'Transit Number', value:acc.transitNumber },
    { label:'BSB Code', value:acc.bsbCode },
    { label:'Bank Address', value:acc.address },
  ].filter(f => f.value && f.value.trim() !== '');

  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2.5 bg-blue-500/10 rounded-lg"><i data-lucide="landmark" class="w-5 h-5 text-blue-400"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">Receiving Bank Account</h3>
          <p class="text-gray-500 text-xs">${acc.flag} ${acc.currencyName} (${acc.currency})</p>
        </div>
        <span class="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20"><i data-lucide="shield-check" class="w-3 h-3"></i> Verified</span>
      </div>
      <div class="space-y-2">
        ${fields.map(f => `
          <div class="flex items-center justify-between gap-3 bg-blue-950/40 border border-blue-500/10 rounded-xl px-4 py-2.5">
            <div class="min-w-0 flex-1"><div class="text-gray-500 text-[11px] uppercase tracking-wide">${f.label}</div><div class="text-gray-100 text-sm font-medium font-mono break-all">${f.value}</div></div>
            <button onclick="copyToClipboard('${f.value.replace(/'/g, "\\'")}')" class="shrink-0 p-2 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition"><i data-lucide="copy" class="w-4 h-4 text-gray-400"></i></button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ── Order summary sidebar ──────────────────────────────────── */
function renderOrderSummary() {
  const subtotal = getSubtotal();
  const total = getTotal();
  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up lg:sticky lg:top-20">
      <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 mb-4">
        <i data-lucide="receipt" class="w-4 h-4 text-blue-400"></i> Order Summary
      </h3>
      <div class="space-y-3 mb-4">
        ${state.cartItems.map(item => {
          const cover = item.listing.images?.[0] || FALLBACK_IMG;
          return `
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-lg bg-gray-900 overflow-hidden shrink-0 ring-1 ring-blue-500/10">
                <img src="${cover}" class="w-full h-full object-cover" onerror="this.src='${FALLBACK_IMG}'">
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-white truncate">${item.listing.title}</p>
                <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
              </div>
              <p class="text-xs font-bold text-amber-400 shrink-0">${fmtMoney(item.listing.price * item.quantity, item.listing.currency || 'USD')}</p>
            </div>
          `;
        }).join('')}
      </div>
      <div class="space-y-2 pt-4 border-t border-blue-500/10">
        <div class="flex justify-between text-sm"><span class="text-gray-500">Subtotal</span><span class="text-white font-bold">${fmtMoney(subtotal, state.cartItems[0]?.listing?.currency || 'USD')}</span></div>
        <div class="flex justify-between text-sm"><span class="text-gray-500">Shipping</span><span class="text-emerald-400 font-bold">${getShippingCost() === 0 ? 'Free' : fmtMoney(getShippingCost(), state.cartItems[0]?.listing?.currency || 'USD')}</span></div>
        ${getTaxAmount() > 0 ? `<div class="flex justify-between text-sm"><span class="text-gray-500">Tax</span><span class="text-white font-bold">${fmtMoney(getTaxAmount(), state.cartItems[0]?.listing?.currency || 'USD')}</span></div>` : ''}
        <div class="flex justify-between text-lg pt-2 border-t border-blue-500/10"><span class="text-white font-bold">Total</span><span class="text-amber-400 font-black">${fmtMoney(total, state.cartItems[0]?.listing?.currency || 'USD')}</span></div>
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
          <span>Order #: <span class="text-blue-400 font-mono font-bold">${state.orderNumber}</span></span>
        </div>
      </div>
      ${state.step < 3 ? `
        <button onclick="goToStep(${state.step + 1})" class="btn-press w-full mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3.5 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 relative overflow-hidden">
          ${state.step === 1 ? 'Proceed to Checkout' : 'Continue to Payment'} <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      ` : ''}
    </div>
  `;
}

function renderEmptyCart() {
  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-10 text-center slide-up">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4"><i data-lucide="shopping-cart" class="w-8 h-8 text-blue-400"></i></div>
      <h3 class="text-lg font-bold text-white mb-2">Your Cart is Empty</h3>
      <p class="text-sm text-gray-500 mb-6">Add items to your cart before checking out.</p>
      <a href="/" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl uppercase text-sm tracking-wider transition shadow-lg shadow-blue-600/30 relative overflow-hidden"><i data-lucide="shopping-bag" class="w-4 h-4"></i> Browse Marketplace</a>
    </div>
  `;
}

/* ── Handlers ───────────────────────────────────────────────── */
function attachHandlers() {}

window.changeQty = (i, delta) => {
  state.cartItems[i].quantity = Math.max(1, state.cartItems[i].quantity + delta);
  render();
};

window.removeCartItem = (i) => {
  state.cartItems.splice(i, 1);
  if (state.cartItems.length === 0) {
    document.getElementById('checkout-root').innerHTML = renderEmptyCart();
    if (window.lucide) lucide.createIcons();
    return;
  }
  render();
};

window.goToStep = (step) => {
  if (step === 3 && !validateStep2()) return;
  if (step === 2) saveStep2Data();
  state.step = step;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function saveStep2Data() {
  if (state.isGuest || !state.selectedAddressId) {
    state.fullName = document.getElementById('ship-name')?.value || state.fullName;
    state.phone = document.getElementById('ship-phone')?.value || state.phone;
    state.email = document.getElementById('ship-email')?.value || state.email || (state.user?.email || '');
    state.shippingAddr1 = document.getElementById('ship-addr1')?.value || '';
    state.shippingAddr2 = document.getElementById('ship-addr2')?.value || '';
    state.shippingCity = document.getElementById('ship-city')?.value || '';
    state.shippingState = document.getElementById('ship-state')?.value || '';
    state.shippingPostal = document.getElementById('ship-postal')?.value || '';
    state.shippingCountry = document.getElementById('ship-country')?.value || state.shippingCountry;
  }
  state.billingSame = document.getElementById('billing-same')?.checked ?? true;
  if (!state.billingSame) state.billingAddress = document.getElementById('billing-address')?.value || '';
}

function validateStep2() {
  saveStep2Data();
  if (state.selectedAddressId && !state.isGuest) return true;
  if (!state.fullName || !state.phone || !state.shippingAddr1 || !state.shippingCity || !state.shippingState || !state.shippingPostal) {
    showToast('Please fill in all required shipping fields.');
    return false;
  }
  if (state.isGuest && !state.email) { showToast('Please enter your email address.'); return false; }
  return true;
}

window.selectAddress = (id) => {
  state.selectedAddressId = id || null;
  if (id) {
    const a = state.addresses.find(x => x.id === id);
    if (a) {
      state.fullName = a.full_name;
      state.phone = a.phone;
      state.shippingAddr1 = a.address_line1;
      state.shippingAddr2 = a.address_line2 || '';
      state.shippingCity = a.city;
      state.shippingState = a.state;
      state.shippingPostal = a.postal_code;
      state.shippingCountry = a.country_code;
    }
  }
  render();
};

window.toggleBilling = () => {
  state.billingSame = document.getElementById('billing-same').checked;
  document.getElementById('billing-fields').classList.toggle('hidden', state.billingSame);
};

window.selectPaymentMethod = (method) => { state.paymentMethod = method; render(); };
window.selectCurrency = (currency) => { state.selectedCurrency = currency; render(); };
window.copyToClipboard = copyToClipboard;

/* ── Create order in DB ─────────────────────────────────────── */
async function createOrder(paymentMethod, extraData = {}) {
  const subtotal = getSubtotal();
  const total = getTotal();
  const shippingAddrText = state.selectedAddressId && state.addresses.length
    ? (() => { const a = state.addresses.find(x => x.id === state.selectedAddressId); return a ? `${a.address_line1}, ${a.city}, ${a.state} ${a.postal_code}, ${a.country_code}` : ''; })()
    : `${state.shippingAddr1}${state.shippingAddr2 ? ', ' + state.shippingAddr2 : ''}, ${state.shippingCity}, ${state.shippingState} ${state.shippingPostal}, ${state.shippingCountry}`;

  const billingAddr = state.billingSame ? shippingAddrText : (state.billingAddress || shippingAddrText);

  const orderData = {
    order_number: state.orderNumber,
    listing_id: state.listing.property_id,
    listing_title: state.listing.title,
    amount: total,
    currency: state.selectedCurrency,
    full_name: state.fullName,
    email: state.email || state.user?.email || '',
    phone: state.phone,
    status: paymentMethod === 'flutterwave' ? 'order_placed' : 'order_placed',
    payment_method: paymentMethod,
    subtotal,
    quantity: state.cartItems.reduce((s, i) => s + i.quantity, 0),
    billing_address: billingAddr,
    ...extraData,
  };

  if (state.isGuest) {
    orderData.is_guest = true;
    orderData.user_id = null;
    orderData.guest_shipping_address = shippingAddrText;
    orderData.guest_country = state.shippingCountry;
    orderData.guest_state = state.shippingState;
    orderData.guest_city = state.shippingCity;
    orderData.guest_postal_code = state.shippingPostal;
  } else {
    orderData.user_id = state.user.id;
    if (state.selectedAddressId) orderData.shipping_address_id = state.selectedAddressId;
  }

  const { error } = await supabase.from('payment_receipts').insert(orderData);
  if (error) throw new Error('Failed to create order: ' + error.message);

  return orderData;
}

/* ── Flutterwave payment ────────────────────────────────────── */
window.payWithFlutterwave = async () => {
  const btn = document.getElementById('flw-pay-btn');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Initializing payment...';
  if (window.lucide) lucide.createIcons();

  try {
    // Create order first
    await createOrder('flutterwave');
    localStorage.setItem('kco_pending_order', state.orderNumber);

    // Initialize Flutterwave via edge function
    const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/flutterwave-payment?action=initialize`;
    const res = await fetch(fnUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: getTotal(),
        currency: state.selectedCurrency,
        customer_name: state.fullName,
        customer_email: state.email || state.user?.email,
        customer_phone: state.phone,
        order_number: state.orderNumber,
        redirect_url: `${window.location.origin}/checkout.html?status=verify&order_number=${state.orderNumber}`,
      }),
    });

    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || 'Failed to initialize payment');

    // Redirect to Flutterwave payment page
    window.location.href = data.payment_link;
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="zap" class="w-5 h-5"></i> Pay with Flutterwave';
    if (window.lucide) lucide.createIcons();
    showToast(err.message || 'Payment initialization failed.');
  }
};

/* ── Handle Flutterwave redirect ────────────────────────────── */
async function handleFlwVerify(txId, txRef, orderNum) {
  const root = document.getElementById('checkout-root');
  root.innerHTML = `
    <div class="flex flex-col items-center justify-center py-20 fade-in">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-full mb-6 pulse-glow">
        <i data-lucide="loader-2" class="w-10 h-10 text-blue-400 animate-spin"></i>
      </div>
      <h1 class="text-2xl font-black text-white mb-2">Verifying Payment...</h1>
      <p class="text-gray-400 text-sm">Please wait while we confirm your payment.</p>
    </div>
  `;
  if (window.lucide) lucide.createIcons();

  try {
    const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/flutterwave-payment?action=verify`;
    const res = await fetch(fnUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transaction_id: txId, tx_ref: txRef, order_number: orderNum }),
    });
    const data = await res.json();

    if (!res.ok || data.error || data.status === 'failed') {
      root.innerHTML = renderPaymentFailed(data.message || data.error || 'Payment verification failed.');
      if (window.lucide) lucide.createIcons();
      return;
    }

    root.innerHTML = renderPaymentSuccess(orderNum);
    if (window.lucide) lucide.createIcons();
    document.querySelectorAll('.btn-press').forEach(ripple);
    localStorage.removeItem('kco_pending_order');
    localStorage.removeItem('kco_cart');
  } catch (err) {
    root.innerHTML = renderPaymentFailed(err.message);
    if (window.lucide) lucide.createIcons();
  }
}

function renderPaymentSuccess(orderNum) {
  return `
    <div class="fade-in text-center py-8 max-w-lg mx-auto">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6 check-pop">
        <i data-lucide="check-circle" class="w-12 h-12 text-emerald-400"></i>
      </div>
      <h1 class="text-2xl font-black text-white mb-2">Payment Successful!</h1>
      <p class="text-gray-400 text-sm mb-6">Your order has been confirmed and an email receipt has been sent.</p>
      <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 text-left">
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Order Number</span><span class="text-blue-400 font-mono font-bold">${orderNum}</span></div>
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
  `;
}

function renderPaymentFailed(msg) {
  return `
    <div class="fade-in text-center py-8 max-w-lg mx-auto">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full mb-6 check-pop">
        <i data-lucide="x-circle" class="w-12 h-12 text-red-400"></i>
      </div>
      <h1 class="text-2xl font-black text-white mb-2">Payment Failed</h1>
      <p class="text-gray-400 text-sm mb-2">${msg}</p>
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
  `;
}

/* ── Manual bank transfer ───────────────────────────────────── */
window.placeOrderManual = async () => {
  const btn = document.getElementById('manual-pay-btn');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Creating order...';
  if (window.lucide) lucide.createIcons();

  try {
    await createOrder('manual_bank_transfer');

    // Trigger notification
    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ order_number: state.orderNumber }),
      });
    } catch (e) { /* non-blocking */ }

    // Redirect to payment page for receipt upload
    const params = new URLSearchParams({ id: state.listing.property_id, order: state.orderNumber });
    if (state.isGuest) params.set('guest', '1');
    window.location.href = `/payment.html?${params.toString()}`;
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5"></i> Place Order & Upload Receipt';
    if (window.lucide) lucide.createIcons();
    showToast(err.message || 'Failed to create order.');
  }
};

init();

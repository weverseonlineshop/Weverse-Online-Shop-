import { SHOWROOM_LISTINGS, formatPrice, flagEmoji } from './showroom-data.js';
import { getCurrentUser } from './auth.js';
import { trackEvent } from './analytics.js';
import { supabase } from './supabase-client.js';
import { detectCurrency, getCountryByCode, SUPPORTED_CURRENCIES } from './country-data.js';

const FALLBACK_IMG = '/fallback.svg';

/* ── Bank account details per currency ─────────────────────── */
const BANK_ACCOUNTS = {
  USD: {
    currency: 'USD', currencyName: 'United States Dollar', flag: '🇺🇸', country: 'United States',
    bankName: 'Citibank', transferType: 'Local & International',
    beneficiary: 'KENNETH CHIDERA ODENYI',
    accountNumber: '70589490002447647',
    accountType: 'Checking',
    iban: '', swift: 'CITIUS33',
    routing: '031100209',
    sortCode: '', branchCode: '', institutionNumber: '', transitNumber: '', bsbCode: '',
    address: '111 Wall Street, New York, NY 10043, USA',
  },
  GBP: {
    currency: 'GBP', currencyName: 'British Pound', flag: '🇬🇧', country: 'United Kingdom',
    bankName: 'Citibank', transferType: 'Local & International',
    beneficiary: 'KENNETH CHIDERA ODENYI',
    accountNumber: '56468624',
    accountType: '',
    iban: 'GB94CITI18500856468624', swift: 'CITIGB2L',
    routing: '', sortCode: '185008',
    branchCode: '', institutionNumber: '', transitNumber: '', bsbCode: '',
    address: 'Canada Square, Canary Wharf, London E14 5LB, United Kingdom',
  },
  EUR: {
    currency: 'EUR', currencyName: 'Euro', flag: '🇪🇺', country: 'Eurozone',
    bankName: 'Citibank', transferType: 'Local & International',
    beneficiary: 'KENNETH CHIDERA ODENYI',
    accountNumber: '',
    accountType: '',
    iban: 'IE70CITI99005171297018', swift: 'CITIIE2X',
    routing: '', sortCode: '',
    branchCode: '', institutionNumber: '', transitNumber: '', bsbCode: '',
    address: '1 North Wall Quay, IFSC, Dublin 1, Ireland',
  },
  CAD: {
    currency: 'CAD', currencyName: 'Canadian Dollar', flag: '🇨🇦', country: 'Canada',
    bankName: 'Citibank NA Canadian Branch', transferType: 'Local Transfer',
    beneficiary: 'KENNETH CHIDERA ODENYI',
    accountNumber: '3001440544',
    accountType: 'Checking',
    iban: '', swift: '',
    routing: '', sortCode: '',
    branchCode: '', institutionNumber: '0328', transitNumber: '20012', bsbCode: '',
    address: '123 Front St. West, Toronto, ON M5J 2M3, Canada',
  },
  AUD: {
    currency: 'AUD', currencyName: 'Australian Dollar', flag: '🇦🇺', country: 'Australia',
    bankName: 'Citibank', transferType: 'Local & International',
    beneficiary: 'KENNETH CHIDERA ODENYI',
    accountNumber: '10674571',
    accountType: '',
    iban: '', swift: '',
    routing: '', sortCode: '',
    branchCode: '', institutionNumber: '', transitNumber: '', bsbCode: '248024',
    address: '2 Park Street, Sydney NSW 2000, Australia',
  },
  SGD: {
    currency: 'SGD', currencyName: 'Singapore Dollar', flag: '🇸🇬', country: 'Singapore',
    bankName: 'Citibank N.A. Singapore Branch', transferType: 'Local & International',
    beneficiary: 'KENNETH CHIDERA ODENYI',
    accountNumber: '44990709533',
    accountType: '',
    iban: '', swift: 'CITISGSG',
    routing: '', sortCode: '',
    bankCode: '7214', branchCode: '001', institutionNumber: '', transitNumber: '', bsbCode: '',
    address: '8 Marina View, #17-01 Asia Square Tower 1, Singapore 018960',
  },
  JPY: {
    currency: 'JPY', currencyName: 'Japanese Yen', flag: '🇯🇵', country: 'Japan',
    bankName: 'MUFG Bank Ltd.', transferType: 'Local Transfer',
    beneficiary: 'KENNETH CHIDERA ODENYI',
    accountNumber: '4682719',
    accountType: 'Savings / Futsu',
    iban: '', swift: '',
    routing: '', sortCode: '',
    bankCode: '0005', branchCode: '869', institutionNumber: '', transitNumber: '', bsbCode: '',
    address: '7-1 Marunouchi 2-Chome, Chiyoda-ku, Tokyo, Japan',
  },
  MXN: {
    currency: 'MXN', currencyName: 'Mexican Peso', flag: '🇲🇽', country: 'Mexico',
    bankName: 'Sistema de Transferencias y Pagos', transferType: 'Local Transfer',
    beneficiary: 'KENNETH CHIDERA ODENYI',
    accountNumber: '646010504200345127',
    accountType: '',
    iban: '', swift: '',
    routing: '', sortCode: '',
    bankCode: '646', branchCode: '010', institutionNumber: '', transitNumber: '', bsbCode: '',
    address: 'Av. Insurgentes Sur 1425, Ciudad de México, México',
  },
  IDR: {
    currency: 'IDR', currencyName: 'Indonesian Rupiah', flag: '🇮🇩', country: 'Indonesia',
    bankName: 'Deutsche Bank AG Jakarta Branch', transferType: 'Local Transfer',
    beneficiary: 'KENNETH CHIDERA ODENYI',
    accountNumber: '974400000904',
    accountType: '',
    iban: '', swift: '',
    routing: '', sortCode: '',
    branchCode: '0670304', institutionNumber: '', transitNumber: '', bsbCode: '',
    address: 'Jl. Imam Bonjol 80, Jakarta 10310, Indonesia',
  },
};

/* ── Coming Soon payment methods ───────────────────────────── */
const COMING_SOON_METHODS = [
  { name: 'PayPal', icon: 'wallet', color: 'text-blue-400' },
  { name: 'Stripe', icon: 'credit-card', color: 'text-violet-400' },
  { name: 'Flutterwave', icon: 'zap', color: 'text-orange-400' },
  { name: 'Paystack', icon: 'layers', color: 'text-cyan-400' },
  { name: 'Apple Pay', icon: 'smartphone', color: 'text-gray-300' },
  { name: 'Google Pay', icon: 'smartphone', color: 'text-green-400' },
  { name: 'Visa', icon: 'credit-card', color: 'text-blue-500' },
  { name: 'Mastercard', icon: 'credit-card', color: 'text-red-500' },
  { name: 'American Express', icon: 'credit-card', color: 'text-blue-300' },
  { name: 'Discover', icon: 'credit-card', color: 'text-orange-500' },
  { name: 'Verve', icon: 'credit-card', color: 'text-green-500' },
  { name: 'Bitcoin (BTC)', icon: 'bitcoin', color: 'text-yellow-500' },
  { name: 'Ethereum (ETH)', icon: 'bitcoin', color: 'text-indigo-400' },
  { name: 'USDT', icon: 'bitcoin', color: 'text-green-400' },
];

/* ── Order progress tracker steps ─────────────────────────── */
const ORDER_STEPS = [
  { id: 'placed', label: 'Order Placed', icon: 'shopping-bag', color: 'text-blue-400', bg: 'bg-blue-500/15' },
  { id: 'submitted', label: 'Payment Submitted', icon: 'upload', color: 'text-cyan-400', bg: 'bg-cyan-500/15' },
  { id: 'verification', label: 'Pending Verification', icon: 'loader', color: 'text-amber-400', bg: 'bg-amber-500/15' },
  { id: 'approved', label: 'Approved', icon: 'check-circle', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  { id: 'processing', label: 'Processing', icon: 'package', color: 'text-blue-400', bg: 'bg-blue-500/15' },
  { id: 'shipped', label: 'Shipped', icon: 'truck', color: 'text-indigo-400', bg: 'bg-indigo-500/15' },
  { id: 'delivered', label: 'Delivered', icon: 'package-check', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
];

/* ── Helpers ───────────────────────────────────────────────── */
function getListingId() {
  return new URLSearchParams(window.location.search).get('id');
}

function getStoredCountry() {
  return localStorage.getItem('kco_country') || 'US';
}

function generateOrderNumber() {
  const ts = Date.now().toString(36).toUpperCase().slice(-6);
  const rnd = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `KCO-${ts}${rnd}`;
}

function copyToClipboard(text, btnEl) {
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => fallback());
  } else {
    fallback();
  }
  if (btnEl) {
    const orig = btnEl.innerHTML;
    btnEl.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>';
    if (window.lucide) lucide.createIcons();
    setTimeout(() => { btnEl.innerHTML = orig; if (window.lucide) lucide.createIcons(); }, 1500);
  }
  showToast('Copied Successfully.');
}

function showToast(msg) {
  let toast = document.getElementById('payment-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'payment-toast';
    toast.className = 'fixed bottom-5 right-5 z-[100] transform translate-y-20 opacity-0 bg-gray-900 border border-blue-500/30 text-white px-5 py-3 rounded-xl shadow-xl text-xs flex items-center gap-2 font-medium transition-all duration-300';
    toast.innerHTML = '<i data-lucide="info" class="w-4 h-4 text-blue-400"></i><span id="payment-toast-msg">Action</span>';
    document.body.appendChild(toast);
  }
  toast.querySelector('#payment-toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
  if (window.lucide) lucide.createIcons();
}

/* ── Particles ────────────────────────────────────────────── */
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.className = 'particle';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.background = Math.random() > 0.5 ? 'rgba(59,130,246,.4)' : 'rgba(251,191,36,.3)';
    p.style.animationDuration = (Math.random() * 20 + 15) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    container.appendChild(p);
  }
}
spawnParticles();

/* ── Render: Order summary card ────────────────────────────── */
function renderOrderSummary(listing, cover, isProperty) {
  const price = formatPrice(listing);
  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-2 mb-4">
        <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="shopping-bag" class="w-4 h-4 text-blue-400"></i></div>
        <h3 class="text-sm font-bold text-white uppercase tracking-wide">Order Summary</h3>
      </div>
      <div class="flex gap-4">
        <div class="w-24 h-24 rounded-xl overflow-hidden bg-gray-900 shrink-0 ring-1 ring-blue-500/10">
          <img src="${cover}" alt="${listing.title}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-white truncate">${listing.title}</h4>
          <p class="text-gray-500 text-xs mt-0.5">ID: <span class="text-blue-400 font-mono">${listing.property_id}</span></p>
          ${isProperty && listing.city ? `<p class="text-gray-400 text-xs mt-0.5">${flagEmoji(listing.country_code)} ${listing.city}, ${listing.country}</p>` : ''}
          <p class="text-2xl font-black text-blue-400 mt-2">${price}</p>
        </div>
      </div>
    </div>
  `;
}

/* ── Render: Bank account card ─────────────────────────────── */
function renderBankAccount(account) {
  const fields = [
    { label: 'Country', value: account.country },
    { label: 'Bank Name', value: account.bankName },
    { label: 'Transfer Type', value: account.transferType },
    { label: 'Beneficiary Name', value: account.beneficiary },
    { label: 'Account Number', value: account.accountNumber },
    { label: 'Account Type', value: account.accountType },
    { label: 'IBAN', value: account.iban },
    { label: 'SWIFT / BIC Code', value: account.swift },
    { label: 'Routing (ABA)', value: account.routing },
    { label: 'Sort Code', value: account.sortCode },
    { label: 'Bank Code', value: account.bankCode },
    { label: 'Branch Code', value: account.branchCode },
    { label: 'Institution Number', value: account.institutionNumber },
    { label: 'Transit Number', value: account.transitNumber },
    { label: 'BSB Code', value: account.bsbCode },
    { label: 'Bank Address', value: account.address },
  ].filter(f => f.value && f.value.trim() !== '');

  const copyFields = fields.map(f => ({ label: f.label, value: f.value }));

  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-3 mb-5">
        <div class="p-2.5 bg-blue-500/10 rounded-lg"><i data-lucide="landmark" class="w-5 h-5 text-blue-400"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">Receiving Bank Account</h3>
          <p class="text-gray-500 text-xs">${account.flag} ${account.currencyName} (${account.currency})</p>
        </div>
        <span class="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20">
          <i data-lucide="shield-check" class="w-3 h-3"></i> Verified
        </span>
      </div>
      <div class="space-y-2">
        ${fields.map(f => `
          <div class="flex items-center justify-between gap-3 bg-blue-950/40 border border-blue-500/10 rounded-xl px-4 py-2.5">
            <div class="min-w-0 flex-1">
              <div class="text-gray-500 text-[11px] uppercase tracking-wide">${f.label}</div>
              <div class="text-gray-100 text-sm font-medium font-mono break-all">${f.value}</div>
            </div>
            <button onclick="copyToClipboard('${f.value.replace(/'/g, "\\'")}', this)" class="shrink-0 p-2 bg-blue-900/40 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition group" title="Copy ${f.label}">
              <i data-lucide="copy" class="w-4 h-4 text-gray-400 group-hover:text-blue-400"></i>
            </button>
          </div>
        `).join('')}
      </div>
      <button onclick='copyAllDetails(${JSON.stringify(copyFields).replace(/'/g, "&#39;")})' class="btn-press w-full mt-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold py-2.5 rounded-xl uppercase text-xs tracking-wider transition flex items-center justify-center gap-2 relative overflow-hidden">
        <i data-lucide="copy-check" class="w-4 h-4"></i> Copy All Account Details
      </button>
    </div>
  `;
}

/* ── Render: Unsupported currency message ─────────────────── */
function renderUnsupportedCurrency() {
  const usdAccount = BANK_ACCOUNTS.USD;
  return `
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
    ${renderBankAccount(usdAccount)}
  `;
}

/* ── Render: Currency selector ─────────────────────────────── */
function renderCurrencySelector(selectedCurrency, countryName, countryCode) {
  const currencies = SUPPORTED_CURRENCIES;
  const country = countryCode ? getCountryByCode(countryCode) : null;
  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2.5 bg-blue-500/10 rounded-lg"><i data-lucide="globe" class="w-5 h-5 text-blue-400"></i></div>
        <div class="flex-1">
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">Payment Currency</h3>
          <p class="text-gray-500 text-xs">${country ? country.flag + ' ' + countryName : countryName || 'Select currency'} ${selectedCurrency ? '→ ' + selectedCurrency : '→ USD (default)'}</p>
        </div>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
        ${currencies.map(c => {
          const acc = BANK_ACCOUNTS[c];
          const active = c === selectedCurrency;
          return `
            <button onclick="selectCurrency('${c}')" class="btn-press flex flex-col items-center gap-1 p-3 rounded-xl border transition relative overflow-hidden ${active ? 'bg-blue-500/15 border-blue-500/50 text-blue-400 pulse-glow' : 'bg-blue-950/40 border-blue-500/10 text-gray-400 hover:border-blue-500/30 hover:text-white'}">
              <span class="text-2xl">${acc.flag}</span>
              <span class="text-xs font-bold">${c}</span>
              <span class="text-[10px] text-gray-500">${acc.currencyName}</span>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/* ── Render: Manual bank transfer method card ──────────────── */
function renderBankTransferMethod() {
  return `
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
  `;
}

/* ── Render: Coming soon methods ───────────────────────────── */
function renderComingSoonMethods() {
  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2.5 bg-gray-700/30 rounded-lg"><i data-lucide="lock" class="w-5 h-5 text-gray-500"></i></div>
        <div>
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">More Payment Methods</h3>
          <p class="text-gray-500 text-xs">Coming soon to K.C.O Global Online Marketplace</p>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        ${COMING_SOON_METHODS.map(m => `
          <div class="relative bg-blue-950/30 border border-blue-500/10 rounded-xl p-3 opacity-50 cursor-not-allowed select-none">
            <span class="absolute top-1.5 right-1.5 bg-gray-700 text-gray-400 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full">Soon</span>
            <div class="flex items-center gap-2 mb-0.5">
              <i data-lucide="${m.icon}" class="w-4 h-4 ${m.color}"></i>
              <span class="text-xs font-bold text-gray-400">${m.name}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ── Render: Order progress tracker ────────────────────────── */
function renderOrderTracker(currentStep) {
  const stepIndex = ORDER_STEPS.findIndex(s => s.id === currentStep);
  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up">
      <div class="flex items-center gap-2 mb-5">
        <div class="p-2 bg-blue-500/10 rounded-lg"><i data-lucide="git-branch" class="w-4 h-4 text-blue-400"></i></div>
        <h3 class="text-sm font-bold text-white uppercase tracking-wide">Order Progress</h3>
      </div>
      <div class="relative">
        <!-- Progress line -->
        <div class="absolute left-4 top-4 bottom-4 w-0.5 bg-blue-500/10"></div>
        <div class="absolute left-4 top-4 w-0.5 bg-blue-500 transition-all duration-500" style="height: ${stepIndex >= 0 ? (stepIndex / (ORDER_STEPS.length - 1)) * 100 : 0}%; min-height: 0; max-height: calc(100% - 2rem)"></div>
        <div class="space-y-4">
          ${ORDER_STEPS.map((step, i) => {
            const done = i <= stepIndex;
            const active = i === stepIndex;
            return `
              <div class="flex items-center gap-3 relative">
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${done ? step.bg + ' border border-blue-500/30' : 'bg-blue-950/40 border border-blue-500/10'} ${active ? 'pulse-glow' : ''}">
                  <i data-lucide="${step.icon}" class="w-4 h-4 ${done ? step.color : 'text-gray-600'} ${active ? 'animate-pulse' : ''}"></i>
                </div>
                <div class="flex-1">
                  <div class="text-sm font-medium ${done ? 'text-white' : 'text-gray-600'}">${step.label}</div>
                </div>
                ${done && !active ? '<i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0"></i>' : ''}
                ${active ? '<span class="text-[10px] text-blue-400 font-bold uppercase shrink-0">Current</span>' : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ── Render: Upload receipt form ───────────────────────────── */
function renderUploadForm(orderNumber, listing, amount, currency, isGuest) {
  const guestShippingBlock = isGuest ? `
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
  ` : '';

  const contactBlock = isGuest ? '' : `
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
  `;

  return `
    <div class="glass border border-blue-500/20 rounded-2xl p-5 mb-5 slide-up" id="upload-section">
      <div class="flex items-center gap-3 mb-5">
        <div class="p-2.5 bg-blue-500/10 rounded-lg"><i data-lucide="upload-cloud" class="w-5 h-5 text-blue-400"></i></div>
        <div>
          <h3 class="text-sm font-bold text-white uppercase tracking-wide">Upload Payment Receipt</h3>
          <p class="text-gray-500 text-xs">After making your payment, upload your receipt for verification.</p>
        </div>
      </div>

      <form id="receipt-form" class="space-y-4">
        <input type="hidden" id="form-order-number" value="${orderNumber}">
        <input type="hidden" id="form-listing-id" value="${listing.property_id}">
        <input type="hidden" id="form-listing-title" value="${listing.title}">
        <input type="hidden" id="form-amount" value="${amount}">
        <input type="hidden" id="form-currency" value="${currency}">
        <input type="hidden" id="form-is-guest" value="${isGuest ? '1' : '0'}">

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Order Number</label>
            <input type="text" value="${orderNumber}" disabled class="w-full bg-[#0a1124]/80 border border-blue-500/10 rounded-xl px-4 py-2.5 text-sm text-blue-400 font-mono font-bold">
          </div>
          <div class="flex items-end">
            <div class="text-xs text-gray-500 pb-2">Save your order number to track your payment status.</div>
          </div>
        </div>

        ${guestShippingBlock}
        ${contactBlock}

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Selected Currency</label>
            <input type="text" id="form-currency-display" value="${currency}" disabled class="w-full bg-[#0a1124]/80 border border-blue-500/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Amount Paid *</label>
            <input type="number" id="form-amount-paid" required step="0.01" value="${amount}" placeholder="0.00" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
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
  `;
}

/* ── Render: Pending verification state ────────────────────── */
function renderPendingVerification(orderNumber, listing, amount, currency) {
  const price = formatPrice(listing);
  return `
    <div class="fade-in text-center py-8">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6 check-pop">
        <i data-lucide="check-circle" class="w-12 h-12 text-emerald-400"></i>
      </div>
      <h1 class="text-2xl font-black text-white mb-2">Receipt Submitted</h1>
      <p class="text-gray-400 text-sm mb-6">Your payment receipt has been received successfully.</p>

      <div class="glass border border-blue-500/20 rounded-2xl p-5 max-w-md mx-auto mb-5 text-left">
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Order Number</span><span class="text-blue-400 font-mono font-bold">${orderNumber}</span></div>
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Item</span><span class="text-white font-bold truncate ml-2">${listing.title}</span></div>
        <div class="flex justify-between text-sm mb-2"><span class="text-gray-500">Amount</span><span class="text-white font-bold">${price}</span></div>
        <div class="flex justify-between text-sm mb-4"><span class="text-gray-500">Currency</span><span class="text-white font-bold">${currency}</span></div>
        <div class="border-t border-blue-500/10 pt-3">
          <div class="flex items-center gap-2 text-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span class="text-amber-400 font-bold">Pending Verification</span>
          </div>
        </div>
      </div>

      ${renderOrderTracker('verification')}

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
  `;
}

/* ── Main init ─────────────────────────────────────────────── */
async function init() {
  const root = document.getElementById('payment-content');
  const params = new URLSearchParams(window.location.search);
  const isGuest = params.get('guest') === '1';
  const user = isGuest ? null : await getCurrentUser();
  if (!user && !isGuest) { window.location.href = '/'; return; }

  const id = getListingId();
  const listing = SHOWROOM_LISTINGS.find(l => l.property_id === id);
  if (!listing) {
    root.innerHTML = '<div class="text-center py-20 text-gray-500">Listing not found.</div>';
    return;
  }

  const price = formatPrice(listing);
  const isProperty = listing.listing_type === 'property';
  const cover = listing.images?.[0] || FALLBACK_IMG;

  // Load saved country from profile or localStorage
  let countryCode = getStoredCountry();
  if (user && !isGuest) {
    const { data: profile } = await supabase.from('profiles').select('country_code').eq('user_id', user.id).single();
    if (profile?.country_code) {
      countryCode = profile.country_code;
      localStorage.setItem('kco_country', countryCode);
    }
  }
  const country = getCountryByCode(countryCode);
  const countryName = country ? country.name : countryCode;
  const detectedCurrency = detectCurrency(countryCode);
  const orderNumber = generateOrderNumber();
  const baseAmount = listing.price;

  let selectedCurrency = detectedCurrency || 'USD';

  root.innerHTML = `
    <div class="fade-in">
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-400 transition">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span>Checkout</span>
      </div>

      <h1 class="text-2xl sm:text-3xl font-black text-white mb-2">Secure Checkout</h1>
      <p class="text-gray-500 text-sm mb-6">Complete your purchase using manual bank transfer. Upload your receipt after payment for verification.</p>

      ${renderOrderSummary(listing, cover, isProperty)}

      ${renderBankTransferMethod()}

      <div id="currency-selector-container">${renderCurrencySelector(selectedCurrency, countryName, countryCode)}</div>

      <div id="bank-account-container">${selectedCurrency && BANK_ACCOUNTS[selectedCurrency] ? renderBankAccount(BANK_ACCOUNTS[selectedCurrency]) : renderUnsupportedCurrency()}</div>

      <div id="upload-form-container">${renderUploadForm(orderNumber, listing, baseAmount, selectedCurrency, isGuest)}</div>

      ${renderComingSoonMethods()}

      ${renderOrderTracker('submitted')}

      <p class="text-center text-xs text-gray-500 mb-6 flex items-center justify-center gap-1.5">
        <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Your payment is secured with SSL encryption. Manual verification by our finance team.
      </p>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
  attachEventHandlers(listing, baseAmount, orderNumber, user, isGuest);
}

/* ── Event handlers ────────────────────────────────────────── */
function attachEventHandlers(listing, baseAmount, orderNumber, user, isGuest) {
  // Ripple on buttons
  document.querySelectorAll('.btn-press').forEach(btn => {
    btn.addEventListener('click', function (e) {
      if (this.disabled) return;
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  window.selectCurrency = (currency) => {
    const container = document.getElementById('bank-account-container');
    if (BANK_ACCOUNTS[currency]) {
      container.innerHTML = renderBankAccount(BANK_ACCOUNTS[currency]);
    } else {
      container.innerHTML = renderUnsupportedCurrency();
    }
    document.querySelectorAll('#currency-selector-container button').forEach(btn => {
      if (btn.getAttribute('onclick')?.includes(`'${currency}'`)) {
        btn.className = btn.className.replace('bg-blue-950/40 border-blue-500/10 text-gray-400 hover:border-blue-500/30 hover:text-white', 'bg-blue-500/15 border-blue-500/50 text-blue-400 pulse-glow');
      } else {
        btn.className = btn.className.replace('bg-blue-500/15 border-blue-500/50 text-blue-400 pulse-glow', 'bg-blue-950/40 border-blue-500/10 text-gray-400 hover:border-blue-500/30 hover:text-white');
      }
    });
    const currencyDisplay = document.getElementById('form-currency-display');
    if (currencyDisplay) currencyDisplay.value = currency;
    const currencyHidden = document.getElementById('form-currency');
    if (currencyHidden) currencyHidden.value = currency;
    if (window.lucide) lucide.createIcons();
  };

  window.copyAllDetails = (fields) => {
    const text = fields.map(f => `${f.label}: ${f.value}`).join('\n');
    copyToClipboard(text);
  };

  window.copyToClipboard = copyToClipboard;

  // File upload
  const dropZone = document.getElementById('file-drop-zone');
  const fileInput = document.getElementById('form-receipt-file');
  const filePrompt = document.getElementById('file-prompt');
  const fileInfo = document.getElementById('file-info');
  const fileNameDisplay = document.getElementById('file-name-display');
  const fileSizeDisplay = document.getElementById('file-size-display');
  const fileError = document.getElementById('file-error');

  window.removeReceiptFile = () => {
    fileInput.value = '';
    filePrompt.classList.remove('hidden');
    fileInfo.classList.add('hidden');
    fileError.classList.add('hidden');
    filePreviewContainer.classList.add('hidden');
  };

  const filePreviewImg = document.getElementById('file-preview-img');
  const filePreviewContainer = document.getElementById('file-preview-container');

  const handleFile = (file) => {
    fileError.classList.add('hidden');
    if (!file) return;
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    const extAllowed = ['jpg', 'jpeg', 'png', 'webp', 'pdf'].includes(ext);
    if (!allowed.includes(file.type) || !extAllowed) {
      fileError.textContent = 'Please upload a JPG, JPEG, PNG, WEBP, or PDF file.';
      fileError.classList.remove('hidden');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      fileError.textContent = 'File size must be 20 MB or less.';
      fileError.classList.remove('hidden');
      return;
    }
    fileNameDisplay.textContent = file.name;
    fileSizeDisplay.textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
    filePrompt.classList.add('hidden');
    fileInfo.classList.remove('hidden');
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        filePreviewImg.src = e.target.result;
        filePreviewContainer.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    } else {
      filePreviewContainer.classList.add('hidden');
    }
    if (window.lucide) lucide.createIcons();
  };

  const btnTakePhoto = document.getElementById('btn-take-photo');
  const btnChooseFile = document.getElementById('btn-choose-file');

  dropZone.addEventListener('click', (e) => {
    if (e.target.closest('#btn-take-photo') || e.target.closest('#btn-choose-file') || e.target.closest('#file-info')) return;
    fileInput.click();
  });
  if (btnTakePhoto) btnTakePhoto.addEventListener('click', (e) => { e.stopPropagation(); fileInput.setAttribute('capture', 'environment'); fileInput.click(); });
  if (btnChooseFile) btnChooseFile.addEventListener('click', (e) => { e.stopPropagation(); fileInput.removeAttribute('capture'); fileInput.click(); });
  fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-blue-500/50', 'bg-blue-500/5');
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-blue-500/50', 'bg-blue-500/5');
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-blue-500/50', 'bg-blue-500/5');
    if (e.dataTransfer.files.length) {
      const dt = new DataTransfer();
      dt.items.add(e.dataTransfer.files[0]);
      fileInput.files = dt.files;
      handleFile(e.dataTransfer.files[0]);
    }
  });

  // Form submission
  const form = document.getElementById('receipt-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-receipt-btn');
    const file = fileInput.files[0];
    if (!file) {
      fileError.textContent = 'Please upload your payment receipt.';
      fileError.classList.remove('hidden');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Submitting...';
    if (window.lucide) lucide.createIcons();

    const progressContainer = document.getElementById('upload-progress');
    const progressBar = document.getElementById('upload-progress-bar');
    const progressText = document.getElementById('upload-progress-text');
    progressContainer.classList.remove('hidden');

    try {
      const fileExt = file.name.split('.').pop();
      const folderPrefix = isGuest ? 'guest' : user.id;
      const filePath = `${folderPrefix}/${orderNumber}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('payment-receipts')
        .upload(filePath, file, {
          onUploadProgress: (ev) => {
            const pct = Math.round((ev.loaded / ev.total) * 100);
            progressBar.style.width = pct + '%';
            progressText.textContent = `Uploading receipt... ${pct}%`;
          },
        });

      if (uploadError) throw new Error('Failed to upload receipt: ' + uploadError.message);

      progressBar.style.width = '100%';
      progressText.textContent = 'Saving payment record...';

      const receiptData = {
        order_number: orderNumber,
        listing_id: document.getElementById('form-listing-id').value,
        listing_title: document.getElementById('form-listing-title').value,
        amount: parseFloat(document.getElementById('form-amount-paid').value),
        currency: document.getElementById('form-currency').value,
        full_name: document.getElementById('form-full-name').value,
        email: document.getElementById('form-email').value,
        phone: document.getElementById('form-phone').value,
        payment_date: document.getElementById('form-payment-date').value,
        transaction_reference: document.getElementById('form-tx-ref').value,
        receipt_file_path: filePath,
        receipt_file_name: file.name,
        additional_notes: document.getElementById('form-notes').value || null,
        status: 'pending_verification',
      };

      if (isGuest) {
        receiptData.is_guest = true;
        receiptData.user_id = null;
        receiptData.guest_shipping_address = document.getElementById('form-shipping-address')?.value || null;
        receiptData.guest_country = document.getElementById('form-guest-country')?.value || null;
        receiptData.guest_state = document.getElementById('form-guest-state')?.value || null;
        receiptData.guest_city = document.getElementById('form-guest-city')?.value || null;
        receiptData.guest_postal_code = document.getElementById('form-guest-postal')?.value || null;
      } else {
        receiptData.user_id = user.id;
      }

      const { error: dbError } = await supabase
        .from('payment_receipts')
        .insert(receiptData);

      if (dbError) throw new Error('Failed to save payment: ' + dbError.message);

      // Trigger notification emails (fire-and-forget — the DB trigger already queued them)
      try {
        const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-notification`;
        fetch(fnUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order_number: orderNumber }),
        }).catch(() => {});
      } catch (e) { /* non-blocking */ }

      const root = document.getElementById('payment-content');
      const listingRef = SHOWROOM_LISTINGS.find(l => l.property_id === document.getElementById('form-listing-id').value);
      root.innerHTML = renderPendingVerification(orderNumber, listingRef, parseFloat(document.getElementById('form-amount-paid').value), document.getElementById('form-currency').value);
      if (window.lucide) lucide.createIcons();
      showToast('Payment receipt submitted successfully.');
    } catch (err) {
      progressContainer.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> Submit Payment';
      if (window.lucide) lucide.createIcons();
      fileError.textContent = err.message || 'Something went wrong. Please try again.';
      fileError.classList.remove('hidden');
    }
  });
}

init();

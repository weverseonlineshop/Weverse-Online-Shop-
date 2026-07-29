/* ================================================================
   K.C.O Global Online Marketplace — Live Stream Mode
   ================================================================
   Optimizes the entire site for live screen sharing on TikTok,
   Facebook, and YouTube Live. Enlarges cards, fonts, prices, and
   buttons so viewers can clearly see products. Adds a branded LIVE
   overlay badge. Toggle persists across pages and reloads.
   ================================================================ */

const STORAGE_KEY = 'kco_live_stream_mode';

let active = false;

// ── CSS injected once ──────────────────────────────────────────
const CSS = `
/* ── Live Stream Mode: enlarged, broadcast-friendly ── */
body.kco-live-mode .showroom-card {
  border-width: 2px !important;
  border-radius: 16px !important;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(249,115,22,0.08) !important;
}
body.kco-live-mode .showroom-card:hover {
  border-color: rgba(249,115,22,0.6) !important;
  box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 32px rgba(249,115,22,0.15) !important;
}
body.kco-live-mode .showroom-card img {
  transition: transform 0.4s ease !important;
}
body.kco-live-mode .showroom-card:hover img {
  transform: scale(1.08) !important;
}
/* Larger card titles */
body.kco-live-mode .showroom-card h3 {
  font-size: 15px !important;
  line-height: 1.3 !important;
  margin-bottom: 6px !important;
}
/* Larger prices — most important for live viewers */
body.kco-live-mode .showroom-card .text-orange-500,
body.kco-live-mode .showroom-card [class*="text-orange"] {
  font-size: 20px !important;
  font-weight: 900 !important;
  text-shadow: 0 2px 8px rgba(249,115,22,0.3) !important;
}
/* Larger spec text */
body.kco-live-mode .showroom-card .text-gray-500,
body.kco-live-mode .showroom-card .text-gray-400 {
  font-size: 13px !important;
}
/* Larger status badges */
body.kco-live-mode .showroom-card .absolute.top-1\.5 {
  font-size: 11px !important;
  padding: 3px 8px !important;
  border-radius: 8px !important;
}
/* Larger buttons */
body.kco-live-mode .showroom-card button {
  font-size: 13px !important;
  padding: 10px 12px !important;
  border-radius: 10px !important;
  font-weight: 800 !important;
}
body.kco-live-mode .showroom-card button i {
  width: 16px !important;
  height: 16px !important;
}
/* Larger rating stars */
body.kco-live-mode .showroom-card [class*="star"] {
  width: 16px !important;
  height: 16px !important;
}
body.kco-live-mode .showroom-card [class*="text-gray-300"],
body.kco-live-mode .showroom-card [class*="text-gray-600"] {
  font-size: 13px !important;
}

/* ── Section headers: bigger, bolder ── */
body.kco-live-mode .showroom-section h3 {
  font-size: 22px !important;
  font-weight: 900 !important;
  letter-spacing: -0.02em !important;
}
body.kco-live-mode .showroom-section h4 {
  font-size: 16px !important;
  font-weight: 700 !important;
}
body.kco-live-mode .showroom-section .text-gray-500 {
  font-size: 14px !important;
}

/* ── Search bar: bigger, more visible ── */
body.kco-live-mode #smart-search-container input {
  font-size: 16px !important;
  padding: 14px 12px !important;
}
body.kco-live-mode #smart-search-container button {
  font-size: 14px !important;
  padding: 10px 20px !important;
}

/* ── Category pills: larger touch targets ── */
body.kco-live-mode .category-pill,
body.kco-live-mode [class*="category"] button {
  font-size: 14px !important;
  padding: 10px 16px !important;
  border-radius: 12px !important;
}

/* ── Header brand: more prominent ── */
body.kco-live-mode header span.text-\\[13px\\],
body.kco-live-mode header span.text-\\[15px\\],
body.kco-live-mode header span.text-\\[17px\\] {
  font-size: 20px !important;
}

/* ── Footer: larger text ── */
body.kco-live-mode footer {
  font-size: 14px !important;
}
body.kco-live-mode footer a {
  font-size: 13px !important;
}

/* ── Details page: larger product info ── */
body.kco-live-mode .text-2xl,
body.kco-live-mode .text-3xl {
  font-size: 28px !important;
}
body.kco-live-mode .text-xl {
  font-size: 22px !important;
}

/* ── Smooth scroll for broadcast ── */
body.kco-live-mode {
  scroll-behavior: smooth !important;
}
body.kco-live-mode * {
  -webkit-tap-highlight-color: transparent;
}

/* ── LIVE badge overlay ── */
@keyframes kcoLivePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
@keyframes kcoLiveRing {
  0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
  70% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
  100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
}
#kco-live-badge {
  animation: kcoLiveRing 2s infinite;
}
#kco-live-badge .kco-live-dot {
  animation: kcoLivePulse 1.5s ease-in-out infinite;
}

/* ── Live mode toggle button ── */
@keyframes kcoLiveBtnGlow {
  0%, 100% { box-shadow: 0 0 12px rgba(239,68,68,0.3); }
  50% { box-shadow: 0 0 20px rgba(239,68,68,0.5); }
}
#kco-live-toggle {
  animation: kcoLiveBtnGlow 3s ease-in-out infinite;
}
#kco-live-toggle.active {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
  animation: kcoLiveBtnGlow 1.5s ease-in-out infinite;
}
`;

function injectStyles() {
  if (document.getElementById('kco-live-styles')) return;
  const style = document.createElement('style');
  style.id = 'kco-live-styles';
  style.textContent = CSS;
  document.head.appendChild(style);
}

// ── Build the LIVE badge overlay ───────────────────────────────
function buildLiveBadge() {
  if (document.getElementById('kco-live-badge')) return;
  const badge = document.createElement('div');
  badge.id = 'kco-live-badge';
  badge.className = 'fixed top-3 right-3 z-[80] hidden items-center gap-2 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-black uppercase tracking-wider shadow-lg';
  badge.innerHTML = `
    <span class="kco-live-dot w-2.5 h-2.5 bg-white rounded-full"></span>
    <span>LIVE</span>
  `;
  document.body.appendChild(badge);
}

// ── Build the toggle button ────────────────────────────────────
function buildToggleButton() {
  if (document.getElementById('kco-live-toggle')) return;

  const btn = document.createElement('button');
  btn.id = 'kco-live-toggle';
  btn.className = 'fixed bottom-5 left-5 z-[55] hidden items-center gap-2 px-3 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg transition-all hover:scale-105';
  btn.style.background = '#1e293b';
  btn.style.border = '1px solid rgba(239,68,68,0.3)';
  btn.setAttribute('aria-label', 'Toggle Live Stream Mode');
  btn.innerHTML = `
    <span class="w-2 h-2 bg-red-500 rounded-full"></span>
    <span>Live Mode</span>
  `;
  btn.onclick = toggle;
  document.body.appendChild(btn);
}

// ── Show/hide toggle based on page ─────────────────────────────
function shouldShowToggle() {
  const path = window.location.pathname;
  // Show on main browsing pages, not admin/auth/policy pages
  if (path.includes('admin') || path.includes('auth') || path.includes('privacy') || path.includes('terms') || path.includes('refund') || path.includes('shipping-policy')) {
    return false;
  }
  return true;
}

// ── Activate / deactivate ──────────────────────────────────────
function activate() {
  active = true;
  document.body.classList.add('kco-live-mode');
  localStorage.setItem(STORAGE_KEY, '1');

  const badge = document.getElementById('kco-live-badge');
  if (badge) badge.style.display = 'flex';

  const btn = document.getElementById('kco-live-toggle');
  if (btn) {
    btn.classList.add('active');
    btn.querySelector('span:last-child').textContent = 'Live ON';
  }

  // Notify other components
  window.dispatchEvent(new CustomEvent('kco-live-mode', { detail: { active: true } }));
}

function deactivate() {
  active = false;
  document.body.classList.remove('kco-live-mode');
  localStorage.setItem(STORAGE_KEY, '0');

  const badge = document.getElementById('kco-live-badge');
  if (badge) badge.style.display = 'none';

  const btn = document.getElementById('kco-live-toggle');
  if (btn) {
    btn.classList.remove('active');
    btn.querySelector('span:last-child').textContent = 'Live Mode';
  }

  window.dispatchEvent(new CustomEvent('kco-live-mode', { detail: { active: false } }));
}

function toggle() {
  if (active) deactivate();
  else activate();
}

// ── Initialize ────────────────────────────────────────────────
function init() {
  injectStyles();
  buildLiveBadge();
  buildToggleButton();

  if (shouldShowToggle()) {
    const btn = document.getElementById('kco-live-toggle');
    if (btn) btn.style.display = 'flex';
  }

  // Restore saved state
  if (localStorage.getItem(STORAGE_KEY) === '1') {
    activate();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for programmatic control
window.kcoLiveStream = {
  enable: activate,
  disable: deactivate,
  toggle,
  isActive: () => active,
};

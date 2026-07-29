// ─── K.C.O Customer Support Widget ─────────────────────────────
// Premium messaging-style chat widget. Text + voice.
// Multilingual, proactive, separate from Admin AI.
import { supabase } from './supabase-client.js';
import { getLanguage, selectBestVoice, getVoiceForLanguage } from './localization.js';

const AI_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-customer-assistant`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let state = {
  open: false,
  history: [],
  sending: false,
  voiceEnabled: localStorage.getItem('kco_voice') === '1',
  voiceAccent: localStorage.getItem('kco_voice_accent') || 'US', // US or UK
  welcomed: false,
  proactiveShown: {},
};

// ── Helpers ──────────────────────────────────────────────────
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^\- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  html = `<p>${html}</p>`;
  html = html.replace(/<ul><br>/g, '<ul>').replace(/<br><\/ul>/g, '</ul>');
  return html;
}

function getCurrentLang() {
  return getLanguage() || localStorage.getItem('kco_language') || 'en';
}

function getPageContext() {
  const path = window.location.pathname;
  if (path.includes('checkout')) return 'checkout';
  if (path.includes('payment')) return 'payment';
  if (path.includes('auth')) return 'sign-in';
  if (path.includes('account')) return 'account';
  if (path.includes('details')) return 'product-details';
  if (path.includes('contact')) return 'contact';
  if (path.includes('help')) return 'help';
  if (path.includes('about')) return 'about';
  return 'home';
}

// ── Voice (Text-to-Speech) — natural female voice ─────────────
function speak(text) {
  if (!state.voiceEnabled) return;
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text.replace(/[*#`]/g, ''));
    const lang = getCurrentLang();
    const voiceConfig = getVoiceForLanguage(lang);

    // Use US or UK accent for English based on user preference
    if (lang === 'en') {
      utter.lang = state.voiceAccent === 'UK' ? 'en-GB' : 'en-US';
    } else {
      utter.lang = voiceConfig.lang;
    }

    utter.rate = voiceConfig.rate;
    utter.pitch = voiceConfig.pitch;

    const voice = selectBestVoice(lang === 'en' ? (state.voiceAccent === 'UK' ? 'en-GB' : 'en-US').slice(0, 2) : lang);
    if (voice) utter.voice = voice;

    window.speechSynthesis.speak(utter);
  } catch (e) { /* noop */ }
}

function stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

// ── Widget rendering ──────────────────────────────────────────
function injectStyles() {
  if (document.getElementById('kco-ai-styles')) return;
  const style = document.createElement('style');
  style.id = 'kco-ai-styles';
  style.textContent = `
    @keyframes kcoAiSlideUp { from { opacity:0; transform:translateY(20px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
    @keyframes kcoAiFadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes kcoAiTyping { 0%,60%,100% { opacity:0.3; transform:translateY(0); } 30% { opacity:1; transform:translateY(-4px); } }
    @keyframes kcoOnlinePulse { 0% { box-shadow:0 0 0 0 rgba(34,197,94,0.5); } 70% { box-shadow:0 0 0 6px rgba(34,197,94,0); } 100% { box-shadow:0 0 0 0 rgba(34,197,94,0); } }
    .kco-ai-msg-in { animation: kcoAiSlideUp 0.3s ease; }
    .kco-ai-fade { animation: kcoAiFadeIn 0.3s ease; }
    .kco-ai-typing-dot { animation: kcoAiTyping 1.2s infinite; }
    .kco-ai-typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .kco-ai-typing-dot:nth-child(3) { animation-delay: 0.4s; }
    #kco-ai-panel { transition: opacity 0.3s ease, transform 0.3s ease; }
    #kco-ai-panel.hidden-panel { opacity:0; transform:translateY(20px) scale(0.97); pointer-events:none; }
    .kco-ai-quick-btn { transition: all 0.2s ease; }
    .kco-ai-quick-btn:hover { transform: translateY(-1px); }
    .kco-ai-send-btn:disabled { opacity:0.5; }
    .kco-online-dot { animation: kcoOnlinePulse 2s infinite; }
  `;
  document.head.appendChild(style);
}

// ── Professional support avatar SVG (headset icon) ─────────────
const SUPPORT_AVATAR_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C7.58 2 4 5.58 4 10v4a3 3 0 0 0 3 3h1v-6H6v-1a6 6 0 0 1 12 0v1h-2v6h1a3 3 0 0 0 3-3v-4c0-4.42-3.58-8-8-8z" fill="#60a5fa"/><path d="M12 2C7.58 2 4 5.58 4 10v4a3 3 0 0 0 3 3h1v-6H6v-1a6 6 0 0 1 12 0v1h-2v6h1a3 3 0 0 0 3-3v-4c0-4.42-3.58-8-8-8z" stroke="#3b82f6" stroke-width="0.5"/></svg>`;

// ── Professional send button SVG (paper plane) ────────────────
const SEND_ICON_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a1 1 0 0 0-1.39 1.21L4 12l-1.99 7.19a1 1 0 0 0 1.39 1.21z" fill="white"/></svg>`;

function buildWidget() {
  injectStyles();

  // ── FAB with pulsing online dot ──
  const fab = document.createElement('button');
  fab.id = 'kco-ai-fab';
  fab.setAttribute('aria-label', 'Customer Support');
  fab.className = 'fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-all hover:scale-105';
  fab.style.background = '#1e293b';
  fab.style.border = '1px solid rgba(255,255,255,0.12)';

  fab.innerHTML = `
    <div class="relative flex items-center">
      <span class="text-base leading-none">\u{1F4AC}</span>
      <span class="kco-online-dot absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-900"></span>
    </div>
    <span>Customer Support</span>
  `;
  fab.onclick = togglePanel;
  document.body.appendChild(fab);

  // ── Panel ──
  const panel = document.createElement('div');
  panel.id = 'kco-ai-panel';
  panel.className = 'hidden-panel fixed bottom-[88px] right-5 z-[60] w-[calc(100vw-2.5rem)] sm:w-[400px] h-[560px] max-h-[calc(100vh-120px)] bg-slate-900/95 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden';
  panel.innerHTML = `
    <!-- Header — messaging app style -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-white/10" style="background:linear-gradient(135deg,#1e1e2e 0%,#1a1a2e 50%,#16213e 100%)">
      <div class="flex items-center gap-2.5">
        <div class="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0" style="background:rgba(59,130,246,0.15)">
          ${SUPPORT_AVATAR_SVG}
        </div>
        <div>
          <p class="text-sm font-bold text-white leading-tight tracking-wide">Customer Support</p>
          <p class="text-[10px] leading-tight flex items-center gap-1.5 mt-0.5">
            <span class="w-2 h-2 bg-emerald-400 rounded-full inline-block kco-online-dot"></span>
            <span class="text-emerald-400 font-medium">Online</span>
          </p>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <button id="kco-ai-voice-toggle" class="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-blue-100 transition" title="Toggle voice" aria-label="Toggle voice">
          <i data-lucide="volume-2" class="w-4 h-4"></i>
        </button>
        <button id="kco-ai-voice-accent" class="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-blue-100 transition text-[10px] font-bold" title="Switch voice accent" aria-label="Switch voice accent">
          ${state.voiceAccent}
        </button>
        <button id="kco-ai-close" class="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-blue-100 transition" title="Close" aria-label="Close">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
    </div>

    <!-- Messages -->
    <div id="kco-ai-messages" class="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
    </div>

    <!-- Quick actions -->
    <div id="kco-ai-quick" class="px-3 pb-2 flex gap-2 overflow-x-auto scrollbar-thin">
      <button class="kco-ai-quick-btn shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20" data-q="Help me find a product">Find products</button>
      <button class="kco-ai-quick-btn shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20" data-q="How do I track my order?">Track order</button>
      <button class="kco-ai-quick-btn shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20" data-q="What payment methods are available?">Payments</button>
      <button class="kco-ai-quick-btn shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20" data-q="Explain shipping and delivery">Shipping</button>
      <button class="kco-ai-quick-btn shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20" data-q="How do returns and refunds work?">Returns</button>
    </div>

    <!-- Input — messaging app style -->
    <div class="p-3 border-t border-blue-500/10 bg-slate-900/80">
      <div class="flex items-end gap-2">
        <textarea id="kco-ai-input" rows="1" placeholder="Type a message..." class="flex-1 bg-slate-800/80 text-sm text-gray-200 placeholder-gray-500 rounded-2xl px-4 py-2.5 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/40 border border-blue-500/15 max-h-24"></textarea>
        <button id="kco-ai-send" class="kco-ai-send-btn w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 hover:scale-110 transition-transform" style="background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);box-shadow:0 2px 8px rgba(59,130,246,0.3)" aria-label="Send message">
          ${SEND_ICON_SVG}
        </button>
      </div>
      <p class="text-[10px] text-gray-600 mt-1.5 text-center">AI may make mistakes. Verify important info.</p>
    </div>
  `;
  document.body.appendChild(panel);

  // Wire up
  document.getElementById('kco-ai-close').onclick = () => togglePanel(false);
  document.getElementById('kco-ai-voice-toggle').onclick = toggleVoice;
  document.getElementById('kco-ai-voice-accent').onclick = toggleVoiceAccent;
  document.getElementById('kco-ai-send').onclick = sendMessage;
  const input = document.getElementById('kco-ai-input');
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
  input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 96) + 'px'; });
  document.querySelectorAll('.kco-ai-quick-btn').forEach(btn => {
    btn.onclick = () => { input.value = btn.dataset.q; sendMessage(); };
  });
  updateVoiceIcon();
  if (window.lucide) lucide.createIcons();
}

function togglePanel(force) {
  const panel = document.getElementById('kco-ai-panel');
  const fab = document.getElementById('kco-ai-fab');
  state.open = force !== undefined ? force : panel.classList.contains('hidden-panel');
  if (state.open) {
    panel.classList.remove('hidden-panel');
    fab.style.display = 'none';
    if (!state.welcomed) { renderWelcome(); state.welcomed = true; }
    setTimeout(() => document.getElementById('kco-ai-input')?.focus(), 300);
  } else {
    panel.classList.add('hidden-panel');
    fab.style.display = 'flex';
    stopSpeaking();
  }
}

function toggleVoice() {
  state.voiceEnabled = !state.voiceEnabled;
  localStorage.setItem('kco_voice', state.voiceEnabled ? '1' : '0');
  if (!state.voiceEnabled) stopSpeaking();
  updateVoiceIcon();
  if (state.voiceEnabled) speak("Voice assistance is now on.");
}

function toggleVoiceAccent() {
  state.voiceAccent = state.voiceAccent === 'US' ? 'UK' : 'US';
  localStorage.setItem('kco_voice_accent', state.voiceAccent);
  const btn = document.getElementById('kco-ai-voice-accent');
  if (btn) btn.textContent = state.voiceAccent;
  const msg = state.voiceAccent === 'UK'
    ? "Voice accent switched to British English."
    : "Voice accent switched to American English.";
  speak(msg);
}

function updateVoiceIcon() {
  const btn = document.getElementById('kco-ai-voice-toggle');
  if (!btn) return;
  const icon = state.voiceEnabled ? 'volume-2' : 'volume-x';
  btn.title = state.voiceEnabled ? 'Voice is ON — click to mute' : 'Voice is OFF — click to enable';
  btn.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4"></i>`;
  if (window.lucide) lucide.createIcons();
}

// ── Messages ─────────────────────────────────────────────────
function renderMessage(msg, animate = true) {
  const container = document.getElementById('kco-ai-messages');
  if (!container) return;
  const isUser = msg.role === 'user';
  const wrapper = document.createElement('div');
  wrapper.className = `flex ${isUser ? 'justify-end' : 'justify-start'} ${animate ? 'kco-ai-msg-in' : ''}`;
  wrapper.innerHTML = isUser ? `
    <div class="max-w-[80%] text-white rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-lg" style="background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);box-shadow:0 2px 8px rgba(59,130,246,0.25)">
      <p class="text-sm leading-relaxed">${escapeHtml(msg.content)}</p>
    </div>
  ` : `
    <div class="max-w-[88%] flex gap-2">
      <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md mt-0.5" style="background:rgba(59,130,246,0.15)">
        ${SUPPORT_AVATAR_SVG}
      </div>
      <div class="bg-slate-800/80 border border-white/8 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
        <div class="text-sm text-gray-200 leading-relaxed">${renderMarkdown(msg.content)}</div>
      </div>
    </div>
  `;
  container.appendChild(wrapper);
  if (window.lucide) lucide.createIcons();
  scrollToBottom();
  if (!isUser) speak(msg.content);
}

function renderWelcome() {
  const lang = getCurrentLang();
  const welcomes = {
    en: "Welcome to K.C.O Global Online Marketplace!\n\nI'm here to help you with products, orders, payments, shipping, returns, and any questions you may have.\n\nHow can I help you today?",
    es: "¡Bienvenido a K.C.O Global Online Marketplace!\n\nEstoy aquí para ayudarte con productos, pedidos, pagos, envíos, devoluciones y cualquier pregunta que tengas.\n\n¿Cómo puedo ayudarte hoy?",
    fr: "Bienvenue sur K.C.O Global Online Marketplace !\n\nJe suis là pour vous aider avec les produits, les commandes, les paiements, la livraison, les retours et toute question que vous pourriez avoir.\n\nComment puis-je vous aider aujourd'hui ?",
    de: "Willkommen bei K.C.O Global Online Marketplace!\n\nIch bin hier, um Ihnen bei Produkten, Bestellungen, Zahlungen, Versand, Rücksendungen und allen Fragen zu helfen.\n\nWie kann ich Ihnen heute helfen?",
    ar: "مرحباً بك في K.C.O Global Online Marketplace!\n\nأنا هنا لمساعدتك في المنتجات والطلبات والمدفوعات والشحن والإرجاع وأي أسئلة قد تكون لديك.\n\nكيف يمكنني مساعدتك اليوم؟",
    pt: "Bem-vindo à K.C.O Global Online Marketplace!\n\nEstou aqui para ajudar com produtos, pedidos, pagamentos, envios, devoluções e qualquer pergunta que você tenha.\n\nComo posso ajudar você hoje?",
    ja: "K.C.O Global Online Marketplaceへようこそ！\n\n商品、ご注文、お支払い、配送、返品などについてご質問があればお手伝いします。\n\n本日はいかがいたしましたか？",
    zh: "欢迎来到 K.C.O Global Online Marketplace！\n\n我在这里帮助您解决产品、订单、付款、运输、退货以及您可能有的任何问题。\n\n今天我能为您做些什么？",
    hi: "K.C.O Global Online Marketplace में आपका स्वागत है!\n\nमैं आपको उत्पादों, ऑर्डर, भुगतान, शिपिंग, रिटर्न और आपके किसी भी प्रश्न में मदद करने के लिए यहाँ हूँ।\n\nआज मैं आपकी कैसे मदद कर सकता हूँ?",
    ru: "Добро пожаловать в K.C.O Global Online Marketplace!\n\nЯ здесь, чтобы помочь вам с товарами, заказами, оплатой, доставкой, возвратами и любыми вопросами, которые у вас могут возникнуть.\n\nЧем я могу помочь вам сегодня?",
    it: "Benvenuto su K.C.O Global Online Marketplace!\n\nSono qui per aiutarti con prodotti, ordini, pagamenti, spedizioni, resi e qualsiasi domanda tu possa avere.\n\nCome posso aiutarti oggi?",
    nl: "Welkom bij K.C.O Global Online Marketplace!\n\nIk ben hier om je te helpen met producten, bestellingen, betalingen, verzending, retouren en eventuele vragen.\n\nHoe kan ik je vandaag helpen?",
    tr: "K.C.O Global Online Marketplace'e hoş geldiniz!\n\nÜrünler, siparişler, ödemeler, kargo, iadeler ve herhangi bir sorunuzda size yardımcı olmak için buradayım.\n\nBugün size nasıl yardımcı olabilirim?",
    ko: "K.C.O Global Online Marketplace에 오신 것을 환영합니다!\n\n상품, 주문, 결제, 배송, 반품 및 궁금한 점을 도와드릴 수 있습니다.\n\n오늘 어떻게 도와드릴까요?",
    id: "Selamat datang di K.C.O Global Online Marketplace!\n\nSaya di sini untuk membantu Anda dengan produk, pesanan, pembayaran, pengiriman, pengembalian, dan pertanyaan apa pun.\n\nBagaimana saya bisa membantu Anda hari ini?",
    vi: "Chào mừng đến với K.C.O Global Online Marketplace!\n\nTôi ở đây để giúp bạn với các sản phẩm, đơn hàng, thanh toán, vận chuyển, đổi trả và bất kỳ câu hỏi nào.\n\nTôi có thể giúp gì cho bạn hôm nay?",
    th: "ยินดีต้อนรับสู่ K.C.O Global Online Marketplace!\n\nฉันพร้อมช่วยคุณเรื่องสินค้า คำสั่งซื้อ การชำระเงิน การจัดส่ง การคืนสินค้า และคำถามใดๆ\n\nวันนี้ฉันช่วยอะไรได้บ้าง?",
    pl: "Witamy w K.C.O Global Online Marketplace!\n\nJestem tutaj, aby pomóc Ci z produktami, zamówieniami, płatnościami, wysyłką, zwrotami i wszelkimi pytaniami.\n\nJak mogę Ci dzisiaj pomóc?",
    uk: "Ласкаво просимо до K.C.O Global Online Marketplace!\n\nЯ тут, щоб допомогти вам з товарами, замовленнями, оплатою, доставкою, поверненнями та будь-якими питаннями.\n\nЧим я можу допомогти вам сьогодні?",
    sv: "Välkommen till K.C.O Global Online Marketplace!\n\nJag är här för att hjälpa dig med produkter, beställningar, betalningar, frakt, returer och frågor du kan ha.\n\nHur kan jag hjälpa dig idag?",
    sv2: "Välkommen till K.C.O Global Online Marketplace!",
    el: "Καλώς ήρθατε στο K.C.O Global Online Marketplace!\n\nΕίμαι εδώ για να σας βοηθήσω με προϊόντα, παραγγελίες, πληρωμές, αποστολές, επιστροφές και οποιαδήποτε ερωτήσεις μπορεί να έχετε.\n\nΠώς μπορώ να σας βοηθήσω σήμερα;",
    he: "ברוכים הבאים ל-K.C.O Global Online Marketplace!\n\nאני כאן כדי לעזור לך עם מוצרים, הזמנות, תשלומים, משלוחים, החזרות וכל שאלה שיש לך.\n\nאיך אוכל לעזור לך היום?",
    sw: "Karibu kwenye K.C.O Global Online Marketplace!\n\nNiko hapa kukusaidia na bidhaa, maagizo, malipo, usafirishaji, marejesho na maswali yoyote unayoweza kuwa nayo.\n\nNaweza kukusaidia vipi leo?",
  };
  renderMessage({ role: 'assistant', content: welcomes[lang] || welcomes.en });
}

function renderTyping() {
  const container = document.getElementById('kco-ai-messages');
  if (!container) return;
  const t = document.createElement('div');
  t.id = 'kco-ai-typing';
  t.className = 'flex justify-start kco-ai-fade';
  t.innerHTML = `
    <div class="flex gap-2">
      <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md mt-0.5" style="background:rgba(59,130,246,0.15)">
        ${SUPPORT_AVATAR_SVG}
      </div>
      <div class="bg-slate-800/80 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5">
        <span class="kco-ai-typing-dot w-2 h-2 rounded-full" style="background:#3b82f6"></span>
        <span class="kco-ai-typing-dot w-2 h-2 rounded-full" style="background:#3b82f6"></span>
        <span class="kco-ai-typing-dot w-2 h-2 rounded-full" style="background:#3b82f6"></span>
      </div>
    </div>`;
  container.appendChild(t);
  if (window.lucide) lucide.createIcons();
  scrollToBottom();
}

function scrollToBottom() {
  const c = document.getElementById('kco-ai-messages');
  if (c) c.scrollTop = c.scrollHeight;
}

// ── Send / receive ───────────────────────────────────────────
async function getAuthHeaders() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token || ANON_KEY;
  return { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
}

async function sendMessage() {
  const input = document.getElementById('kco-ai-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text || state.sending) return;
  input.value = '';
  input.style.height = 'auto';
  state.sending = true;
  document.getElementById('kco-ai-send').disabled = true;

  const userMsg = { role: 'user', content: text };
  state.history.push(userMsg);
  renderMessage(userMsg);
  renderTyping();

  try {
    const headers = await getAuthHeaders();
    const res = await fetch(AI_FUNCTION_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        action: 'chat',
        message: text,
        history: state.history.slice(-20, -1).map(h => ({ role: h.role, content: h.content })),
        language: getCurrentLang(),
        page_context: getPageContext(),
      }),
    });
    const data = await res.json();
    document.getElementById('kco-ai-typing')?.remove();

    const aiMsg = { role: 'assistant', content: data.response || data.error || "I'm sorry, I didn't catch that. Could you rephrase?" };
    state.history.push(aiMsg);
    renderMessage(aiMsg);
  } catch (err) {
    document.getElementById('kco-ai-typing')?.remove();
    const errMsg = { role: 'assistant', content: "I'm having trouble connecting right now. Please try again in a moment." };
    state.history.push(errMsg);
    renderMessage(errMsg);
  } finally {
    state.sending = false;
    document.getElementById('kco-ai-send').disabled = false;
    document.getElementById('kco-ai-input')?.focus();
  }
}

// ── Proactive guidance ───────────────────────────────────────
function proactiveNudge(key, message) {
  if (state.proactiveShown[key]) return;
  state.proactiveShown[key] = true;
  if (state.open) return;

  const fab = document.getElementById('kco-ai-fab');
  if (!fab) return;

  const bubble = document.createElement('div');
  bubble.id = `kco-ai-nudge-${key}`;
  bubble.className = 'fixed bottom-[88px] right-5 z-[59] max-w-[280px] bg-slate-800 border border-blue-500/30 rounded-xl shadow-2xl px-3.5 py-2.5 kco-ai-fade';
  bubble.innerHTML = `
    <div class="flex items-start gap-2">
      <i data-lucide="message-circle" class="w-4 h-4 text-blue-400 shrink-0 mt-0.5"></i>
      <p class="text-xs text-gray-300 leading-snug flex-1">${escapeHtml(message)}</p>
    </div>
    <div class="flex gap-2 mt-2">
      <button class="text-[10px] font-semibold text-blue-400 hover:text-blue-300" onclick="document.getElementById('kco-ai-nudge-${key}').remove();window.__kcoAiOpen()">Ask Support</button>
      <button class="text-[10px] text-gray-500 hover:text-gray-400" onclick="document.getElementById('kco-ai-nudge-${key}').remove()">Dismiss</button>
    </div>`;
  document.body.appendChild(bubble);
  if (window.lucide) lucide.createIcons();
  setTimeout(() => bubble?.remove(), 10000);
}

window.__kcoAiOpen = () => togglePanel(true);

// ── Proactive context detection ──────────────────────────────
function setupProactiveGuidance() {
  const ctx = getPageContext();
  const nudges = {
    checkout: "I can help you complete your purchase. Need guidance with checkout?",
    payment: "Before you pay, I can explain your payment options. Just ask!",
    'sign-in': "Welcome back! Need help signing in or recovering your password?",
    account: "I can help you set up your account. Just ask me anything!",
    'product-details': "Have a question about this product? I'm here to help!",
  };
  if (nudges[ctx]) {
    setTimeout(() => proactiveNudge(ctx, nudges[ctx]), 4000);
  }
}

// ── Init ─────────────────────────────────────────────────────
function init() {
  if (window.location.pathname.includes('admin')) return;

  buildWidget();

  window.addEventListener('kco-language-changed', () => {
    if (state.open) {
      const lang = getCurrentLang();
      const acks = {
        en: "Language changed. I'll respond in your selected language from now on.",
        es: "Idioma cambiado. Responderé en tu idioma seleccionado.",
        fr: "Langue changée. Je répondrai dans votre langue sélectionnée.",
        de: "Sprache geändert. Ich werde in Ihrer gewählten Sprache antworten.",
        ar: "تم تغيير اللغة. سأرد بلغتك المختارة من الآن.",
        zh: "语言已更改。我将使用您选择的语言回复。",
        ja: "言語が変更されました。選択した言語で応答します。",
        hi: "भाषा बदल दी गई है। मैं अब से आपकी चुनी हुई भाषा में जवाब दूंगा।",
        ru: "Язык изменен. Я буду отвечать на выбранном вами языке.",
      };
      const msg = { role: 'assistant', content: acks[lang] || acks.en };
      renderMessage(msg);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for proactive use
window.kcoCustomerAI = {
  nudge: proactiveNudge,
  open: () => togglePanel(true),
  close: () => togglePanel(false),
  send: (text) => { const i = document.getElementById('kco-ai-input'); if (i) { i.value = text; sendMessage(); } },
};

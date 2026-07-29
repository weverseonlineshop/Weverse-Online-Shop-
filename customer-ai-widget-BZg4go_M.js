import{b as v,s as x,c as w,e as I}from"./supabase-client-BJmMa02L.js";const O="https://rycgbcyjwpsanrqdxhjq.supabase.co/functions/v1/ai-customer-assistant",C="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y2diY3lqd3BzYW5ycWR4aGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzE2MDMsImV4cCI6MjEwMDUwNzYwM30.evpJi44si4yjRIu49ILNWctcJUAfoi-V6ti5BJLluwM";let t={open:!1,history:[],sending:!1,voiceEnabled:localStorage.getItem("kco_voice")==="1",voiceAccent:localStorage.getItem("kco_voice_accent")||"US",welcomed:!1,proactiveShown:{}};function d(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}function E(e){let n=d(e);return n=n.replace(/`([^`]+)`/g,"<code>$1</code>"),n=n.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),n=n.replace(/^\- (.+)$/gm,"<li>$1</li>"),n=n.replace(/^\d+\. (.+)$/gm,"<li>$1</li>"),n=n.replace(/(<li>.*<\/li>\n?)+/g,a=>`<ul>${a}</ul>`),n=n.replace(/\n\n/g,"</p><p>"),n=n.replace(/\n/g,"<br>"),n=`<p>${n}</p>`,n=n.replace(/<ul><br>/g,"<ul>").replace(/<br><\/ul>/g,"</ul>"),n}function r(){return v()||localStorage.getItem("kco_language")||"en"}function M(){const e=window.location.pathname;return e.includes("checkout")?"checkout":e.includes("payment")?"payment":e.includes("auth")?"sign-in":e.includes("account")?"account":e.includes("details")?"product-details":e.includes("contact")?"contact":e.includes("help")?"help":e.includes("about")?"about":"home"}function u(e){if(t.voiceEnabled&&"speechSynthesis"in window)try{window.speechSynthesis.cancel();const n=new SpeechSynthesisUtterance(e.replace(/[*#`]/g,"")),a=r(),i=w(a);a==="en"?n.lang=t.voiceAccent==="UK"?"en-GB":"en-US":n.lang=i.lang,n.rate=i.rate,n.pitch=i.pitch;const o=I(a==="en"?(t.voiceAccent==="UK"?"en-GB":"en-US").slice(0,2):a);o&&(n.voice=o),window.speechSynthesis.speak(n)}catch{}}function k(){"speechSynthesis"in window&&window.speechSynthesis.cancel()}function S(){if(document.getElementById("kco-ai-styles"))return;const e=document.createElement("style");e.id="kco-ai-styles",e.textContent=`
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
  `,document.head.appendChild(e)}const p='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C7.58 2 4 5.58 4 10v4a3 3 0 0 0 3 3h1v-6H6v-1a6 6 0 0 1 12 0v1h-2v6h1a3 3 0 0 0 3-3v-4c0-4.42-3.58-8-8-8z" fill="#60a5fa"/><path d="M12 2C7.58 2 4 5.58 4 10v4a3 3 0 0 0 3 3h1v-6H6v-1a6 6 0 0 1 12 0v1h-2v6h1a3 3 0 0 0 3-3v-4c0-4.42-3.58-8-8-8z" stroke="#3b82f6" stroke-width="0.5"/></svg>',B='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a1 1 0 0 0-1.39 1.21L4 12l-1.99 7.19a1 1 0 0 0 1.39 1.21z" fill="white"/></svg>';function j(){S();const e=document.createElement("button");e.id="kco-ai-fab",e.setAttribute("aria-label","Customer Support"),e.className="fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-all hover:scale-105",e.style.background="#1e293b",e.style.border="1px solid rgba(255,255,255,0.12)",e.innerHTML=`
    <div class="relative flex items-center">
      <span class="text-base leading-none">💬</span>
      <span class="kco-online-dot absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-900"></span>
    </div>
    <span>Customer Support</span>
  `,e.onclick=s,document.body.appendChild(e);const n=document.createElement("div");n.id="kco-ai-panel",n.className="hidden-panel fixed bottom-[88px] right-5 z-[60] w-[calc(100vw-2.5rem)] sm:w-[400px] h-[560px] max-h-[calc(100vh-120px)] bg-slate-900/95 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden",n.innerHTML=`
    <!-- Header — messaging app style -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-white/10" style="background:linear-gradient(135deg,#1e1e2e 0%,#1a1a2e 50%,#16213e 100%)">
      <div class="flex items-center gap-2.5">
        <div class="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0" style="background:rgba(59,130,246,0.15)">
          ${p}
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
          ${t.voiceAccent}
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
          ${B}
        </button>
      </div>
      <p class="text-[10px] text-gray-600 mt-1.5 text-center">AI may make mistakes. Verify important info.</p>
    </div>
  `,document.body.appendChild(n),document.getElementById("kco-ai-close").onclick=()=>s(!1),document.getElementById("kco-ai-voice-toggle").onclick=A,document.getElementById("kco-ai-voice-accent").onclick=z,document.getElementById("kco-ai-send").onclick=c;const a=document.getElementById("kco-ai-input");a.addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),c())}),a.addEventListener("input",()=>{a.style.height="auto",a.style.height=Math.min(a.scrollHeight,96)+"px"}),document.querySelectorAll(".kco-ai-quick-btn").forEach(i=>{i.onclick=()=>{a.value=i.dataset.q,c()}}),f(),window.lucide&&lucide.createIcons()}function s(e){const n=document.getElementById("kco-ai-panel"),a=document.getElementById("kco-ai-fab");t.open=e!==void 0?e:n.classList.contains("hidden-panel"),t.open?(n.classList.remove("hidden-panel"),a.style.display="none",t.welcomed||(q(),t.welcomed=!0),setTimeout(()=>document.getElementById("kco-ai-input")?.focus(),300)):(n.classList.add("hidden-panel"),a.style.display="flex",k())}function A(){t.voiceEnabled=!t.voiceEnabled,localStorage.setItem("kco_voice",t.voiceEnabled?"1":"0"),t.voiceEnabled||k(),f(),t.voiceEnabled&&u("Voice assistance is now on.")}function z(){t.voiceAccent=t.voiceAccent==="US"?"UK":"US",localStorage.setItem("kco_voice_accent",t.voiceAccent);const e=document.getElementById("kco-ai-voice-accent");e&&(e.textContent=t.voiceAccent);const n=t.voiceAccent==="UK"?"Voice accent switched to British English.":"Voice accent switched to American English.";u(n)}function f(){const e=document.getElementById("kco-ai-voice-toggle");if(!e)return;const n=t.voiceEnabled?"volume-2":"volume-x";e.title=t.voiceEnabled?"Voice is ON — click to mute":"Voice is OFF — click to enable",e.innerHTML=`<i data-lucide="${n}" class="w-4 h-4"></i>`,window.lucide&&lucide.createIcons()}function l(e,n=!0){const a=document.getElementById("kco-ai-messages");if(!a)return;const i=e.role==="user",o=document.createElement("div");o.className=`flex ${i?"justify-end":"justify-start"} ${n?"kco-ai-msg-in":""}`,o.innerHTML=i?`
    <div class="max-w-[80%] text-white rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-lg" style="background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);box-shadow:0 2px 8px rgba(59,130,246,0.25)">
      <p class="text-sm leading-relaxed">${d(e.content)}</p>
    </div>
  `:`
    <div class="max-w-[88%] flex gap-2">
      <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md mt-0.5" style="background:rgba(59,130,246,0.15)">
        ${p}
      </div>
      <div class="bg-slate-800/80 border border-white/8 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
        <div class="text-sm text-gray-200 leading-relaxed">${E(e.content)}</div>
      </div>
    </div>
  `,a.appendChild(o),window.lucide&&lucide.createIcons(),y(),i||u(e.content)}function q(){const e=r(),n={en:`Welcome to K.C.O Global Online Marketplace!

I'm here to help you with products, orders, payments, shipping, returns, and any questions you may have.

How can I help you today?`,es:`¡Bienvenido a K.C.O Global Online Marketplace!

Estoy aquí para ayudarte con productos, pedidos, pagos, envíos, devoluciones y cualquier pregunta que tengas.

¿Cómo puedo ayudarte hoy?`,fr:`Bienvenue sur K.C.O Global Online Marketplace !

Je suis là pour vous aider avec les produits, les commandes, les paiements, la livraison, les retours et toute question que vous pourriez avoir.

Comment puis-je vous aider aujourd'hui ?`,de:`Willkommen bei K.C.O Global Online Marketplace!

Ich bin hier, um Ihnen bei Produkten, Bestellungen, Zahlungen, Versand, Rücksendungen und allen Fragen zu helfen.

Wie kann ich Ihnen heute helfen?`,ar:`مرحباً بك في K.C.O Global Online Marketplace!

أنا هنا لمساعدتك في المنتجات والطلبات والمدفوعات والشحن والإرجاع وأي أسئلة قد تكون لديك.

كيف يمكنني مساعدتك اليوم؟`,pt:`Bem-vindo à K.C.O Global Online Marketplace!

Estou aqui para ajudar com produtos, pedidos, pagamentos, envios, devoluções e qualquer pergunta que você tenha.

Como posso ajudar você hoje?`,ja:`K.C.O Global Online Marketplaceへようこそ！

商品、ご注文、お支払い、配送、返品などについてご質問があればお手伝いします。

本日はいかがいたしましたか？`,zh:`欢迎来到 K.C.O Global Online Marketplace！

我在这里帮助您解决产品、订单、付款、运输、退货以及您可能有的任何问题。

今天我能为您做些什么？`,hi:`K.C.O Global Online Marketplace में आपका स्वागत है!

मैं आपको उत्पादों, ऑर्डर, भुगतान, शिपिंग, रिटर्न और आपके किसी भी प्रश्न में मदद करने के लिए यहाँ हूँ।

आज मैं आपकी कैसे मदद कर सकता हूँ?`,ru:`Добро пожаловать в K.C.O Global Online Marketplace!

Я здесь, чтобы помочь вам с товарами, заказами, оплатой, доставкой, возвратами и любыми вопросами, которые у вас могут возникнуть.

Чем я могу помочь вам сегодня?`,it:`Benvenuto su K.C.O Global Online Marketplace!

Sono qui per aiutarti con prodotti, ordini, pagamenti, spedizioni, resi e qualsiasi domanda tu possa avere.

Come posso aiutarti oggi?`,nl:`Welkom bij K.C.O Global Online Marketplace!

Ik ben hier om je te helpen met producten, bestellingen, betalingen, verzending, retouren en eventuele vragen.

Hoe kan ik je vandaag helpen?`,tr:`K.C.O Global Online Marketplace'e hoş geldiniz!

Ürünler, siparişler, ödemeler, kargo, iadeler ve herhangi bir sorunuzda size yardımcı olmak için buradayım.

Bugün size nasıl yardımcı olabilirim?`,ko:`K.C.O Global Online Marketplace에 오신 것을 환영합니다!

상품, 주문, 결제, 배송, 반품 및 궁금한 점을 도와드릴 수 있습니다.

오늘 어떻게 도와드릴까요?`,id:`Selamat datang di K.C.O Global Online Marketplace!

Saya di sini untuk membantu Anda dengan produk, pesanan, pembayaran, pengiriman, pengembalian, dan pertanyaan apa pun.

Bagaimana saya bisa membantu Anda hari ini?`,vi:`Chào mừng đến với K.C.O Global Online Marketplace!

Tôi ở đây để giúp bạn với các sản phẩm, đơn hàng, thanh toán, vận chuyển, đổi trả và bất kỳ câu hỏi nào.

Tôi có thể giúp gì cho bạn hôm nay?`,th:`ยินดีต้อนรับสู่ K.C.O Global Online Marketplace!

ฉันพร้อมช่วยคุณเรื่องสินค้า คำสั่งซื้อ การชำระเงิน การจัดส่ง การคืนสินค้า และคำถามใดๆ

วันนี้ฉันช่วยอะไรได้บ้าง?`,pl:`Witamy w K.C.O Global Online Marketplace!

Jestem tutaj, aby pomóc Ci z produktami, zamówieniami, płatnościami, wysyłką, zwrotami i wszelkimi pytaniami.

Jak mogę Ci dzisiaj pomóc?`,uk:`Ласкаво просимо до K.C.O Global Online Marketplace!

Я тут, щоб допомогти вам з товарами, замовленнями, оплатою, доставкою, поверненнями та будь-якими питаннями.

Чим я можу допомогти вам сьогодні?`,sv:`Välkommen till K.C.O Global Online Marketplace!

Jag är här för att hjälpa dig med produkter, beställningar, betalningar, frakt, returer och frågor du kan ha.

Hur kan jag hjälpa dig idag?`,sv2:"Välkommen till K.C.O Global Online Marketplace!",el:`Καλώς ήρθατε στο K.C.O Global Online Marketplace!

Είμαι εδώ για να σας βοηθήσω με προϊόντα, παραγγελίες, πληρωμές, αποστολές, επιστροφές και οποιαδήποτε ερωτήσεις μπορεί να έχετε.

Πώς μπορώ να σας βοηθήσω σήμερα;`,he:`ברוכים הבאים ל-K.C.O Global Online Marketplace!

אני כאן כדי לעזור לך עם מוצרים, הזמנות, תשלומים, משלוחים, החזרות וכל שאלה שיש לך.

איך אוכל לעזור לך היום?`,sw:`Karibu kwenye K.C.O Global Online Marketplace!

Niko hapa kukusaidia na bidhaa, maagizo, malipo, usafirishaji, marejesho na maswali yoyote unayoweza kuwa nayo.

Naweza kukusaidia vipi leo?`};l({role:"assistant",content:n[e]||n.en})}function K(){const e=document.getElementById("kco-ai-messages");if(!e)return;const n=document.createElement("div");n.id="kco-ai-typing",n.className="flex justify-start kco-ai-fade",n.innerHTML=`
    <div class="flex gap-2">
      <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md mt-0.5" style="background:rgba(59,130,246,0.15)">
        ${p}
      </div>
      <div class="bg-slate-800/80 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5">
        <span class="kco-ai-typing-dot w-2 h-2 rounded-full" style="background:#3b82f6"></span>
        <span class="kco-ai-typing-dot w-2 h-2 rounded-full" style="background:#3b82f6"></span>
        <span class="kco-ai-typing-dot w-2 h-2 rounded-full" style="background:#3b82f6"></span>
      </div>
    </div>`,e.appendChild(n),window.lucide&&lucide.createIcons(),y()}function y(){const e=document.getElementById("kco-ai-messages");e&&(e.scrollTop=e.scrollHeight)}async function G(){const{data:e}=await x.auth.getSession();return{Authorization:`Bearer ${e.session?.access_token||C}`,"Content-Type":"application/json"}}async function c(){const e=document.getElementById("kco-ai-input");if(!e)return;const n=e.value.trim();if(!n||t.sending)return;e.value="",e.style.height="auto",t.sending=!0,document.getElementById("kco-ai-send").disabled=!0;const a={role:"user",content:n};t.history.push(a),l(a),K();try{const i=await G(),g=await(await fetch(O,{method:"POST",headers:i,body:JSON.stringify({action:"chat",message:n,history:t.history.slice(-20,-1).map(b=>({role:b.role,content:b.content})),language:r(),page_context:M()})})).json();document.getElementById("kco-ai-typing")?.remove();const m={role:"assistant",content:g.response||g.error||"I'm sorry, I didn't catch that. Could you rephrase?"};t.history.push(m),l(m)}catch{document.getElementById("kco-ai-typing")?.remove();const o={role:"assistant",content:"I'm having trouble connecting right now. Please try again in a moment."};t.history.push(o),l(o)}finally{t.sending=!1,document.getElementById("kco-ai-send").disabled=!1,document.getElementById("kco-ai-input")?.focus()}}function L(e,n){if(t.proactiveShown[e]||(t.proactiveShown[e]=!0,t.open)||!document.getElementById("kco-ai-fab"))return;const i=document.createElement("div");i.id=`kco-ai-nudge-${e}`,i.className="fixed bottom-[88px] right-5 z-[59] max-w-[280px] bg-slate-800 border border-blue-500/30 rounded-xl shadow-2xl px-3.5 py-2.5 kco-ai-fade",i.innerHTML=`
    <div class="flex items-start gap-2">
      <i data-lucide="message-circle" class="w-4 h-4 text-blue-400 shrink-0 mt-0.5"></i>
      <p class="text-xs text-gray-300 leading-snug flex-1">${d(n)}</p>
    </div>
    <div class="flex gap-2 mt-2">
      <button class="text-[10px] font-semibold text-blue-400 hover:text-blue-300" onclick="document.getElementById('kco-ai-nudge-${e}').remove();window.__kcoAiOpen()">Ask Support</button>
      <button class="text-[10px] text-gray-500 hover:text-gray-400" onclick="document.getElementById('kco-ai-nudge-${e}').remove()">Dismiss</button>
    </div>`,document.body.appendChild(i),window.lucide&&lucide.createIcons(),setTimeout(()=>i?.remove(),1e4)}window.__kcoAiOpen=()=>s(!0);function h(){window.location.pathname.includes("admin")||(j(),window.addEventListener("kco-language-changed",()=>{if(t.open){const e=r(),n={en:"Language changed. I'll respond in your selected language from now on.",es:"Idioma cambiado. Responderé en tu idioma seleccionado.",fr:"Langue changée. Je répondrai dans votre langue sélectionnée.",de:"Sprache geändert. Ich werde in Ihrer gewählten Sprache antworten.",ar:"تم تغيير اللغة. سأرد بلغتك المختارة من الآن.",zh:"语言已更改。我将使用您选择的语言回复。",ja:"言語が変更されました。選択した言語で応答します。",hi:"भाषा बदल दी गई है। मैं अब से आपकी चुनी हुई भाषा में जवाब दूंगा।",ru:"Язык изменен. Я буду отвечать на выбранном вами языке."},a={role:"assistant",content:n[e]||n.en};l(a)}}))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",h):h();window.kcoCustomerAI={nudge:L,open:()=>s(!0),close:()=>s(!1),send:e=>{const n=document.getElementById("kco-ai-input");n&&(n.value=e,c())}};

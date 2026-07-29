import { supabase } from './supabase-client.js';
import { getCurrentUser } from './auth.js';

const AI_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-admin-assistant`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let state = {
  user: null,
  isAdmin: false,
  history: [],
  sending: false,
};

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
  if (window.lucide) lucide.createIcons();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => `<pre><code>${code.trim()}</code></pre>`);
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

function renderToolResult(toolResult) {
  const r = toolResult.result;
  if (r.error) {
    return `<div class="mt-2 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 text-red-400"><i data-lucide="alert-circle" class="w-3 h-3 inline mr-1"></i> ${escapeHtml(r.error)}</div>`;
  }
  if (r.results && Array.isArray(r.results)) {
    const items = r.results.slice(0, 5).map(item => {
      if (item.property_id) {
        return `<div class="text-xs text-gray-400 py-1 border-b border-blue-500/5 last:border-0"><span class="font-mono text-blue-400">${item.property_id}</span> — ${escapeHtml(item.title || 'Untitled')} <span class="text-amber-400 font-bold">${item.price ? parseFloat(item.price).toLocaleString() : ''} ${item.currency || ''}</span>${item.stock_quantity != null ? ` <span class="text-gray-500">(Stock: ${item.stock_quantity})</span>` : ''}</div>`;
      }
      if (item.order_number) {
        return `<div class="text-xs text-gray-400 py-1 border-b border-blue-500/5 last:border-0"><span class="font-mono text-blue-400">${item.order_number}</span> — ${escapeHtml(item.full_name || item.customer_name || 'Customer')} <span class="text-amber-400">${item.amount ? parseFloat(item.amount).toLocaleString() : ''} ${item.currency || ''}</span> <span class="text-gray-500">(${item.status || ''})</span></div>`;
      }
      if (item.display_name || item.user_id) {
        return `<div class="text-xs text-gray-400 py-1 border-b border-blue-500/5 last:border-0">${escapeHtml(item.display_name || 'Unknown')} <span class="text-gray-500">(${item.country_code || ''})</span></div>`;
      }
      return `<div class="text-xs text-gray-400 py-1">${escapeHtml(JSON.stringify(item).slice(0, 100))}</div>`;
    }).join('');
    const more = r.count > 5 ? `<div class="text-[10px] text-gray-600 mt-1">...and ${r.count - 5} more</div>` : '';
    return `<div class="mt-2 glass-soft border border-blue-500/15 rounded-xl px-3 py-2"><div class="text-[10px] text-gray-500 uppercase font-bold mb-1">${toolResult.tool} — ${r.count} result(s)</div>${items}${more}</div>`;
  }
  if (r.success && r.message) {
    return `<div class="mt-2 text-xs bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 text-emerald-400"><i data-lucide="check-circle" class="w-3 h-3 inline mr-1"></i> ${escapeHtml(r.message)}</div>`;
  }
  if (r.generated_content) {
    return `<div class="mt-2 glass-soft border border-blue-500/15 rounded-xl px-3 py-2"><div class="text-[10px] text-gray-500 uppercase font-bold mb-1">Generated: ${toolResult.args.content_type}</div><div class="text-xs text-gray-300 whitespace-pre-wrap">${escapeHtml(r.generated_content)}</div></div>`;
  }
  return '';
}

function renderMessage(msg, animate = true) {
  const container = document.getElementById('messages-container');
  const isUser = msg.role === 'user';
  const wrapper = document.createElement('div');
  wrapper.className = `flex ${isUser ? 'justify-end' : 'justify-start'} ${animate ? 'fade-in' : ''}`;

  const toolResultsHtml = (msg.tool_results || []).map(renderToolResult).join('');

  wrapper.innerHTML = isUser ? `
    <div class="max-w-[80%] bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-lg shadow-blue-600/20">
      <p class="text-sm leading-relaxed">${escapeHtml(msg.content)}</p>
    </div>
  ` : `
    <div class="max-w-[85%] flex gap-3">
      <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-800 rounded-lg flex items-center justify-center shrink-0 shadow-md">
        <i data-lucide="sparkles" class="w-4 h-4 text-white"></i>
      </div>
      <div class="glass border border-blue-500/15 rounded-2xl rounded-tl-sm px-4 py-3">
        <div class="msg-content text-sm text-gray-200 leading-relaxed">${renderMarkdown(msg.content)}</div>
        ${toolResultsHtml}
      </div>
    </div>
  `;
  container.appendChild(wrapper);
  if (window.lucide) lucide.createIcons();
  scrollToBottom();
}

function renderTypingIndicator() {
  const container = document.getElementById('messages-container');
  const wrapper = document.createElement('div');
  wrapper.id = 'typing-indicator';
  wrapper.className = 'flex justify-start fade-in';
  wrapper.innerHTML = `
    <div class="flex gap-3">
      <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-800 rounded-lg flex items-center justify-center shrink-0 shadow-md">
        <i data-lucide="sparkles" class="w-4 h-4 text-white"></i>
      </div>
      <div class="glass border border-blue-500/15 rounded-2xl rounded-tl-sm px-4 py-4 flex items-center gap-1.5">
        <span class="typing-dot w-2 h-2 bg-blue-400 rounded-full"></span>
        <span class="typing-dot w-2 h-2 bg-blue-400 rounded-full"></span>
        <span class="typing-dot w-2 h-2 bg-blue-400 rounded-full"></span>
      </div>
    </div>
  `;
  container.appendChild(wrapper);
  if (window.lucide) lucide.createIcons();
  scrollToBottom();
}

function removeTypingIndicator() {
  document.getElementById('typing-indicator')?.remove();
}

function scrollToBottom() {
  const chat = document.getElementById('chat-messages');
  chat.scrollTop = chat.scrollHeight;
}

async function getAuthHeaders() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token || ANON_KEY;
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

window.sendMessage = async () => {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text || state.sending) return;

  input.value = '';
  input.style.height = 'auto';

  state.sending = true;
  document.getElementById('send-btn').disabled = true;

  const userMsg = { role: 'user', content: text };
  state.history.push(userMsg);
  renderMessage(userMsg);

  renderTypingIndicator();

  try {
    const headers = await getAuthHeaders();
    const res = await fetch(AI_FUNCTION_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        action: 'chat',
        message: text,
        history: state.history.slice(-20, -1).map(h => ({ role: h.role, content: h.content })),
      }),
    });
    const data = await res.json();
    removeTypingIndicator();

    if (!res.ok || data.error) {
      const errMsg = { role: 'assistant', content: `⚠️ **Error:** ${data.error || 'Request failed'}${data.provider ? `\n\n*Provider: ${data.provider}*` : ''}` };
      state.history.push(errMsg);
      renderMessage(errMsg);
    } else {
      const aiMsg = { role: 'assistant', content: data.response, tool_results: data.tool_results };
      state.history.push(aiMsg);
      renderMessage(aiMsg);
    }
  } catch (err) {
    removeTypingIndicator();
    const errMsg = { role: 'assistant', content: `⚠️ **Connection error:** ${err.message}` };
    state.history.push(errMsg);
    renderMessage(errMsg);
  } finally {
    state.sending = false;
    document.getElementById('send-btn').disabled = false;
    document.getElementById('chat-input').focus();
  }
};

window.quickAction = (text) => {
  document.getElementById('chat-input').value = text;
  sendMessage();
};

window.clearHistory = async () => {
  try {
    const headers = await getAuthHeaders();
    await fetch(AI_FUNCTION_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ action: 'clear_history' }),
    });
    state.history = [];
    document.getElementById('messages-container').innerHTML = '';
    renderWelcome();
    showToast('Chat history cleared.');
  } catch (err) {
    showToast('Failed to clear history.');
  }
};

function renderWelcome() {
  const welcome = {
    role: 'assistant',
    content: `Hello! I'm your AI Admin Assistant. I can help you manage your marketplace with natural language.\n\nHere are some things I can do:\n\n- **Add products** — "Add a Samsung Galaxy S25 priced at $850"\n- **Update products** — "Update the price of Product 25 to $799"\n- **Generate content** — "Generate a better description for Product 1"\n- **Search products** — "Show products with low stock"\n- **Manage orders** — "Show all pending orders"\n- **Create promotions** — "Create a flash sale for this weekend"\n- **Delete products** — "Delete Product 5" (I'll ask for confirmation first)\n\nWhat would you like to do?`,
  };
  renderMessage(welcome);
}

async function showBootstrapPrompt() {
  const denied = document.getElementById('access-denied');
  denied.classList.remove('hidden');
  denied.innerHTML = `
    <div class="glass border border-amber-500/20 rounded-2xl p-8 max-w-md w-full text-center slide-up">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-2xl mb-4">
        <i data-lucide="user-cog" class="w-8 h-8 text-amber-400"></i>
      </div>
      <h2 class="text-xl font-bold text-white mb-2">Become Admin</h2>
      <p class="text-sm text-gray-400 mb-6">No administrator has been set up yet. You can promote your account to admin to access the AI Assistant.</p>
      <button onclick="bootstrapAdmin()" id="bootstrap-btn" class="btn-press inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-amber-600/30">
        <i data-lucide="shield" class="w-4 h-4"></i> Become Admin
      </button>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

window.bootstrapAdmin = async () => {
  const btn = document.getElementById('bootstrap-btn');
  if (!btn) return;
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Promoting...';
  if (window.lucide) lucide.createIcons();
  try {
    const { data: session } = await supabase.auth.getSession();
    const res = await fetch(AI_FUNCTION_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${session.session?.access_token || ANON_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'bootstrap_admin' }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('You are now an admin!');
      setTimeout(() => window.location.reload(), 1000);
    } else {
      showToast(data.error || 'Failed to become admin');
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="shield" class="w-4 h-4"></i> Become Admin';
      if (window.lucide) lucide.createIcons();
    }
  } catch (err) {
    showToast('Error: ' + err.message);
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="shield" class="w-4 h-4"></i> Become Admin';
    if (window.lucide) lucide.createIcons();
  }
};

async function init() {
  const { data: sessionData } = await supabase.auth.getSession();
  state.user = sessionData?.session?.user || null;

  if (!state.user) {
    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `/auth.html?redirect=${encodeURIComponent(currentPath)}`;
    return;
  }

  const { data: isAdmin } = await supabase.rpc('is_current_user_admin');
  if (!isAdmin) {
    const { data: anyAdmin } = await supabase.rpc('has_any_admin');
    if (anyAdmin) {
      document.getElementById('access-denied').classList.remove('hidden');
      document.getElementById('access-denied-msg').textContent = 'You are signed in, but this account does not have administrator privileges.';
    } else {
      showBootstrapPrompt();
    }
    if (window.lucide) lucide.createIcons();
    return;
  }

  state.isAdmin = true;

  // Load provider info
  const { data: settings } = await supabase.from('ai_settings').select('active_provider').limit(1).maybeSingle();
  if (settings) {
    const badge = document.getElementById('provider-badge');
    const name = document.getElementById('provider-name');
    badge.classList.remove('hidden');
    const providerLabels = { openai: 'OpenAI', gemini: 'Google Gemini', anthropic: 'Anthropic Claude' };
    name.textContent = providerLabels[settings.active_provider] || settings.active_provider;
  }

  // Load chat history
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(AI_FUNCTION_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ action: 'history' }),
    });
    const data = await res.json();
    if (data.history && data.history.length > 0) {
      state.history = data.history.map(h => ({
        role: h.role,
        content: h.content,
        tool_results: h.metadata?.tool_results,
      }));
      state.history.forEach(msg => renderMessage(msg, false));
    } else {
      renderWelcome();
    }
  } catch {
    renderWelcome();
  }

  // Input handling
  const input = document.getElementById('chat-input');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 128) + 'px';
  });
  input.focus();
}

init();

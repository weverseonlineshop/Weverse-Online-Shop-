import { supabase } from './supabase-client.js';
import { getCurrentUser } from './auth.js';

const PROVIDERS = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT-4o, GPT-4 Turbo, and other GPT models',
    icon: 'bot',
    color: 'emerald',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4.1', 'gpt-4.1-mini', 'gpt-4-turbo', 'gpt-3.5-turbo', 'o1-mini', 'o1-preview'],
    keyField: 'openai_api_key',
    modelField: 'openai_model',
    keyPlaceholder: 'sk-...',
    signupUrl: 'https://platform.openai.com/api-keys',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Gemini 1.5 Pro, Flash, and other Google models',
    icon: 'sparkles',
    color: 'amber',
    models: ['gemini-3.1-flash-lite-preview', 'gemini-3-flash-preview', 'gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.5-flash', 'gemini-2.5-pro'],
    keyField: 'gemini_api_key',
    modelField: 'gemini_model',
    keyPlaceholder: 'AIza...',
    signupUrl: 'https://aistudio.google.com/app/apikey',
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    description: 'Claude 3.5 Sonnet, Opus, and Haiku models',
    icon: 'brain',
    color: 'violet',
    models: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-sonnet-4-20250514', 'claude-3-opus-20240229'],
    keyField: 'anthropic_api_key',
    modelField: 'anthropic_model',
    keyPlaceholder: 'sk-ant-...',
    signupUrl: 'https://console.anthropic.com/settings/keys',
  },
];

const AI_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-admin-assistant`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function showBootstrapPrompt() {
  const denied = document.getElementById('access-denied');
  denied.classList.remove('hidden');
  denied.innerHTML = `
    <div class="glass border border-amber-500/20 rounded-2xl p-8 max-w-md w-full text-center slide-up">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-2xl mb-4">
        <i data-lucide="user-cog" class="w-8 h-8 text-amber-400"></i>
      </div>
      <h2 class="text-xl font-bold text-white mb-2">Become Admin</h2>
      <p class="text-sm text-gray-400 mb-6">No administrator has been set up yet. Promote your account to access AI Settings.</p>
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

let state = {
  user: null,
  isAdmin: false,
  settings: null,
  saving: false,
};

function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
  if (window.lucide) lucide.createIcons();
}

function colorClasses(color) {
  const map = {
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', ring: 'ring-emerald-500/20' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', ring: 'ring-amber-500/20' },
    violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30', ring: 'ring-violet-500/20' },
  };
  return map[color] || map.emerald;
}

function render() {
  const root = document.getElementById('settings-root');
  const s = state.settings;

  root.innerHTML = `
    <div class="fade-in">
      <div class="mb-6">
        <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">AI Provider Settings</h1>
        <p class="text-sm text-gray-500">Choose your preferred AI provider and configure API keys. You can switch providers at any time without changing code.</p>
      </div>

      <!-- Enable/Disable toggle -->
      <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <i data-lucide="power" class="w-4 h-4 text-blue-400"></i> AI Assistant Status
            </h3>
            <p class="text-xs text-gray-500 mt-1">Enable or disable the AI assistant. When disabled, the chat and content generation tools stop responding.</p>
          </div>
          <button onclick="toggleEnabled()" id="enable-toggle" class="relative inline-flex h-8 w-14 items-center rounded-full transition ${s.is_enabled ? 'bg-emerald-500' : 'bg-gray-600'}">
            <span class="inline-block h-6 w-6 transform rounded-full bg-white transition ${s.is_enabled ? 'translate-x-7' : 'translate-x-1'}"></span>
          </button>
        </div>
        <div class="mt-2 text-xs font-bold ${s.is_enabled ? 'text-emerald-400' : 'text-gray-500'}">${s.is_enabled ? 'AI Assistant is ON' : 'AI Assistant is OFF'}</div>
      </div>

      <!-- Active provider selector -->
      <div class="glass border border-blue-500/20 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
          <i data-lucide="zap" class="w-4 h-4 text-blue-400"></i> Active Provider
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${PROVIDERS.map(p => {
            const c = colorClasses(p.color);
            const isActive = s.active_provider === p.id;
            return `
              <div onclick="selectProvider('${p.id}')" class="provider-card ${isActive ? 'active' : ''} glass-soft border border-blue-500/15 rounded-xl p-4 text-center">
                <div class="inline-flex items-center justify-center w-12 h-12 ${c.bg} rounded-xl mb-2">
                  <i data-lucide="${p.icon}" class="w-6 h-6 ${c.text}"></i>
                </div>
                <h4 class="text-sm font-bold text-white">${p.name}</h4>
                <p class="text-[10px] text-gray-500 mt-1">${p.description}</p>
                ${isActive ? `<div class="mt-2 inline-flex items-center gap-1 text-[10px] font-bold ${c.text} ${c.bg} px-2 py-0.5 rounded-full"><span class="w-1.5 h-1.5 rounded-full ${c.text.replace('text-','bg-')} animate-pulse"></span> Active</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Provider API keys -->
      ${PROVIDERS.map(p => {
        const c = colorClasses(p.color);
        const isActive = s.active_provider === p.id;
        const hasKey = s[p.keyField] && s[p.keyField].length > 0;
        return `
          <div class="glass border ${isActive ? c.border : 'border-blue-500/15'} rounded-2xl p-5 slide-up" style="animation-delay: .1s">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
                <div class="w-8 h-8 ${c.bg} rounded-lg flex items-center justify-center">
                  <i data-lucide="${p.icon}" class="w-4 h-4 ${c.text}"></i>
                </div>
                ${p.name}
                ${hasKey ? `<span class="text-[10px] font-bold ${c.text} ${c.bg} px-2 py-0.5 rounded-full">Configured</span>` : `<span class="text-[10px] font-bold text-gray-600 bg-gray-500/10 px-2 py-0.5 rounded-full">Not Set</span>`}
              </h3>
              <a href="${p.signupUrl}" target="_blank" rel="noopener" class="text-[10px] text-gray-500 hover:text-blue-400 transition flex items-center gap-1">
                <i data-lucide="external-link" class="w-3 h-3"></i> Get API Key
              </a>
            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">API Key</label>
                <div class="relative">
                  <input type="password" id="${p.keyField}" placeholder="${p.keyPlaceholder}" value="${s[p.keyField] || ''}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
                  <button onclick="togglePassword('${p.keyField}')" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition">
                    <i data-lucide="eye" class="w-4 h-4" id="${p.keyField}-eye"></i>
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1.5">Model</label>
                <select id="${p.modelField}" class="input-field w-full bg-[#0a1124]/80 border border-blue-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500">
                  ${p.models.map(m => `<option value="${m}" ${s[p.modelField] === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
              </div>
            </div>
          </div>
        `;
      }).join('')}

      <!-- Test connection + Save buttons -->
      <div class="flex gap-3 slide-up">
        <button onclick="saveSettings()" id="save-btn" class="btn-press flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-blue-600/30 disabled:opacity-40 disabled:cursor-not-allowed">
          <i data-lucide="save" class="w-4 h-4 inline mr-2"></i> Save Settings
        </button>
        <button onclick="testConnection()" id="test-btn" class="btn-press px-6 bg-blue-950/60 border border-emerald-500/30 text-emerald-400 font-bold py-3 rounded-xl text-sm uppercase tracking-wide transition hover:bg-emerald-500/10 disabled:opacity-40 disabled:cursor-not-allowed">
          <i data-lucide="wifi" class="w-4 h-4 inline mr-2"></i> Test Connection
        </button>
        <a href="/admin-ai.html" class="btn-press px-6 py-3 bg-blue-950/60 border border-blue-500/20 text-gray-400 font-bold rounded-xl text-sm uppercase tracking-wide transition flex items-center gap-2">
          <i data-lucide="sparkles" class="w-4 h-4"></i> Back to Assistant
        </a>
      </div>

      <!-- Info box -->
      <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-white mb-2 flex items-center gap-2"><i data-lucide="info" class="w-4 h-4 text-blue-400"></i> How it works</h3>
        <ul class="space-y-1.5 text-xs text-gray-400">
          <li class="flex gap-2"><span class="text-blue-400 shrink-0">1.</span> Choose your preferred AI provider above and enter its API key.</li>
          <li class="flex gap-2"><span class="text-blue-400 shrink-0">2.</span> The AI Admin Assistant uses the active provider for all requests.</li>
          <li class="flex gap-2"><span class="text-blue-400 shrink-0">3.</span> You can switch providers anytime — just select a new one and save.</li>
          <li class="flex gap-2"><span class="text-blue-400 shrink-0">4.</span> API keys are stored securely in your database and never exposed to customers.</li>
          <li class="flex gap-2"><span class="text-blue-400 shrink-0">5.</span> If a provider is unavailable, a clear error message is shown without affecting the marketplace.</li>
          <li class="flex gap-2"><span class="text-blue-400 shrink-0">6.</span> Use "Test Connection" to verify your API key works before saving.</li>
          <li class="flex gap-2"><span class="text-blue-400 shrink-0">7.</span> Toggle the AI assistant on/off anytime — when off, the chat and content tools stop responding.</li>
        </ul>
      </div>

      <!-- Supported content types -->
      <div class="glass-soft border border-blue-500/15 rounded-2xl p-5 slide-up">
        <h3 class="text-sm font-bold text-white mb-3 flex items-center gap-2"><i data-lucide="list-checks" class="w-4 h-4 text-blue-400"></i> AI Content Capabilities</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-400">
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Product Titles</div>
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Descriptions</div>
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Specifications</div>
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Categories</div>
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Tags</div>
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> SEO Titles</div>
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> SEO Descriptions</div>
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Product Highlights</div>
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Pricing Suggestions</div>
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Improvement Tips</div>
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Image Descriptions</div>
          <div class="flex items-center gap-1.5"><i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Translation</div>
        </div>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

window.selectProvider = (id) => {
  state.settings.active_provider = id;
  render();
};

window.togglePassword = (fieldId) => {
  const input = document.getElementById(fieldId);
  const eye = document.getElementById(fieldId + '-eye');
  if (input.type === 'password') {
    input.type = 'text';
    eye.setAttribute('data-lucide', 'eye-off');
  } else {
    input.type = 'password';
    eye.setAttribute('data-lucide', 'eye');
  }
  if (window.lucide) lucide.createIcons();
};

window.toggleEnabled = async () => {
  const newVal = !state.settings.is_enabled;
  state.settings.is_enabled = newVal;
  try {
    const { error } = await supabase.from('ai_settings').update({ is_enabled: newVal }).eq('id', state.settings.id);
    if (error) throw error;
    showToast(newVal ? 'AI assistant enabled.' : 'AI assistant disabled.');
    render();
  } catch (err) {
    state.settings.is_enabled = !newVal;
    showToast('Failed to toggle: ' + err.message);
    render();
  }
};

window.testConnection = async () => {
  const btn = document.getElementById('test-btn');
  if (!btn) return;
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-2"></i> Testing...';
  if (window.lucide) lucide.createIcons();
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(AI_FUNCTION_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${session?.access_token || ANON_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'test_connection' }),
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Connection OK — ${data.provider_label} (${data.model})`);
    } else {
      showToast(`Connection failed: ${data.error || 'Unknown error'}`);
    }
  } catch (err) {
    showToast('Connection error: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="wifi" class="w-4 h-4 inline mr-2"></i> Test Connection';
    if (window.lucide) lucide.createIcons();
  }
};

window.saveSettings = async () => {
  if (state.saving) return;
  state.saving = true;
  const btn = document.getElementById('save-btn');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-2"></i> Saving...';
  if (window.lucide) lucide.createIcons();

  const updates = {
    active_provider: state.settings.active_provider,
  };
  for (const p of PROVIDERS) {
    const keyVal = document.getElementById(p.keyField).value.trim();
    const modelVal = document.getElementById(p.modelField).value;
    updates[p.keyField] = keyVal || null;
    updates[p.modelField] = modelVal;
  }

  try {
    const { error } = await supabase.from('ai_settings').update(updates).eq('id', state.settings.id);
    if (error) throw error;
    Object.assign(state.settings, updates);
    showToast('Settings saved successfully!');
    render();
  } catch (err) {
    showToast('Failed to save: ' + err.message);
  } finally {
    state.saving = false;
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="save" class="w-4 h-4 inline mr-2"></i> Save Settings';
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

  const { data: settings, error } = await supabase.from('ai_settings').select('*').limit(1).maybeSingle();
  if (error || !settings) {
    document.getElementById('settings-root').innerHTML = `<div class="glass border border-red-500/20 rounded-2xl p-6 text-center"><p class="text-sm text-red-400">Failed to load AI settings. Please try again.</p></div>`;
    return;
  }

  state.settings = settings;
  render();
}

init();

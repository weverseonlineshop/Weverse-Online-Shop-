import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export function getSessionKey() {
  let key = localStorage.getItem('kco_session_key');
  if (!key) {
    key = 'kco-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('kco_session_key', key);
  }
  return key;
}

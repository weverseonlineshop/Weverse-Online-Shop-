import { supabase } from './supabase-client.js';

export async function getCurrentUser() {
  // Use getSession() for reliable session restoration across refresh/navigation.
  // getUser() can return null on cold loads even when a valid session exists.
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

export async function isAdmin() {
  const user = await getCurrentUser();
  if (!user) return false;
  const { data } = await supabase.rpc('is_current_user_admin');
  return !!data;
}

export async function signUp(email, password) {
  return supabase.auth.signUp({ email, password });
}

export async function signIn(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function resetPassword(email) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth.html?reset=1`,
  });
}

export async function updateUserPassword(newPassword) {
  return supabase.auth.updateUser({ password: newPassword });
}

export async function resendVerification(email) {
  return supabase.auth.resend({ type: 'signup', email });
}

export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
}

export function getRedirectAfterAuth() {
  return sessionStorage.getItem('kco_auth_redirect') || null;
}

export function setRedirectAfterAuth(path) {
  sessionStorage.setItem('kco_auth_redirect', path);
}

export function clearRedirectAfterAuth() {
  sessionStorage.removeItem('kco_auth_redirect');
}

export async function sendAuthEmail(type, payload) {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-auth-email`;
  try {
    // Get the user's actual session token for authenticated email types
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, ...payload }),
    });
    const data = await res.json();
    return { ok: res.ok && !data.error, error: data.error };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

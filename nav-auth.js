import { supabase } from './supabase-client.js';

// Shared navigation auth state — uses the real Supabase session, not localStorage.
// Updates the header sign-in/account button, the mobile drawer user strip,
// and the "more" menu sign-out row across every page that imports it.

let currentUser = null;
let currentProfile = null;

async function fetchProfile(user) {
  if (!user) return null;
  const { data } = await supabase
    .from('profiles')
    .select('display_name, first_name, last_name, avatar_url')
    .eq('user_id', user.id)
    .maybeSingle();
  return data;
}

function displayName(user, profile) {
  if (!user) return 'Guest User';
  if (profile?.display_name) return profile.display_name;
  if (profile?.first_name || profile?.last_name) return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
  return user.email.split('@')[0];
}

function renderNavAuth(user, profile) {
  // Header (desktop + tablet) sign-in / account button
  const signinBtn = document.getElementById('hdr-signin-btn');
  const accountBtn = document.getElementById('hdr-account-btn');
  const accountLabel = document.getElementById('hdr-account-label');
  if (signinBtn && accountBtn) {
    if (user) {
      signinBtn.classList.add('hidden');
      accountBtn.classList.remove('hidden');
      if (accountLabel) accountLabel.textContent = displayName(user, profile);
    } else {
      signinBtn.classList.remove('hidden');
      accountBtn.classList.add('hidden');
    }
  }

  // Mobile drawer user strip + sign-in button
  const nameEl = document.getElementById('nav-user-name');
  const subEl = document.getElementById('nav-user-sub');
  const signOutRow = document.getElementById('nav-signout-row');
  const signInBtn = document.getElementById('nav-signin-btn');
  const userStrip = document.getElementById('nav-user-strip');
  if (user) {
    if (nameEl) nameEl.textContent = displayName(user, profile);
    if (subEl) subEl.textContent = user.email;
    if (signOutRow) signOutRow.classList.remove('hidden');
    if (signInBtn) signInBtn.classList.add('hidden');
    if (userStrip) userStrip.classList.remove('hidden');
  } else {
    if (nameEl) nameEl.textContent = 'Guest User';
    if (subEl) subEl.textContent = 'Tap to sign in';
    if (signOutRow) signOutRow.classList.add('hidden');
    if (signInBtn) signInBtn.classList.remove('hidden');
    if (userStrip) userStrip.classList.add('hidden');
  }

  // More menu sign-out row
  const moreSignOut = document.getElementById('more-signout');
  if (moreSignOut) moreSignOut.classList.toggle('hidden', !user);

  if (window.lucide) lucide.createIcons();
}

async function refreshNavUserState() {
  const { data: { session } } = await supabase.auth.getSession();
  currentUser = session?.user || null;
  currentProfile = currentUser ? await fetchProfile(currentUser) : null;
  renderNavAuth(currentUser, currentProfile);
}

async function signOutUser() {
  await supabase.auth.signOut();
  currentUser = null;
  currentProfile = null;
  renderNavAuth(null, null);
  window.location.href = '/';
}

// Listen for auth state changes so login/logout in other tabs or the auth
// page reflect instantly. Wrapped in async IIFE to avoid the onAuthStateChange
// deadlock documented in the bolt-database skill.
supabase.auth.onAuthStateChange((_event, session) => {
  (async () => {
    currentUser = session?.user || null;
    currentProfile = currentUser ? await fetchProfile(currentUser) : null;
    renderNavAuth(currentUser, currentProfile);
  })();
});

// Expose globally so inline scripts (openMobileMenu, toggleMoreMenu, etc.) can call us.
window.refreshNavUserState = refreshNavUserState;
window.signOutUser = signOutUser;

// Initial render on page load
refreshNavUserState();

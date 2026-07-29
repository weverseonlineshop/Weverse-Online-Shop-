// Bridge: loads live marketplace inventory and exposes it globally
// so the non-module app.js can merge live listings into the ad carousel.
// Every listing becomes a video advertisement: uses the listing's own video
// if available, otherwise creates an auto-cycling image slideshow with motion
// effects that displays the listing's title, price, and location.
import { supabase } from './supabase-client.js';

const BRAND = 'K.C.O Global Online Marketplace';

function parseImages(images) {
  if (!images) return [];
  if (Array.isArray(images)) return images.filter(Boolean);
  if (typeof images === 'string') {
    try {
      const arr = JSON.parse(images);
      return Array.isArray(arr) ? arr.filter(Boolean) : [images];
    } catch {
      return [images];
    }
  }
  return [];
}

function parseVideo(video) {
  if (!video) return null;
  if (typeof video === 'string') return video.trim() || null;
  if (Array.isArray(video)) return video[0] || null;
  return null;
}

function buildSlide(row) {
  const images = parseImages(row.images);
  const video = parseVideo(row.video || row.video_url);
  const typeLabel = (row.listing_type || 'product').charAt(0).toUpperCase() + (row.listing_type || 'product').slice(1);
  const priceText = row.price != null
    ? Number(row.price).toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' ' + (row.currency || 'USD')
    : '';
  const title = row.title || 'Marketplace Listing';
  const location = [row.city, row.state, row.country].filter(Boolean).join(', ');
  const slide = {
    badge: row.category || typeLabel,
    isLive: true,
    listingId: row.id || row.property_id,
    titles: { en: BRAND + ' \u2013 ' + title + (priceText ? '  \u00b7  ' + priceText : '') },
    descs: { en: row.description || '' },
    priceText,
    location,
    title,
  };

  if (video) {
    slide.video = video;
  } else if (images.length > 0) {
    slide.images = images;
  } else {
    return null;
  }

  return slide;
}

async function fetchLiveAds(limit = 200) {
  try {
    const { data, error } = await supabase
      .from('showroom_listings')
      .select('id, property_id, listing_type, category, title, description, price, currency, images, video, video_url, country, state, city, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data.map(buildSlide).filter(Boolean);
  } catch {
    return [];
  }
}

async function loadLiveAds() {
  const slides = await fetchLiveAds();
  window._liveAdSlides = slides;
  window.dispatchEvent(new CustomEvent('live-ads-updated', { detail: slides }));
  return slides;
}

function subscribeLiveAds() {
  try {
    const channel = supabase
      .channel('public:showroom_listings:ads')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'showroom_listings' }, () => {
        loadLiveAds();
      })
      .subscribe();
    return channel;
  } catch {
    return null;
  }
}

window._loadLiveAds = loadLiveAds;
window._subscribeLiveAds = subscribeLiveAds;
window._liveAdSlides = [];

const CACHE_NAME = 'v381_fix_hang_load_render';
const ASSETS_TO_CACHE = [
  './',
  './index.html?v=20261121_v370_epilog_penghormatan',
  './manifest.json',
  './css/style.css?v=20261121_v370_epilog_penghormatan',
  './js/app.js?v=20261121_v370_epilog_penghormatan',
  './data/tanzir_data.js?v=20261121_v370_epilog_penghormatan',
  './data/tanzir_quotes.js?v=20261121_v370_epilog_penghormatan',
  './icons/favicon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './images/cover_revitalized_vibrant_tanzir.jpg',
  './images/divider_illustration_tanzir.jpg',
  './Gagasan_Ummah_Fadhilah_Kuasa_Nasional_dan_Tetralogi_Al-Rasyid.pdf',
  './Sumbangan_Tanzir_Al_Taghyir_Dalam_Ummah_Fadhilah_Kuasa_Nasional_dan_PBI.pdf'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

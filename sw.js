// Temel Service Worker - Çevrimdışı ve Önbellek Desteği
const CACHE_NAME = 'orfi-isg-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Yükleme Aşaması
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// İstekleri Yakalama ve Sunma
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Önbellekte varsa onu getir, yoksa internetten çek
        return response || fetch(event.request);
      })
  );
});
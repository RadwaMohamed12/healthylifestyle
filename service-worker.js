self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('health-tracker-v1').then(cache => {
      return cache.addAll([
        'index.html',
        'manifest.json',
        'icons/icon-192.png',
        'icons/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// ✅ New: Receive messages from main app and show notification
self.addEventListener('message', function (event) {
  const { title, body } = event.data;
  self.registration.showNotification(title, { body });
});

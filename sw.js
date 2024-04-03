// Service Worker setup
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                'index.html'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', (event) => {
  const data = event.data.json(); // Parse the push message data (if it's in JSON format)
  const title = data.title || 'Chanda Calculator Notification'; // Get the title from the data or use a default title

  const options = {
    body: data.body || 'Please pay your chanda for the current month', // Get the notification body (or use a default)
    icon: 'ico.png', // Set an icon for the notification
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});


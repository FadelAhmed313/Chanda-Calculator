// Service Worker setup
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
          console.log('Notification 3');
            return cache.addAll([
                '/',
                '/index.html',
                'index.html'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
  console.log('Notification 2');
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', (event) => {
              console.log('Notification 1');
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'submit') {
        // Process the request synchronously
        // ...
        // Return true only when you're ready to send the response
        sendResponse({ success: true });
    }
    // For other cases, don't return true
});

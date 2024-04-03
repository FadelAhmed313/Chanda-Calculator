self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(), // Get the push message text
    //icon: '/path/to/icon.png', // Set an icon for the notification
    //badge: '/path/to/badge.png', // Set a badge for the notification
  };

  event.waitUntil(
    self.registration.showNotification('ChandaApp', options)
  );
});

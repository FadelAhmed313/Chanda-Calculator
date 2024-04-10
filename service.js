// Initialize Firebase (make sure you have already set up your Firebase project)
const firebase.initializeApp({
    apiKey: "zw24g396iscrduf8yqep",
    authDomain: 'chanda-calculator-c702c.firebaseapp.com',
    projectId: 'chanda-calculator-c702c',
    storageBucket: 'chanda-calculator-c702c.appspot.com',
    messagingSenderId: '1086098697716',
    appId: '1086098697716'
});

// Get the messaging instance
const messaging = firebase.messaging();

// Function to send the token to your server
function sendTokenToServer(currentToken) {
  // Implement your logic to send the token to your server
  // For example, make an HTTP request to your server API
  // and save the token in your database
  console.log("Token sent to server:", currentToken);
}

// Function to update UI when push notifications are enabled
function updateUIForPushEnabled(currentToken) {
  // Implement your UI update logic
  console.log("Push notifications enabled. Token:", currentToken);
}

// Function to update UI when permission is required
function updateUIForPushPermissionRequired() {
  // Implement your UI update logic
  console.log("Permission required for push notifications.");
}

// Function to set token sent status
function setTokenSentToServer(isSent) {
  // Implement your logic to track whether the token has been sent to the server
  // For example, set a flag or update a variable
}

// Get the current registration token
messaging.getToken().then(function(currentToken) {
  if (currentToken) {
    // Send the token to your server
    sendTokenToServer(currentToken);
    // Update UI for push notifications
    updateUIForPushEnabled(currentToken);
  } else {
    // Show permission request
    console.log("No Instance ID token available. Request permission to generate one.");
    // Show permission UI
    updateUIForPushPermissionRequired();
    setTokenSentToServer(false);
  }
}).catch(function(err) {
  console.log("An error occurred while retrieving token. ", err);
  setTokenSentToServer(false);
});

const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const saveSubscription = async (subscription) => {
    const response = await fetch('https://appilix.com/account/dashboard/50528/notification/save-subscription', {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    })

    return response.json()
}

self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BEJCHw1b7MIdAfVTSo3kJ0HtQqh0Hld8VB4aunAUfWcQC-Znxxpld47E2Lo2IGH0kGxlxPmdwpquln8RqYSYs24")
    })

    const response = await saveSubscription(subscription)
    console.log(response)
})

self.addEventListener("push", e => {
    self.registration.showNotification("Wohoo!!", { body: e.data.text() })
})

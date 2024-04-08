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
    const response = await fetch('https://beautiful-faloodeh-89f52b.netlify.app/save-subscription', {
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

// const technosDiv = document.querySelector('#technos');

// function loadTechnologies() {
//     fetch('http://localhost:3001/technos')
//         .then(response => {
//             response.json()
//                 .then(technos => {
//                     const allTechnos = technos.map(t => `<div id="taille-police"><b>${t.name}</b> ${t.description}  <a href="${t.url}">site de ${t.name}</a> </div>`)
//                         .join('');
//
//                     technosDiv.innerHTML = allTechnos;
//                 });
//         })
//         .catch(console.error);
// }

// loadTechnologies(technos);

if(navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js')
        .then(registration => {
            //Public vapid key générée à partir de web-push
            const publicKey = "BOUs8nTqqFgLYGOZ9oYtNhFpZUrMdJpNiuSJcJCNNwSWFzcsiV2zFOFc2Vm0sgi9Ee1dU2CjPO9V3hM--124zqY";

            registration.pushManager.getSubscription().then(subscription => {
                if (subscription){
                    console.log('subscription', subscription);
                    // no more keys proprety directly visible on the subscription objet. So you have to use getKey()
                    const keyArrayBuffer = subscription.getKey('p256dh');
                    const authArrayBuffer = subscription.getKey('auth');
                    const p256dh = btoa(String.fromCharCode.apply(null, new Uint8Array(keyArrayBuffer)));
                    const auth = btoa(String.fromCharCode.apply(null, new Uint8Array(authArrayBuffer)));
                    console.log('p256dh key', keyArrayBuffer, p256dh);
                    console.log('auth key', authArrayBuffer, auth);
                    return subscription;
                } else{
                    //demande subscription
                    const convertedKey = urlBase64ToUint8Array(publicKey);
                    return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: convertedKey
                    })
                        .then(newSubscription => {
                            // TODO post to a subscription DB
                            console.log('newSubscription', newSubscription);
                            // no more keys proprety directly visible on the subscription objet. So you have to use getKey()
                            const key = newSubscription.getKey('p256dh');
                            const auth = newSubscription.getKey('auth');
                            console.log('p256dh key', key);
                            console.log('auth key', auth);
                        })
                }
            })
        })
        .catch(err => console.error('service worker NON enregistré', err));
}

// if (window.caches){
//     caches.open('veille-techno-v1').then(cache => {
//         cache.addAll([
//             'index.html',
//             'main.js',
//             'style.css',
//             'vendors/bootstrap4.min.css',
//             'add_techno.html',
//             'add_techno.js',
//             'contact.html',
//             'contact.js'
//         ]);
//     });
// }

//

// // Notification Non Persistante
// if (window.Notification && window.Notification !== 'denied') {
//     Notification.requestPermission(perm => {
//         if(perm === 'granted') {
//             const option = {
//                 body: 'Je suis le body de la notif',
//                 icon: 'images/icons/icon-72x72.png'
//             };
//             const notif = new Notification('Hello notification', option);
//         } else {
//             console.log('autorisation de recevoir des notification réfusées');
//         }
//     })
// }

//Web-Push Conversion
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

//Pour générer une clé - tuto web-push
// const vapidPublicKey = '<Your Public Key from generateVAPIDKeys()>';
// const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
//
// registration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: convertedVapidKey
// });


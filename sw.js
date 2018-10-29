const cacheName = 'des-maskes-v1.0';

self.addEventListener('install', (evt) => {
    console.log(`sw installé à ${new Date().toLocaleTimeString()}`);
    const cachePromise = caches.open(cacheName).then(cache => {
        return cache.addAll([
            'index.html',
            'apropos.html',
            'actu.html',
            'jeu.html',
            'idb.js',
            'main.js',
            'style.css',
            "paysage.css",
            'vendors/bootstrap4.min.css',
        ])
            .then(console.log('cache initialisé'))
            .catch(console.err);
    });

    evt.waitUntil(cachePromise);

});
//Màj supprime ancien cache dès que new version
self.addEventListener('activate', (evt) => {
    console.log(`sw activé à ${new Date().toLocaleTimeString()}`);
    let cacheCleanedPromise = caches.keys().then(keys => {
        keys.forEach(key => {
            if(key !== cacheName) {
                return caches.delete(key);
            }
        });
    });
    evt.waitUntil(cacheCleanedPromise);
});

// self.addEventListener('fetch', (evt) => {
//     if(!navigator.onLine) {
//         const headers = { headers: { 'Content-Type': 'text/html;charset=utf-8'} };
//         evt.respondWith(new Response('<h1>Pas de connexion internet</h1><div>Application en mode dégradé. Veuillez vous connecter</div>', headers));
//     }

//     // always serving css from the cache
//     if(evt.request.url.includes('css')) {
//         caches.open(cacheName).then(cache => {
//             console.log('servi depuis le cache', evt.request.url);
//             cache.match(evt.request);
//         })
//     } else {
//         console.log('fetch request passée à internet', evt.request.url);
//         evt.respondWith(fetch(evt.request));
//     }
// });

// network first strategy
self.addEventListener('fetch', evt => {
    evt.respondWith(
        fetch(evt.request).then( res => {
            // we add the latest version into the cache
            caches.open(cacheName).then(cache => cache.put(evt.request, res));
            // we clone it as a response can be read only once (it's like a one time read stream)
            return res.clone();
        })
            .catch(err => caches.match(evt.request))
    );
});
// --------------------------------------------------------------------------
//Notifications
// self.registration.showNotification('Notif depuis le sw', {
//     body: 'je suis une notification dite "persistante"',
//     actions: [
//         {action: 'accept', title: 'accepter'},
//         {action: 'refuse', title: 'refuser'}
//     ]
// });
//
// self.addEventListener('notificationclose', evt => {
//     console.log('notification fermée', evt);
// });
//
// self.addEventListener('notificationclick', evt => {
//     if(evt.action === 'accept') {
//         console.log('vous avez accepté');
//     } else if(evt.action === 'refuse') {
//         console.log('vous avez refusé')
//     } else {
//         console.log('vous avez cliqué sur la notification (pas sur un des boutons)')
//     }
//     evt.notification.close();
// });
// --------------------------------------------------------------------------

//Push Notification

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Pour Maxime';
    const options = {
        body: 'A quand un Jambon Beurre ?',
        icon: 'images/icon.png',
        badge: 'images/badge.png'
    };

    const notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);

});

//Background Sync
// self.addEventListener('sync', event => {
//     if (event.tag === 'sync-technos') {
//         console.log('attempting sync', event.tag);
//         console.log('syncing', event.tag);
//         event.waitUntil(
//             getAllTechnos().then(technos => {
//
//                 console.log('got technos from sync callback', technos);
//
//                 const unsynced = technos.filter(techno => techno.unsynced);
//
//                 console.log('pending sync', unsynced);
//
//                 return Promise.all(unsynced.map(techno => {
//                     console.log('Attempting fetch', techno);
//                     fetch('https://nodetestapi-thyrrtzgdz.now.sh/technos', {
//                         headers: {
//                             'Accept': 'application/json',
//                             'Content-Type': 'application/json'
//                         },
//                         method: 'POST',
//                         body: JSON.stringify(techno)
//                     })
//                         .then(() => {
//                             console.log('Sent to server');
//                             return putTechno(Object.assign({}, techno, { unsynced: false }), techno.id);
//                         })
//                 }))
//             })
//         )
//     }
// });
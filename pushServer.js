const webPush = require('web-push');
// const pushServerKeys = require('./pushServerKeys');
const pushClientSubscription = require('./pushClientSubscription.json');

webPush.setVapidDetails('mailto:contact@hotmail.fr', 'BKJaxDRwy/PzeeLwRGwSL18nzaAADcqLG0fZeu4+WqciJSKgoGqtWyLgYVNOjoD9o+IKU76zTH5HlQw7yqyXu8M=', 'o7kU9X2Hbb/OqldWERow7A==');

const subscription = {
    endpoint: pushClientSubscription.endpoint,
    keys: {
        auth: pushClientSubscription.keys.auth,
        p256dh: pushClientSubscription.keys.p256dh
    }
};
console.log('sub', subscription);
webPush.sendNotification(subscription, 'Notification envoyée depuis server Push Node')
    .then(res => console.log('Ma push notif a bien été poussée', res))
    .catch(err => console.error());
const webPush = require('web-push');
// const pushServerKeys = require('./pushServerKeys');
const pushClientSubscription = require('./pushClientSubscription.json');

webPush.setVapidDetails('mailto:contact@hotmail.fr', 'BOUs8nTqqFgLYGOZ9oYtNhFpZUrMdJpNiuSJcJCNNwSWFzcsiV2zFOFc2Vm0sgi9Ee1dU2CjPO9V3hM--124zqY', 'll59ast1YT5q5fUD7goFP5FiGF1tZvZzE1gL7VFJZ3Y');

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
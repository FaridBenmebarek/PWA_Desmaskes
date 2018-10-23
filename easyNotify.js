(function($) {

    $.fn.easyNotify = function(options) {

        var settings = $.extend({
            title: "Notification",
            options: {
                body: "",
                icon: "",
                lang: 'fr-FR',
                onClose: "",
                onClick: "",
                onError: ""
            }
        }, options);

        this.init = function() {
            var notify = this;
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            } else if (Notification.permission === "granted") {

                var notification = new Notification(settings.title, settings.options);

                notification.onclose = function() {
                    if (typeof settings.options.onClose == 'function') {
                        settings.options.onClose();
                    }
                };

                notification.onclick = function() {
                    if (typeof settings.options.onClick == 'function') {
                        settings.options.onClick();
                    }
                };

                notification.onerror = function() {
                    if (typeof settings.options.onError == 'function') {
                        settings.options.onError();
                    }
                };

            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function(permission) {
                    if (permission === "granted") {
                        notify.init();
                    }

                });
            }

        };

        this.init();
        return this;
    };

}(jQuery));




var myClick = function() {
    alert('clicked!');
    console.log('clicked!');
};
var myClose = function() {
    alert('closed!');
    console.log('closed!');
};
var myError = function() {
    alert('Ops. Some error occurred!');
    console.log('Ops. Some error occurred!');
};
var imgLogo = "https://faridbenmebarek.github.io/PWAdesmaskes/images/icons/icon-512x512.png";

$("form").submit(function(event) {
    event.preventDefault();

    var options = {
        title: $("#title").val(),
        options: {
            body: $("#message").val(),
            icon: imgLogo,
            lang: 'fr-FR',
            onClick: myClick,
            // onClose: myClose,
            onError: myError
        }
    };

    $("#easyNotify").easyNotify(options);
});
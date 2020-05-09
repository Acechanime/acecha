import "./videojs.ima.js"

export const cargarAds = videojs => {
    var player = videojs('content_video');

    var options = {
        id: 'content_video',
        adTagUrl: BB.getVASTUrl(2012102)
    };

    player.ima(options);

    var contentPlayer =  document.getElementById('content_video_html5_api');
    if ((navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i)) &&
        contentPlayer.hasAttribute('controls')) {
        contentPlayer.removeAttribute('controls');
    }
    var startEvent = 'click';
    if (navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i)) {
        startEvent = 'touchend';
    }

    player.one(startEvent, function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
    });
};


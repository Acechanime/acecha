export const cargarAds = player => {

    const options = {
        adTagUrl: BB.getVASTUrl(2012102)
    };

    player.ima(options);

    const contentPlayer =  document.getElementById('content_video_html5_api');
    if ((navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i)) &&
        contentPlayer &&
        contentPlayer.hasAttribute('controls')) {
        contentPlayer.removeAttribute('controls');
    }
    let startEvent = 'click';
    if (navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i)) {
        startEvent = 'touchend';
    }

    player.one(startEvent, function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        // player.play();
    });
};


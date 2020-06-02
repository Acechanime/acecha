import store from "../store/store.coffee";

export const fnBeforeEach = (to, from, next) => {
    if (to.name === "Login" || to.name === "Registro") {
        if (store.state.usuario.usuarioActual.id) {
            if (from.name) {
                next(false);
            } else {
                next("/")
            }
        } else {
            next();
        }
    } else {
        next();
    }
};

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// main function
export const scrollToY = (scrollTargetY, speed, easing) => {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    const scrollY = window.scrollY;
    let scrollTargetY2 = scrollTargetY || 0;
    let speed2 = speed || 2000;
    let easing2 = easing || 'easeOutSine';
    let currentTime = 0;

    // min time .1, max time .8 seconds
    const time = Math.max(
        0.1,
        Math.min(Math.abs(scrollY - scrollTargetY2) / speed2, 0.8)
    );

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    const PI_D2 = Math.PI / 2;
    const easingEquations = {
        easeOutSine: function (pos) {
            return Math.sin(pos * (Math.PI / 2));
        },
        easeInOutSine: function (pos) {
            return (-0.5 * (Math.cos(Math.PI * pos) - 1));
        },
        easeInOutQuint: function (pos) {
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow((pos - 2), 5) + 2);
        }
    };

    // add animation loop
    const tick = () => {
        currentTime += 1 / 60;

        const p = currentTime / time;
        const t = easingEquations[easing2](p);

        if (p < 1) {
            requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((scrollTargetY2 - scrollY) * t));
        } else {
            // console.log('scroll done');
            window.scrollTo(0, scrollTargetY2);
        }
    };

    // call it once to get started
    tick();
};

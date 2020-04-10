import Vue from 'vue'
import Router from 'vue-router'

import Inicio from './views/Inicio.vue'
import EnConstruccion from "./views/EnConstruccion.vue"
import mantenimiento from "./views/mantenimiento.vue"
import VerAnimeLegacy from "./views/VerAnimeLegacy.vue"
import Calendario from "./views/Calendario.vue"

Vue.use(Router);

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

// main function
const scrollToY = (scrollTargetY, speed, easing) => {
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

const router = new Router({
    mode: "history",
    routes: [
        { path: '*', component: mantenimiento }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (to.name === "VerAnimeLegacy" && from.name === "Anime") {
            scrollToY(0, 3000);
            return {}
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

export default router;

export const paginasLegacy = ["Nosotros", "Creadores", "Premium", "AcechaTV", "DMCA", "PoliticaPrivacidad"];

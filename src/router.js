import Vue from 'vue'
import Router from 'vue-router'

import Inicio from './views/Inicio.vue'
import EnConstruccion from "./views/EnConstruccion.vue"
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
        {
            path: '/',
            name: 'Inicio',
            component: Inicio
        },
        {
            path: "/404",
            name: "NotFound",
            component: () => import("./views/404.vue")
        },
        {
            path: "/login/",
            name: "Login",
            component: () => import("./views/Login.vue")
        },
        {
            path: "/registro/",
            name: "Registro",
            component: () => import("./views/Login.vue")
        },
        {
            path: "/mi-cuenta/",
            name: "Cuenta",
            component: () => import("./views/Ajustes.vue")
        },
        {
            path: "/calendario/",
            name: "Calendario",
            component: () => import("./views/Calendario.vue")
        },
        { path: "/leer-manga/", redirect: "/en-construccion/" },
        { path: "/comprar-anime/", redirect: "/en-construccion/" },
        { path: "/comprar-desde-japon/", redirect: "/en-construccion/" },
        { 
            path: "/nosotros/", 
            name: "Nosotros",
            component: () => import("./views/PaginasSecundarias/Nosotros.vue")
        },
        { 
            path: "/creadores-de-contenido/", 
            name: "Creadores",
            component: () => import("./views/PaginasSecundarias/CreadoresDeContenido.vue")
        },
        { 
            path: "/acecha-premium/", 
            name: "Premium",
            component: () => import("./views/PaginasSecundarias/AcechaPremium.vue")
        },
        {
            path: "/en-construccion/",
            name: "EnConstruccion",
            component: () => import("./views/EnConstruccion.vue")
        },
        {
            path: "/acecha-tv/",
            name: "AcechaTV",
            component: () => import("./views/PaginasSecundarias/AcechaTv.vue")
        },
        {
            path: "/dmca/",
            name: "DMCA",
            component: () => import("./views/PaginasSecundarias/DMCA.vue")
        },
        {
            path: "/politica-privacidad/",
            name: "PoliticaPrivacidad",
            component: () => import("./views/PaginasSecundarias/PoliticaPrivacidad.vue")
        },
        {
            path: '/animes/',
            name: 'Animes',
            component: () => import("./views/Animes.vue")
        },
        {
            path: "/:anime/",
            name: "Anime",
            component: () => import("./views/Anime.vue"),
            props: true,
            children: [
                {
                    path: "ep:ep(\\d+)",
                    alias: "ova:ep(\\d+)",
                    name: "VerAnimeLegacy",
                    component: VerAnimeLegacy
                }
            ]
        },
        { path: '*', redirect: "/404" }
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

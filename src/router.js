import Vue from 'vue'
import Router from 'vue-router'

import Inicio from './views/Inicio.vue'
import Animes from "./views/Animes.vue"
import Anime from "./views/Anime.vue"

Vue.use(Router);

const rutasNormales = [
    "/animes/",
    "/calendario/",
    "/leer-manga/",
    "/comprar-anime/",
    "/comprar-desde-japon/",
    "/acecha-premium/",
    "/acecha-tv/",
    "/nosotros/",
    "/creadores-de-contenido/",
    "/dmca/",
    "/politica-privacidad/",
    "/comprar-acecha-premium/"
];

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'Inicio',
            component: Inicio
        },
        {
            path: '/animes/',
            name: 'Animes',
            component: Animes
        },
        {
            path: "/:anime/",
            name: "Anime",
            component: Anime
        }
    ]
});


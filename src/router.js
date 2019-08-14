import Vue from 'vue'
import Router from 'vue-router'

import Inicio from './views/Inicio.vue'
import Animes from "./views/Animes.vue"
import Anime from "./views/Anime.vue"
import Premium from "./views/Premium.vue"
import EnConstruccion from "./views/EnConstruccion.vue"
import VerAnimeLegacy from "./views/VerAnimeLegacy.vue"

import store from "./store.coffee"

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

const router = new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'Inicio',
            component: Inicio
        },
        { path: "/acecha-premium/", redirect: "/premium/" },
        { path: "/comprar-acecha-premium/", redirect: "/premium/" },
        {
            path: "/en-construccion/",
            name: "EnConstruccion",
            component: EnConstruccion
        },
        {
            path: "/premium/",
            name: "Premium",
            redirect: "/en-construccion/"
        },
        {
            path: "/acecha-tv/",
            name: "AcechaTV",
            redirect: "/en-construccion/"
        },
        {
            path: '/animes/',
            name: 'Animes',
            component: Animes
        },
        {
            path: "/:anime/",
            name: "Anime",
            component: Anime,
            props: true,
            children: [
                {
                    path: "ep:ep(\\d+)",
                    alias: "ova:ep(\\d+)",
                    component: VerAnimeLegacy
                }
            ]
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

const extraerUrls = url => url.split("/").filter(x =>  x !== "");

const esperar = new Promise(((resolve) => {
    setInterval(() => {
        if (store.state.listaAnimes.length !== 0) resolve();
    }, 250);
}));

router.beforeEach(async (to, from, next) => {
    /*
    const ruta = extraerUrls(to.path);

    if (ruta.length === 2) {

        if (rutasNormales.find(x => x === `/${ruta[0]}/`)) next();
        else {
            await esperar;

            if (store.state.listaAnimes.find(x => x.ruta === `/${ruta[0]}/`)) {

                store.commit("activarVerAnime");
                const rutaNueva = (from.name === null)? `/${ruta[0]}/`: false;

                next(rutaNueva);
                store.commit("cambiarRutaVerAnime", to.path);

            } else {
                // TODO: Redidigir a 404
                next("/");
            }
        }
    } else {
        next();
    }

     */
    next();
});

export default router;


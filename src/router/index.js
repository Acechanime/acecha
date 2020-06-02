import Vue from 'vue';
import Router from 'vue-router';

import Inicio from '../views/Inicio.vue';
import EnConstruccion from "../views/EnConstruccion.vue";
import VerAnimeLegacy from "../views/VerAnimeLegacy.vue";
import Calendario from "../views/Calendario.vue";

import { fnBeforeEach, scrollToY } from "./utils";

Vue.use(Router);

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
            component: () => import("../views/404.vue")
        },
        {
            path: "/login/",
            name: "Login",
            component: () => import("../views/Login.vue")
        },
        {
            path: "/registro/",
            name: "Registro",
            component: () => import("../views/Login.vue")
        },
        {
            path: "/mi-cuenta/",
            name: "Cuenta",
            component: () => import("../views/Ajustes.vue")
        },
        {
            path: "/calendario/",
            name: "Calendario",
            component: () => import("../views/Calendario.vue")
        },
        {path: "/leer-manga/", redirect: "/en-construccion/"},
        {path: "/comprar-anime/", redirect: "/en-construccion/"},
        {path: "/comprar-desde-japon/", redirect: "/en-construccion/"},
        {
            path: "/nosotros/",
            name: "Nosotros",
            component: () => import("../views/PaginasSecundarias/Nosotros.vue")
        },
        {
            path: "/creadores-de-contenido/",
            name: "Creadores",
            component: () => import("../views/PaginasSecundarias/CreadoresDeContenido.vue")
        },
        {
            path: "/acecha-premium/",
            name: "Premium",
            component: () => import("../views/PaginasSecundarias/AcechaPremium.vue")
        },
        {
            path: "/en-construccion/",
            name: "EnConstruccion",
            component: () => import("../views/EnConstruccion.vue")
        },
        {
            path: "/acecha-tv/",
            name: "AcechaTV",
            component: () => import("../views/PaginasSecundarias/AcechaTv.vue")
        },
        {
            path: "/dmca/",
            name: "DMCA",
            component: () => import("../views/PaginasSecundarias/DMCA.vue")
        },
        {
            path: "/politica-privacidad/",
            name: "PoliticaPrivacidad",
            component: () => import("../views/PaginasSecundarias/PoliticaPrivacidad.vue")
        },
        {
            path: '/animes/',
            name: 'Animes',
            component: () => import("../views/Animes.vue")
        },
        {
            path: "/mi-lista/",
            name: "MiLista",
            component: () => import("../views/MiLista.vue")
        },
        {
            path: "/versiones/",
            name: "Versiones",
            component: () => import("../views/Versiones.vue")
        },
        {
            path: "/:anime/",
            name: "Anime",
            component: () => import("../views/Anime.vue"),
            props: true,
            children: [
                {
                    path: ":id/",
                    name: "VerAnime",
                    component: VerAnimeLegacy
                }
            ]
        },
        {path: '*', redirect: "/404"}
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.name === "VerAnimeLegacy" && from.name === "Anime") {
            scrollToY(0, 3000);
            return {}
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    }
});

router.beforeEach(fnBeforeEach);

export default router;

export const paginasLegacy = ["Nosotros", "Creadores", "Premium", "AcechaTV", "DMCA", "PoliticaPrivacidad"];

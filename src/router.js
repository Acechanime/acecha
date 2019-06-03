import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './views/Inicio.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Inicio',
            component: Inicio
        },
        {
            path: '/animes/',
            name: 'Animes',
            component: () => import('./views/Animes.vue')
        }
    ]
});


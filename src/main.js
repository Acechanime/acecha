import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.coffee'
import "./sass/global.sass"
import "./sass/colores.sass"
import VueGtag from "vue-gtag"
import VueMeta from "vue-meta"

// Video.js
import VueVideoPlayer from "vue-video-player";

Vue.config.productionTip = false;

Vue.use(VueVideoPlayer);

Vue.use(VueGtag, {
    config: {
        id: "G-CZYJV0S800"
    }
}, router);


Vue.use(VueMeta);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.coffee'
import './registerServiceWorker'
import "./sass/global.sass"
import VueGtag from "vue-gtag"
import VueMeta from "vue-meta"

Vue.config.productionTip = false;


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

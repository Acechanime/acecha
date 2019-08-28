import Vue from 'vue'
import App from './App.vue'
import VueSeo from "vue-seo"
import router from './router'
import store from './store.coffee'
import './registerServiceWorker'
import "./sass/global.sass"

Vue.config.productionTip = false;
// Vue.use(VueSeo);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

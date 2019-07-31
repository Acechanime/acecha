import Vue from 'vue'
import App from './App.vue'
import store from "../src/store.coffee"
import "./sass/global.sass"
import "../src/sass/global.sass"

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');

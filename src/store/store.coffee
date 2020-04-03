import Vue from 'vue'
import Vuex from 'vuex'
import { color } from "./color"
import { datos } from "./datos"
import { reproductor } from "./reproductor"


Vue.use Vuex

store = new Vuex.Store
    strict: process.env.NODE_ENV != 'production'
    modules: { color, datos, reproductor }



export default store

import Vue from 'vue'
import Vuex from 'vuex'
import { color } from "./color"
import { datos } from "./datos"
import { reproductor } from "./reproductor"
import { moduloUsuario as usuario } from "./usuario.coffee"

Vue.use Vuex

store = new Vuex.Store
    strict: process.env.NODE_ENV != 'production'
    modules: { color, datos, reproductor, usuario }


export default store

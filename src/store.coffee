import Vue from 'vue'
import Vuex from 'vuex'

Vue.use Vuex

moduloVerAnime =
    state:
        listaEpisodios: []
    mutations:
        cambiarListaEps: (state, data) ->
            state.listaEpisodios = data

store = new Vuex.Store
    state:
        verAnime:
            listaEpisodios: []
            activo: no
            anime:
                mega: null
                rapidvideo: null
                mango: null
                mp4upload: null
                okru: null
            descarga:
                carpeta_mega: null
                # Solucion temporal. Cuando se implementen cuentas los links se obtendran tras
                # una solicitud al servidor.
                mega: null
                rapidvideo: null
                mango: null
                mp4upload: null
                okru: null
            nombre: null
            esOva: no
            ep: -1
            ruta: ""
        verAnimeActivo: no
        listaAnimes: []
        listaGeneros: []
        recomendacionSemanal: ""
        paginaLista: no
        modoAdmin: no
        animeAdmin: {}
        mostrarAnimeAdmin: no
    mutations:
        cambiarListaAnimes: (state, data) ->
            state.listaAnimes = data
        cambiarRecomendacionSemanal: (state, nuevo) ->
            state.recomendacionSemanal = nuevo
        terminarCargaPagina: (state) ->
            state.paginaLista = yes
        cambiarAnimeAdmin: (state, anime) ->
            state.animeAdmin = anime
        cambiarAModoAdmin: (state) ->
            state.modoAdmin = yes
        cambiarAnimeAdmin_alternativo: (state, arr) ->
            state.animeAdmin.otros_nombres = arr
        agregarAnimeAdmin_alternativo: (state) ->
            unless Array.isArray state.animeAdmin.otros_nombres
                state.animeAdmin.otros_nombres = []
            else
                state.animeAdmin.otros_nombres = state.animeAdmin.otros_nombres.concat ""
        cambiarListaGeneros: (state, nuevo) ->
            state.listaGeneros = nuevo
        cambiarEstadoVerAnime: (state) ->
            state.verAnime.activo = !state.verAnime.activo
        activarVerAnime: (state) ->
            state.verAnime.activo = true
        desactivarVerAnime: (state) ->
            state.verAnime.activo = false
        cambiarRutaVerAnime: (state, ruta) ->
            state.verAnime.ruta = ruta
        cambiarDatosVerAnime: (state, datos) ->
            if state.verAnime.nombre isnt datos.nombre or state.verAnime.ep isnt datos.ep
                state.verAnime.nombre = datos.nombre
                state.verAnime.esOva = datos.esOva
                state.verAnime.ep = datos.ep
                state.verAnime.ruta = datos.ruta
        cambiarAnimeVerAnime: (state, datos) ->
            if state.verAnime.anime.mega isnt datos.mega
                state.verAnime.anime = datos

        mostrarAnimeAdmin: (state) ->
            state.mostrarAnimeAdmin = yes
        ocultarAnimeAdmin: (state) ->
            state.mostrarAnimeAdmin = no

        cambiarListaEpisodios: (state, data) ->
            state.verAnime.listaEpisodios = data

        activarVerAnime: (state) ->
            state.verAnimeActivo = yes
        desactivarVerAnime: (state) ->
            state.verAnimeActivo = no

    actions: {}

export default store
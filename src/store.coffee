import Vue from 'vue'
import Vuex from 'vuex'

Vue.use Vuex

export default new Vuex.Store
    state:
        verAnime:
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
            ep: 0
            ruta: ""
        listaAnimes: []
        listaGeneros: []
        recomendacionSemanal: ""
        paginaLista: no
        modoAdmin: no
        animeAdmin:
            nombre: "Nombre"
            alternativo: [
                "Otros nombres"
            ]
            ruta: "/ruta-del-anime/"
            sinopsis: "Sinopsis del anime"
            generos: []
            episodios: 12
            temporada: "Invierno"
            anio: 2019
            estudio: "A-1 Pictures"
            fuente: "Manga"
            emision: "01/01/2019"
            culminacion: "30/03/2019"
            mal: "https://myanimelist.net/"
            en_emision: yes
            img_portada: "https://cdn.myanimelist.net/images/anime/5/86830l.jpg"
            img_fondo: "/img/you-kei.jpg"
            img_nuevoEp: "nuevo ep"
            id_temporada_ant: null
            id_temporada_sig: null
            num_temporada: 1
    mutations:
        cambiarListaAnimes: (state, data) ->
            state.listaAnimes = data
        cambiarRecomendacionSemanal: (state, nuevo) ->
            state.recomendacionSemanal = nuevo
        terminarCargaPagina: (state) ->
            state.paginaLista = yes
        cambiarAModoAdmin: (state) ->
            state.modoAdmin = yes
        cambiarAnimeAdmin_alternativo: (state, arr) ->
            state.animeAdmin.alternativo = arr
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

    actions: {}


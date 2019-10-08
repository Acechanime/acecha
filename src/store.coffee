import Vue from 'vue'
import Vuex from 'vuex'
import { servidor, impr } from "./variables"

Vue.use Vuex

#: () -> (Txt | undefined)
cargarListaAnimes = =>
    datos = localStorage?.getItem "lista-animes"
    if datos?
        JSON.parse datos
    else
        undefined

#: Txt -> ()
guardarListaAnimes = (data) =>
    dataJSON = JSON.stringify data
    localStorage?.setItem "lista-animes", dataJSON

###: () -> Promise (Txt, Bool) Error
Promesa
###
cargarRecomendacionSemanal = => new Promise (resolve, reject) =>
    recomendacion = localStorage?.getItem "recomendacion-semanal"
    if recomendacion?
        resolve [(JSON.parse recomendacion), true]
    else
        res =
            try
                resRaw = await fetch "#{servidor}/api/recomendacionSemanal/"
                await resRaw.json()
            catch e
                {exito: false, err: e}
        if res?.exito
            localStorage?.setItem "recomendacion-semanal", JSON.stringify res.payload
            resolve [res.payload, false]
        else
            reject new Error "Error al obtener la lista de " +
                "generos desde el servidor.\n#{res.err}"

moduloAnimeAdmin =
    state:
        modoAdmin: no
        animeAdmin: {}
        mostrarAnimeAdmin: no
    mutations:
        cambiarAModoAdmin: (state) ->
            state.modoAdmin = yes

        cambiarAnimeAdmin: (state, anime) ->
            state.animeAdmin = anime
        cambiarAnimeAdmin_alternativo: (state, arr) ->
            state.animeAdmin.otros_nombres = arr
        agregarAnimeAdmin_alternativo: (state) ->
            unless Array.isArray state.animeAdmin.otros_nombres
                state.animeAdmin.otros_nombres = []
            else
                state.animeAdmin.otros_nombres = state.animeAdmin.otros_nombres.concat ""

        mostrarAnimeAdmin: (state) ->
            state.mostrarAnimeAdmin = yes
        ocultarAnimeAdmin: (state) ->
            state.mostrarAnimeAdmin = no

moduloVerAnime =
    state:
        verAnimeActivo: no
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
    mutations:
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
        cambiarListaEpisodios: (state, data) ->
            state.verAnime.listaEpisodios = data

        activarVerAnime: (state) ->
            state.verAnimeActivo = yes
        desactivarVerAnime: (state) ->
            state.verAnimeActivo = no

moduloDatos =
    state:
        # TODO: Hacer que la lista de animes en si sea una Promesa.
        #: Txt | undefined
        listaAnimes: cargarListaAnimes()

        # En desuso.
        listaAnimesCargada: Promise.race []

        # TODO: Promesa
        listaGeneros: []

        ###: Promise (Txt, Bool) Error
        Promesa que se recupera desde localStorage. Bool indica si se sacó de localStorage.
        ###
        recomendacionSemanal: cargarRecomendacionSemanal()

        # Indica si la pagina termino de cargar sus recursos. En desuso.
        paginaLista: no

    mutations:
        cambiarListaAnimes: (state, data) ->
            state.listaAnimes = data
            state.listaAnimesCargada = Promise.resolve()
            guardarListaAnimes data
        cambiarListaGeneros: (state, nuevo) ->
            state.listaGeneros = nuevo
        cambiarRecomendacionSemanal: (state, nuevo) ->
            localStorage?.setItem "recomendacion-semanal", JSON.stringify nuevo
            state.recomendacionSemanal = Promise.resolve [nuevo, false]
        terminarCargaPagina: (state) ->
            state.paginaLista = yes


store = new Vuex.Store
    modules:
        animeAdmin: moduloAnimeAdmin
        verAnime: moduloVerAnime
        datos: moduloDatos

export default store

export listaAnimesCargada = new Promise (resolve) =>
    intervalo = setInterval (=>
        if store.state.datos.listaAnimes isnt undefined
            clearInterval intervalo
            resolve()
    ), 150

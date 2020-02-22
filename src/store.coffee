import Vue from 'vue'
import Vuex from 'vuex'
import { servidor, impr } from "./variables"

Vue.use Vuex

actualizarAnimes = () =>
    res =
        try
            resRaw = await fetch "#{servidor}/animes"
            await resRaw.json()
        catch e
            {exito: false, err: e}
    if res?.exito
        localStorage?.setItem "lista-animes", JSON.stringify res.payload

#: () -> (Txt | undefined)
cargarListaAnimes = =>
    actualizarAnimes()
    datos = localStorage?.getItem "lista-animes"
    if datos?
        JSON.parse datos
    else
        undefined

#: Txt -> ()
guardarListaAnimes = (data) =>
    dataJSON = JSON.stringify data
    localStorage?.setItem "lista-animes", dataJSON

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
        nombre: null
        esOva: no
        ep: -1
        ruta: ""
    mutations:
        cambiarNumEp: (state, valor) ->
            state.ep = valor
        cambiarEstadoVerAnime: (state) ->
            state.activo = !state.activo
        activarVerAnime: (state) ->
            state.activo = true
        desactivarVerAnime: (state) ->
            state.activo = false
        cambiarRutaVerAnime: (state, ruta) ->
            state.ruta = ruta
        cambiarDatosVerAnime: (state, datos) ->
            if state.nombre isnt datos.nombre or state.ep isnt datos.ep
                state.nombre = datos.nombre
                state.esOva = datos.esOva
                state.ep = datos.ep
                state.ruta = datos.ruta
        cambiarAnimeVerAnime: (state, datos) ->
            if state.anime.mega isnt datos.mega
                state.anime = datos
        cambiarListaEpisodios: (state, data) ->
            state.listaEpisodios = data

        activarVerAnime: (state) ->
            state.verAnimeActivo = yes
        desactivarVerAnime: (state) ->
            state.verAnimeActivo = no

cargarRecursoDesdeRed = (nombre, url) => new Promise (resolve, reject) =>
    res =
        try
            resRaw = await fetch "#{servidor}#{url}"
            json = await resRaw.json()
            json
        catch e
            {exito: false, err: e}
    if res?.exito is true
        localStorage?.setItem nombre, JSON.stringify res.payload
        resolve [res.payload, false]
    else
        reject new Error "Error al obtener recurso #{nombre} desde #{url}.\n#{res.err}"


###: (nombre: Txt, url: Txt) -> Promise ({}, Bool) Error
    Intenta cargar un recurso desde localStorage, sino lo carga desde el servidor
    y lo almacena el localStorage.
    |nombre: El nombre a buscar en localStorage.
    |url: La URL del servidor
    Promesa que contiene: La respuesta como objeto, Bool indicando
        si se cargo desde localStorage.
###
cargarRecurso = (nombre, url) =>
    promesaRed = cargarRecursoDesdeRed nombre, url
    datosLocales = localStorage?.getItem nombre
    if datosLocales?
        impr "Se encontró #{nombre} en localStorage."
        Promise.resolve [(JSON.parse datosLocales), true]
    else
        promesaRed

moduloDatos =
    state:
        # TODO: Hacer que la lista de animes en si sea una Promesa.
        #: Txt | undefined
        listaAnimes: cargarListaAnimes()

        # En desuso.
        listaAnimesCargada: Promise.race []

        #: Promise ({}, Bool) Error
        listaGeneros: cargarRecurso "generos", "/generos"

        ###: Promise (Txt, Bool) Error
        Promesa que se recupera desde localStorage. Bool indica si se sacó de localStorage.
        ###
        recomendacionSemanal: cargarRecurso "recomendacion-semanal",
            "/recomendacion/"

        # Indica si la pagina termino de cargar sus recursos. En desuso.
        paginaLista: no
        modoColor: (localStorage.getItem "modo-color") ? "claro"
        modoColorAutomatico: ((localStorage.getItem "modo-color-automatico") == "si" ) ? false

        resizeEvent: {}

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
        cambiarModoColor: (state, nuevo) ->
            state.modoColor = nuevo
        registrarResizeEvent: (state) ->
            window.addEventListener "resize", (ev)=>
                state.resizeEvent = ev

        cambiarModoColorAutomatico: (state) ->
            activo = !state.modoColorAutomatico
            state.modoColorAutomatico = activo
            localStorage.setItem "modo-color-automatico", (if activo then "si" else "no")
            unless localStorage.getItem "segundos-claro-auto"
                localStorage.setItem "segundos-claro-auto", 25200
                localStorage.setItem "segundos-oscuro-auto", 64800




store = new Vuex.Store
    modules:
        verAnime: moduloVerAnime
        datos: moduloDatos

export default store

export listaAnimesCargada = new Promise (resolve) =>
    intervalo = setInterval (=>
        if store.state.datos.listaAnimes isnt undefined
            clearInterval intervalo
            resolve()
    ), 150

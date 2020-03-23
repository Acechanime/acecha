import Vue from 'vue'
import Vuex from 'vuex'
import { servidor, impr } from "../variables"
import { moduloVerAnime } from "./verAnime.coffee"

Vue.use Vuex

actualizarAnimes = () =>
    res =
        try
            resRaw = await fetch "#{servidor}/animes"
            await resRaw.json()
        catch e
            {exito: false, err: e}
    if res?.exito
        intervalo = setInterval (=>
            if store.commit?
                store.commit "cambiarListaAnimes", res.payload
                clearInterval intervalo
        ), 150


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
        mostrarVersion: ((localStorage.getItem "mostrar-version") ? "false") is "true"

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

        cambiarMostrarVersion: (state, op) ->
            localStorage.setItem "mostrar-version", op
            state.mostrarVersion = op




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

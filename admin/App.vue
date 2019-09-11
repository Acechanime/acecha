<template lang="pug">
    div
        cabecera
        inicio
    //
</template>

<script lang="coffee">
    import Inicio from "./views/Inicio.vue"
    import cabecera from "./components/cabecera.vue"
    import {servidor} from "../src/variables";

    quitarPantallaCarga = ->
        elem = document.getElementById "pantalla-carga"
        elem.style.opacity = "0"
        setTimeout (=>
            elem.style.display = "none"
            document.body.style.overflow = "initial"
        ), 250

    cssOscuro = =>
        document.documentElement.style.setProperty("--fondo0", "black");
        document.documentElement.style.setProperty("--fondo1", "#0a0909");
        document.documentElement.style.setProperty("--fondo2", "#040303");
        document.documentElement.style.setProperty("--fondo3", "#0f0d0d");
        document.documentElement.style.setProperty("--sombra1", "rgba(0, 0, 0, 0.12)");
        document.documentElement.style.setProperty("--texto1", "#e8e8e1");
        document.documentElement.style.setProperty("--texto2", "#BFC1B6");
        document.documentElement.style.setProperty("--opacidad1", "0.8");
        document.documentElement.style.setProperty("--opacidad2", "0.9");

    cssClaro = =>
        document.documentElement.style.setProperty("--fondo0", "#ffffff");
        document.documentElement.style.setProperty("--fondo1", "#ffffff");
        document.documentElement.style.setProperty("--fondo2", "#ffffff");
        document.documentElement.style.setProperty("--fondo3", "#efefef");
        document.documentElement.style.setProperty("--sombra1", "rgba(0, 0, 0, 0.15)");
        document.documentElement.style.setProperty("--texto1", "#3A3A3A");
        document.documentElement.style.setProperty("--texto2", "#4e565b");
        document.documentElement.style.setProperty("--opacidad1", "1");
        document.documentElement.style.setProperty("--opacidad2", "0.9");


    cambiarVariables = (modo) =>
        switch modo
            when "claro"  then cssClaro()
            when "oscuro" then cssOscuro()
            else console.log "Se intento cambiar el esquema de colores, pero no " +
                    "es ni claro ni oscuro :c"

    export default
        name: "App"
        components:
            "inicio": Inicio
            "cabecera": cabecera
        computed:
            cargaCompleta: -> @$store.state.paginaLista
        watch:
            cargaCompleta: (n, p) ->
                if n is yes then quitarPantallaCarga()
        methods:
            obtenerListaAnimes: ->
                try
                    resRaw = await fetch "#{servidor}/api/animes"
                    res = await resRaw.json()

                    if res.exito
                        [undefined, res.payload]
                    else throw new Error res.error.razon
                catch e
                    [e, undefined]
            inicializarListaAnimes: ->
                [err, res] = await @obtenerListaAnimes()
                unless err?
                    @$store.commit "cambiarListaAnimes", res
                else
                    console.error err
            inicializarListaGeneros: ->
                resRaw = await fetch "#{servidor}/api/generos"
                res = await resRaw.json()
                if res?.exito
                    @$store.commit "cambiarListaGeneros", res.payload
                else
                    console.error err
        created: ->
            esquema = (localStorage.getItem "modo-color" ? "claro")
            cambiarVariables esquema

            if @$store.state.listaAnimes is undefined
                @inicializarListaAnimes()
            if @$store.state.listaGeneros.length == 0
                @inicializarListaGeneros()

#
</script>

<style scoped lang="sass">

    //
</style>
<template lang="pug">
    i.modo-color.material-icons(@click="cambiarColor") brightness_3
    //
</template>

<script lang="coffee">

    ###
        document.documentElement.style.setProperty("--fondo0", "black");
        document.documentElement.style.setProperty("--fondo1", "#0a0909");
        document.documentElement.style.setProperty("--fondo2", "#040303");
        document.documentElement.style.setProperty("--fondo3", "#0f0d0d");
        document.documentElement.style.setProperty("--sombra1", "rgba(0, 0, 0, 0.12)");
        document.documentElement.style.setProperty("--texto1", "#e8e8e1");
        document.documentElement.style.setProperty("--texto2", "#BFC1B6");
        document.documentElement.style.setProperty("--opacidad1", "0.8");
        document.documentElement.style.setProperty("--opacidad2", "0.9");
    ###

    ###
        document.documentElement.style.setProperty("--fondo0", "#0e1621");
        document.documentElement.style.setProperty("--fondo1", "#080911");
        document.documentElement.style.setProperty("--fondo2", "#0c131d");
        document.documentElement.style.setProperty("--fondo3", "#080911");
    ###

    cssOscuro = =>
        document.documentElement.style.setProperty("--fondo0", "#0e1621");
        document.documentElement.style.setProperty("--fondo1", "#080911");
        document.documentElement.style.setProperty("--fondo2", "#0c131d");
        document.documentElement.style.setProperty("--fondo3", "#080911");
        document.documentElement.style.setProperty("--sombra1", "rgba(0, 0, 0, 0.12)");
        document.documentElement.style.setProperty("--texto1", "#e8e8e1");
        document.documentElement.style.setProperty("--texto2", "#BFC1B6");
        document.documentElement.style.setProperty("--opacidad1", "0.8");
        document.documentElement.style.setProperty("--opacidad2", "0.9");

    cssClaro = =>
        document.documentElement.style.setProperty("--fondo0", "#ffffff");
        document.documentElement.style.setProperty("--fondo1", "#ffffff");
        document.documentElement.style.setProperty("--fondo2", "#ffffff");
        document.documentElement.style.setProperty("--fondo3", "#ebebeb");
        document.documentElement.style.setProperty("--sombra1", "rgba(0, 0, 0, 0.15)");
        document.documentElement.style.setProperty("--texto1", "#3A3A3A");
        document.documentElement.style.setProperty("--texto2", "#4e565b");
        document.documentElement.style.setProperty("--opacidad1", "1");
        document.documentElement.style.setProperty("--opacidad2", "0.9");

    export default
        name: "modo-color"
        methods:
            cambiarVariables: (modo) ->
                switch modo
                    when "claro"  then cssClaro()
                    when "oscuro" then cssOscuro()
                    else console.log "Se intento cambiar el esquema de colores, pero no " +
                            "es ni claro ni oscuro :c"
            cambiarColor: ->
                nuevoModo = localStorage.getItem "modo-color" ? "claro"
                @cambiarVariables (
                    if nuevoModo is "claro"
                        localStorage.setItem "modo-color", "oscuro"
                        "oscuro"
                    else if nuevoModo is "oscuro"
                        localStorage.setItem "modo-color", "claro"
                        "claro"
                )
        mounted: ->
            esquema = (localStorage.getItem "modo-color" ? "claro")
            @cambiarVariables esquema

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .modo-color
        position: fixed
        bottom: 0
        right: 0
        z-index: 5
        font-size: 30px
        background-color: var(--texto1)
        color: var(--fondo1)
        padding: 15px
        margin: 20px
        border-radius: 50%
        cursor: pointer
        user-select: none
        box-shadow: rgba(84, 84, 84, 0.65) 1px 1px 1px 1px

    //
</style>
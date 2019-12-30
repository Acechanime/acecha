<template lang="pug">
    i.modo-color.material-icons(@click="cambiarColor") invert_colors
    //
</template>

<script lang="coffee">
    import {impr} from "../../variables"
    import { cambiarEsquema, cambiarColor, inicializarModoColorOscuro } from "./ModoColor.coffee"


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

    export default
        name: "modo-color"
        methods:
            cambiarColor: ->
                storeFn = @$store.commit
                cambiarColor {storeFn}
        mounted: ->
            inicializarModoColorOscuro()
            cambiarEsquema do ->
                res = localStorage.getItem "modo-color"

                res ? "claro"

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

    @media only screen and (max-width: 770px)
        .modo-color
            display: none !important

    //
</style>
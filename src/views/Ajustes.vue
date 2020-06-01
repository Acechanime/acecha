<template lang="pug">
    div.ajustes.contenedor
        div.separador
        h1.titulo Ajustes
        div.contenedor-ajuste
            div.modo-color(@click="cambiarColor")
                div.ajuste
                    div.titulo-ajuste Modo Oscuro
                    div.adicional Al cambiar el modo se reinician los comentarios de Facebook.
                    // div.etiqueta-ajuste El modo oscuro está {{ etiquetaModoColor }}activado

                div.cont-switch
                    label.cl-switch.cl-switch-red
                        input(type="checkbox" :checked="$store.state.color.color !== 'color-claro'")
                        span.switcher(@click.prevent.stop="cambiarColor")


        modo-color-oscuro
        // modo-color-automatico
        precargar-video
        // activar-reproductor-experimental
        mostrar-version(v-if="!esBeta")

        // div.contenedor-ajuste
            div.titulo-ajuste Mas ajustes
            div.etiqueta-ajuste Muy pronto...

        br

    //
</template>

<script lang="coffee">
    import modoColorOscuro from "../components/Ajustes/modo-color-oscuro.vue"
    import modoColorAutomatico from "../components/Ajustes/modo-color-automatico.vue"
    import mostrarVersion from "../components/Ajustes/mostrar-version.vue"
    import precargarVideo from "../components/Ajustes/precargar-video.vue"
    import activarReproductorExperimental from "../components/Ajustes/activar-reproductor-experimental.vue"
    import credito from "../components/Ajustes/credito.vue"
    import "../components/Ajustes/clean-switch.css"

    export default
        name: "Ajustes"
        metaInfo:
            title: "Ajustes"
        components: {
            modoColorOscuro
            modoColorAutomatico
            credito
            mostrarVersion
            precargarVideo
            activarReproductorExperimental
        }
        data: ->
            esBeta: false
        computed:
            modoColor: -> @$store.state.datos.modoColor
            etiquetaModoColor: -> if @mmodoColor is "claro" then "des" else ""
        methods:
            cambiarColor: ->
                @$store.commit "color/cambiarModoColor"
        mounted: ->
            @esBeta = (window.location.hostname.search "beta") != -1

#
</script>

<style lang="sass">
    @import "../sass/variables"

    .adicional
        font-size: 0.75rem
        opacity: 0.85
        padding-left: 10px
        position: relative
        &:before
            content: "*"
            position: absolute
            left: 0


    .contenedor-ajuste
        padding: 0.8rem 0.25rem
        // border-bottom: solid 1px rgba(127, 127, 127, 0.58)


    .modo-color
        display: grid
        grid-template-columns: auto 60px
        cursor: pointer
        user-select: none


    .cont-switch
        display: inline-table
        width: 100%
        height: 100%
        text-align: center
        label
            display: table-cell
            vertical-align: middle


    .titulo-ajuste
        padding-top: 0.5rem
        padding-bottom: 0.25rem
        font:
            family: Roboto, sans-serif
            size: 1rem


    .etiqueta-ajuste
        font-size: 0.8rem
        opacity: 0.75


    .ajustes
        color: var(--texto1)

    .titulo
        font:
            family: "Product Sans", Roboto, sans-serif
        padding: 25px 0

    //
</style>

<template lang="pug">
    div.cont-ver-anime
        main.cont-anime-inner.contenedor
            div
                div.fondo
                    h3.label_episodio {{ etiqueta }}
                    reproductor
                    descarga
                // comentarios.fondo
            div.fondo(v-if="!esMovil")
                publicidad

        comentarios

    //
</template>

<script lang="coffee">
    import reproductor from "../components/VerAnime/reproductor.vue"
    import descarga from "../components/VerAnime/descarga.vue"
    import publicidad from "../components/publicidad.vue"
    import comentarios from "../components/VerAnime/comentarios.vue"
    import { impr } from "../coffee/variables.coffee"

    extraerDatos = (url) =>
        patron = /(ep|ova)(\d+)$/
        res = patron.exec url

        if res?
            [
                if res[1] is "ova" then true else false
                parseInt res[2]
            ]
        else []


    export default
        name: "VerAnime"
        scrollToTop: true
        validate: ({ params }) ->
            /(ep|ova)(\d+)/.test params.id

        components: { reproductor, descarga, publicidad, comentarios }
        computed:
            ep: -> @$store.state.reproductor.epActual
            anchoPantalla: ->
                if process.client == false then return 501

                ev = @$store.state.datos.resizeEvent
                window.innerWidth

            esMovil: -> @anchoPantalla < 780

            etiqueta: ->
                (if @ep.es_ova is true then "Ova" else "Episodio") + " " +
                        @ep.numero

        beforeRouteUpdate: (to, from, next) ->
            [esOva, num] = extraerDatos to.params.id
            @$store.dispatch "reproductor/cambiarEpActual", { num, esOva }

            next()

        mounted: ->
            @$store.commit "reproductor/activar"

            unless @ep.id?

                [esOva, num] = extraerDatos @$route.params.id
                @$store.dispatch "reproductor/cambiarEpActual", { num, esOva }

        beforeDestroy: ->
            @$store.commit "reproductor/desactivar"


#
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .cont-ver-anime
        margin-top: -150px
        position: relative


    .label_episodio
        color: var(--texto1)
        font:
            family: Roboto, sans-serif
            weight: normal
            size: x-large
        padding-bottom: 30px
        padding-left: 15px


    .cont-anime-inner
        display: grid
        grid-template-columns: auto 250px !important
        grid-gap: 2.5rem !important


    .fondo
        @extend %caja-textos
        padding-left: 5px
        padding-right: 5px
        background-color: var(--fondo0)


    @media only screen and (max-width: 780px)
        .cont
            grid-template-columns: none !important


    @media only screen and (max-width: $anchoMovil)
        .contenedor
            width: 100%

        .fondo
            padding-left: 0
            padding-right: 0

    //
</style>

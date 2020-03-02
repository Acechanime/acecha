<template lang="pug">
    main.cont.contenedor
        div
            div.fondo
                h3.label_episodio {{ etiqueta }}
                reproductor
                descarga
            // comentarios.fondo
        div.fondo(v-if="!esMovil")
            publicidad
        br
    //
</template>

<script lang="coffee">
    import reproductor from "../components/VerAnime/reproductor.vue"
    import descarga from "../components/VerAnime/descarga.vue"
    import comentarios from "../components/VerAnime/comentarios.vue"
    import publicidad from "../components/publicidad.vue"
    import {impr} from "../variables"

    extraerDatos = =>
        url = (new URL window.location.href).pathname.toString()
        patron = /\/(ep|ova)(\d+)$/
        res = patron.exec url

        if res?
            [
                if res[1] is "ova" then true else false
                res[2]
            ]
        else []

    export default
        name: "VerAnimeLegacy"
        components: { reproductor, descarga, comentarios, publicidad }
        computed:
            anchoPantalla: ->
                ev = @$store.state.datos.resizeEvent
                window.innerWidth
            esMovil: -> @anchoPantalla < 780
            etiqueta: ->
                (if @$store.state.verAnime.esOva is true then "Ova" else "Episodio") + " " +
                    @$store.state.verAnime.ep
        beforeRouteUpdate: (to, from, next) ->
            @$store.commit "cambiarNumEp", parseInt to.params.ep
            next()
        mounted: ->
            @$store.commit "activarVerAnime"
            res = extraerDatos()
            if res.length isnt 0
                [esOva, numEp] = res
                @$store.commit "cambiarDatosVerAnime",
                    nombre: ""
                    esOva: esOva
                    ep: parseInt numEp
                    ruta: ""
            else

        beforeDestroy: ->
            @$store.commit "desactivarVerAnime"
    #
    
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .label_episodio
        color: var(--texto1)
        font:
            family: Roboto, sans-serif
            weight: normal
            size: x-large
        padding-bottom: 30px
        padding-left: 15px

    .cont
        grid-template-columns: 1fr 250px

    .fondo
        @extend %caja-textos
        padding-left: 5px
        padding-right: 5px
        background-color: var(--fondo2)

    @media only screen and (max-width: 780px)
        .cont
            grid-template-columns: none

    @media only screen and (max-width: 450px)
        .contenedor
            width: 96%

    //
</style>

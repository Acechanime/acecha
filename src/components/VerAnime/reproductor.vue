<template lang="pug">
    div.reproductor-repifr
        ul.opciones-repifr(v-if="opciones.length > 1")
            opcion(v-for="(op, i) in opciones" :opcion="op" :pos="i" :key="i"
                :largo="opciones.length" :posActiva="posActiva"
                :cambiarOpcion="cambiarOpcion")

        template(v-if="opciones.length !== 0")
            acecha-reproductor(v-if="posActiva === 0 && epActual.id" :urlVideo="urlVideoEp" :key="epActual.id")
            video-player.reproductor-repifr-js(v-if="posActiva === 1 && epActual.id"
                :options="opcionesVideoJs" :key="epActual.id"
                @play="registrarVista($event)"
            )
            div#contenedor-anime.contenedor-video-repifr(v-show="mostrarReproductoresSecundarios")

        template(v-else-if="opciones.length === 0 && !epActual.id")
            br
            p Recuperando los servidores...
            br
        template(v-else)
            br
            p No hay servidores disponibles.
            br

        controles(
            :listaEps="listaEps"
            :epActual="epActual"
            :numEp="numEp? numEp: -1"
            :esOva="!!esOva"
        )

    //
</template>

<script lang="coffee">
    import opcion from "./opcion.vue"
    import acechaReproductor from "./acecha-reproductor.vue"
    import controles from "./reproductor/controles.vue"
    import 'video.js/dist/video-js.css'
    import { impr, servidor } from "../../coffee/variables.coffee"

    obtenerIframe = => new Promise (resolve) =>
        intervalo = setInterval (=>
            el = document.getElementById "iframe-anime"
            if el?
                clearInterval intervalo
                resolve el
        ), 100


    export default
        name: "reproductor"
        components: { opcion, acechaReproductor, controles }
        data: ->
            posActiva: 0
            videoIniciado: false
        watch:
            posActiva: (n) ->
                unless n is 0
                    ifr = document.getElementById "iframe-anime"
                    ifr.contentWindow.location.replace @linkActivo
            epActual: ->
                vm = this
                @posActiva = 0
                intervalo = setInterval (=>
                    if (document.getElementById "contenedor-anime")?
                        cont = document.getElementById "contenedor-anime"
                        try
                            cont.removeChild cont.childNodes[0]
                        ifr = document.createElement "iframe"
                        ifr.className = "video-iframe-acecha"
                        ifr.id = "iframe-anime"
                        ifr.src = @linkActivo
                        ifr.allowFullscreen = yes
                        ifr.marginWidth = "0"
                        ifr.frameBorder = "0"
                        cont.appendChild ifr
                        ifr.style.opacity = "0"
                        setInterval (=>
                            ifr.style.opacity = "1"
                        ), 150
                        clearInterval intervalo
                ), 50
        computed:
            mostrarReproductorExp: -> @$store.state.datos.mostrarReproductorExp
            mostrarReproductoresSecundarios: ->
                if @mostrarReproductorExp then @posActiva != 0 && @posActiva != 1
                else @posActiva != 0
            listaEps: -> @$store.state.reproductor.episodios
            epActual: -> @$store.state.reproductor.epActual
            numEp: -> @epActual.numero
            esOva: -> @epActual.es_ova
            idAnimeActual: -> @$store.state.datos.animeActual.id
            urlVideoEp: -> "#{servidor}/animes/#{@idAnimeActual}/episodios/#{@epActual.id}/stream"
            opciones: ->
                opciones = []

                if @epActual.id?
                    opciones.push [
                        "acecha1"
                        @urlVideoEp
                    ]

                    opciones.push [
                        "acecha2"
                        @urlVideoEp
                    ]

                if @epActual?.fembed? and @epActual.fembed isnt ""
                    opciones.push ["fembed", @epActual.fembed]
                if @epActual?.yourupload? and @epActual.yourupload isnt ""
                    opciones.push ["yourupload", @epActual.yourupload]
                if @epActual?.mp4upload? and @epActual.mp4upload isnt ""
                    opciones.push ["mp4upload", @epActual.mp4upload]

                opciones
            opcionesVideoJs: ->
                precargarVideo =
                    if @$store.state.datos.precargarVideo == true then "auto"
                    else "metadata"
                if @epActual.id?
                    controls: true
                    preload: precargarVideo
                    sources: [{
                        type: "video/mp4"
                        src: @opciones[0][1]
                    }]
                    fluid: true
                    language: "es"
                    notSupportedMessage: "Este episodio no está soportado. Escribenos a nuestro Discord."

                else {}
            linkActivo: -> @opciones?[@posActiva]?[1]?.replace "mega.nz/", "mega.nz/embed"

        methods:
            cambiarOpcion: (num) ->
                @posActiva = num

            registrarVista: (reproductor) ->
                unless @videoIniciado
                    @videoIniciado = true
                    nombre = @$store.state.datos.animeActual?.nombre ? "-"
                    @$gtag.event "reproducción",
                        'event_category': "reproductor"
                        'event_label': "Reproducción de #{ nombre }"

        mounted: ->
            intervalo = setInterval((() =>
                if (document.getElementById "contenedor-anime")?
                    cont = document.getElementById "contenedor-anime"
                    try
                        cont.removeChild cont.childNodes[0]
                    ifr = document.createElement "iframe"
                    ifr.className = "video-iframe-acecha"
                    ifr.id = "iframe-anime"
                    ifr.src = @linkActivo
                    ifr.allowFullscreen = yes
                    ifr.marginWidth = "0"
                    ifr.frameBorder = "0"
                    cont.appendChild ifr
                    ifr.style.opacity = "0"
                    setInterval (=>
                        ifr.style.opacity = "1"
                    ), 150
                    clearInterval intervalo
            ), 50)

#
</script>

<style lang="sass">
    @import "../../sass/variables"

    .reproductor-repifr
        width: 100%
        text-decoration: none !important


    #contenedor-anime
        border-radius: 0 5px 5px 5px


    .controles2-repifr
        display: grid
        grid-template-columns: calc((100% - 9rem) / 2) 9rem calc((100% - 9rem) / 2)
        .mizq-repifr
            text-align: left
        .mcentro-repifr
            text-align: center
            a
                text-decoration: none !important
        .mder-repifr
            text-align: right


    .boton-repifr
        display: inline-table
        background-color: #2e3437
        padding: 0 10px
        color: #eaeaea
        cursor: pointer
        text-transform: uppercase
        border-radius: 5px
        height: 44px
        transition: background-color 100ms linear

        i
            display: table-cell
            vertical-align: middle
        span
            display: table-cell
            vertical-align: middle
            font-size: 15px


    .boton--desactivado
        background-color: #dbdbdb !important
        color: #767676


    .boton-repifr--eps
        width: auto
        background-color: #e46a69
        text-decoration: none
        &:hover
            background-color: #c75857


    .boton-repifr--ir
        background-color: #d93e3c
        &:hover
            background-color: #b62f2d


    .contenedor-video-repifr
        position: relative
        padding-bottom: 56.25%
        height: 0
        overflow: hidden
        background-color: black

        .video-iframe-acecha
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%


    .opciones-repifr
        list-style-type: none


    @media only screen and (max-width: $anchoMovil)
        .ocultarMovil-repifr
            display: none !important

        // .reproductor-repifr-js
        //     position: sticky
        //     top: 0

    //
</style>

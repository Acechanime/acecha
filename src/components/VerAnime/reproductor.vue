<template lang="pug">
    div.reproductor-repifr
        ul.opciones-repifr(v-if="opciones.length > 1")
            opcion(v-for="(op, i) in opciones" :opcion="op" :pos="i" :key="i"
                :largo="opciones.length" :posActiva="posActiva"
                :cambiarOpcion="cambiarOpcion")

        template(v-if="opciones.length !== 0")
            div#contenedor-anime.contenedor-video-repifr(v-show="posActiva !== 0")

            // video.reproductor(v-if="posActiva === 0 && epActual.id"
            //     controls
            //     :key="epActual.id"
            // )
            //     source(:src="opciones[0][1]" type="video/mp4")

            video-player.reproductor-repifr(v-if="posActiva === 0 && epActual.id"
                :options="opcionesVideoJs" :key="epActual.id"
            )

            // div.video-player-box(
            //     v-if="posActiva === 0 && epActual.id"
            //     :playsinline="true"
            //     v-video-player:myVideoPlayer="opcionesVideoJs"
            // )

            br
        template(v-else-if="opciones.length === 0 && !epActual.id")
            br
            p Recuperando los servidores...
            br
        template(v-else)
            br
            p No hay servidores disponibles.
            br

        div.controles2-repifr
            div.mizq-repifr
                router-link.boton-repifr.boton-repifr--eps(:to="epAnterior"
                    :class="epAnterior === ''? 'boton--desactivado': ''"
                )
                    i.material-icons chevron_left
                    span.ocultarMovil-repifr Anterior
            div.mcentro-repifr
                router-link.boton-repifr.boton-repifr--ir(to="./")
                    span Ver capítulos
            div.mder-repifr
                router-link.boton-repifr.boton-repifr--eps(:to="epSiguiente"
                    :class="epSiguiente === ''? 'boton--desactivado': ''"
                )
                    span.ocultarMovil-repifr Siguiente
                    i.material-icons chevron_right

    //
</template>

<script lang="coffee">
    import opcion from "./opcion.vue"
    import 'video.js/dist/video-js.css'
    import { impr, servidor } from "../../coffee/variables.coffee"
    import { videoPlayer } from 'vue-video-player'

    obtenerIframe = => new Promise (resolve) =>
        intervalo = setInterval (=>
            el = document.getElementById "iframe-anime"
            if el?
                clearInterval intervalo
                resolve el
        ), 100


    export default
        name: "reproductor"
        components: { opcion, videoPlayer }
        data: ->
            posActiva: 0
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
            listaEps: -> @$store.state.reproductor.episodios
            epActual: -> @$store.state.reproductor.epActual
            numEp:    -> @epActual.numero
            esOva:    -> @epActual.es_ova

            epTexto: -> "./#{if @esOva then 'ova' else 'ep'}"
            epSiguiente: ->
                numEpActual = @numEp
                esOva = @esOva

                existeEpSiguiente = @listaEps.find (a) =>
                    (a.numero == numEpActual + 1) && (a.es_ova == esOva)

                if existeEpSiguiente?
                    @epTexto + "#{numEpActual + 1}"
                else
                    ""

            epAnterior: ->
                numEpActual = @numEp
                esOva = @esOva

                existeEpAnterior = @listaEps.find (a) =>
                    (a.numero == numEpActual - 1) && (a.es_ova == esOva)

                if existeEpAnterior?
                    @epTexto + "#{numEpActual - 1}"
                else
                    ""

            opciones: ->
                opciones = []

                idAnimeActual = @$store.state.datos.animeActual.id
                if @epActual.id?
                    opciones.push [
                        "acecha"
                        "#{servidor}/animes/#{idAnimeActual}/episodios/#{@epActual.id}/stream"
                    ]

                if @epActual?.fembed? and @epActual.fembed isnt ""
                    opciones.push ["fembed", @epActual.fembed]
                if @epActual?.yourupload? and @epActual.yourupload isnt ""
                    opciones.push ["yourupload", @epActual.yourupload]
                if @epActual?.mp4upload? and @epActual.mp4upload isnt ""
                    opciones.push ["mp4upload", @epActual.mp4upload]

                opciones
            opcionesVideoJs: ->
                if @epActual.id?
                    controls: true
                    preload: "auto"
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

    .reproductor-repifr
        width: 100%


    #contenedor-anime
        border-radius: 0 5px 5px 5px

    .controles2-repifr
        display: grid
        grid-template-columns: auto auto auto
        .mizq-repifr
            text-align: left
        .mcentro-repifr
            text-align: center
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

    .boton--desactivado-repifr
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


    @media only screen and (max-width: 500px)
        .ocultarMovil-repifr
            display: none !important

    //
</style>

<template lang="pug">
    div.reproductor
        ul.opciones(v-if="opciones.length > 1")
            opcion(v-for="(op, i) in opciones" :opcion="op" :pos="i" :key="i"
                :largo="opciones.length" :posActiva="posActiva"
                :cambiarOpcion="cambiarOpcion")

        template(v-if="opciones.length !== 0")
            div#contenedor-anime.contenedor-video(v-show="posActiva !== 0")
            // video.reproductor(v-if="posActiva === 0 && links.episodio_id"
            //     controls
            //     :key="links.episodio_id"
            // )
            //     source(:src="opciones[0][1]" type="video/mp4")
            video-player.reproductor(v-if="posActiva === 0 && links.episodio_id" 
                :options="opcionesVideoJs" :key="links.episodio_id"
            )

            br
        template(v-else-if="opciones.length === 0 && !links.anime_id")
            br
            p Recuperando los servidores...
            br
        template(v-else)
            br
            p No hay servidores disponibles.
            br

        div.controles2
            div.mizq
                router-link.boton.boton--eps(:to="epAnterior"
                    :class="epAnterior === ''? 'boton--desactivado': ''"
                )
                    i.material-icons chevron_left
                    span.ocultarMovil Anterior
            div.mcentro
                router-link.boton.boton--ir(to="./")
                    span Ver capítulos
            div.mder
                router-link.boton.boton--eps(:to="epSiguiente"
                    :class="epSiguiente === ''? 'boton--desactivado': ''"
                )
                    span.ocultarMovil Siguiente
                    i.material-icons chevron_right

    //
</template>

<script lang="coffee">
    import opcion from "./opcion.vue"
    import {impr} from "../../variables"

    import 'video.js/dist/video-js.css'
    # import "./estilo.scss"
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
            links: ->
                vm = this
                @posActiva = 0
                intervalo = setInterval((=>
                    if (document.getElementById "contenedor-anime")?
                        cont = document.getElementById "contenedor-anime"
                        try
                            cont.removeChild cont.childNodes[0]
                        ifr = document.createElement "iframe"
                        ifr.className = "video"
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

        computed:
            listaEps: -> @$store.state.verAnime.listaEpisodios
            numEp: -> @$store.state.verAnime.ep
            esOva: ->
                ruta = @$route.path
                posInicioIndicador = ruta.substr(1).indexOf("/")
                indicador = ruta.substr (1 + posInicioIndicador)
                (indicador.search "ova") isnt -1

            links: ->
                res =
                    if @listaEps.length isnt 0 and @numEp? and @numEp isnt -1
                        vm = this
                        esOva = @esOva
                        (@listaEps.find (a) -> (a.num_ep is vm.numEp) and (a.es_ova is esOva)) ? {}
                    else {}
                res

            epTexto: -> "./#{if @esOva then 'ova' else 'ep'}"
            epSiguiente: ->
                numEpActual = @links.num_ep
                esOva = @esOva
                existeEpSiguiente = @listaEps.find (anime) =>
                    (anime.num_ep is (numEpActual + 1)) and (anime.es_ova is esOva)
                if existeEpSiguiente?
                    @epTexto + "#{numEpActual + 1}"
                else
                    ""
            epAnterior: ->
                numEpActual = @links.num_ep
                esOva = @$store.state.verAnime.esOva
                existeEpAnterior = @listaEps.find (anime) =>
                    (anime.num_ep is (numEpActual - 1)) and (anime.es_ova is esOva)
                if existeEpAnterior?
                    @epTexto + "#{numEpActual - 1}"
                else
                    ""
            opciones: ->
                opciones = []

                opciones.push ["acecha", "https://api.acechanime.com/stream?id=#{@links.episodio_id}"]
                if @links?.fembed? and @links.fembed isnt ""
                    opciones.push ["fembed", @links.fembed]
                if @links?.yourupload? and @links.yourupload isnt ""
                    opciones.push ["yourupload", @links.yourupload]
                if @links?.mp4upload? and @links.mp4upload isnt ""
                    opciones.push ["mp4upload", @links.mp4upload]

                opciones
            opcionesVideoJs: ->
                if @links.episodio_id?
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
                    ifr.className = "video"
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

<style scoped lang="sass">
    @import "../../sass/variables"

    .reproductor
        width: 100%


    #contenedor-anime
        border-radius: 0 5px 5px 5px

    .controles2
        display: grid
        grid-template-columns: auto auto auto
        .mizq
            text-align: left
        .mcentro
            text-align: center
        .mder
            text-align: right

    .boton
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



    .boton--eps
        width: auto
        background-color: #e46a69
        text-decoration: none
        &:hover
            background-color: #c75857

    .boton--ir
        background-color: #d93e3c
        &:hover
            background-color: #b62f2d

    .izq
        float: left

    // .der
        float: right

    .contenedor-video
        position: relative
        padding-bottom: 56.25%
        height: 0
        overflow: hidden
        background-color: black

        .video
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%

    .opciones
        list-style-type: none

    @media only screen and (max-width: 500px)
        .ocultarMovil
            display: none !important

    //
</style>
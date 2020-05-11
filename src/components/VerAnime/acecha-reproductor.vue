<template lang="pug">
    div
        p Cargando... {{ anchoContenedor }}

    //
</template>

<script lang="coffee">
    import { cargarAds } from "../../assets/ads/ads.js"

    export default
        name: "acecha-reproductor"
        data: ->
            anchoContenedor: -1
        props:
            urlVideo:
                type: String
                required: true
        computed:
            precargarVideo: -> if @$store.state.datos.precargarVideo then "auto" else "metadata"
            opciones: -> JSON.stringify
                controls: true
                preload: @precargarVideo
                sources: [{
                    type: "video/mp4"
                    src: @urlVideo
                }]
                fluid: true
                language: "es"
                notSupportedMessage: "Este episodio no está soportado. Escribenos a nuestro Discord."
            anchoContenedorG: ->
                _ = @$store.state.datos.resizeEvent
                @calcularAnchoContenedor()
                0
        methods:
            montarElemVideo: ->
                elemVideo = document.createElement "video"
                elemVideo.className = "video-js acecha-rep vjs-default-skin vjs-fluid"
                elemVideo.id = "content_video"
                elemVideo.controls = true
                elemVideo.preload = @precargarVideo
                elemVideo["data-setup"] = "#{ @opciones }"

                sourceElem = document.createElement "source"
                sourceElem.src = @urlVideo
                sourceElem.type = "video/mp4"

                elemVideo.appendChild sourceElem
                @$el.removeChild @$el.firstChild
                @$el.appendChild elemVideo

                reproductor = videojs elemVideo
                cargarAds reproductor

            esperarCargaVideoJs: ->
                vm = this
                intervalo = setInterval (=>
                    if window.videojs? && vm.anchoContenedor != -1
                        clearInterval intervalo
                        @montarElemVideo()

                ), 250
            calcularAnchoContenedor: ->
                @anchoContenedor = @$el.offsetWidth
        mounted: ->
            @calcularAnchoContenedor()
            @esperarCargaVideoJs()


#
</script>

<style lang="sass">

    .acecha-reproductor
        display: block !important


    .acecha-rep
        width: 100%
        .video-js
            height: auto !important

    
    //
</style>
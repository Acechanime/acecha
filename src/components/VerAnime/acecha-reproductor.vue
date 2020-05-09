<template lang="pug">
    div.acecha-reproductor
        // video.acecha-rep(:preload="precargarVideo" controls)
            source(:src="urlVideo" type="video/mp4")
            p Tu navegador no soporta videos HTML. Usa un navegador actualizado, por favor.
        // video#content_video.video-js.acecha-rep(controls preload="auto" data-setup="{}")
            source(:src="urlVideo" type='video/mp4')
            p.vjs-no-js
                | To view this video please enable JavaScript, and consider upgrading to a web browser that
                a(href="http://videojs.com/html5-video-support/" target="_blank") supports HTML5 video


    //
</template>

<script lang="coffee">
    import videojs from "video.js"
    import { cargarAds } from "../../assets/ads/ads.js"
    import "../../assets/ads/videojs.ima.css"

    export default
        name: "acecha-reproductor"
        props:
            urlVideo:
                type: String
                required: true
        computed:
            precargarVideo: -> if @$store.state.datos.precargarVideo then "auto" else "metadata"
        methods:
            montarElemVideo: ->
                elemVideo = document.createElement "video"
                elemVideo.className = "video-js acecha-rep"
                elemVideo.id = "content_video"
                elemVideo.controls = true
                elemVideo.preload = @precargarVideo
                elemVideo["data-setup"] = "{}"

                sourceElem = document.createElement "source"
                sourceElem.src = @urlVideo
                sourceElem.type = "video/mp4"

                elemVideo.appendChild sourceElem
                @$el.appendChild elemVideo
        mounted: ->
            @montarElemVideo()
            cargarAds videojs


#
</script>

<style lang="sass">

    .acecha-reproductor
        display: block !important


    .acecha-rep
        width: 100%
        height: auto
        video
            width: 100% !important
            height: auto !important

    
    //
</style>
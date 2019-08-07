<template lang="pug">
    div
        ul.opciones
            opcion(v-for="(opcion, i) in opciones" :opcion="opcion" :pos="i" :key="i"
                :largo="opciones.length" :posActiva="posActiva"
                :cambiarOpcion="cambiarOpcion")
        div#contenedor-anime.contenedor-video
        p activo -> {{ linkActivo }}
    //
</template>

<script lang="coffee">
    import opcion from "./opcion.vue"

    export default
        name: "reproductor"
        components: { opcion }
        props:
            links:
                type: Object
                required: true
        data: ->
            posActiva: 0
        watch:
            posActiva: ->
                ifr = document.getElementById "iframe-anime"
                ifr.contentWindow.location.replace @linkActivo
            links: ->
                vm = this
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
                        clearInterval intervalo
                ), 250)

        computed:
            opciones: ->
                opciones = []
                if @links?.mega?        then opciones.push [ "mega", @links.mega ]
                if @links?.rapidvideo?  then opciones.push [ "rapidvideo", @links.rapidvideo ]
                if @links?.mango?       then opciones.push [ "mango", @links.mango ]
                if @links?.mp4upload?   then opciones.push [ "mp4upload", @links.mp4upload ]
                if @links?.okru?        then opciones.push [ "okru", @links.okru ]
                opciones
            linkActivo: -> @opciones?[@posActiva]?[1]?.replace "mega.nz/", "mega.nz/embed"
        methods:
            cambiarOpcion: (num) ->
                @posActiva = num
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .contenedor-video
        position: relative
        padding-bottom: 56.25%
        height: 0
        overflow: hidden

        .video
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%

    .opciones
        list-style-type: none

    //
</style>
<template lang="pug">
    div.reproductor
        ul.opciones
            opcion(v-for="(opcion, i) in opciones" :opcion="opcion" :pos="i" :key="i"
                :largo="opciones.length" :posActiva="posActiva"
                :cambiarOpcion="cambiarOpcion")
        div#contenedor-anime.contenedor-video
        div.controles
            a.izq.boton.boton--eps
                i.material-icons chevron_left
                span Anterior
            a.boton.boton--ir
                span Ver capítulos
            a.der.boton.boton--eps
                span Siguiente
                i.material-icons chevron_right

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
                @posActiva = 0
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

        computed:
            opciones: ->
                opciones = []
                if @links?.mega? and @links.mega isnt ""
                    opciones.push ["Mega", @links.mega]
                if @links?.rapidvideo? and @links.rapidvideo isnt ""
                    opciones.push ["RapidVideo", @links.rapidvideo]
                if @links?.mango? and @links.mango isnt ""
                    opciones.push ["Mango", @links.mango]
                if @links?.mp4upload? and @links.mp4upload isnt ""
                    opciones.push ["MP4Upload", @links.mp4upload]
                if @links?.okru? and @links.okru isnt ""
                    opciones.push ["Okru", @links.okru]
                opciones
            linkActivo: -> @opciones?[@posActiva]?[1]?.replace "mega.nz/", "mega.nz/embed"

        methods:
            cambiarOpcion: (num) ->
                @posActiva = num
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .reproductor
        margin-top: -44px

    #contenedor-anime
        border-radius: 0 10px 10px 10px

    .controles
        margin: 10px 10px
        text-align: center

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

    .boton--eps
        background-color: #e46a69
        &:hover
            background-color: #c75857

    .boton--ir
        background-color: #d93e3c
        &:hover
            background-color: #b62f2d

    .izq
        float: left

    .der
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

    //
</style>
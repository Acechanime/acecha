<template lang="pug">
    div.contenedor.video-rec
        div.fullvideo
            h2.fullvideo__title ¡Video Recomendado!
            div.video(v-if="linkVideo !== ''")
                iframe(:src="linkVideo" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen="")
            div.err(v-if="cargaFallida")
                span.
                    Hubo un error al cargar el video recomendado.<br>
                    Vuelve en unos minutos, o escribenos en Discord.<br>
                p.tech Código de error: 0x{{ codigoDeError }}
    //
</template>

<script lang="coffee">
    import { manejarError } from "./manejo-errores.coffee"

    export default
        name: "video-recomendado"
        data: ->
            linkVideo: ""
            cargaFallida: no
            codigoDeError: ""
        props:
            terminarCarga:
                type: Function
                required: true
        created: ->
            vm = this

            try
                xhr = await fetch "/static/video-recomendado"
                res = await xhr.text()

                if res.length <= 50
                    vm.linkVideo = res
                else
                    manejarError "Se cargó el link del video recomendado, pero es inválido.", "F2", vm
            catch e
                manejarError e, "F3", vm
            @terminarCarga()
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    html:root
        --esposible: 20px

    .video-rec
        text-align: center

    .fullvideo__title
        font:
            weight: 900
            size: 43px
            family: $texto

        margin: 32px 0
        text-transform: uppercase
        text-align: center

    .fullvideo
        padding-top: 48px
        max-width: 900px
        margin: auto
        .video
            position: relative
            width: 100%
            height: 0
            padding-bottom: 56.25%
            margin: auto
            iframe
                position: absolute
                top: 0
                left: 0
                margin: auto
                width: 100%
                height: 100%



    //
</style>
<template lang="pug">
    div.imgPrin
        div.contenido(:style="estiloAlto")
            div.m-contenedor
                div.txt
                    div.titulo {{ titulo }}
                    br
                    span.motto(v-if="mostrarExtra") Te damos el amor que no te da él/ella
                    // br
                    // br
                    // br
                    // div.boton Compatible para
        div.img(:style="[estiloAlto, estiloCabecera]")
    //
</template>

<script lang="coffee">

    #: [(Num, Txt)] -> Txt
    comparar = (valores) =>
        num = Math.random()
        nuevaImg = "/img/portada/you-kei.webp"
        for [valor, img] in valores
            if num <= valor
                nuevaImg = "/img/portada/" + img + ".webp"
                break

        nuevaImg


    escogerImg = =>
        num = Math.random()
        valores = [
            [0.01, "you-kei"]
            [0.06, "gate"]
            [0.12, "ichigo-maybe"]
            [0.18, "kabaneri"]
            [0.30, "loli-random"]
            [0.36, "random-girl"]
            [0.42, "random-girl-2"]
            [0.48, "random-girl-3"]
            [0.54, "random-girl-4"]
            [0.60, "re-zero"]
            [0.72, "tsuki-ga-kirei"]
            [0.78, "uan-pis"]
            [0.89, "tamako_mainVisual_edit"]
            [1, "k-on_cover"]
        ]
        comparar valores

    export default
        name: "imagen-principal"
        data: ->
            cabecera: escogerImg()
        props:
            alto:
                type: Number
                default: 40
            titulo:
                type: String
                default: "AcechaAnime"
        computed:
            estiloAlto: -> {height: "#{ @alto }rem"}
            estiloCabecera: -> { background: "url('#{ @cabecera }') center center" }
            mostrarExtra: -> @titulo is "AcechaAnime"


#
</script>

<style scoped lang="sass">

    $altoImg: 40rem

    .imgPrin
        position: relative
        height: 150%


    .contenido
        position: relative
        z-index: 2
        // height: $altoImg
        .m-contenedor
            padding: 120px 0
            height: 100%
            width: 100%
            display: inline-table
        .txt
            display: table-cell
            vertical-align: middle
            text-align: center
            color: white
            .titulo
                font:
                    size: 67px
                    weight: 700
            .boton
                display: inline-block
                border-radius: 50px
                padding: 15px 33px
                background-color: #e91e63
                text-transform: uppercase
                font-size: 12px
                cursor: pointer
                user-select: none

    .img
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        z-index: 1
        background-size: cover !important
        // height: $altoImg
        &::before
            background-color: rgba(0, 0, 0, 0.6) !important
        &:before
            z-index: -1
            display: block
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            content: ""

    @media only screen and (max-width: 500px)
        .titulo
            font-size: 47px !important

    //
</style>
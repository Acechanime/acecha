<template lang="pug">
    div.imgPrin
        div.contenido(:style="estiloAlto")
            div.m-contenedor
                div.txt
                    h1.titulo {{ titulo }}
                    span.motto(v-if="mostrarExtra")
                        | Te damos el amor que no te da él/ella
                        // span(style="font-family: icomoon !important;") &#xE9DA;
                    // br
                    // br
                    br
                    div.botones-cuenta(v-if="mostrarBotonesLogin")
                        router-link.boton-inicio-sesion(to="/login/") Inicia Sesión
                        router-link.boton-registro(to="/registro/") Regístrate

                    // br
                    // br
                    // br
                    // div.boton Compatible para
        div.img(:style="[estiloAlto, estiloCabecera]")

    //
</template>

<script lang="coffee">
    import { escogerImg } from "../App/imagen-principal.coffee"

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
            mostrarBotonesLogin: ->
                (@$route.path == "/") && !@$store.state.usuario.usuarioActual?.id?


#
</script>

<style scoped lang="sass">

    $altoImg: 40rem

    .botones-cuenta
        a
            margin: 0.5rem 1rem
            padding: 0.5rem 0.75rem
            border-radius: 3px
            border: none
            background-color: white
            user-select: none
            text-decoration: none
            font-family: "Product Sans", sans-serif
        .boton-registro
            background-color: var(--first-color)
            color: white
        .boton-inicio-sesion
            color: #3a3a3a
            background-color: white


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
                color: inherit
                font:
                    size: 67px
                    weight: 700
            .motto
                color: inherit
                &::after
                    padding-left: 0.5rem
                    content: "favorite"
                    color: #f44336
                    font-family: "Material Icons" !important

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
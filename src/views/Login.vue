<template lang="pug">
    div.login
        div.contenido
            div.contenedor-login
                inicio-sesion(v-if="esLogin" :cambiarARegistro="cambiarARegistro")
                registro(v-else :cambiarALogin="cambiarALogin")

        div.img(:style="estiloCabecera")

    //
</template>

<script lang="coffee">
    import inicioSesion from "../components/Login/inicio-sesion.vue"
    import registro from "../components/Login/registro.vue"
    import { escogerImg } from "../components/App/imagen-principal.coffee"


    export default
        name: "Login"
        components: { inicioSesion, registro }
        data: ->
            esLogin: @$route.path == "/login/"
            cabecera: escogerImg()
        computed:
            estiloCabecera: ->
                background: "url('#{ @cabecera }') center center"
                height: "100%"
        methods:
            cambiarALogin: -> @esLogin = true
            cambiarARegistro: -> @esLogin = false


#
</script>

<style scoped lang="sass">

    .login
        position: fixed
        top: 0
        left: 0
        height: 100%
        width: 100%


    .contenido
        position: relative
        z-index: 2
        height: 100%
        width: 100%
        display: table
        // height: $altoImg


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


    .contenedor-login
        text-align: center
        color: var(--texto1)
        display: table-cell
        vertical-align: middle


    .titulo-login
        font-family: "Product Sans", sans-serif


    @media only screen and (max-width: 600px)
        .login
            font-size: 14px


    //
</style>
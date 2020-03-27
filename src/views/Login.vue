<template lang="pug">
    div.login
        div.contenido
            div.contenedor-login
                inicio-sesion(v-if="esLogin" :cambiarARegistro="cambiarARegistro")
                registro(v-else :cambiarALogin="cambiarALogin")

        div.img

    //
</template>

<script lang="coffee">
    import inicioSesion from "../components/Login/inicio-sesion.vue"
    import registro from "../components/Login/registro.vue"

    export default
        name: "Login"
        components: { inicioSesion, registro }
        data: ->
            esLogin: true
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
        padding-top: 5rem
        color: var(--texto1)


    .titulo-login
        font-family: "Product Sans", sans-serif


    //
</style>
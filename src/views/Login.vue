<template lang="pug">
    div
        div.separador
        div.contenedor-login
            inicio-sesion
            registro

    //
</template>

<script lang="coffee">
    import inicioSesion from "../components/Login/inicio-sesion.vue"
    import registro from "../components/Login/registro.vue"

    export default
        name: "Login"
        components: { inicioSesion, registro }


#
</script>

<style scoped lang="sass">

    .contenedor-login
        text-align: center
        padding-top: 5rem
        color: var(--texto1)


    .titulo-login
        font-family: "Product Sans", sans-serif


    //
</style>
<template lang="pug">
    div.contenedor
        div.grid
            div.cont
                buscador
                animes
            div.publicidad
                publicidad
    //
</template>

<script lang="coffee">
    import publicidad from "../components/Animes/publicidad.vue"
    import buscador from "../components/Animes/buscador.vue"
    import animes from "../components/Animes/animes.vue"
    import YAML from "yaml"

    export default
        name: "Animes"
        components:
            publicidad: publicidad
            buscador: buscador
            animes: animes

    #
</script>

<style scoped lang="sass">

    .grid
        margin: 48px 0
        display: grid
        grid-template-columns: 1fr 250px
        grid-gap: 2rem

    //
</style>
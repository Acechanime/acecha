<template lang="pug">
    div.contenedor.animes
        div.separador
        div.grid
            div.cont
                buscador(:filtrosFn="filtrosFn")
                animes(:filtros="filtros")
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
        data: ->
            filtros:
                nombre: ""
            filtrosFn:
                nombre: @aplicarFiltroNombre
        components:
            publicidad: publicidad
            buscador: buscador
            animes: animes
        methods:
            aplicarFiltroNombre: (nombre) ->
                console.log "anuma v:"
                @filtros.nombre = nombre
        mounted: ->
            @$store.commit "terminarCargaPagina"

    #
</script>

<style scoped lang="sass">

    .animes
        background-color: var(--fondo1)

    .grid
        margin: 48px 0
        display: grid
        grid-template-columns: 1fr 250px
        grid-gap: 2rem

    //
</style>
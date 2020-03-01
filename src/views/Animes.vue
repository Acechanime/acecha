<template lang="pug">
    div.contenedor.animes
        div.separador
        div.grid
            div.cont
                buscador(:cambiarFiltro="cambiarFiltro" :cambiarFunOrden="cambiarFunOrden")
                animes(:filtro="filtro" :funOrden="funOrden" :terminarCargaFn="terminarCarga")
            div.publicidad
                publicidad
    //
</template>

<script lang="coffee">
    import publicidad from "../components/publicidad.vue"
    import buscador from "../components/Animes/buscador.vue"
    import animes from "../components/Animes/animes.vue"

    filtroBase = => 1

    export default
        name: "Animes"
        components: { publicidad, buscador, animes }
        data: ->
            filtro: filtroBase
            funOrden: (x, y) => -1
        methods:
            cambiarFiltro: (f) ->
                @filtro = f
            cambiarFunOrden: (f) ->
                @funOrden = f
            
            terminarCarga: -> @$store.commit "terminarCargaPagina"

#
</script>

<style scoped lang="sass">

    .animes
        background-color: var(--fondo1)

    .grid
        // margin: 48px 0
        display: grid
        grid-template-columns: 1fr auto
        grid-gap: 2rem

    @media only screen and (max-width: 500px)
        .publicidad
            display: none

        .grid
            display: block
            // grid-template-columns: repeat(1, 1fr)

    //
</style>
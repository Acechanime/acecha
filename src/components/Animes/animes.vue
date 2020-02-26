<template lang="pug">
    div.gridIn
        anime(v-for="anime in listaAnimesFiltrada2" :key="anime.anime_id" :anime="anime")
    //
</template>

<script lang="coffee">
    import anime from "./anime.vue"
    import { comp, filtrar } from "./buscador.coffee"


    export default
        name: "animes"
        components:
            anime: anime
        props:
            filtro:
                type: Function # (Contexto, Anime) -> Prioridad
                required: true
            funOrden:
                type: Function # 'A -> 'B -> Num
                required: true
            terminarCargaFn:
                type: Function
                required: true
        computed:
            listaAnimes: -> @$store.state.datos.listaAnimes
            listaAnimesFiltrada2: ->
                if @listaAnimes isnt undefined
                    @terminarCargaFn()
                    primerRes = filtrar @, @listaAnimes, @filtro
                    primerRes.sort @funOrden

                else []

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .gridIn
        display: grid
        grid-template-columns: repeat(4, 21.25%)
        grid-column-gap: 5%
        grid-row-gap: 1.5rem

    @media only screen and (max-width: 500px)
        .gridIn
            grid-template-columns: repeat(2, 1fr)
            grid-gap: 1rem

    //
</style>

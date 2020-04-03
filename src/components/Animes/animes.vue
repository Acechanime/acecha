<template lang="pug">
    div
        // p {{ numeroDeAnimes }}
        div.gridIn
            anime(v-for="anime in listaAnimesFiltrada2" :key="anime.anime_id" :anime="anime")

    //
</template>

<script lang="coffee">
    import anime from "./anime.vue"
    import { comp, filtrar } from "../../coffee/buscador.coffee"

    numeroDeFilas = 4

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
            listaAnimes: -> @$store.state.datos.animes

            listaAnimesFiltrada2: ->
                # @terminarCargaFn()
                primerRes = filtrar @, @listaAnimes, @filtro
                primerRes.sort @funOrden

            anchoPantalla: ->
                if process.client == false then return 501

                @$store.state.datos.resizeEvent
                window.innerWidth

            numeroDeAnimes: ->
                ancho = @anchoPantalla
                numeroDeColumnas = do ->
                    if ancho > 1440 then 5
                    else if ancho > 500 then 4
                    else 2
                numeroDeFilas * numeroDeColumnas

            listaAnimesFiltrada3: -> @listaAnimesFiltrada2.slice 0, @numeroDeAnimes


#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .gridIn
        display: grid
        grid-template-columns: repeat(5, 18.4%)
        grid-column-gap: 2%
        grid-row-gap: 1.5rem
        grid-template-rows: repeat(2, auto)
        overflow: hidden


    @media only screen and (max-width: 1440px)
        .gridIn
            grid-template-columns: repeat(4, 21.25%)
            grid-column-gap: 5%


    @media only screen and (max-width: 500px)
        .gridIn
            grid-template-columns: repeat(2, 48%)
            grid-column-gap: 4%

    //
</style>

<template lang="pug">
    div.gridIn
        anime(v-for="anime in listaAnimesFiltrada" :key="anime.anime_id" :anime="anime")
    //
</template>

<script lang="coffee">
    import anime from "./anime.vue"

    # [(a -> Bool)] -> a -> Bool
    comp = (fs) => (elem) =>
        estado = true
        fs.forEach (f) =>
            estado =
                if estado
                    f elem
                else
                    false
        estado

    export default
        name: "animes"
        components:
            anime: anime
        props:
            filtros:
                type: Array # [(a -> Bool)]
                required: true
            terminarCargaFn:
                type: Function
                required: true
        computed:
            listaAnimes: -> @$store.state.listaAnimes
            listaAnimesFiltrada: ->
                if @listaAnimes isnt undefined
                    @terminarCargaFn()
                    @listaAnimes.filter comp @filtros
                else []

    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .gridIn
        display: grid
        grid-template-columns: repeat(4, 1fr)
        grid-gap: 2rem

    @media only screen and (max-width: 500px)
        .gridIn
            grid-template-columns: repeat(2, 1fr)
            grid-gap: 1rem

    //
</style>
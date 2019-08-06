<template lang="pug">
    div.gridIn
        anime(v-for="(anime, i) in listaAnimesFiltrada" :key="anime.anime_id" :anime="anime")
    //
</template>

<script lang="coffee">
    import anime from "./anime.vue"

    removerCaracteres = (str, strArr) =>
        caracs = strArr.split ""
        arr = (str.split "").map (c) =>
            res = caracs.filter (c2) => c == c2
            if res.length == 1 then " " else c
        arr.join("").toLowerCase().split(" ")

    export default
        name: "animes"
        components:
            anime: anime
        props:
            filtros:
                type: Object
                required: true
        computed:
            listaAnimes: -> @$store.state.listaAnimes
            listaAnimesFiltrada: ->
                vm = this
                @listaAnimes.filter (x) =>
                    palabras = removerCaracteres x.nombre, "-:"
                    nombre = removerCaracteres vm.filtros.nombre, "-:"
                    if nombre.length is 0 then return true
                    for p1 in palabras
                        for p2 in nombre
                            if (p1.search p2) != -1 then return true
                    return false


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
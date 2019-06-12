<template lang="pug">
    div.gridIn
        anime(v-for="(anime, i) in listaAnimes" :key="i" :anime="anime")
    //
</template>

<script lang="coffee">
    import anime from "./anime.vue"

    export default
        name: "animes"
        components:
            anime: anime
        computed:
            listaAnimes: -> @$store.state.listaAnimes
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .gridIn
        display: grid
        grid-template-columns: repeat(4, 1fr)
        grid-gap: 2rem

    //
</style>
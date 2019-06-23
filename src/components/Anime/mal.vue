<template lang="pug">
    div.mal
        a(:href="url" target="_blank")
            img(src="https://acechanime.com/wp-content/themes/anime/img/myanimelist.png"
                alt="My Anime List")
        p Actores, Personajes, Staff y más aquí.
    //
</template>

<script lang="coffee">

    export default
        name: "mal"
        props:
            url:
                type: String
                required: true
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .mal
        @extend %textosGris
        margin: 50px 0
        text-align: center
        a
            display: inline-block
            width: 100%
    
    //
</style>
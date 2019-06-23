<template lang="pug">
    div.twitter
        a(href="https://twitter.com/AcechaAnime" target="_blank")
            img(src="https://acechanime.com/wp-content/themes/anime/img/twitter.png"
                alt="My Anime List" width="50%")
        p.
            Aquí anunciamos los ÚLTIMOS episodios y las actualizaciones más recientes
            de AcechaAnime
    //
</template>

<script lang="coffee">

    export default
        name: "twitter.vue"
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .twitter
        @extend %textosGris
        margin: 50px 0
        text-align: center
        a
            display: inline-block
            width: 100%

    //
</style>
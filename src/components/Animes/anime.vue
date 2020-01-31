<template lang="pug">
    article.link
        a.link(:href="anime.info.ruta" @click.prevent="irAPagAnime(anime)")
            div.img
                img(:src="anime.imagenes.portada"
                    sizes="(max-width: 247px) 100vw, 247px"
                    width="247" height="350"
                )
            h2.nombre {{ anime.info.nombre }}
    //
</template>

<script lang="coffee">

    export default
        name: "anime"
        props:
            anime: Object
            required: true
        methods:
            irAPagAnime: (anime) ->
                @$router.push
                    path: anime.info.ruta
                    params:
                        animeObj: anime

    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .link
        text-decoration: none

    .img
        // overflow: hidden
        position: relative
        width: 100%
        padding-bottom: 150%
        img
            @extend %imgFlotantes
            position: absolute
            width: 100%
            height: 100%
            top: 0
            left: 0
            border-radius: 5px

    .nombre
        color: var(--texto2)
        font:
            size: 1rem
            family: $titulos
            weight: 600
        margin-top: .35rem
        text-align: center
        line-height: 1.3


    //
</style>
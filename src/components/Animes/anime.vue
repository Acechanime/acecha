<template lang="pug">
    article
        router-link.link(:to="anime.ruta")
            div.img
                img(:src="anime.imagenes.portada"
                    sizes="(max-width: 247px) 100vw, 247px"
                    width="247" height="350"
                )
            h2.nombre {{ anime.nombre }}
    //
</template>

<script lang="coffee">

    export default
        name: "anime"
        props:
            anime: Object
            required: true
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
        color: #4e565b
        font:
            size: 1rem
            family: $titulos
            weight: 600
        margin-top: .35rem
        text-align: center
        line-height: 1.3


    //
</style>
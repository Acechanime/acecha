<template lang="pug">
    li.item_buscador(@click="irAlAnime")
        img(:src="anime.imagenes.portada")
        span.nombre_anime {{ anime.info.nombre }}

    //
</template>

<script lang="coffee">

    export default
        name: "item-buscador"
        props:
            anime:
                type: Object
                required: true
            limpiarBuscador:
                type: Function
                required: true
        methods:
            irAlAnime: ->
                @limpiarBuscador()
                anime = @anime
                @$router.push
                    path: anime.info.ruta
                    params:
                        animeObj: anime

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"


    .item_buscador
        display: block
        width: 100%
        height: 3.5rem
        white-space: nowrap
        text-overflow: ellipsis
        margin: 0.5rem 0
        cursor: pointer

        img
            height: 3.5rem
            width: 2.5rem

        &:hover
            .nombre_anime
                color: var(--first-color)


    .item_buscador_link
        padding: 0 !important


    .nombre_anime
        // vertical-align: middle
        display: inline-block
        height: 100%
        width: calc(100% - 2.5rem)
        padding-left: 1rem
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden
        text-transform: none
        transition: color 250ms


    //
</style>

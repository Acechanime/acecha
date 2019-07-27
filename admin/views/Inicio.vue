<template lang="pug">
    div
        div.adm
            item
        div.preview
            vista-anime
    //
</template>

<script lang="coffee">
    import item from "../components/Inicio/item.vue"
    import VistaAnime from "../../src/views/Anime.vue"
    import Vue from "vue"
    import store from "../../src/store.coffee"

    export default
        name: "Inicio"
        components:
            item: item
            "vista-anime": VistaAnime
        data: ->
            items: [
                nombre: "Animes"
                nombre: "o"
            ]
        created: ->
            @$store.commit "cambiarAModoAdmin"

    #

</script>

<style scoped lang="sass">

    .adm
        width: 59%

    .preview
        position: fixed
        right: 0
        top: 0
        width: 40%
        height: 100%
        overflow-y: scroll

    //
</style>
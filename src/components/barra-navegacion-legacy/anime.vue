<template lang="pug">
    li.item(@mouseover="mostrarSubMenu" @mouseout="ocultarSubMenu")
        router-link.item_label(to="/animes/") Anime
            img.emoji( draggable="false" alt="📂" src="/img/bicons/folder.svg")
        ul#sub-menu-animes.sub-menu-barra(:style="estilosLista")
            li.menu-item
                router-link(to="/animes/") Ver Anime
                    img.emoji( draggable="false" alt="📂" src="/img/bicons/folder.svg")
            li.menu-item
                router-link(to="/calendario/") Calendario
                    img.emoji( draggable="false" alt="📂" src="/img/bicons/calendar.svg")
    //
</template>

<script lang="coffee">

    export default
        name: "anime"
        data: ->
            hover: no
        computed:
            altoMaximo: ->
                ev = @$store.state.datos.resizeEvent
                root = @$el
                elem = root.children[1]
                if elem?
                    elem.scrollHeight + 5
                else
                    100
            estilosLista: ->
                if @hover then "max-height: #{@altoMaximo}px;" else ""
        methods:
            mostrarSubMenu: ->
                @hover = yes
            ocultarSubMenu: ->
                @hover = no

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .emoji
        width: 1rem

    //
</style>

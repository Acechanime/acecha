<template lang="pug">
    li.item(@mouseover="mostrarSubMenu" @mouseout="ocultarSubMenu")
        router-link.item_label(to="/animes/") Anime
            img.emoji( draggable="false" alt="📂" width="12px" src="/img/bicons/folder.svg")
        ul#sub-menu-animes.sub-menu(:style="estilosLista")
            li.menu-item
                router-link(to="/animes/") Ver Anime
                    img.emoji( draggable="false" alt="📂" width="12px" src="/img/bicons/folder.svg")
            li.menu-item
                router-link(to="/calendario/") Calendario
                    img.emoji( draggable="false" alt="📂" width="12px" src="/img/bicons/calendar.svg")
    //
</template>

<script lang="coffee">

    export default
        name: "anime"
        data: ->
            hover: no
            altoMax: 0
        computed:
            estilosLista: ->
                if @hover then "max-height: #{@altoMax}px;" else ""
        methods:
            mostrarSubMenu: ->
                @hover = yes
            ocultarSubMenu: ->
                @hover = no
        mounted: ->
            elem = document.getElementById "sub-menu-animes"
            if elem?
                @altoMax = elem.scrollHeight + 5
            else
                console.error "Error. No existe el sub-menu-animes."

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"


    //
</style>

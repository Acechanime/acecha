<template lang="pug">
    li.item(@mouseover="mostrarSubMenu" @mouseout="ocultarSubMenu")
        a Acecha tips
            img.emoji(draggable="false" alt=""
                src="/img/bicons/parchment.svg"
                width="12px")
        ul#sub-menu-tips.sub-menu(:style="estilosLista")
            li.menu-item
                router-link(to="/leer-manga/") Leer Manga
                    img.emoji(draggable="false" alt="" src="/img/bicons/book.svg" width="12px")
            li.menu-item
                router-link(to="/comprar-anime/") Comprar Anime
                    img.emoji(draggable="false" alt="" src="/img/bicons/heart.svg" width="12px")
            li.menu-item
                router-link(to="/comprar-desde-japon/") Comprar desde Japón
                    img.emoji(draggable="false" alt="" src="/img/bicons/japan.svg" width="12px")

    //
</template>

<script lang="coffee">

    export default
        name: "tips"
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
            elem = document.getElementById "sub-menu-tips"
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
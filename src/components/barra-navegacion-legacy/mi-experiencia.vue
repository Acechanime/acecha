<template lang="pug">
    li.item(@mouseover="mostrarSubMenu" @mouseout="ocultarSubMenu")
        a Mi experiencia
            img.emoji(draggable="false" alt=""
                src="/img/bicons/heart.svg"
                width="12px")
        ul#sub-menu-experiencia.sub-menu(:style="estilosLista")
            li.menu_item
                router-link(to="/acecha-premium/") Acecha premium
                    img.emoji(draggable="false"
                        alt="🔱"
                        src="/img/bicons/anchor.svg"
                        width="12px")
            li.menu_item
                router-link(to="/acecha-tv/") Acecha tv
                    img.emoji(draggable="false" alt="📺" width="12px"
                        src="/img/bicons/tv.svg")

    //
</template>

<script lang="coffee">

    export default
        name: "mi-experiencia"
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
            elem = document.getElementById "sub-menu-experiencia"
            if elem?
                @altoMax = elem.scrollHeight + 5
            else
                console.error "Error. No existe el sub-menu-experiencia."
    
#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"
    
    //
</style>

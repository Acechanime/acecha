<template lang="pug">
    li.item(@mouseover="mostrarSubMenu" @mouseout="ocultarSubMenu")
        a.item_label Mi experiencia
            img.emoji(draggable="false" alt=""
                src="/img/bicons/heart.svg"
                width="12px")
        ul#sub-menu-experiencia.sub-menu-barra(:style="estilosLista")
            li.menu-item
                router-link(to="/acecha-premium/") Acecha premium
                    img.emoji(draggable="false"
                        alt="🔱"
                        src="/img/bicons/anchor.svg"
                        width="12px")
            li.menu-item
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
    
    //
</style>

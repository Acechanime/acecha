<template lang="pug">
    li.item(@mouseover="mostrarSubMenu" @mouseout="ocultarSubMenu")
        a.item_label Comunidad
            img.emoji(draggable="false" alt="👨‍👨‍👧‍👧" width="12px" src="/img/bicons/family.svg")
        ul#sub-menu-comunidad.sub-menu(:style="estilosLista")
            li.menu-item
                a(href="/nosotros/index.html") Nosotros
                    img.emoji(draggable="false" alt="📂" width="12px" src="/img/bicons/family.svg")
            li.menu-item
                a(href="/creadores-de-contenido/index.html") Creadores de Contenido
                    img.emoji(draggable="false" alt="📂" width="12px" src="/img/bicons/play-button.svg")

    //
</template>

<script lang="coffee">

    export default
        name: "comunidad"
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
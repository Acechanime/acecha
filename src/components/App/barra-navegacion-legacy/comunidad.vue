<template lang="pug">
    li.item(@mouseover="mostrarSubMenu" @mouseout="ocultarSubMenu")
        a.item_label Comunidad
            img.emoji(draggable="false" alt="👨‍👨‍👧‍👧" width="12px" src="/img/bicons/family.svg")
        ul#sub-menu-comunidad.sub-menu-barra(:style="estilosLista")
            li.menu-item
                router-link(to="/nosotros/") Nosotros
                    img.emoji(draggable="false" alt="📂" width="12px" src="/img/bicons/family.svg")
            li.menu-item
                router-link(to="/creadores-de-contenido/") Creadores de Contenido
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


    //
</style>

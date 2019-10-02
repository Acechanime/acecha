<template lang="pug">
    li.item(@mouseover="mostrarSubMenu" @mouseout="ocultarSubMenu")
        a Comunidad
            img.emoji(draggable="false" alt="👨‍👨‍👧‍👧" width="12px" src="/img/bicons/parchment.svg")
        ul#sub-menu-comunidad.sub-menu(:style="estilosLista")
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
            elem = document.getElementById "sub-menu-comunidad"
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
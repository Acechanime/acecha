<template lang="pug">
    div.cab(:class="claseSombra")
        h1 AcechaControl

    //
</template>

<script lang="coffee">

    export default
        name: "cabecera"
        data: ->
            mostrarSombra: false
        computed:
            claseSombra: -> if @mostrarSombra then "cab--sombra" else ""
        created: ->
            vm = this
            window.addEventListener "scroll", () ->
                if window.pageYOffset > 50
                    vm.mostrarSombra = yes
                else
                    vm.mostrarSombra = no
    #
    
</script>

<style scoped lang="sass">

    .cab
        padding: 1rem
        transition: box-shadow 250ms
        position: sticky
        top: 0
        background-color: var(--colorFondo)

    .cab--sombra
        box-shadow: 0 1px 10px 1px #37474F

    //
</style>
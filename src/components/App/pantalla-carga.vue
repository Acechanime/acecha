<template lang="pug">
    div.pantalla(:style="estilos")
    //
</template>

<script lang="coffee">

    export default
        name: "pantalla-carga"
        data: ->
            mostrar: true
        computed:
            cargaLista: -> @$store.state.paginaLista
            estilos: ->
                if @cargaLista && @mostrar then "opacity: 0" else if !@mostrar then "display: none" else ""
        watch:
            cargaLista: (n, p) ->
                if n is true then @quitarFondo()
        methods:
            quitarFondo: ->
                vm = this
                setTimeout (->
                    vm.mostrar = false
                ), 1150
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .pantalla
        position: fixed
        width: 100%
        height: 100%
        display: table
        background: url("../../assets/img/you-kei.jpg")
        background-size: cover
        opacity: 1
        z-index: 100
        transition: opacity 150ms ease-out 1s

    //
</style>
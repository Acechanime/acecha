<template lang="pug">
    div.busc
        input#nombre(placeholder="Nombre del anime" v-model="nombre")
    //
</template>

<script lang="coffee">

    export default
        name: "buscador"
        data: ->
            nombre: ""
            lock: undefined
        props:
            filtrosFn:
                type: Object
                required: true
        watch:
            nombre: (n, v) ->
                vm = this
                clearTimeout @lock
                @lock = setTimeout (() =>
                    vm.filtrosFn.nombre n
                ), 100

    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .busc
        padding: 25px 0

    #nombre
        background-color: var(--fondo1)
        display: inline-block
        width: 100%
        font:
            family: $titulos
            size: 21px

        padding: 10px 20px
        border-radius: 25px
        border: solid $colorPrincipal 1px
        box-shadow: none
        transition: border-radius 250ms
        &:focus
            color: $colorPrincipal
            border-radius: 5px
            border-width: 2px
            outline: none
            padding-bottom: 8px

    //
</style>
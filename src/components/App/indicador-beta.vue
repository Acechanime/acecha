<template lang="pug">
    div.beta(:style="estilo")
        span Estás en la página de pruebas de AcechaAnime. La página estable está en&nbsp;
        a(href="https://acechanime.com") https://acechanime.com
        span .
    //
</template>

<script lang="coffee">

    export default
        name: "indicador-beta"
        data: ->
            activo: false
        computed:
            estilo: -> if @activo then {transform: "translateY(0)"} else {}
        created: ->
            vm = this
            setTimeout (=>
                vm.activo = true
            ), 1000
            setTimeout (=>
                vm.activo = false
            ), 6000

#
</script>

<style scoped lang="sass">

    .beta
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        z-index: 999
        background-color: #b71c1c
        padding: 1rem

        transform: translateY(100%)
        transition: transform 250ms ease-in-out

        a, span
            color: white
            font:
                family: "Product Sans", Roboto, sans-serif



    //
</style>
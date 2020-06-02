<template lang="pug">
    div.beta(v-if="mostrarVersion || esBeta" @click="irAVersiones")
        span v {{ versiones[0].version }}{{ esBeta? '-beta': '' }}

    //
</template>

<script lang="coffee">
    import versiones from "../../versiones.yaml"

    export default
        name: "indicador-version"
        data: ->
            esBeta: false
            versiones: versiones
        computed:
            mostrarVersion: -> @$store.state.datos.mostrarVersion
        mounted: ->
            @esBeta = (window.location.hostname.search "beta") != -1
        methods:
            irAVersiones: ->
                @$router.push "/versiones/"

#
</script>

<style scoped lang="sass">

    .beta
        position: fixed
        bottom: 0
        left: 0
        z-index: 999
        background-color: rgba(0, 0, 0, 0.5)
        padding: 0.25rem
        cursor: pointer

        a, span
            color: white
            font:
                family: "Product Sans", Roboto, sans-serif


    //
</style>
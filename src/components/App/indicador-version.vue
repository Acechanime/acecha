<template lang="pug">
    div.beta(v-if="mostrarVersion || esBeta")
        span v {{ version }}{{ esBeta? '-beta': '' }}

    //
</template>

<script lang="coffee">

    export default
        name: "indicador-version"
        data: ->
            esBeta: false
            version: process.env.VERSION_ACTUAL
        computed:
            mostrarVersion: -> @$store.state.datos.mostrarVersion
        mounted: ->
            @esBeta = (window.location.hostname.search "beta") != -1

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


        a, span
            color: white
            font:
                family: "Product Sans", Roboto, sans-serif


    //
</style>
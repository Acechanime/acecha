<template lang="pug">
    div
        div.separador
        div.contenedor
            selector
    //
</template>

<script lang="coffee">
    import selector from "../components/Premium/selector.vue"

    export default
        name: "Premium"
        components: { selector }
        mounted: ->
            @$store.commit "terminarCargaPagina"
    #
    
</script>

<style scoped lang="sass">
    @import "../sass/variables"
    
    //
</style>
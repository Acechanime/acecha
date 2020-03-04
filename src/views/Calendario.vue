<template lang="pug">
    div
        // div.separador
        imagen-principal(:alto="30" titulo="Calendario")

        selector

    //
</template>

<script lang="coffee">
    import imagenPrincipal from "../components/Inicio/imagen-principal.vue"
    import selector from "../components/Calendario/selector.vue"

    export default
        name: "Calendario"
        metaInfo:
            title: "Calendario"
        components: { imagenPrincipal, selector }
    
#
</script>

<style scoped lang="sass">
    @import "../sass/variables"
    
    //
</style>
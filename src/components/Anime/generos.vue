<template lang="pug">
    ul
        genero(v-for="(g, i) in generosFiltrados" :generoId="g" :key="i")

    //
</template>

<script lang="coffee">
    import genero from "./genero.vue"

    export default
        name: "generos"
        components: { genero }
        props:
            generos:
                type: Array
                required: true
        computed:
            generosFiltrados: -> new Set @generos



#
</script>

<style scoped lang="sass">

    
    //
</style>
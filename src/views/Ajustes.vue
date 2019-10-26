<template lang="pug">
    div.ajustes.contenedor
        h1.titulo Ajustes
        p En el futuro, aquí podras configurar colores, fuentes, imagenes y mucho mas.
        modo-color
        div.separador
        div.separador
        div.separador


    //
</template>

<script lang="coffee">
    import modoColor from "../components/Ajustes/modo-color.vue"

    export default
        name: "Ajustes"
        components: { modoColor }
    
#
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .ajustes
        color: var(--texto1)

    .titulo
        font:
            family: "Product Sans", Roboto, sans-serif
        padding: 25px 0

    //
</style>
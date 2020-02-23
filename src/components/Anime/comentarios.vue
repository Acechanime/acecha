<template lang="pug">
    div.comentarios
        h2.titulo Comentarios
        p.label ¿Qué te ha parecido? Opina con el resto de la comunidad =)
        fb-comments(:path="$router.currentRoute.path")

    //
</template>

<script lang="coffee">
    import fbComments from "../fb-comments.vue"

    export default
        name: "comentarios"
        components: { fbComments }

    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .comentarios
        margin: 2rem 0
        text-align: center

    .titulo
        color: var(--texto1)
        font:
            family: $titulos
            size: 1.75rem

    .label
        @extend %textosGris
        margin: 10px 0

    //
</style>
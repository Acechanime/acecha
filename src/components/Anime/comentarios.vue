<template lang="pug">
    div.comentarios
        h2.titulo Comentarios
        p.label ¿Qué te ha parecido? Opina con el resto de la comunidad =)
    //
</template>

<script lang="coffee">

    export default
        name: "comentarios"
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .comentarios
        margin: 50px 0
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
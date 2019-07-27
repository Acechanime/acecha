<template lang="pug">
    div.capitulos
        h2.titulo Lista de Capítulos
        p.label Todas las temporadas de {{ anime.nombre }}
        div.eps olol
    //
</template>

<script lang="coffee">

    export default
        name: "lista-de-capitulos"
        props:
            anime:
                type: Object
                required: true
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .capitulos
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

    .eps
        @extend %caja-textos
        background-color: var(--fondo1)

    //
</style>
<template lang="pug">
    div.temporadas
        h2.titulo Temporadas
        p.label Todas las temporadas de {{ animeObj.nombre }}
        div.temps // TODO
    //
</template>

<script lang="coffee">

    export default
        name: "temporadas"
        props:
            animeObj:
                type: Object
                required: true
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .temporadas
        margin: 100px 0
        text-align: center

    .titulo
        color: black
        font:
            family: $titulos

    .label
        @extend %textosGris
        margin: 10px 0

    .temps
        @extend %caja-textos


    //
</style>
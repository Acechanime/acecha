<template lang="pug">
    div
        div {{ $route.params.anime }}
        div.imagen Imagen
        div.row
            div.col.l4
                div.img Img
                div.informacion Informacion
                div.linkMAL MAL
                div.anuncio Anuncio
            div.col.l8
                div.sinopsis Sinopsis
                div.temporadas Temporadas
                div.capitulos Capitulos
                div.comentarios Comentarios
    //
</template>

<script lang="coffee">

    export default
        name: "Anime"

    #
</script>

<style scoped lang="sass">

    //

</style>
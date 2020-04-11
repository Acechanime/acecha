<template lang="pug">
    div.comentarios-cont.contenedor
        h2 Comentarios
        div Comentario 1

    //
</template>

<script lang="ls">

    module.exports =
        name: "comentarios"
        data: ->
            comentarios: []
        computed:
            animeActual: -> @$store.state.datos.animeActual
            epActual:    -> @$store.state.reproductor.epActual
        methods:
            cargarComentarios: ->
                console.log "Cargando :c (#{@animeActual.id}) (#{@epActual.id})"
        mounted: ->
            @cargarComentarios()

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .comentarios-cont
        @extend %caja-textos
        color: var(--texto1)
        font-family: "JetBrains Mono", Roboto, sans-serif
        margin-top: 2rem
        margin-bottom: 2rem


    //
</style>
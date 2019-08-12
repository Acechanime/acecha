<template lang="pug">
    div.anime
        div.datos
            span.id {{ anime.anime_id }}
            span.nombre {{ anime.nombre }}
            i.material-icons.error(v-if="!animeIntegro") error
            div.botones
                button.boton.agregar(title="Agregar episodio")
                button.boton.editar(title="Editar anime")
                // button.boton.eliminar(title="Eliminar anime")
    //
</template>

<script lang="coffee">

    export default
        name: "ver-anime"
        props:
            anime:
                type: Object
                required: true
        computed:
            animeIntegro: ->
                a = @anime
                indicadores = [
                    a.anio?
                    a.carpeta_mega?
                    a.culminacion?
                    a.emision?
                    a.en_emision?
                    a.episodios?
                    a.estudio?
                    a.fuente?
                    a.generos?
                    a.img_fondo?
                    a.img_nuevo_ep?
                    a.img_portada?
                    a.mal?
                    a.nombre?
                    a.nombre_corto?
                    a.ruta?
                    a.sinopsis?
                    a.temporada?
                ]
                if (indicadores.find (x) => !x) is undefined then true else false

#
</script>

<style scoped lang="sass">
    @import "../../sass/global"

    .anime
        padding: 10px

    .datos
        display: table

    .id
        display: table-cell
        padding-right: 10px
        vertical-align: middle

    .nombre
        display: table-cell
        vertical-align: middle
        width: 500px
        max-width: 500px
        overflow: hidden
        
    .error
        display: table-cell
        vertical-align: middle
        padding: 0 10px
        color: red

    .botones .boton
        font-size: medium
        padding: 5px
        margin: 0 10px
        background-color: #3B5998
        &::before
            font-family: 'Material Icons' !important
            // padding-right: 10px

        &.editar::before
            content: "edit"
        &.agregar::before
            content: "add"
        &.eliminar
            background-color: #c42e32
            &::before
                content: "delete"

    //
</style>
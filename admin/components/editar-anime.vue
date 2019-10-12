<template lang="pug">
    div.editar
        label Nombre
        input(v-model="anime.nombre")
        br
        label Ruta
        input(v-model="anime.ruta")
        br
        label Otros nombres
        br
        template(v-for="(n, i) in anime.otros_nombres")
            input.otroNombre(v-model="anime.otros_nombres[i]")
            br
        button.agregar(@click="agregarOtroNombre") Agregar
        br
        label Sinopsis
        br
        textarea(v-model="anime.sinopsis")
        br
        br
        label Géneros
        br
        div.check
            div(v-for="genero in $store.state.listaGeneros")
                input(type="checkbox" :value="genero.genero_id" v-model="anime.generos")
                label {{ genero.nombre }}
        br
        br
        label Episodios
        input(v-model.number="anime.episodios" min="0" type="number")
        br
        label Temporada
        input(v-model="anime.temporada")
        br
        label Año
        input(v-model.number="anime.anio" min="1950" type="number")
        br
        label Estudio
        input(v-model="anime.estudio")
        br
        label Fuente
        input(v-model="anime.fuente")
        br
        label Emision
        input(v-model="anime.emision")
        br
        label Culminacion
        input(v-model="anime.culminacion")
        br
        label Link MAL
        input(v-model="anime.mal")
        br
        label En emision
        input(type="checkbox" v-model="anime.en_emision")
        br
        p Imágenes:
        div.imagenes
            label Portada
            input(v-model="anime.img_portada")
            br
            label fondo
            input(v-model="anime.img_fondo")
            br
            label nuevoEp
            input(v-model="anime.img_nuevoEp")
            br
        br
        button.botonm(:class="error? 'botonm--error': ''" @click="fun") {{ texto }}

    //
</template>

<script lang="coffee">

    export default
        name: "editar-anime"
        data: ->
            otrosNombres: @otrosNombresAlt ? ["Nombre alternativo"]
            generos: []
        computed:
            anime: ->
                console.log "eh?"
                @$store.state.animeAdmin.animeAdmin
            otrosNombresAlt: -> @$store.state.animeAdmin.otros_nombres
        props:
            texto:
                type: String
                required: true
            error:
                type: Boolean
                default: no
            fun:
                type: Function
                required: true
            config:
                type: Object
                required: true
        watch:
            otrosNombres: (nuevo, viejo) ->
                @$store.commit "cambiarAnimeAdmin_alternativo", nuevo
        methods:
            agregarOtroNombre: ->
                @$store.commit "agregarAnimeAdmin_alternativo"
        mounted: ->
            @$store.commit "cambiarAnimeAdmin", @config

    #
</script>

<style scoped lang="sass">
    @import "../sass/global"

    .botonm--error
        background-color: #e51400
        color: white

    .editar
        label
            display: inline-block
            min-width: 150px
        input, textarea
            padding: 5px
            border-radius: 5px
            border: none
            background-color: #B0BEC5
            font-size: var(--tamanoFuenteUno)
            min-width: 500px
            margin: 1px 0

        textarea
            min-height: 150px
            margin-left: 150px

        .otroNombre, .agregar
            margin-left: 150px

    .imagenes, .check
        padding-left: 150px

    .check
        div
            display: inline-block
            min-width: 220px
            label
                min-width: 200px
            input
                min-width: 0
                margin: 10px


    //
</style>
<template lang="pug">
    div
        div Crear dinámicamente
        br
        div.entrada(v-show="!creando")
            label Nombre
            input(v-model="anime.nombre")
            br
            label Ruta
            input(v-model="anime.ruta")
            br
            label Otros nombres
            br
            template(v-for="(n, i) in otrosNombres")
                input.otroNombre(v-model="otrosNombres[i]")
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
            button(@click="crearAnime") Crear
        div(v-show="creando") Creando...
    //
</template>

<script lang="coffee">

    export default
        name: "crear-anime"
        data: ->
            otrosNombres: ["Nombre alternativo"]
            generos: []
            creando: no
            anime: @$store.state.animeAdmin
        watch:
            otrosNombres: (nuevo, viejo) ->
                @$store.commit "cambiarAnimeAdmin_alternativo", nuevo
        methods:
            agregarOtroNombre: ->
                @otrosNombres = @otrosNombres.concat [""]
            crearAnime: ->
                @creando = yes

                respuestaRaw = await fetch "/api/animes",
                    method: "POST"
                    headers:
                        "Accept": "application/json"
                        "Content-Type": "application/json"
                    body: JSON.stringify @$store.state.animeAdmin
                respuesta = await respuestaRaw.json()
                if respuesta.exito then console.log "Exito :D"
                else console.error respuesta.razon
                @creando = no
    #

</script>

<style scoped lang="sass">

    .entrada
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
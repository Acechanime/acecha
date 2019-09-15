<template lang="pug">
    div
        div.adm(:style="claseAdm")
            section
                h2 Varios
                recomendacion-semanal
                video-recomendado
            // section
                h2 Animes
                div
                    carga-automatica
                    button.boton(@click="cambiarMostrarCrear" :class="claseBoton") Crear anime
                    crear-anime(v-if="panelAbierto")
                    br
                    ver-anime
            div.verAnime
                div.verAnime__titulo Ver/Modificar Anime
                br
                div
                    button(@click="obtenerListaAnimes") Recargar
                    anime(v-for="anime in animes" :key="anime.anime_id" :anime="anime"
                        :nombre="anime.nombre" :animeID="parseInt(anime.anime_id)"
                        :fn-recargar-lista-animes="obtenerListaAnimes")

        div.preview(:style="clasePreview")
            vista-anime

    //
</template>

<script lang="coffee">
    import Vue from "vue"
    import store from "../../src/store.coffee"
    import crearAnime from "../components/Inicio/crear-anime.vue"
    import VistaAnime from "../../src/views/Anime.vue"
    import Datepicker from "vuejs-datepicker"
    import recomendacionSemanal from "../components/Inicio/recomendacion-semanal.vue"
    import videoRecomendado from "../components/Inicio/video-recomendado.vue"
    import verAnime from "../components/Inicio/ver-animes.vue"
    import CargaAutomatica from "../components/Inicio/carga-automatica";

    import anime from "../components/Inicio/anime.vue"

    servidor = "http://localhost:3000"

    export default
        name: "Inicio"
        components:
            "crear-anime": crearAnime
            "vista-anime": VistaAnime
            datepicker: Datepicker
            "recomendacion-semanal": recomendacionSemanal
            "video-recomendado": videoRecomendado
            "ver-anime": verAnime
            "carga-automatica": CargaAutomatica

            "anime": anime
        data: ->
            items: [
                nombre: "Animes"
                nombre: "o"
            ]
            fecha: new Date()
            panelAbierto: no

            # nuevo-legacy
            animes: []
        computed:
            mostrarCrear: -> @$store.state.mostrarAnimeAdmin
            clasePreview: ->
                if @mostrarCrear then "width: 40%"
            claseAdm: ->
                if @mostrarCrear then "width: 59%"
            claseBoton: ->
                if @panelAbierto then "boton--activo"
        methods:
            cambiarMostrarCrear: ->
                if @panelAbierto
                    @$store.commit "ocultarAnimeAdmin"
                else
                    @$store.commit "mostrarAnimeAdmin"
                @panelAbierto = !@panelAbierto
            obtenerListaAnimes: ->
                try
                    data = await fetch "#{servidor}/api/animes"
                    dataJ = await data.json()
                    if dataJ.exito? and dataJ.exito is true
                        @animes = dataJ.payload
                    else
                        console.log "Error al recuperar lista de animes."
                catch e
                    console.log "Error:"
                    console.log e.stack
        created: ->
            @$store.commit "cambiarAModoAdmin"
            @$store.commit "terminarCargaPagina"

            @obtenerListaAnimes()

    #

</script>

<style scoped lang="sass">

    .adm
        width: 100%

    .preview
        background-color: var(--fondo1)
        position: fixed
        right: 0
        top: 0
        width: 0
        height: 100%
        overflow-y: scroll

    .fecha
        color: black

    //
</style>
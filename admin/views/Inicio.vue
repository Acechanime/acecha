<template lang="pug">
    div
        div.adm(:style="claseAdm")
            section
                h2 Varios
                recomendacion-semanal
                video-recomendado
            section
                h2 Animes
                div
                    carga-automatica
                    button.boton(@click="cambiarMostrarCrear" :class="claseBoton") Crear anime
                    crear-anime(v-if="panelAbierto")
                    br
                    ver-anime
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
        data: ->
            items: [
                nombre: "Animes"
                nombre: "o"
            ]
            fecha: new Date()
            panelAbierto: no
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
        created: ->
            @$store.commit "cambiarAModoAdmin"

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
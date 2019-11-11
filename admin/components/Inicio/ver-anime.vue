<template lang="pug">
    div.anime
        div.datos
            span.id {{ anime.anime_id }}
            span.nombre {{ anime.nombre }}
            i.material-icons.error(v-if="!animeIntegro") error
            div.botones
                button.boton.agregar(@click="cambiarEpisodios" title="Agregar episodio")
                button.boton.editar(@click="cambiarEdicion"
                    :class="edicionAbierta? 'boton--activo': ''" title="Editar anime")
                // button.boton.eliminar(title="Eliminar anime")
        div.edicion(v-if="edicionAbierta")
            editar-anime(:config="anime" :texto="edicionTexto" :fun="actualizarAnime"
                :error="edicionError")
        episodios(v-if="episodiosAbierto" :animeId="anime.anime_id")

    //
</template>

<script lang="coffee">
    import editarAnime from "../editar-anime.vue"
    import episodios from "./ver-anime/episodios.vue"
    import {servidor} from "../../../src/variables";

    export default
        name: "ver-anime"
        components:
            "editar-anime": editarAnime
            "episodios": episodios
        data: ->
            edicionAbierta: no
            edicionTexto: "Actualizar"
            edicionError: no
            episodiosAbierto: no
        props:
            anime:
                type: Object
                required: true
        computed:
            animeIntegro: ->
                a = @anime
                indicadores = [
                    a.anio?
                    a.culminacion?
                    a.emision?
                    a.en_emision?
                    a.episodios?
                    a.estudio?
                    a.fuente?
                    a.generos? and a.generos?.length > 0
                    a.img_fondo?
                    a.img_nuevo_ep?
                    a.img_portada?
                    a.mal?
                    a.nombre?
                    a.ruta?
                    a.sinopsis?
                    a.temporada?
                ]
                if (indicadores.find (x) => !x) is undefined then true else false
        methods:
            cambiarEdicion: ->
                if @edicionAbierta
                    @$store.commit "ocultarAnimeAdmin"
                else
                    @$store.commit "mostrarAnimeAdmin"
                @edicionAbierta = !@edicionAbierta
            actualizarAnime: ->
                vm = this
                resRaw = await fetch "#{servidor}/animes/#{vm.anime.anime_id}",
                    method: "PUT"
                    headers:
                        "Content-Type": "application/json"
                    body: JSON.stringify vm.$store.state.animeAdmin
                respuesta =
                    try
                        await resRaw.json()
                    catch e
                        { exito: no}
                if respuesta?.exito and respuesta.exito
                    @edicionTexto = "Exito"
                    setTimeout (() =>
                        vm.edicionTexto = "Crear"
                    ), 1500
                else
                    @edicionTexto = "Error"
                    @error = yes
                    setTimeout (() =>
                        vm.edicionTexto = "Crear"
                        vm.edicionError = no
                    ), 2500
                    console.error respuesta.razon
            cambiarEpisodios: ->
                @episodiosAbierto = !@episodiosAbierto
        created: ->
            unless Array.isArray @anime.generos
                @anime.generos = []
            unless Array.isArray @anime.otros_nombres
                @anime.otros_nombres = []

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
            padding-right: 5px

        &.editar::before
            content: "edit"
        &.agregar::before
            content: "laptop"
        &.eliminar
            background-color: #c42e32
            &::before
                content: "delete"

    //
</style>
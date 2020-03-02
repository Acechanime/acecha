<template lang="pug">
    div.capitulos
        template(v-if="tieneOvas")
            h2.titulo Lista de Ovas
            p.label Todas las OVAs de {{ anime.info.nombre }}
            div.eps
                episodio(v-for="(ep, i) in ovas_filtradas" :key="i"
                    :episodio="ep" :nombre="anime.info.nombre")
            br
            br
        template(v-if="episodios_filtrados.length > 0")
            h2.titulo Lista de Capítulos
            p.label Todos los capítulos de {{ anime.info.nombre }}
            div.eps
                episodio(v-for="(ep, i) in episodios_filtrados" :key="i"
                    :episodio="ep" :nombre="anime.info.nombre")
        div.no-caps(v-else-if="estadoCarga === 0")
            p Cargando episodios...
        div.no-caps(v-else)
            p No hay episodios disponibles.

    //
</template>

<script lang="coffee">
    import episodio from "./episodio.vue"
    import {servidor} from "../../variables";

    export default
        name: "lista-de-episodios"
        components: { episodio }
        props:
            anime:
                type: Object
                required: true
        data: ->
            episodios: []
            estadoCarga: 0

        computed:
            episodios_filtrados: ->
                epsFiltrados = @episodios.filter (x) -> x.es_ova is no
                epsFiltrados.sort (x, y) =>
                    if x.num_ep > y.num_ep then 1
                    else -1


            ovas_filtradas: ->
                epsFiltrados = @episodios.filter (x) -> x.es_ova is yes
                epsFiltrados.sort (x, y) =>
                    if x.num_ep > y.num_ep then 1
                    else -1


            tieneOvas: -> @ovas_filtradas.length > 0
        watch:
            anime: (n, v) ->
                if n.info.anime_id isnt v.info.anime_id
                    @cargarEpisodios()
        methods:
            cargarEpisodios: ->
                if @anime.info.anime_id?
                    # datosRaw = await fetch "#{servidor}/episodios?anime_id=#{@anime.info.anime_id}"
                    datosRaw = await fetch "#{servidor}/animes/#{@anime.info.anime_id}/episodios"
                    datos = await datosRaw.json()
                    @estadoCarga =
                        if datos.exito? && datos.exito
                            @episodios = datos.payload
                            @$store.commit "cambiarListaEpisodios", datos.payload
                            1
                        else -1
        created: ->
            @cargarEpisodios()



    #

</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .no-caps
        color: var(--texto1)


    .capitulos
        margin: 3rem 0
        text-align: center

    .titulo
        color: var(--texto1)
        font:
            family: $titulos
            size: 1.75rem
        padding: 0.75rem 0

    .label
        @extend %textosGris
        margin-bottom: 1rem

    .eps
        @extend %caja-textos
        padding: 0
        background-color: var(--fondo2)
        color: var(--texto1)
        max-height: 35rem
        overflow-y: scroll

    //
</style>
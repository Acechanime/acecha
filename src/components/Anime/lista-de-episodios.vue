<template lang="pug">
    div.capitulos
        template(v-if="tieneOvas")
            h2.titulo Lista de Ovas
            p.label Todas las OVAs de {{ anime.nombre }}
            div.eps
                episodio(v-for="(ep, i) in ovas_filtradas" :key="i"
                    :episodio="ep" :nombre="anime.nombre")
            br
            br
        h2.titulo Lista de Capítulos
        p.label Todos los capítulos de {{ anime.nombre }}
        div.eps
            episodio(v-for="(ep, i) in episodios_filtrados" :key="i"
                :episodio="ep" :nombre="anime.nombre")
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
            episodios_filtrados: -> @episodios.filter (x) -> x.es_ova is no
            ovas_filtradas: -> @episodios.filter (x) -> x.es_ova is yes
            tieneOvas: -> @ovas_filtradas.length > 0
        watch:
            anime: (n, v) ->
                if n.anime_id isnt v.anime_id
                    @cargarEpisodios()
        methods:
            cargarEpisodios: ->
                if @anime.anime_id?
                    datosRaw = await fetch "#{servidor}/episodios?anime_id=#{@anime.anime_id}"
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

    .capitulos
        margin: 50px 0
        text-align: center

    .titulo
        color: var(--texto1)
        font:
            family: $titulos
            size: 1.75rem

    .label
        @extend %textosGris
        margin: 10px 0

    .eps
        @extend %caja-textos
        padding: 0
        background-color: var(--fondo2)
        color: var(--texto1)

    //
</style>
<template lang="pug">
    div.temporadas(v-if="obtTempAnteriores.length > 0 || obtTempSiguientes.length > 0")
        h2.titulo Temporadas
        p.label Todas las temporadas de {{ anime.info.nombre }}
        div.temps
            temporada(v-for="animeSig in obtTempSiguientes" :anime="animeSig"
                :key="animeSig.info.anime_id")
            temporada(:anime="anime")
            temporada(v-for="animeAnt in obtTempAnteriores" :anime="animeAnt"
                :key="animeAnt.info.anime_id")
    //
</template>

<script lang="coffee">
    import temporada from "./temporada.vue"

    export default
        name: "temporadas"
        components:
            temporada: temporada
        props:
            anime:
                type: Object
                required: true
        computed:
            obtTempAnteriores: ->
                anterior = []
                animeActual = @anime
                while animeActual.temporada.id_temporada_ant? and animeActual.temporada.id_temporada_ant isnt -1
                    animeAnt = @$store.state.datos.listaAnimes.filter (a) ->
                        a.info.anime_id == animeActual.temporada.id_temporada_ant
                    if animeAnt[0]?
                        anterior.unshift animeAnt[0]
                    animeActual = animeAnt[0]
                anterior

            obtTempSiguientes: ->
                siguiente = []
                animeActual = @anime
                while animeActual.temporada.id_temporada_sig? and animeActual.temporada.id_temporada_sig isnt -1
                    animeSig = @$store.state.datos.listaAnimes.filter (a) ->
                        a.info.anime_id == animeActual.temporada.id_temporada_sig
                    if animeSig[0]?
                        siguiente.push animeSig[0]
                    animeActual = animeSig[0]
                siguiente

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .temporadas
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

    .temps
        @extend %caja-textos
        background-color: var(--fondo2)

    @media only screen and (max-width: 500px)
        .temps
            padding: 0.7rem

    //
</style>
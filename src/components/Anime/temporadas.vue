<template lang="pug">
    div.temporadas(v-if="obtTempAnteriores.length > 0 || obtTempSiguientes.length > 0")
        h2.titulo Temporadas
        p.label Todas las temporadas de {{ anime.nombre }}
        div.temps
            temporada(v-for="animeSig in obtTempSiguientes" :anime="animeSig"
                :key="animeSig.anime_id")
            temporada(:anime="anime")
            temporada(v-for="animeAnt in obtTempAnteriores" :anime="animeAnt"
                :key="animeAnt.anime_id")
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
                while animeActual.id_temporada_ant?
                    animeAnt = @$store.state.listaAnimes.filter (a) ->
                        a.anime_id == animeActual.id_temporada_ant
                    if animeAnt[0]?
                        anterior.unshift animeAnt[0]
                    animeActual = animeAnt[0]
                anterior
            obtTempSiguientes: ->
                siguiente = []
                animeActual = @anime
                while animeActual.id_temporada_sig?
                    animeSig = @$store.state.listaAnimes.filter (a) ->
                        a.anime_id == animeActual.id_temporada_sig
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
        background-color: var(--fondo1)

    @media only screen and (max-width: 500px)
        .temps
            padding: 0.7rem

    //
</style>
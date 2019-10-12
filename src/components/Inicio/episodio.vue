<template lang="pug">
    article.ep(v-if="ep.anime_id")
        a.link(:href="obtenerLink" @click.prevent="irAlEp")
            img.imagen(:src="anime.img_nuevo_ep" :alt="'Episodio ' + ep.num_ep + ' de ' + anime.nombre")
            h3.nombre {{ anime.nombre }} {{ ep.num_ep }}

    //
</template>

<script lang="coffee">
    import { listaAnimesCargada } from "../../store.coffee"
    import { impr } from "../../variables";

    export default
        name: "episodio"
        props:
            ep:
                type: Object
                required: true
        computed:
            listaAnimes: -> @$store.state.datos.listaAnimes
            anime: ->
                lista = @listaAnimes
                anime_id = @ep.anime_id
                if lista isnt undefined and @ep? and anime_id?
                    anime = lista.find (x) => x.anime_id == anime_id
                    anime ? do ->
                        console.log "Inicio/episodio. No existe anime con id #{anime_id}"
                        {}

                else if lista isnt undefined
                    console.log "Error. El objeto ep que se pasó no existe " +
                        "(#{typeof @ep})."
                    {}
                else
                    console.log "Lista vacia."
                    {}
            obtenerLink: ->
                anime = @anime
                if anime.ruta?
                    ep = @ep
                    anime.ruta + (if ep.es_ova then "ova" else "ep") + ep.num_ep
                else "./#"

        methods:
            irAlEp: ->
                ep = @ep
                @$store.commit "cambiarDatosVerAnime",
                    nombre: @anime.nombre
                    esOva: @ep.es_ova
                    ep: @ep.num_ep
                    ruta: @anime.ruta
                @$store.commit "cambiarAnimeVerAnime",
                    mega: ep.mega
                    rapidvideo: ep.rapidvideo
                    mango: ep.mango
                    mp4upload: ep.mp4upload
                    okru: ep.okru
                @$router.push @obtenerLink

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .ep
        text-align: center
        margin: 10px 0

    .link
        display: block
        text-decoration: none

    .imagen
        @extend  %imgFlotantes
        border-radius: 5px
        box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
        cursor: pointer
        width: 95%
        height: auto

    .nombre
        color: var(--texto1)
        font-size: 17px
        font-weight: 700
        line-height: .9em
        letter-spacing: 0
        margin-top: 0.3rem

    //
</style>

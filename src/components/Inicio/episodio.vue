<template lang="pug">
    article.ep
        a.link(:href="obtenerLink" @click.prevent="irAlEp")
            img.imagen(:src="anime.img_nuevo_ep" :alt="'Episodio ' + ep.num_ep + ' de ' + anime.nombre")
            br
            span.nombre {{ anime.nombre }} {{ ep.num_ep }}

    //
</template>

<script lang="coffee">

    export default
        name: "episodio"
        props:
            ep:
                type: Object
                required: true
        computed:
            listaAnimes: -> @$store.state.listaAnimes
            anime: ->
                lista = @listaAnimes
                if lista isnt undefined and @ep?
                    animes = lista.filter (x) => x.anime_id == @ep.anime_id
                    if animes.length is 0
                        console.log "El episodio con link_id #{@ep.link_id} no tiene anime."
                        {}
                    else
                        animes[0]
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
        text-decoration: none

    .imagen
        @extend  %imgFlotantes
        width: 94%
        border-radius: 5px
        box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
        cursor: pointer

    .nombre
        color: var(--texto1)
        font-size: 17px
        font-weight: 700
        line-height: .9em
        letter-spacing: 0

    //
</style>

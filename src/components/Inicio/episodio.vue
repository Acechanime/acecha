<template lang="pug">
    article.ep(v-if="ep.anime_id && anime.info && anime.info.nombre")
        a.link(:href="obtenerLink" @click.prevent="irAlEp")
            img.imagen(:src="anime.imagenes.nuevo_ep"
                :alt="'Episodio ' + ep.num_ep + ' de ' + anime.info.nombre"
                :style="'height: ' + alto + 'px'")
            h3.nombre {{ anime.info.nombre }} {{ ep.num_ep }}

    //
</template>

<script lang="coffee">
    import { listaAnimesCargada } from "../../store/store.coffee"
    import { impr } from "../../variables"

    export default
        name: "episodio"
        props:
            ep:
                type: Object
                required: true
        data: ->
            alto: 0
        computed:
            listaAnimes: -> @$store.state.datos.listaAnimes
            anime: ->
                lista = @listaAnimes
                anime_id = @ep.anime_id
                if lista isnt undefined and @ep? and anime_id?
                    anime = lista.find (x) => x.info.anime_id == anime_id
                    anime ? {}

                else if lista isnt undefined
                    console.log "Error. El objeto ep que se pasó no existe " +
                        "(#{typeof @ep})."
                    {}
                else
                    console.log "Lista vacia."
                    {}
            obtenerLink: ->
                anime = @anime
                if anime.info.ruta?
                    ep = @ep
                    anime.info.ruta + (if ep.es_ova then "ova" else "ep") + ep.num_ep
                else "./#"
            resizeEvent: -> @$store.state.datos.resizeEvent
        watch:
            resizeEvent: ->
                @ajustarTamanoElem()
        methods:
            irAlEp: ->
                ep = @ep
                @$store.commit "cambiarDatosVerAnime",
                    nombre: @anime.info.nombre
                    esOva: @ep.es_ova
                    ep: @ep.num_ep
                    ruta: @anime.info.ruta
                @$store.commit "cambiarAnimeVerAnime",
                    mega: ep.mega
                    rapidvideo: ep.rapidvideo
                    mango: ep.mango
                    mp4upload: ep.mp4upload
                    okru: ep.okru
                @$router.push @obtenerLink
            ajustarTamanoElem: ->
                vm = this
                intervalo = setInterval (=>
                    elemento = vm.$el.firstChild?.firstChild
                    if elemento?
                        clearInterval intervalo
                        ancho = elemento.scrollWidth
                        alto = Math.floor(9 * (ancho / 16))
                        vm.alto = alto
                ), 250
        mounted: ->
            @ajustarTamanoElem()

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

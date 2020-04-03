<template lang="pug">
    article.ep(v-if="ep.anime_id && anime.nombre")
        a.link(:href="obtenerLink" @click.prevent="irAlEp")
            img.imagen(:src="anime.nuevo_ep"
                :alt="'Episodio ' + ep.numero + ' de ' + anime.nombre"
                :style="'height: ' + alto + 'px'")
            h3.nombre {{ anime.nombre }} {{ ep.es_ova? 'OVA': '' }} {{ ep.numero }}

    //
</template>

<script lang="coffee">
    import { impr } from "../../coffee/variables.coffee"

    export default
        name: "episodio"
        props:
            ep:
                type: Object
                required: true
        data: ->
            alto: 0
        computed:
            listaAnimes: -> @$store.state.datos.animes
            anime: ->
                lista = @listaAnimes
                anime_id = @ep.anime_id

                if lista isnt undefined and @ep? and anime_id?
                    anime = lista.find (x) => x.id == anime_id
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
                if anime.ruta?
                    ep = @ep
                    anime.ruta + (if ep.es_ova then "ova" else "ep") + ep.numero
                else "./#"
            resizeEvent: -> @$store.state.datos.resizeEvent
        watch:
            resizeEvent: ->
                @ajustarTamanoElem()
        methods:
            irAlEp: ->
                @$store.commit "reproductor/setEpActual", @ep
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

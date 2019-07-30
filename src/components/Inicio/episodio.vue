<template lang="pug">
    article.ep
        router-link.link(:to="obtenerLink(anime, ep)")
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
            anime: ->
                if @ep?
                    anime = @$store.state.listaAnimes.filter (x) => x.anime_id == @ep.anime_id
                    anime[0]
                else {}
        methods:
            obtenerLink: (anime, ep) ->
                anime.ruta + (if ep.es_ova then "ova" else "ep") + ep.num_ep

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

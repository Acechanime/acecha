<template lang="pug">
    div
        imagen-anime(:nombre="animeObj.nombre" :img="animeObj.imagenes.fondo")
        main.cont.contenedor
            div
                img.imagen(:src="animeObj.imagenes.portada")
                div.redes botones-redes
                info(:animeObj="animeObj")
                mal(:url="animeObj.MAL")
                twitter
            div
                article.sinopsis
                    div.tit Sinopsis
                    p.txt {{ animeObj.sinopsis }}
                    span.generos(v-for="g in animeObj.generos")  {{ g }}
                temporadas(:animeObj="animeObj")
    //
</template>

<script lang="coffee">
    import imagenAnime from "../components/Anime/imagen-anime.vue"
    import info from "../components/Anime/info.vue"
    import mal from "../components/Anime/mal.vue"
    import twitter from "../components/Anime/twitter.vue"
    import temporadas from "../components/Anime/temporadas.vue"
    import store from "../store.coffee"

    export default
        name: "Anime"
        components:
            "imagen-anime": imagenAnime
            "info": info
            "mal": mal
            "twitter": twitter
            "temporadas": temporadas
        data: ->
            animeObj: {imagenes: {}}
            animeExiste: true
        methods:
            inicializarAnimeObj: (err) ->
                @$store.commit "terminarCargaPagina"
                if err? then @animeExiste = false

        beforeRouteEnter: (to, from, next) ->
            fun = ->
                nombreRuta = to.path
                animes = store.state.listaAnimes.filter (a) -> a.ruta == nombreRuta
                console.log animes
                if animes.length == 1
                    console.log "Anime encontrado."
                    to.params.animeObj = animes[0]
                    next (vm) -> vm.inicializarAnimeObj()
                else
                    console.error "No se encontró un anime con ruta #{nombreRuta}"
                    next (vm) -> vm.inicializarAnimeObj(true)

            if to.params.animeObj?
                next (vm) -> vm.inicializarAnimeObj()
            else
                intervalo = setInterval (->
                    unless store.state.listaAnimes.length is 0
                        clearInterval intervalo
                        fun()
                ), 100
        created: ->
            unless @$route.params.animeObj?
                nombreRuta = @$route.path
                animes = @$store.state.listaAnimes.filter (a) -> a.ruta == nombreRuta
                if animes.length == 1
                    console.log "anuma v: #{nombreRuta} y #{animes[0]}"
                else
                    console.error "alv:< #{nombreRuta}"
            else
                @animeObj = @$route.params.animeObj

    #
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .cont
        position: relative
        margin-top: -150px
        grid-template-columns: 250px 1fr
        display: grid
        grid-gap: 2.5rem

    .sinopsis
        @extend %caja-textos
        background-color: white
        .tit
            line-height: 1.3
            font:
                weight: 600
                family: $titulos
                size: 1.8rem
            color: black
            padding-bottom: .3em
        .txt
            @extend %textosGris
            margin-bottom: 1.25rem
            line-height: 1.6



    //
</style>
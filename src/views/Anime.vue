<template lang="pug">
    div.an
        imagen-anime(:nombre="animeObj.nombre" :img="animeObj.img_fondo")
        main.cont.contenedor
            div
                div.contImg
                    img.imagen(:src="animeObj.img_portada")
                    figcaption.estado(:style="colorEtiqueta") {{ animeObj.en_emision? 'en emision': 'finalizado' }}
                        span.icon-check-box
                redes-sociales
                info(:animeObj="animeObj")
                mal(:url="animeObj.mal")
                twitter
            div
                article.sinopsis
                    div.tit Sinopsis
                    p.txt {{ animeObj.sinopsis }}
                    ul
                        genero(v-for="(g, i) in animeObj.generos" :generoId="g" :key="i")
                    // span.generos(v-for="g in animeObj.generos")  {{ $store.state.listaGeneros.find(x => x.genero_id === g).nombre }}

                temporadas(:anime="animeObj")
                lista-de-episodios(:anime="animeObj")
                comentarios
    //
</template>

<script lang="coffee">
    import imagenAnime from "../components/Anime/imagen-anime.vue"
    import info from "../components/Anime/info.vue"
    import mal from "../components/Anime/mal.vue"
    import twitter from "../components/Anime/twitter.vue"
    import genero from "../components/Anime/genero.vue"
    import temporadas from "../components/Anime/temporadas.vue"
    import listaDeEpisodios from "../components/Anime/lista-de-episodios.vue"
    import comentarios from "../components/Anime/comentarios.vue"
    import redesSociales from "../components/Anime/redes-sociales.vue"
    import store from "../store.coffee"

    export default
        name: "Anime"
        components:
            "imagen-anime": imagenAnime
            "redes-sociales": redesSociales
            "info": info
            "mal": mal
            "twitter": twitter
            "temporadas": temporadas
            "lista-de-episodios": listaDeEpisodios
            "comentarios": comentarios
            "genero": genero
        data: ->
            animeObj: {imagenes: {}}
            animeExiste: true
        computed:
            colorEtiqueta: ->
                if @animeObj.en_emision then "background: #01bc59" else "background: #ff0241"
        methods:
            inicializarAnimeObj: (err) ->
                @$store.commit "terminarCargaPagina"
                if err? then @animeExiste = false
            cambiarAnime: (obj) ->
                console.log "Se deberia haber cambiado..."
                @animeObj = obj

        beforeRouteEnter: (to, from, next) ->
            fun = ->
                nombreRuta = to.path
                animes = store.state.listaAnimes.filter (a) -> a.ruta == nombreRuta
                if animes.length == 1
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
        beforeRouteUpdate: (to, from, next) ->
            if to.params.animeObj?
                @cambiarAnime to.params.animeObj
                next()
            else
                nombreRuta = to.path
                animes = store.state.listaAnimes.filter (a) -> a.ruta == nombreRuta
                if animes.length == 1
                    @cambiarAnime animes[0]
                    next()
                else
                    console.error "No se encontró un anime con ruta #{nombreRuta}"
                    @inicializarAnimeObj true
                    next()


        created: ->
            if @$store.state.modoAdmin
                @animeObj = @$store.state.animeAdmin
            else
                unless @$route?.params?.animeObj?
                    nombreRuta = @$route.path
                    animes = @$store.state.listaAnimes.filter (a) -> a.ruta == nombreRuta
                    if animes.length == 1
                        console.log "existe #{nombreRuta}"
                    else
                        @animeExiste = no
                        console.error "No existe#{nombreRuta}"
                else
                    @animeObj = @$route.params.animeObj

    #
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .an
        background-color: var(--fondo2)

    .cont
        position: relative
        margin-top: -150px
        grid-template-columns: 250px 1fr
        display: grid
        grid-gap: 2.5rem

    .contImg
        position: relative
        .imagen
            width: 100%

    .estado
        color: white
        cursor: pointer
        text-align: center
        text-transform: uppercase
        font:
            size: 1.1rem
            weight: 700
            family: $titulos
        padding: .5rem 0
        position: absolute
        top: calc(100% - 22px)
        left: 0
        right: 0
        width: 95%
        margin: auto
        z-index: 1
        border-radius: 3px
        display: block
        transition: opacity 300ms ease-in-out
        &:hover
            opacity: 0.9

    .sinopsis
        @extend %caja-textos
        background-color: var(--fondo1)
        .tit
            line-height: 1.3
            font:
                weight: 600
                family: $titulos
                size: 1.8rem
            color: var(--texto1)
            padding-bottom: .3em
        .txt
            @extend %textosGris
            margin-bottom: 1.25rem
            line-height: 1.6
        .generos
            color: var(--texto1)

    @media only screen and (max-width: 500px)
        .cont
            grid-template-columns: initial
            grid-gap: 0

    //
</style>
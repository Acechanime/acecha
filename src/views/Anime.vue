<template lang="pug">
    div.an
        template(v-if="animeObj.id")
            imagen-anime(:nombre="animeObj.nombre || ''" :img="animeObj.fondo || ''")
            main.cont.contenedor(v-show="!$store.state.reproductor.activo")
                div
                    div.contImg
                        img.imagen(:src="animeObj.portada")
                        figcaption.estado(:style="colorEtiqueta") {{ animeObj.en_emision? 'en emision': 'finalizado' }}
                            span.icon-check-box
                    redes-sociales
                    info(:animeObj="animeObj")
                    mal(:url="animeObj.mal? animeObj.mal: 'err'" v-if="!esMovil")
                    twitter(v-if="!esMovil")
                    template(v-if="esMovil")
                        br
                        br
                div
                    sinopsis(:sinopsis="animeObj.sinopsis" :generos="animeObj.generos")
                    temporadas(:anime="animeObj")
                    lista-de-episodios(:anime="animeObj")

            router-view
            div.contenedor.contenedor_comentarios
                comentarios
            br
        template(v-else-if="!$store.state.datos.animeActualCargado")
            div.separador
            p Cargando...
        template(v-else)
            div.separador
            en-construccion(titulo="Esta página no existe"
                texto="Vuelve al inicio para ver nuestros animes disponibles."
            )


    //
</template>

<script lang="coffee">
    import imagenAnime from "../components/Anime/imagen-anime.vue"
    import info from "../components/Anime/info.vue"
    import mal from "../components/Anime/mal.vue"
    import twitter from "../components/Anime/twitter.vue"
    import sinopsis from "../components/Anime/sinopsis.vue"
    import generos from "../components/Anime/generos.vue"
    import temporadas from "../components/Anime/temporadas.vue"
    import listaDeEpisodios from "../components/Anime/lista-de-episodios.vue"
    import comentarios from "../components/Anime/comentarios.vue"
    import redesSociales from "../components/Anime/redes-sociales.vue"
    import EnConstruccion from "./mantenimiento.vue"
    import store from "../store/store.coffee"


    export default
        name: "Anime"
        scrollToTop: true
        metaInfo: ->
            title: if @animeObj?.nombre? then @animeObj.nombre else "404"
        components: {
            imagenAnime
            redesSociales
            info
            mal
            twitter
            sinopsis
            temporadas
            listaDeEpisodios
            comentarios
            generos
            EnConstruccion
        }
        computed:
            colorEtiqueta: ->
                if @animeObj.en_emision then "background: #01bc59" else "background: #ff0241"

            animeActualCargado: -> @$store.state.datos.animeActualCargado
            animeObj: -> @$store.state.datos.animeActual

            esMovil: ->
                if process.client == false then return true

                @$store.state.datos.resizeEvent
                window.innerWidth < 600

        methods:
            cambiarAnime: (obj) ->
                @animeObj = obj

        beforeRouteUpdate: (to, from, next) ->
            console.log "Actualizando?"
            if process.client == false then next()
            if to.params.anime == from.params.anime then next()

            new Promise (resolve, reject) =>
                store.dispatch "datos/cargarAnime", "/#{to.params.anime}/"

                intervalo = setInterval (=>
                    if store.state.datos.animeActualCargado == true && store.state.datos.animeActualCargando == false
                        clearInterval intervalo

                        if store.state.datos.animeActual.id?
                            next()
                        else
                            next()

                ), 100

        beforeRouteEnter: (to, from, next) ->
            if process.client == false then next()

            new Promise (resolve, reject) =>
                store.dispatch "datos/cargarAnime", "/#{to.params.anime}/"

                intervalo = setInterval (=>
                    if store.state.datos.animeActualCargado == true && store.state.datos.animeActualCargando == false
                        clearInterval intervalo

                        if store.state.datos.animeActual.id?
                            next()
                        else
                            next()

                ), 100

        mounted: ->
            if !@$store.state.datos.animeActualCargado && !@$store.state.datos.animeActualCargando
                @$store.dispatch "datos/cargarAnime", "/#{ @$route.params.anime }/"

#
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .an
        background-color: var(--fondo1)

    .cont
        position: relative
        margin-top: -150px
        grid-template-columns: 250px 1fr
        display: grid
        grid-gap: 2.5rem


    .contenedor_comentarios
        @extend %caja-textos


    .contImg
        position: relative
        text-align: center
        .imagen
            width: 100%

    .estado
        box-shadow: 0 0 15px 0 rgba(0,0,0,0.5)
        color: white
        cursor: pointer
        text-align: center
        text-transform: uppercase
        font:
            size: 1.1rem
            weight: 700
            family: var(--fuenteTitulos)
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



    @media only screen and (max-width: 850px)
        .contenedor_comentarios
            padding: 0.5rem


    @media only screen and (max-width: $anchoMovil)
        .cont
            grid-template-columns: initial
            grid-gap: 0

        .contImg .imagen
            width: 75%

        .estado
            width: 85%

        .contenedor_comentarios
            width: 100%

    //
</style>

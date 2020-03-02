<template lang="pug">
    div#app
        barra-navegacion
        router-view
        pie-pagina
        // ver-anime
        modo-color
        indicador-beta(v-if="esBeta")
    //
</template>

<script lang="coffee">
    import BarraNavegacion from "./components/barra-navegacion.vue"
    import PiePagina from "./components/pie-pagina.vue"
    import pantallaCarga from "./components/App/pantalla-carga.vue"
    import modoColor from "./components/App/modo-color.vue"
    import indicadorBeta from "./components/App/indicador-beta.vue"
    import VerAnime from "./views/VerAnime.vue"
    import {servidor} from "./variables"

    quitarPantallaCarga = ->
        ###
        elem = document.getElementById "pantalla-carga"
        elem.style.opacity = "0"
        setTimeout (=>
            elem.style.display = "none"
            document.body.style.overflow = "initial"
        ), 250
        ###

    esBeta = (window.location.hostname.search "beta") != -1


    export default
        components:
            "pie-pagina": PiePagina
            "barra-navegacion": BarraNavegacion
            "pantalla-carga": pantallaCarga
            "ver-anime": VerAnime
            "modo-color": modoColor
            "indicador-beta": indicadorBeta
        data: ->
            esBeta: esBeta
        computed:
            esPagPrin: ->
                this.$route.path is "/"
            cargaCompleta: -> @$store.state.datos.paginaLista
        watch:
            cargaCompleta: (n, p) ->
                if n is yes then quitarPantallaCarga()
        methods:
            obtenerListaAnimes: ->
                try
                    resRaw = await fetch "#{servidor}/animes"
                    res = await resRaw.json()

                    if res.exito
                        [undefined, res.payload]
                    else throw new Error res.error.razon
                catch e
                    [e, undefined]
            inicializarListaAnimes: ->
                [err, res] = await @obtenerListaAnimes()
                unless err?
                    @$store.commit "cambiarListaAnimes", res
                else
                    console.log "Error al obtener la lista de animes desde el servidor.\n#{err}"
                    @$store.commit "cambiarListaAnimes", []
            # Ahora la lista de generos se carga en el store.
            ###
            inicializarListaGeneros: ->
                res =
                    try
                        resRaw = await fetch "#{servidor}/api/generos"
                        await resRaw.json()
                    catch e
                        {exito: false, err: e}
                if res?.exito
                    @$store.commit "cambiarListaGeneros", res.payload
                else
                    console.log "Error al obtener la lista de " +
                        "generos desde el servidor.\n#{res.err}"
            ###
        created: ->
            @$store.commit "registrarResizeEvent"
            if @$store.state.datos.listaAnimes is undefined
                @inicializarListaAnimes()

            ###
            if @$store.state.listaGeneros.length == 0
                @inicializarListaGeneros()
            ###

#
</script>

<style lang="sass">

    #app
        background-color: var(--fondo1)

    //
</style>

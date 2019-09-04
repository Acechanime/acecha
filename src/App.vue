<template lang="pug">
    div#app
        barra-navegacion
        router-view
        pie-pagina
        // ver-anime
    //
</template>

<script lang="coffee">
    import BarraNavegacion from "./components/barra-navegacion.vue"
    import PiePagina from "./components/pie-pagina.vue"
    import pantallaCarga from "./components/App/pantalla-carga.vue"
    import VerAnime from "./views/VerAnime.vue"
    import {servidor} from "./variables";

    quitarPantallaCarga = ->
        elem = document.getElementById "pantalla-carga"
        elem.style.opacity = "0"
        setTimeout (=>
            elem.style.display = "none"
            document.body.style.overflow = "initial"
        ), 250

    export default
        components:
            "pie-pagina": PiePagina
            "barra-navegacion": BarraNavegacion
            "pantalla-carga": pantallaCarga
            "ver-anime": VerAnime
        computed:
            esPagPrin: ->
                this.$route.path is "/"
            cargaCompleta: -> @$store.state.paginaLista
        watch:
            cargaCompleta: (n, p) ->
                if n is yes then quitarPantallaCarga()
        methods:
            obtenerListaAnimes: ->
                try
                    resRaw = await fetch "#{servidor}/api/animes"
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
        created: ->
            if @$store.state.listaAnimes.length == 0
                @inicializarListaAnimes()
            if @$store.state.listaGeneros.length == 0
                @inicializarListaGeneros()

    #
</script>

<style lang="sass">

    #app
        background-color: var(--fondo1)

    //
</style>
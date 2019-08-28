<template lang="pug">
    div#app
        pantalla-carga
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

    export default
        components:
            "pie-pagina": PiePagina
            "barra-navegacion": BarraNavegacion
            "pantalla-carga": pantallaCarga
            "ver-anime": VerAnime
        computed:
            esPagPrin: ->
                this.$route.path is "/"
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
                    console.error err
            inicializarListaGeneros: ->
                resRaw = await fetch "#{servidor}/api/generos"
                res = await resRaw.json()
                if res?.exito
                    @$store.commit "cambiarListaGeneros", res.payload
                else
                    console.error err
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
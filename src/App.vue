<template lang="pug">
    div#app
        pantalla-carga
        barra-navegacion
        router-view
        pie-pagina
    //
</template>

<script lang="coffee">
    import BarraNavegacion from "./components/barra-navegacion.vue"
    import PiePagina from "./components/pie-pagina.vue"
    import YAML from "yaml"
    import pantallaCarga from "./components/App/pantalla-carga.vue"

    impr = console.log

    export default
        components:
            "pie-pagina": PiePagina
            "barra-navegacion": BarraNavegacion
            "pantalla-carga": pantallaCarga
        computed:
            esPagPrin: ->
                this.$route.path is "/"
        methods:
            obtenerListaAnimes: ->
                try
                    resRaw = await fetch "/static/animes.yaml"
                    resTxt = await resRaw.text()
                    res = YAML.parse resTxt
                    if typeof res isnt "object"
                        throw new Error "No se recibió un objeto."

                    [undefined, res]
                catch e
                    [e, undefined]
            inicializarListaAnimes: ->
                [err, res] = await @obtenerListaAnimes()
                unless err?
                    @$store.commit "cambiarListaAnimes", res
                else
                    console.error err
        created: ->
            console.log @$store.state.listaAnimes.length
            if @$store.state.listaAnimes.length == 0
                @inicializarListaAnimes()
                console.log "Inicializado"


    #
</script>

<style lang="sass">

    //
</style>
<template>
    <div id="app">
        <barra-navegacion />
        <div :class="separadorClase"></div>
        <router-view/>
        <pie-pagina />
    </div>
</template>

<script lang="coffee">
    import BarraNavegacion from "./components/barra-navegacion.vue"
    import PiePagina from "./components/pie-pagina.vue"
    import YAML from "yaml"

    impr = console.log

    export default
        components:
            "pie-pagina": PiePagina
            "barra-navegacion": BarraNavegacion
        computed:
            esPagPrin: ->
                this.$route.path is "/"
            separadorClase: ->
                if this.esPagPrin then "" else "separador"
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
            @inicializarListaAnimes()

    #
</script>

<style lang="sass">
    .separador
        height: 70px
        width: 100%

    //
</style>
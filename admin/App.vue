<template lang="pug">
    div
        cabecera
        inicio
    //
</template>

<script lang="coffee">
    import Inicio from "./views/Inicio.vue"
    import cabecera from "./components/cabecera.vue"

    export default
        name: "App"
        components:
            "inicio": Inicio
            "cabecera": cabecera
        methods:
            obtenerListaAnimes: ->
                try
                    resRaw = await fetch "/api/animes"
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
                resRaw = await fetch "/api/generos"
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

<style scoped lang="sass">

    //
</style>
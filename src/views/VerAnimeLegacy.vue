<template lang="pug">
    main.cont.contenedor
        div
            div.fondo
                reproductor(:links="links")
                descarga(:links="$store.state.verAnime.descarga")
            comentarios
        div.fondo
            publicidad
    //
</template>

<script lang="coffee">
    import reproductor from "../components/VerAnime/reproductor.vue"
    import descarga from "../components/VerAnime/descarga.vue"
    import comentarios from "../components/VerAnime/comentarios.vue"
    import publicidad from "../components/Animes/publicidad.vue"

    export default
        name: "VerAnimeLegacy"
        components: { reproductor, descarga, comentarios, publicidad }
        computed:
            listaEps: -> @$store.state.verAnime.listaEpisodios
            numEp: -> @$store.state.verAnime.ep
            links: ->
                res =
                    if @listaEps.length isnt 0 and @numEp?
                        @listaEps.find (a) => a.num_ep is @numEp
                    else {}
                res
        mounted: ->
            @$store.commit "activarVerAnime"
        beforeDestroy: ->
            @$store.commit "desactivarVerAnime"
    #
    
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .cont
        grid-template-columns: 1fr 250px

    .fondo
        background-color: var(--fondo1)

    //
</style>
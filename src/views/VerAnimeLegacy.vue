<template lang="pug">
    main.cont.contenedor
        div
            div.fondo
                reproductor(:links="links")
                descarga(:links="$store.state.verAnime.descarga")
            comentarios
        div.fondo(v-if="!esMovil")
            publicidad
    //
</template>

<script lang="coffee">
    import reproductor from "../components/VerAnime/reproductor.vue"
    import descarga from "../components/VerAnime/descarga.vue"
    import comentarios from "../components/VerAnime/comentarios.vue"
    import publicidad from "../components/Animes/publicidad.vue"

    extraerDatos = =>
        url = (new URL window.location.href).pathname.toString()
        patron = /\/(ep|ova)(\d+)$/
        res = patron.exec url

        if res?
            [
                if res[1] is "ova" then true else false
                res[2]
            ]
        else []

    export default
        name: "VerAnimeLegacy"
        components: { reproductor, descarga, comentarios, publicidad }
        computed:
            esMovil: -> window.innerWidth < 780
            listaEps: -> @$store.state.verAnime.listaEpisodios
            numEp: -> @$store.state.verAnime.ep
            links: ->
                res =
                    if @listaEps.length isnt 0 and @numEp? and @numEp isnt -1
                        (@listaEps.find (a) => a.num_ep is @numEp) ? {}
                    else {}
                res
        mounted: ->
            @$store.commit "activarVerAnime"
            res = extraerDatos()
            if res.length isnt 0
                [esOva, numEp] = res
                @$store.commit "cambiarDatosVerAnime",
                    nombre: ""
                    esOva: esOva
                    ep: parseInt numEp
                    ruta: ""
            else

        beforeDestroy: ->
            @$store.commit "desactivarVerAnime"
    #
    
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .cont
        grid-template-columns: 1fr 250px


    .fondo
        @extend %caja-textos
        padding-left: 5px
        padding-right: 5px
        background-color: var(--fondo1)

    @media only screen and (max-width: 780px)
        .cont
            grid-template-columns: none


    //
</style>

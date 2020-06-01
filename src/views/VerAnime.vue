<template lang="pug">
    div.ver(:class="activo? 'activo': ''")
        cerrar
        div.contenedor
            div.grid
                div.fondo
                    reproductor(:links="data.anime" :linkss="linksVer")
                    descarga(:links="data.descarga")
                    hr
                    comentarios
                div.publicidad
                    publicidad
    //
</template>

<script lang="coffee">
    import cerrar from "../components/VerAnime/cerrar.vue"
    import publicidad from "../components/Animes/publicidad.vue"
    import reproductor from "../components/VerAnime/reproductor.vue"
    import descarga from "../components/VerAnime/descarga.vue"
    import comentarios from "../components/VerAnime/comentarios.vue"

    obtenerParams = (url) =>
        console.log "La url es #{url}"
        if /\/ep(\d+)$/.test url
            [false, parseInt (/\/ep(\d+)$/.exec url)[1]]
        else if /\/ova(\d+)$/.test url
            [true, parseInt (/\/ova(\d+)$/.exec url)[1]]
        else
            [false, -1]

    export default
        name: "ver-anime"
        components: { cerrar, publicidad, reproductor, descarga, comentarios }
        computed:
            activo: -> @$store.state.verAnime.activo
            data: ->
                vm = this
                a = @$store.state.verAnime
                unless a.mega? and a.rapidvideo? and a.mango? and a.mp4upload and a.okru
                    a
                else
                    a
            listaEpisodios: -> @$store.state.verAnime.listaEpisodios
            linksVer: ->
                l = @listaEpisodios
                numEp = @$store.state.verAnime.ep
                esOva = @$store.state.verAnime.esOva
                res =
                    if numEp isnt -1
                        l.find (a) => a.num_ep is numEp and a.es_ova is esOva
                    else
                        url = window.location.href
                        [esOva, numEp] = obtenerParams url
                        console.log "obtener -> #{esOva} - #{numEp}"
                        l.find (a) => a.num_ep is numEp and a.es_ova is esOva
                console.log res
                res

        watch:
            activo: (nuevo) ->
                vm = this
                evento = (e) =>
                    if vm.$store.state.verAnime.activo
                        document.body.style.overflow = ""
                        vm.$store.commit "desactivarVerAnime"

                if nuevo
                    document.body.style.overflow = "hidden"
                    intervalo = setInterval((() =>
                        if vm.$store.state.paginaLista
                            history.pushState({}, null, @data.ruta);
                            window.onpopstate = evento
                            clearInterval intervalo
                    ), 250)
                else
                    window.onpopstate = null

    #
</script>

<style scoped lang="sass">

    .ver
        color: var(--texto1)
        // background-color: var(--fondo3)
        background: linear-gradient(to bottom, #924066, var(--fondo3) 500px)
        position: fixed
        z-index: 19
        top: 0
        left: 0
        width: 100%
        height: 100%
        transform: translateY(100%)
        transition: transform 500ms ease-in-out
        overflow-y: scroll

    .activo
        transform: translateY(0)

    .grid
        margin: 25px 0 !important
        display: grid
        grid-template-columns: 1fr 250px
        grid-gap: 2rem

    .fondo, .publicidad
        background-color: var(--fondo1)
        border-radius: 10px
        margin-top: 44px

    //
</style>
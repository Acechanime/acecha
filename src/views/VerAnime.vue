<template lang="pug">
    div.ver(:class="activo? 'activo': ''")
        cerrar
        div.contenedor
            div.grid
                div
                    reproductor(:links="data.anime")
                    p khe?
                div.publicidad
                    publicidad
    //
</template>

<script lang="coffee">
    import cerrar from "../components/VerAnime/cerrar.vue"
    import publicidad from "../components/Animes/publicidad.vue"
    import reproductor from "../components/VerAnime/reproductor.vue"

    export default
        name: "ver-anime"
        components: { cerrar, publicidad, reproductor }
        computed:
            activo: -> @$store.state.verAnime.activo
            data: -> @$store.state.verAnime
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

    .activo
        transform: translateY(0)

    .grid
        margin: 25px 0 !important
        display: grid
        grid-template-columns: 1fr 250px
        grid-gap: 2rem

    .publicidad
        background-color: var(--fondo1)

    //
</style>
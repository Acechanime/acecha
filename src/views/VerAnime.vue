<template lang="pug">
    div.ver(:class="activo? 'activo': ''")
        // div.separador
        cerrar
        div Ver Anime
        p {{ $store.state.verAnime.ruta }}
    //
</template>

<script lang="coffee">
    import cerrar from "../components/VerAnime/cerrar.vue"

    export default
        name: "ver-anime"
        components: { cerrar }
        computed:
            activo: -> @$store.state.verAnime.activo
            data: -> @$store.state.verAnime
        watch:
            activo: (nuevo, viejo) ->
                vm = this
                if nuevo
                    intervalo = setInterval((() =>
                        if vm.$store.state.paginaLista
                            history.pushState({}, null, @data.ruta);
                            clearInterval intervalo
                    ), 250)

    #
</script>

<style scoped lang="sass">

    .ver
        color: var(--texto1)
        background-color: var(--fondo3)
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

    //
</style>
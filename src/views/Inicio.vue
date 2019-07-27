<template lang="pug">
    div.inicio
        imagen-principal
        ultimos-episodios(:terminarCarga="terminarCarga")
        episodios(:terminarCarga="terminarCarga")
        recomendacion-semanal(:terminarCarga="terminarCarga")
        video-recomendado(:terminarCarga="terminarCarga")
        comentarios
</template>

<script lang="coffee">
    import Comentarios from "../components/Inicio/comentarios.vue";
    import RecomendacionSemanal from "../components/Inicio/recomendacion-semanal.vue";
    import Episodios from "../components/Inicio/episodios.vue";
    import UltimosEpisodios from "../components/Inicio/ultimos-episodios.vue";
    import ImagenPrincipal from "../components/Inicio/imagen-principal.vue";
    import VideoRecomendado from "../components/Inicio/video-recomendado.vue"

    export default
        name: "Inicio"
        components:
            "imagen-principal": ImagenPrincipal
            "ultimos-episodios": UltimosEpisodios
            "episodios": Episodios
            "recomendacion-semanal": RecomendacionSemanal
            "video-recomendado": VideoRecomendado
            "comentarios": Comentarios
        data: ->
            componentesCargando: 4
            fecha_recomendacion: 0
            recomendacion: ""
            video_recomendado: ""
        methods:
            terminarCarga: () ->
                @componentesCargando--
                if @componentesCargando is 0 then @$store.commit "terminarCargaPagina"
        created: ->

    #

</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .inicio
        background-color: var(--fondo1)

    //

</style>
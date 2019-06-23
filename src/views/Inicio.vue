<template lang="pug">
    div
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
        methods:
            terminarCarga: () ->
                @componentesCargando--
                console.log "Ahora hay #{@componentesCargando} cargando."
                if @componentesCargando is 0 then @$store.commit "terminarCargaPagina"
        created: ->

    #

</script>

<style scoped lang="sass">

    //

</style>
<template lang="pug">
    div.inicio
        imagen-principal
        ultimos-episodios(:terminarCarga="terminarCarga"
            :epRecientePrincipal="epRecientePrincipal" :cargaTerminada="cargaTerminada")
        episodios(:terminarCarga="terminarCarga" :ultimosEpisodios="epsRecientes"
            :cargaTerminada="cargaTerminada")
        recomendacion-semanal(:terminarCarga="terminarCarga")
        video-recomendado(:terminarCarga="terminarCarga")
        comentarios

    //
</template>

<script lang="coffee">
    import Comentarios from "../components/Inicio/comentarios.vue";
    import RecomendacionSemanal from "../components/Inicio/recomendacion-semanal.vue";
    import Episodios from "../components/Inicio/episodios.vue";
    import UltimosEpisodios from "../components/Inicio/ultimos-episodios.vue";
    import ImagenPrincipal from "../components/Inicio/imagen-principal.vue";
    import VideoRecomendado from "../components/Inicio/video-recomendado.vue"
    import {servidor} from "../variables";

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
            epRecientePrincipal: {}
            epsRecientes: []
            cargaTerminada: no
        methods:
            terminarCarga: () ->
                @componentesCargando--
                if @componentesCargando is 0 then @$store.commit "terminarCargaPagina"
        created: ->
            # Carga los datos
            epsRecientesRaw = await fetch "#{servidor}/api/episodiosRecientes"
            epsRecientes = await epsRecientesRaw.json()

            if epsRecientes.exito? && epsRecientes.exito
                epRecientePrincipal = epsRecientes.payload.reduce (acc, nuevo) =>
                    if nuevo["nivel_prioridad"] > acc["nivel_prioridad"] then nuevo else acc
                @epRecientePrincipal = epRecientePrincipal
                @epsRecientes = epsRecientes.payload.filter (x) =>
                    x["link_id"] != epRecientePrincipal["link_id"]

            @cargaTerminada = yes
    #

</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .inicio
        background-color: var(--fondo1)
        width: 100%

    //

</style>
<template lang="pug">
    div.inicio
        imagen-principal
        ultimos-episodios(:terminarCarga="terminarCarga"
            :epRecientePrincipal="epRecientePrincipal")
        episodios(:terminarCarga="terminarCarga" :ultimosEpisodios="epsRecientes")
        recomendacion-semanal(:terminarCarga="terminarCarga")
        // video-recomendado(:terminarCarga="terminarCarga")
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
            componentesCargando: 2
            fecha_recomendacion: 0
            recomendacion: ""
            video_recomendado: ""
            epRecientePrincipal: {}
            epsRecientes: []
        methods:
            terminarCarga: () ->
                @componentesCargando--
                if @componentesCargando is 0 then @$store.commit "terminarCargaPagina"
        created: ->
            # Carga los datos
            epsRecientes =
                try
                    epsRecientesRaw = await fetch "#{servidor}/episodios/reciente"
                    await epsRecientesRaw.json()
                catch e
                    console.log "Error al recuperar los episodios recientes.\n#{e}"
                    { exito: no, err: e, status: epsRecientesRaw?.status }
            if epsRecientes.exito? && epsRecientes.exito
                epRecientePrincipal = epsRecientes.payload.reduce (acc, nuevo) =>
                    if nuevo["nivel_prioridad"] > acc["nivel_prioridad"] then nuevo else acc
                @epRecientePrincipal = epRecientePrincipal
                @epsRecientes = epsRecientes.payload.filter (x) =>
                    x.episodio_id != epRecientePrincipal.episodio_id
            else
                console.log "Error al obtener los episodios recientes. " +
                    "Código #{epsRecientes.status}.\n#{epsRecientes.err}"

            @terminarCarga()

#
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .inicio
        background-color: var(--fondo1)
        width: 100%

    //

</style>
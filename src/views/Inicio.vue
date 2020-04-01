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

            try
                resRaw = await fetch "#{servidor}/animes/episodios/reciente"
                if resRaw.ok is true

                    [epRecientePrincipal, epsRecientes...] = await resRaw.json()
                    @epRecientePrincipal = epRecientePrincipal
                    @epsRecientes = epsRecientes

                else
                    console.error resRaw
                    throw new Error "Error al recuperar episodios recientes."
            catch e
                console.error e


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
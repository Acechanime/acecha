<template lang="pug">
    div.contenedor.grid.eps
        episodio(v-if="episodios.length > 0" v-for="(ep, i) in episodios" :ep="ep" :key="i")
        div.err(v-if="cargaFallida")
            span.
                Hubo un error al cargar los animes recientes :c<br>
                Vuelve en unos minutos, o escribenos en Discord.<br>
            p.tech Código de error: 0x{{ codigoDeError }}
    //
</template>

<script lang="coffee">
    import Episodio from "../../components/Inicio/episodio";
    import { manejarError } from "./manejo-errores.coffee"

    export default
        name: "episodios"
        components:
            episodio: Episodio
        data: ->
            cargaFallida: no
            codigoDeError: ""
        props:
            terminarCarga:
                type: Function
                required: yes
            ultimosEpisodios:
                type: Array
                required: yes
            cargaTerminada:
                type: Boolean
                required: yes
        computed:
            episodios: ->
                if @ultimosEpisodios.length isnt 0 then @ultimosEpisodios
                else []
        watch:
            cargaTerminada: (estado) ->
                vm = this
                if estado
                    if @ultimosEpisodios.length is 0
                        manejarError "No se recibió un objeto con los episodios.", "F1", vm
                    @terminarCarga()

    #

</script>

<style scoped lang="sass">

    .eps
        padding: 48px 0

    .grid
        display: grid
        grid-template-columns: repeat(4, 1fr)
        grid-gap: 1rem

    //

</style>
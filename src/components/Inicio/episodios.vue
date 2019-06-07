<template lang="pug">
    div.contenedor.row.eps
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
    import YAML from "yaml"
    import { manejarError } from "../../mixins/manejar-error.coffee"

    export default
        name: "episodios"
        mixins: [
            manejarError
        ]
        components:
            episodio: Episodio
        data: ->
            episodios: []
            cargaFallida: no
            codigoDeError: ""
        created: ->
            vm = this

            try
                xhr = await fetch "/static/ultimos-eps.yaml"
                resTxt = await xhr.text()
                res = YAML.parse resTxt
                if typeof res is "object"
                    vm.episodios = res
                else vm.manejarError "No se recibió un objeto YAML desde el servidor.", "F1", vm
            catch e
                vm.manejarError e, "F0", vm
    #

</script>

<style scoped lang="sass">

    .eps
        padding: 48px 0

    //

</style>
<template lang="pug">
    div.capitulos
        h2.titulo Lista de Capítulos
        p.label Todas las temporadas de {{ anime.nombre }}
        div.eps
            episodio(v-for="(ep, i) in episodios" :key="i" :episodio="ep" :nombre="anime.nombre")
    //
</template>

<script lang="coffee">
    import episodio from "./episodio.vue"

    export default
        name: "lista-de-episodios"
        components: { episodio }
        props:
            anime:
                type: Object
                required: true
        data: ->
            episodios: []
            estadoCarga: 0
        created: ->
            datosRaw = await fetch "/api/episodios?anime_id=#{@anime.anime_id}"
            datos = await datosRaw.json()
            @estadoCarga =
                if datos.exito? && datos.exito
                    @episodios = datos.payload
                    1
                else -1


    #

</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .capitulos
        margin: 50px 0
        text-align: center

    .titulo
        color: var(--texto1)
        font:
            family: $titulos
            size: 1.75rem

    .label
        @extend %textosGris
        margin: 10px 0

    .eps
        @extend %caja-textos
        padding: 0
        background-color: var(--fondo1)
        color: var(--texto1)

    //
</style>
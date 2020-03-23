<template lang="pug">
    article.sinopsis
        div.tit Sinopsis
        p.txt
            span(v-html="sinopsisCambiada")
            span.leer-mas(v-if="!leerMas && largoSinopsis > 250" @click="mostrarTodaSinopsis") leer mas
        generos(:generos="generos")
        // span.generos(v-for="g in animeObj.generos")  {{ $store.state.listaGeneros.find(x => x.genero_id === g).nombre }}

    //
</template>

<script lang="coffee">
    import generos from "./generos.vue"

    export default
        name: "sinopsis"
        components: { generos }
        data: ->
            leerMas: false
        props:
            sinopsis:
                type: String
                required: true
            generos:
                type: Array
                required: true
        computed:
            esMovil: ->
                @$store.state.datos.resizeEvent
                window.innerWidth <= 500
            largoSinopsis: -> @sinopsis.length
            sinopsisCambiada: ->
                if @esMovil and @largoSinopsis > 250
                    if @leerMas then @sinopsis
                    else (@sinopsis.substring 0, 250) + "..."
                else @sinopsis
        methods:
            mostrarTodaSinopsis: ->
                @leerMas = true


    
#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .leer-mas
        padding: 0 0.5rem
        font-weight: bold
        text-decoration: underline
        cursor: pointer


    .sinopsis
        @extend %caja-textos
        background-color: var(--fondo2)
        .tit
            line-height: 1.3
            font:
                weight: 600
                family: $titulos
                size: 1.8rem
            color: var(--texto1)
            padding-bottom: .3em
        .txt
            @extend %textosGris
            margin-bottom: 1.25rem
            line-height: 1.6
        .generos
            color: var(--texto1)
    
    //
</style>
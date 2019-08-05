<template lang="pug">
    li.gen
        span.icon(v-html="codigoIcono")
        | {{ gen.nombre }}
    //
</template>

<script lang="coffee">

    export default
        name: "genero"
        props:
            generoId:
                type: Number
                required: true
        computed:
            gen: ->
                res = @$store.state.listaGeneros.find (x) => x.genero_id == @generoId
                res ? {}
            codigoIcono: -> "&##{ parseInt @gen.icono, 16 };"
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .gen
        display: inline-block
        color: var(--texto1)
        list-style-type: none
        margin-right: 2rem

    .icon
        font-family: icomoon !important
        margin-right: 0.5rem
        color: var(--first-color)

    //
</style>
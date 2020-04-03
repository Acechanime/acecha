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
                type: String
                required: true
        computed:
            codigoIcono: -> "&#x#{ @gen.icono };"
            gen: ->
                if process.client == false then return {}

                vm = this
                generos = @$store.state.datos.generos
                (generos.find (x) => x.id == vm.generoId) ? {}


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
        color: var(--colorPrincipal)


    //
</style>

<template lang="pug">
    ul.lista(v-if="nombre !== ''")
        item-buscador(v-for="(anime, i) in listaAnimesFiltrada2" :key="i" :anime="anime"
            :limpiarBuscador="limpiarBuscador")
    //
</template>

<script lang="coffee">
    import { filtrar, filtroNombre } from "../../../coffee/buscador.coffee"
    import itemBuscador from "../barra-navegacion-legacy/item-buscador.vue"

    export default
        name: "resultado-buscador"
        components: { itemBuscador }
        props:
            nombre:
                type: String
                required: true
            limpiarBuscador:
                type: Function
                required: true
        computed:
            maxAlto: ->
                if !process.client then return 500

                @$store.state.datos.resizeEvent
                parseInt((window.innerHeight - 100) * 0.9)
            listaAnimes: -> @$store.state.datos.animes
            listaAnimesFiltrada2: ->
                vm = this
                if @listaAnimes isnt undefined
                    filtrar @, @listaAnimes, filtroNombre, 5
                else []

#
</script>

<style scoped lang="sass">

    .lista
        list-style-type: none
        overflow-y: scroll
        transition: max-height 250ms ease-in-out

    //
</style>

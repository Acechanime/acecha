<template lang="pug">
    ul.lista(v-if="nombre !== ''")
        item-buscador(v-for="(anime, i) in listaAnimesFiltrada" :key="i" :anime="anime"
            :limpiarBuscador="limpiarBuscador")
    //
</template>

<script lang="coffee">
    import { comp, removerCaracteres } from "../Animes/buscador.coffee"
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
        data: ->
            maxAlto: parseInt((window.innerHeight - 100) * 0.9)
        computed:
            listaAnimes: -> @$store.state.datos.listaAnimes
            listaAnimesFiltrada: ->
                vm = this
                filtroNombre = (a) ->
                    if vm.nombre.length is 0 then return true
                    palabras = removerCaracteres a.info.nombre, "-:"
                    nombre = removerCaracteres vm.nombre, "-:"
                    if nombre.length is 0 then return true
                    for p1 in palabras
                        for p2 in nombre
                            if (p1.search p2) != -1 then return true
                    return false

                if @listaAnimes isnt undefined
                    (@listaAnimes.filter filtroNombre).slice 0, 5
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
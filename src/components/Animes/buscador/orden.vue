<template lang="pug">
    select(v-model="opcion")
        option(value="-1" selected) Cualquier orden
        option(value="1") Nombre
        option(value="2") Emision
        option(value="3") Agregado recientemente
    //
</template>

<script lang="coffee">

    ###: (Anime, Anime) -> Bool
    Toma 2 animes y los ordena
    ###
    ordenarPorNombre = (x, y) =>

    export default
        name: "orden"
        data: ->
            opcion: -1
        props:
            cambiarFiltro:
                type: Function
                required: true
        watch:
            opcion: (nuevo, viejo) ->


#
</script>

<style scoped lang="sass">
    @import "../../../sass/variables"
    
    //
</style>
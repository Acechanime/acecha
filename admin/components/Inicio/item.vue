<template lang="pug">
    div
        button(@click="cambiarMostrarCrear") Crear nuevo
        crear-anime(v-if="mostrarCrear")
        hr
        p Recomendación semanal \{{ fecha }}\
        input(type="date" v-model="fecha")
        p Video recomendado
        input
    //
</template>

<script lang="coffee">
    import crearAnime from "./crear-anime.vue"

    export default
        name: "item"
        components:
            "crear-anime": crearAnime
        data: ->
            mostrarCrear: no
            fecha: undefined
        methods:
            cambiarMostrarCrear: ->
                @mostrarCrear = !@mostrarCrear
    #
    
</script>

<style scoped lang="sass">

    
    //
</style>
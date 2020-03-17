<template lang="pug">
    div.modo-color(@click="alternarMostrarVersion")
        div.ajuste
            div.titulo-ajuste Mostrar la versión de Acechanime
            // div.etiqueta-ajuste Cambia al modo oscuro/claro en ciertas horas del dia.
            // br
        label.cl-switch.cl-switch-red
            input(type="checkbox" :checked="mostrarVersion")
            span.switcher(@click.prevent.stop="alternarMostrarVersion")

    //
</template>

<script lang="coffee">

    export default
        name: "mostrar-version"
        computed:
            mostrarVersion: -> @$store.state.datos.mostrarVersion
        methods:
            alternarMostrarVersion: ->
                @$store.commit "cambiarMostrarVersion", !@mostrarVersion

#
</script>

<style scoped lang="sass">
    
    //
</style>
<template lang="pug">
    div.contenedor-ajuste
        div.modo-color(@click="alternarMostrar")
            div.ajuste
                div.titulo-ajuste Activar reproductor experimental
                div.etiqueta-ajuste
                    span Puede arreglar errores en Opera Mini, Edge y Firefox.

            div.cont-switch
                label.cl-switch.cl-switch-red
                    input(type="checkbox" :checked="mostrar")
                    span.switcher(@click.prevent.stop="alternarMostrar")

        // div.adicional hola

    //
</template>

<script lang="coffee">

    export default
        name: "activar-reproductor-experimental"
        computed:
            mostrar: -> @$store.state.datos.mostrarReproductorExp
        methods:
            alternarMostrar: ->
                @$store.commit "datos/setMostrarReproductorExp", !@precargarVideo

#
</script>

<style scoped lang="sass">



    //
</style>
<template lang="pug">
    div.contenedor-ajuste
        div.modo-color(@click="alternarMostrar")
            div.ajuste
                div.titulo-ajuste Precargar los episodios de los animes
                div.etiqueta-ajuste
                    span Cuando estés en el reproductor, el episodio
                    b  {{ precargarVideo? '': 'no' }} se cargará
                    span  antes de que le des 'play'.

            div.cont-switch
                label.cl-switch.cl-switch-red
                    input(type="checkbox" :checked="precargarVideo")
                    span.switcher(@click.prevent.stop="alternarMostrar")

        // div.adicional hola

    //
</template>

<script lang="coffee">

    export default
        name: "precargar-video"
        computed:
            precargarVideo: -> @$store.state.datos.precargarVideo
        methods:
            alternarMostrar: ->
                @$store.commit "datos/setPrecargarVideo", !@precargarVideo

#
</script>

<style scoped lang="sass">

    //
</style>

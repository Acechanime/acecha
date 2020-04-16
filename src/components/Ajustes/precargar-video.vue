<template lang="pug">
    div
        div.modo-color(@click="alternarMostrar")
            div.ajuste
                div.titulo-ajuste Precargar los episodios de los animes
                div.etiqueta-ajuste
                    span Cuando estés en el reproductor, el episodio
                    b  {{ precargarVideo? '': 'no' }} se cargará
                    span  antes de que le des 'play'.

            label.cl-switch.cl-switch-red
                input(type="checkbox" :checked="precargarVideo")
                span.switcher(@click.prevent.stop="alternarMostrar")



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

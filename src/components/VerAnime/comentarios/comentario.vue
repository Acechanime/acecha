<template lang="pug">
    div.comentario
        div.autor {{ comentario.autor.nombre }} | {{ fechaDelComentario }}
        div.contenido {{ comentario.contenido }}
        div.botones
            i.material-icons.boton-reply(title="Responder" @click="cambiarEstadoMostrarPanelRespuesta")
                | reply
        div(v-if="mostrarPanelRespuesta")
            entrada-comentario(
                :animeId="animeId"
                :epId="epId"
                :parentId="comentarioId"
                :fnAgregarComentario="metodoVacio"
            )

    //
</template>

<script lang="coffee">
    import entradaComentario from "./entrada-comentario.vue"

    export default
        name: "comentario"
        components: { entradaComentario }
        data: ->
            mostrarPanelRespuesta: false
        props:
            comentario:
                type: Object
                required: true
            animeId:
                type: String
                required: true
            epId:
                type: String
                required: true
        computed:
            comentarioId: -> @comentario.id
            fechaDelComentario: ->
                horaActual = new Date().getTime()
                diferencia = horaActual - @comentario.creacion

                minutos = Math.round(diferencia / 60000)

                if minutos <= 1
                    "Ahora mismo"
                else if minutos < 60
                    "Hace #{ minutos } minutos"
                else if minutos < 1440
                    "Hace #{ Math.round(minutos / 60) } horas"
                else
                    "Hace #{ Math.round(minutos / 24 / 60) } dias"
        methods:
            cambiarEstadoMostrarPanelRespuesta: -> @mostrarPanelRespuesta = !@mostrarPanelRespuesta
            metodoVacio: (comentario) ->
                console.log comentario


#
</script>

<style scoped lang="sass">

    .boton-reply
        display: inline-block
        cursor: pointer
        font-size: 1rem


    .comentario
        margin: 1rem 0


    .autor
        font-size: 0.7rem
        padding-bottom: 0.5rem
        opacity: 0.8


    .contenido
        font-size: 1rem

    //
</style>
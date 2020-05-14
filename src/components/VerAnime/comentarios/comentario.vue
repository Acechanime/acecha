<template lang="pug">
    div.comentario(v-if="!eliminado")
        div.autor {{ comentario.autor.nombre }} | {{ fechaDelComentario }}
        div.contenido {{ comentario.contenido }}
        div.botones
            i.material-icons.boton-reply(title="Responder" @click="cambiarEstadoMostrarPanelRespuesta")
                | reply
            i.material-icons.boton-reply(
                v-if="usuarioActualEsAutor"
                title="Eliminar" @click="eliminarComentario"
            )
                | delete
        div.anidado
            div(v-if="mostrarPanelRespuesta")
                entrada-comentario(
                    :animeId="animeId"
                    :epId="epId"
                    :parentId="comentarioId"
                    :fnAgregarComentario="agregarComentario"
                )
            comentario(v-for="(subcomentario, pos) in comentariosAdicionales"
                :key="subcomentario.id"
                :comentario="subcomentario"
                :animeId="animeId"
                :epId="epId"
            )
            comentario(v-for="(subcomentario, pos) in comentario.children"
                :key="subcomentario.id"
                :comentario="subcomentario"
                :animeId="animeId"
                :epId="epId"
            )

    //
</template>

<script lang="coffee">
    import entradaComentario from "./entrada-comentario.vue"
    import { servidor } from "../../../coffee/variables.coffee"

    export default
        name: "comentario"
        components: { entradaComentario }
        data: ->
            mostrarPanelRespuesta: false
            comentariosAdicionales: []
            eliminado: false
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
            usuarioActual: -> @$store.state.usuario.usuarioActual
            usuarioActualEsAutor: -> @comentario?.autor?.id == @usuarioActual?.id
            tokenUsuarioActual: -> @$store.state.usuario.usuarioActual?.token
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
            establecerChildren: ->
                @children = @comentario.children ? []
        methods:
            cambiarEstadoMostrarPanelRespuesta: -> @mostrarPanelRespuesta = !@mostrarPanelRespuesta
            agregarComentario: (comentario) ->
                @comentariosAdicionales.unshift comentario
                @mostrarPanelRespuesta = false
            eliminarComentario: ->
                resultado = await fetch "#{servidor}/animes/#{@animeId}/episodios/#{@epId}/comentarios/#{@comentario.id}/",
                    method: "DELETE"
                    headers:
                        "Authorization": @tokenUsuarioActual

                if resultado.ok
                    console.log "Eliminado."
                    @eliminado = true
                else
                    console.log "Un error..."
        mounted: ->
            @eliminado = !(@comentario?.autor?.id?)



#
</script>

<style scoped lang="sass">

    .anidado
        padding-left: 1rem
        border-left: solid 1px var(--borde)


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
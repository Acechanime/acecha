<template lang="pug">
    div.comentario
        div.cont-autor-comentario
            span {{ !eliminado? comentario.autor.nombre: "eliminado" }}
            span &nbsp;|&nbsp;
            span {{ fechaDelComentario }}
        div.contenido-comentario-md(v-html="comentarioFormateado")
        div.botones
            span.texto-opciones-comentario.boton-opcion-comentario(@click="cambiarEstadoRespuestas")
                | {{ !respuestasCargadas? "Ver ": "Ocultar " }} respuestas
            span.boton-opcion-comentario(v-if="!eliminado" @click="cambiarEstadoMostrarPanelRespuesta")
                i.material-icons.icono-reply-comentario(title="Responder")
                    | reply
                span.texto-opciones-comentario Responder
            span.boton-opcion-comentario(
                v-if="usuarioActualEsAutor"
                @click="eliminarComentario"
            )
                i.material-icons.icono-reply-comentario(title="Eliminar")
                    | delete
                span.texto-opciones-comentario Eliminar

        div.anidado-comentario
            div(v-if="mostrarPanelRespuesta")
                entrada-comentario(
                    :animeId="animeId"
                    :epId="epId"
                    :parentId="comentarioId"
                    :fnAgregarComentario="agregarComentario"
                )

            div(v-if="respuestasCargadas")
                p(v-if="comentariosAdicionales.length === 0")
                    | No hay respuestas

                template(v-else)
                    comentario(v-for="subcomentario in comentariosAdicionales"
                        :key="subcomentario.id"
                        :comentario="subcomentario"
                        :animeId="animeId"
                        :epId="epId"
                    )

                // comentario(v-for="subcomentario in comentario.children"
                //     :key="subcomentario.id"
                //     :comentario="subcomentario"
                //     :animeId="animeId"
                //     :epId="epId"
                // )

        div.separador-comentario

    //
</template>

<script lang="coffee">
    import entradaComentario from "./entrada-comentario.vue"
    import { servidor } from "../../../coffee/variables.coffee"
    import DOMPurify from "dompurify"
    import marked from "marked"

    export default
        name: "comentario"
        components: { entradaComentario }
        data: ->
            mostrarPanelRespuesta: false
            comentariosAdicionales: []
            eliminado: false
            respuestasCargadas: false
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
            comentarioFormateado: ->
                comentario = @comentario.contenido
                html = marked comentario
                DOMPurify.sanitize html

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
            cambiarEstadoRespuestas: ->
                vm = this
                if vm.respuestasCargadas == false
                    try
                        rutaPeticios = "#{servidor}/animes/#{vm.animeId}/episodios/#{vm.epId}/comentarios/" +
                            "#{vm.comentario.id}/respuestas"
                        respuesta = await fetch rutaPeticios
                        if respuesta.ok
                            @comentariosAdicionales = await respuesta.json()
                        else
                            console.log ":c"
                    catch e
                        console.log "Error al recuperar respuestas:"
                        console.log e
                    vm.respuestasCargadas = true
                else
                    vm.respuestasCargadas = false

        mounted: ->
            @eliminado = !(@comentario?.autor?.id?)



#
</script>

<style lang="sass">

    .separador-comentario
        height: 1px
        width: 100%
        background-color: var(--texto1)
        opacity: 0.25


    .texto-opciones-comentario
        font-size: 0.8rem


    .anidado-comentario
        padding-left: 1rem
        border-left: solid 1px var(--borde)
        margin-bottom: 0.5rem


    .boton-opcion-comentario
        cursor: pointer
        margin-right: 1rem
        color: var(--texto1)
        font-weight: bold
        opacity: 0.75
        &:hover
            text-decoration: underline


    .icono-reply-comentario
        display: inline-block
        font-size: 1rem
        vertical-align: middle
        padding-right: 0.25rem


    .comentario
        margin: 1rem 0


    .cont-autor-comentario
        font-size: 0.7rem
        opacity: 0.8


    .contenido-comentario-md
        font-size: 1rem

        img
            max-height: 8rem
    //
</style>
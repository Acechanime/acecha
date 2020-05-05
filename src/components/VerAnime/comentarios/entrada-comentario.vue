<template lang="pug">
    div.cont-entrada-comentario
        textarea-auto(placeholder="Ingresa un comentario" v-model="valor")
        button.boton-comentar(@click="comentar") Comentar

    //
</template>

<script lang="coffee">
    import textareaAuto from "./textarea-auto.vue"
    import { servidor } from "../../../coffee/variables.coffee"

    export default
        name: "entrada-comentario"
        components: { textareaAuto }
        data: ->
            valor: ""
        props:
            animeId:
                type: String
                required: true
            epId:
                type: String
                required: true
            fnAgregarComentario:
                type: Function
                required: true
        computed:
            tokenUsuarioActual: -> @$store.state.usuario.usuarioActual.token
        methods:
            comentar: ->
                resRaw = await fetch "#{servidor}/animes/#{@animeId}/episodios/#{@epId}/comentarios", {
                    method: "POST"
                    headers:
                        Authorization: @tokenUsuarioActual
                        "Content-Type": "application/json"
                    body: "{ contenido: \"#{@valor}\"}"
                }

                if resRaw.ok
                    comentario = await resRaw.json()
                    console.log "Objeto comentario: "
                    console.log comentario
                    @comentarioExitoso comentario

            comentarioExitoso: (comentario) ->
                @fnAgregarComentario comentario
                @valor = ""


#
</script>

<style scoped lang="sass">

    .cont-entrada-comentario
        padding: 1rem 0


    .boton-comentar
        background-color: var(--texto1)
        color: var(--fondo0)
        font:
            family: "Product Sans", Roboto, sans-serif
        border: none
        padding: 0.5rem
        border-radius: 3px
        cursor: pointer

    //
</style>
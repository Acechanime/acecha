<template lang="pug">
    div
        div.cont-entrada-comentario(v-if="$store.state.usuario.usuarioActual.id")
            textarea-auto(placeholder="Ingresa un comentario" v-model="valor")

            button.boton-comentar(@click="comentar" title="Los comentarios soportan formato MD")
                | Comentar
                img.img-logo-md(src="@/assets/icons/logo_md.svg")

        div(v-else)
            p
                router-link(to="/login/") Inicia sesión
                |  para comentar.

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
            parentId:
                type: String
                default: ""
            fnAgregarComentario:
                type: Function
                required: true
        computed:
            tokenUsuarioActual: -> @$store.state.usuario.usuarioActual?.token
        methods:
            comentar: ->
                txtParentId =
                    if @parentId != "" then ", parent: \"#{ @parentId }\""
                    else ""
                resRaw = await fetch "#{servidor}/animes/#{@animeId}/episodios/#{@epId}/comentarios", {
                    method: "POST"
                    headers:
                        Authorization: @tokenUsuarioActual
                        "Content-Type": "application/json"
                    body: "{ contenido: \"#{@valor}\"#{ txtParentId }}"
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

    .img-logo-md
        padding-left: 10px
        height: 1rem
        vertical-align: bottom


    .cont-entrada-comentario
        padding: 1rem 0


    .boton-comentar
        background-color: var(--colorPrincipal)
        color: white
        font:
            family: "Product Sans", Roboto, sans-serif
        border: none
        padding: 0.5rem
        border-radius: 3px
        cursor: pointer

    //
</style>
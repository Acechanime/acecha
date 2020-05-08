<template lang="pug">
    div.top-cont
        div.comentarios-cont.contenedor
            h2 Comentarios
            div
                div(v-if="$store.state.usuario.usuarioActual.id")
                    entrada-comentario(
                        :animeId="animeActual.id? animeActual.id: '-1'"
                        :epId="epActual.id? epActual.id: '-1'"
                        :fnAgregarComentario="agregarComentario"
                    )
                div(v-else)
                    p
                        router-link(to="/login/") Inicia sesión
                        |  para comentar.
            div(v-if="comentarios.length === 0")
                p No hay comentarios
            div(v-else)
                comentario(v-for="(comentario, pos) in comentarios" :key="pos" :comentario="comentario")

    //
</template>

<script lang="coffee">
    import { servidor } from "../../coffee/variables.coffee"
    import entradaComentario from "./comentarios/entrada-comentario.vue"
    import comentario from "./comentarios/comentario.vue"

    export default
        name: "comentarios"
        components: { entradaComentario, comentario }
        data: ->
            comentarios: []
        computed:
            animeActual: -> @$store.state.datos.animeActual
            epActual:    -> @$store.state.reproductor.epActual
        watch:
            epActual: ->
                @cargarComentarios()
        methods:
            cargarComentarios: ->
                anime_id = @animeActual.id
                ep_id = @epActual.id
                if anime_id? && ep_id?
                    url = "#{servidor}/animes/#{anime_id}/episodios/#{ep_id}/comentarios"
                    try
                        resRaw = await fetch url
                        if resRaw.ok == true
                            @comentarios = await resRaw.json()
                        else
                            console.error resRaw
                            throw new Error "Error en la peticion."
                    catch e
                        console.error e
                else
                    console.log "Aun cargando... #{anime_id} #{ep_id}"

            agregarComentario: (comentario) ->
                @comentarios.unshift comentario
        mounted: ->
            @cargarComentarios()


#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .top-cont
        padding: 2rem 0

    .comentarios-cont
        @extend %caja-textos
        color: var(--texto1)
        font-family: Roboto, sans-serif


    //
</style>
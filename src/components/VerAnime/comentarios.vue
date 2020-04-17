<template lang="pug">
    div.comentarios-cont.contenedor
        h2 Comentarios
        div Comentario 1

    //
</template>

<script lang="coffee">
    import { servidor } from "../../coffee/variables.coffee"

    export default
        name: "comentarios"
        data: ->
            comentarios: []
        computed:
            animeActual: -> @$store.state.datos.animeActual
            epActual:    -> @$store.state.reproductor.epActual
        watch:
            epActual: (nuevo) ->
                anime_id = nuevo.id
                ep_id = nuevo.id
                if anime_id? && ep_id?
                    console.log "Cargando :c (#{anime_id}) (#{ep_id})"
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


#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .comentarios-cont
        @extend %caja-textos
        color: var(--texto1)
        font-family: "JetBrains Mono", Roboto, sans-serif
        margin-top: 2rem
        margin-bottom: 2rem


    //
</style>
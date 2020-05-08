<template lang="pug">
    div
        div.separador
        div.contenedor
            div
                h2.titulo-mi-lista Mi lista
            div
                h3 Viendo
                div(v-if="animesViendo.length > 0")
                    div(v-for="(anime, pos) in animesViendo") {{ anime }}
                div(v-else)
                    p No estás viendo ningún anime
            div
                h3 Completados
                div(v-if="animesTerminados.length > 0")
                    div(v-for="(anime, pos) in animesTerminados") {{ anime }}
                div(v-else)
                    p No has completado ningún anime
            div
                h3 Por ver
                div(v-if="animesPorVer.length > 0")
                    div(v-for="(anime, pos) in animesPorVer") {{ anime }}
                div(v-else)
                    p No tienes ningún anime por ver
            br
            p Debug:
            p {{ usuarioActual }}

    //
</template>

<script lang="coffee">

    export default
        name: "mi-lista"
        computed:
            usuarioActual: -> @$store.state.usuario.usuarioActual
            animesViendo: -> @usuarioActual.animes_viendo
            animesTerminados: -> @usuarioActual.animes_terminados
            animesPorVer: -> @usuarioActual.animes_planeados

#
</script>

<style scoped lang="sass">

    .titulo-mi-lista
        padding: 1rem 0
    
    //
</style>
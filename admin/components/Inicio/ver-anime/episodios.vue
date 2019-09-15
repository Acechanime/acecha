<template lang="pug">
    div.eps
        div
            button Crear episodio
            button Crear ova
        div(v-if="cargando") Cargando...
        div(v-else)
            div(v-if="episodios && episodios.length > 0")
                p Episodios.
                episodio(v-for="(ep, i) in episodios" :key="i" :ep="ep")
            div(v-if="ovas && ovas.length > 0")
                p Ovas
                episodio(v-for="(ep, i) in ovas" :key="i" :ep="ep" :esOva="true")
    //
</template>

<script lang="coffee">
    import episodio from "./episodio.vue"

    export default
        name: "episodios"
        components: { episodio }
        data: ->
            cargando: yes
            episodios: undefined
            ovas: undefined
            error: no
        props:
            animeId:
                type: Number
                required: true
        mounted: ->
            datosR = await fetch "https://araozu.pro/api/episodios?anime_id=#{@animeId}"
            datos = await datosR.json()
            @cargando = no
            if datos.exito
                @episodios = datos.payload.filter (a) -> a.es_ova is false
                @ovas = datos.payload.filter (a) -> a.es_ova is true
            else
                console.log datos

#
</script>

<style scoped lang="sass">
    @import "../../../sass/global"

    .eps
        padding-left: 40px

    //
</style>
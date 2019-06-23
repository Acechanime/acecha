<template lang="pug">
    div.info
        h3.tit Información
        div.eps Numero de episodios
        p {{ animeObj.episodios }}
        div.temp Temporada
        p {{ animeObj.temporada }} {{ animeObj.anio }}
        div.estudio Estudio
        p {{ animeObj.estudio }}
        div.fuente ¿De donde viene el anime?
        p {{ animeObj.fuente }}
        div.emision Fecha de emision
        p {{ animeObj.emision }}
        div.culminacion Fecha de culminacion
        p {{ animeObj.culminacion }}
        div.otrosNombres Otros nombres
        p(v-for="n in animeObj.alternativo") {{ n }}
    //
</template>

<script lang="coffee">

    export default
        name: "info"
        props:
            animeObj:
                type: Object
                required: true
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .info
        background-color: white
        padding: 1rem
        border-radius: 10px
        box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.12)
        .tit
            font:
                family: $titulos
                size: 1.3rem
            color: $colorPrincipal
            padding-bottom: 1rem
        div
            @extend %textosGris
            line-height: 1.2
            font:
                weight: 700
        p
            padding-bottom: 10px
            padding-top: 3px
            color: $colorPrincipal
            font-size: 14px

    //
</style>
<template lang="pug">
    div.info
        h3.tit(:class="claseTit" @click="cambiarEstadoDetalles") Información
            span.material-icons(v-if="esMovil") {{ textoIcono }}
        template(v-if="!esMovil || (esMovil && mostrarDetalles)")
            div.eps Numero de episodios
            p {{ animeObj.episodios === -1? "??": animeObj.episodios }}
            div.temp Temporada
            p {{ animeObj.temporada }} {{ animeObj.anio }}
            div.estudio Estudio
            p {{ animeObj.estudio }}
            div.fuente ¿De donde viene el anime?
            p {{ animeObj.fuente }}
            div.emision Fecha de emision
            p {{ animeObj.inicio_emision }}
            div.culminacion Fecha de culminacion
            p {{ animeObj.culminacion }}
            div.otrosNombres Otros nombres
                p(v-for="n in animeObj.otros_nombres") {{ n }}

    //
</template>

<script lang="coffee">

    export default
        name: "info"
        data: ->
            # esMovil: window.innerWidth < 600
            mostrarDetalles: no
            textoIcono: "expand_more"
        props:
            animeObj:
                type: Object
                required: true
        computed:
            claseTit: ->
                if @esMovil && @mostrarDetalles is no
                    "tit--movil"
                else ""
            esMovil: ->
                evResize = @$store.state.datos.resizeEvent
                window.innerWidth < 600

        methods:
            cambiarEstadoDetalles: ->
                @mostrarDetalles = !@mostrarDetalles
                @textoIcono =
                    if @mostrarDetalles then "expand_less" else "expand_more"


    #

</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .info
        @extend %caja-textos
        background-color: var(--fondo0)
        padding: 1rem
        .tit
            font:
                family: var(--fuenteTitulos)
                size: 1.3rem
            color: var(--colorPrincipal)
            padding-bottom: 1rem
            position: relative
            span
                position: absolute
                top: 4px
                right: 0
                vertical-align: bottom

        div
            @extend %textosGris
            line-height: 1.2
            font:
                weight: 700
                size: 0.85rem
        p
            padding-bottom: 0.5rem
            padding-top: 0.25rem
            color: var(--colorPrincipal)
            font-size: 0.75rem

        .otrosNombres p
            padding-top: 5px
            padding-bottom: 0

    .tit--movil
        padding-bottom: 0 !important

    //
</style>

<template lang="pug">
    div.temporada
        img.portadaMini(:src="anime.img_portada" alt="img")
        span.nombre {{ anime.nombre }}
        router-link.season_link(:to="esRutaActual()? '.': anime.ruta" :style="obtColorFondo" )
            span.icon-chevron-right
    //
</template>

<script lang="coffee">

    export default
        name: "temporada"
        props:
            anime:
                type: Object
                required: true
        computed:
            obtColorFondo: ->
                if @esRutaActual()
                    "background: #ff0241"
                else "background: #01bc59"
        methods:
            esRutaActual: () ->
                if @$store.state.modoAdmin
                    true
                else
                    @anime.ruta == @$route.path

    #

</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .temporada
        border: 1px solid var(--semi-white-color)
        border-radius: 0 30px 30px 0
        display: flex
        -webkit-box-align: center
        -ms-flex-align: center
        align-items: center
        -webkit-box-pack: justify
        -ms-flex-pack: justify
        justify-content: space-between
        margin-bottom: .5rem
        padding-right: .5rem


    .portadaMini
        width: 42px
        height: 60px

    .nombre
        color: var(--texto1)

    .season_link
        color: var(--white-color)
        font-size: 1.25rem
        width: 44px
        height: 44px
        border-radius: 50%
        display: flex
        -webkit-box-pack: center
        -ms-flex-pack: center
        justify-content: center
        -webkit-box-align: center
        -ms-flex-align: center
        align-items: center
        text-decoration: none

    .icon-chevron-right::before
        content: "\e940"
    //
</style>
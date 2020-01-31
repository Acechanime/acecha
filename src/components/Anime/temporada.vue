<template lang="pug">
    div.temporada
        img.portadaMini(:src="anime.imagenes.portada" alt="img")
        span.nombre {{ nombreArreglado }}
        template(v-if="esRutaActual()")
            router-link.season_link(to="." :style="obtColorFondo" )
                // span.icon-checkmark
        template(v-else)
            router-link.season_link(:to="anime.info.ruta" :style="obtColorFondo" )
                span.icon-chevron-right
    //
</template>

<script lang="coffee">

    extraerNombreCorto = (nombre, largo) =>
        str = ""
        buffer = ""
        for i in [0..largo - 1]
            c = nombre.charAt i
            if c is " "
                str += buffer + " "
                buffer = ""
            else
                buffer += c
        str + "..."

    export default
        name: "temporada"
        props:
            anime:
                type: Object
                required: true
        computed:
            obtColorFondo: ->
                if @esRutaActual()
                    "background: #01bc59; opacity: 0"
                else "background: #ff0241"
            nombreArreglado: ->
                nombre = @anime.info.nombre
                if nombre?.length > 40 and window.innerWidth < 500
                    extraerNombreCorto nombre, 40
                else nombre
        methods:
            esRutaActual: () ->
                if @$store.state.modoAdmin
                    true
                else
                    @anime.info.ruta == @$route.path


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
        min-width: 42px
        min-height: 60px

    .nombre
        color: var(--texto1)

    .season_link
        color: var(--white-color)
        font-size: 1.25rem
        width: 44px
        height: 44px
        min-width: 44px
        min-height: 44px
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

    .icon-checkmark
        opacity: 0
        &::before
            content: "\e942"

    //
</style>
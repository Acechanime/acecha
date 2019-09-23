<template lang="pug">
    nav.navm(:class="navOculta? 'navm--oculto': ''")
        div.barra
            span.material-icons.icono-menu menu
            input.busqueda(placeholder="Buscar animes" :style="anchoInput")
            span.usuario
                span.ic
    //
</template>

<script lang="coffee">

    export default
        name: "barra-navegacion-movil"
        computed:
            anchoPantalla: -> window.innerWidth
            anchoInput: ->
                ancho = @anchoPantalla - 122
                "max-width: #{ancho}px"
        data: ->
            prevScrollPos: window.pageYOffset
            navOculta: no
        methods:
            handleScroll: (ev) ->
                actScrollPos = window.pageYOffset
                if @prevScrollPos > actScrollPos
                    @navOculta = no
                else
                    @navOculta = yes
                @prevScrollPos = actScrollPos

        created: ->
            window.addEventListener "scroll", @handleScroll
        destroyed: ->
            window.removeEventListener "scroll", @handleScroll

    #
    
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .navm
        position: fixed
        top: 0
        left: 0
        z-index: 10
        // Padding: 25 -> 10
        width: 100%
        transition: transform 250ms

    .navm--oculto
        transform: translateY(-70px)

    .barra
        margin: 5px 10px
        border-radius: 10px
        border: 1px solid rgba(209, 209, 209, 0.51)
        color: var(--texto1)
        background-color: var(--fondo1)
        box-sizing: border-box
        box-shadow: 0 0 5px 0 var(--sombra1)

    .icono-menu
        display: inline-block
        padding: 15px
        vertical-align: top
        font-size: 20px
        color: var(--texto2)

    .busqueda
        display: inline-block
        height: 50px
        width: auto
        padding: 7px
        background-color: transparent
        border: none
        color: var(--texto2)

        font:
            size: large
            family: "Product Sans", Roboto, sans-serif
        text-decoration: underline
        &:focus
            border-radius: 5px
            border-width: 2px
            outline: none

    .usuario
        position: absolute
        right: 11px
        display: inline-block
        padding: 10px
        width: 50px
        height: 50px
        .ic
            display: inline-block
            background-color: var(--texto1)
            border-radius: 50%
            width: 100%
            height: 100%


    //
</style>
<template lang="pug">
    nav.navm
        div.barra
            lista-items(:mostrar="mostrarMenu" :cambiarEstadoMenu="cambiarEstadoMenu")
            div.superior(:class="navOculta? 'superior--oculto': ''")
                span.usuario
                    // img(src="https://png.icons8.com/windows/1600/0063B1/user")
                    img(src="/favicon.png")
                input.busqueda(placeholder="Buscar animes" :style="anchoInput")
                span.material-icons.icono-menu(@click="cambiarEstadoMenu") menu
                div.separador
            div.iconos
                router-link(to="/" title="Inicio" :class="esPagInicio? 'resaltado': ''")
                    i.material-icons home
                router-link(to="/animes/" title="Todos los animes" :class="esPagAnimes? 'resaltado': ''")
                    i.material-icons dashboard
                router-link(to="/bugs/" title="Reportar error" :class="esPagBugs? 'resaltado': ''")
                    i.material-icons bug_report

    //
</template>

<script lang="coffee">
    import listaItems from "./barra-navegacion-movil/lista-items"

    export default
        name: "barra-navegacion-movil"
        components: { listaItems }
        data: ->
            prevScrollPos: window.pageYOffset
            navOculta: no
            mostrarMenu: no
        computed:
            anchoPantalla: -> window.innerWidth
            anchoInput: ->
                ancho = @anchoPantalla - 122
                "width: #{ancho}px;"
            esPagInicio: -> @$route.path is "/"
            esPagAnimes: -> @$route.path is "/animes/"
            esPagBugs: -> @$route.path is "/bugs/"
        methods:
            cambiarEstadoMenu: () ->
                window.document.body.style.overflow =
                    if @mostrarMenu then "initial"
                    else "hidden"

                @mostrarMenu = !@mostrarMenu

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
        bottom: 0
        left: 0
        z-index: 10
        // Padding: 25 -> 10
        width: 100%
        transition: transform 250ms

    .navm--oculto
        transform: translateY(100px)

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
        padding: 7px
        // margin-left: 50px
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

    .superior
        transition: height 250ms
        height: 51px
        overflow: hidden

    .superior--oculto
        height: 0

    .usuario
        display: inline-block
        margin: 10px
        width: 30px
        height: 30px
        float: left
        img
            width: 30px
            height: 30px
            border-radius: 10%
        // .ic
            display: inline-block
            background-color: var(--fondo1)
            border-radius: 50%
            width: 100%
            height: 100%
            img
                width: 100%

    .separador
        height: 1px
        background-color: var(--texto1)
        opacity: 0.15
        width: 95%
        margin: 0 auto
        clear: both

    .iconos
        padding: 7px
        display: grid
        grid-template-columns: repeat(3, 1fr)
        a
            text-align: center
            color: var(--texto2)
            user-select: none
            cursor: pointer
            transition: color 250ms ease-out

    .resaltado
        color: #E91E63 !important


    //
</style>

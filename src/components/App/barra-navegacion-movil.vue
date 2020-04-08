<template lang="pug">
    nav.navm
        div.barra
            lista-items(:mostrar="mostrarMenu" :cambiarEstadoMenu="cambiarEstadoMenu")
            resultado-buscador(:nombre="query" :limpiarBuscador="limpiarBuscador")

            label(for="input-busqueda-movil" style="display: none;") Buscar animes
            div.superior(:class="navOculta? 'superior--oculto': ''")
                router-link.usuario(to="/mi-cuenta/")
                    // img(src="https://png.icons8.com/windows/1600/0063B1/user")
                    img(:src="imgUsuario")
                // Si, uso un @input en vez de v-model, porque solo así funciona en movil.
                input#input-busqueda-movil.busqueda(
                    placeholder="Buscar animes"
                    @input="registrar"
                    :value="query"
                )

                span.material-icons.icono-menu(@click="cambiarEstadoMenu") menu
                div.separador

            div.iconos
                a(@click="cerrarMenu('/')" title="Inicio" :class="esPagInicio? 'resaltado': ''")
                    i.material-icons home
                a(@click="cerrarMenu('/animes/')" title="Todos los animes" :class="esPagAnimes? 'resaltado': ''")
                    i.material-icons dashboard
                a.boton--oscuro(title="Cambiar colores" @click.prevent="cambiarColor()")
                    i.material-icons invert_colors

    //
</template>

<script lang="coffee">
    import listaItems from "./barra-navegacion-movil/lista-items"
    import resultadoBuscador from "./barra-navegacion-movil/resultado-buscador.vue"
    import { cambiarColor } from "./App/ModoColor.coffee"

    export default
        name: "barra-navegacion-movil"
        components: { listaItems, resultadoBuscador }
        data: ->
            prevScrollPos: do ->
                if !process.client then return 0

                window.pageYOffset
            navOculta: no
            mostrarMenu: no
            query: ""
        computed:
            esPagInicio: -> @$route.path is "/"
            esPagAnimes: -> @$route.path is "/animes/"
            esPagBugs: -> @$route.path is "/bugs/"
            usuarioActual: -> @$store.state.usuario.usuarioActual
            imgUsuario: ->
                if @usuarioActual?.id?
                    @usuarioActual.avatar
                else "/favicon.png"

        methods:
            registrar: (ev) ->
                @query = ev.target.value

            cambiarEstadoMenu: () ->
                window.document.body.style.overflow =
                    if @mostrarMenu then "initial"
                    else "hidden"

                @mostrarMenu = !@mostrarMenu

            cerrarMenu: (ruta) ->
                window.document.body.style.overflow = "initial"
                @mostrarMenu = no
                @$router.push ruta

            handleScroll: (ev) ->
                actScrollPos = window.pageYOffset
                if @prevScrollPos > actScrollPos
                    @navOculta = no
                else
                    @navOculta = yes
                @prevScrollPos = actScrollPos

            cambiarColor: ->
                @$store.commit "color/cambiarModoColor"

            limpiarBuscador: ->
                @query = ""

        mounted: ->
            window.addEventListener "scroll", @handleScroll
        destroyed: ->
            window.removeEventListener "scroll", @handleScroll

#
</script>

<style scoped lang="sass">

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
        background-color: var(--fondo2)
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
        width: 100%
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
        max-height: 51px
        overflow: hidden
        display: grid
        grid-template-columns: 50px auto 50px



    .superior--oculto
        height: 0


    .usuario
        display: inline-table
        width: 100%
        height: 100%
        div
            display: table-cell
            vertical-align: middle
            text-align: center
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

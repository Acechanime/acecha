<template lang="pug">
    div
        nav.navegacion.barra-pc(:class="barraMinClase" v-if="!esMovil")
            div.contenedor.wrap_barra
                div.izq
                    router-link(to="/")
                        img.logo(:src="linkLogo" alt="Logo AcechaAnime")

                ul.items
                    anime
                    // tips
                    mi-experiencia
                    comunidad
                    buscador

                router-link.imagen_usuario(to="/mi-cuenta/")
                    img(:src="imgUsuario")

        barra-navegacion-movil.barra-movil(v-if="esMovil")

    //
</template>

<script lang="coffee">
    import barraNavMovil from "./barra-navegacion-movil.vue"
    import animeList from "./barra-navegacion-legacy/anime.vue"
    import tipsList from "./barra-navegacion-legacy/tips.vue"
    import miExperiencia from "./barra-navegacion-legacy/mi-experiencia.vue"
    import comunidadList from "./barra-navegacion-legacy/comunidad.vue"
    import buscador from "./barra-navegacion-legacy/buscador.vue"

    export default
        name: "barra-navegacion"
        components:
            "barra-navegacion-movil": barraNavMovil
            anime: animeList
            tips: tipsList
            comunidad: comunidadList
            buscador: buscador
            "mi-experiencia": miExperiencia
        data: ->
            barraMin: no
        computed:
            modoColor: -> @$store.state.color.color
            linkLogo: ->
                if @modoColor is "color-claro" then "/img/logos/LOGO_TEXTO_ACECHA_claro.webp"
                else "/img/logos/LOGO_TEXTO_ACECHA_oscuro.webp"
            barraMinClase: ->
                if @$route.path is "/"
                    if @barraMin then "navegacion--min" else "navegacion--no-min"
                else "navegacion--min"
            esMovil: ->
                if process.client is false then return true

                @$store.state.datos.resizeEvent
                window.innerWidth <= 850
            usuarioActual: -> @$store.state.usuario.usuarioActual
            imgUsuario: ->
                if @usuarioActual?.id?
                    @usuarioActual.avatar ? "/img/user.svg"
                else "/favicon.png"
        mounted: ->
            vm = this
            window.addEventListener "scroll", () ->
                if window.pageYOffset > 50
                    vm.barraMin = yes
                else
                    vm.barraMin = no

    #
</script>

<style lang="sass">

    #navbar-comunidad, #navbar-tips, .item
        &::after
            display: inline-block
            color: var(--texto1)
            content: "\e90b"
            top: 30%
            right: 0.75rem
            position: absolute
            font-size: var(--normal-font-size)
            pointer-events: none
            font-family: 'icomoon'!important
            speak: none
            font-style: normal
            font-weight: normal
            font-variant: normal
            text-transform: none
            line-height: 1
            -webkit-font-smoothing: antialiased
            transition: transform 250ms ease-in-out, color 250ms ease-in-out


    .navegacion
        color: white
        background-color: transparent
        position: fixed
        top: 0
        left: 0
        z-index: 10
        // Padding: 25 -> 10
        padding: 1.5rem 0
        width: 100%
        transition: padding 300ms ease-in-out, background-color 300ms ease-in-out


    .wrap_barra
        display: grid
        grid-template-columns: 7rem auto 4rem


    .imagen_usuario
        text-align: center
        img
            height: auto
            width: 2rem
            vertical-align: middle


    .navegacion--min
        padding: 1rem 0
        background-color: var(--fondo1)
        color: var(--texto1)
        box-shadow: 0 1px 10px -6px rgba(0, 0, 0, 0.42), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px -2px rgba(0, 0, 0, 0.1)


    .navegacion--no-min
        color: white


    .menu-item a
        color: var(--texto1) !important


    .izq
        a
            display: block
            margin: auto
            img
                display: block
                margin: auto
                max-width: 100%
                height: auto



    .items
        list-style: none
        display: flex !important
        align-self: center
        grid-column: 2 / 3
        justify-self: end
        margin: 0
        height: 100%

        .item
            list-style: none
            position: relative
            font-size: 0.65rem
            text-transform: uppercase
            transition: color 250ms ease-in-out
            height: 100%
            a
                color: inherit
                text-decoration: none
                // padding: 10px 0
                display: block
                cursor: pointer
                padding: 0.65rem
                padding-right: 1.4rem !important
                transition: color 250ms
                position: relative
                &:hover
                    color: #E91E63

            img.emoji
                //vertical-align: top
                height: 12px
                margin-left: 6px
            img.search
                height: 12px

            &:hover
                &:after
                    transform: rotate(180deg)
                    color: #E91E63 !important


    .sub-menu-barra
        display: block
        background-color: var(--fondo1)
        position: absolute
        left: 0
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175)
        width: 190px
        border-radius: 4px

        transition: max-height 500ms
        max-height: 0
        overflow: hidden
        li
            list-style: none
            position: relative
            box-sizing: border-box
            display: list-item
            text-transform: none


    //
</style>

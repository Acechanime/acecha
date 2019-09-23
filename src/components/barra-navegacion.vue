<template lang="pug">
    div
        nav.navegacion(:class="barraMinClase")
            div.contenedor
                div.izq
                    router-link(to="/")
                        img.logo( src="https://acechanime.com/wp-content/themes/anime/img/logo.png"
                             alt="Logo AcechaAnime")
                div.der
                    ul.items
                        li#navbar-anime
                            router-link(to="/animes/") Anime
                                img.emoji( draggable="false" alt="📂" width="12px"
                                    src="https://s.w.org/images/core/emoji/2.4/svg/1f4c2.svg")
                                // i.material-icons arrow_drop_down
                        li#navbar-tips
                            a Acecha tips
                                img.emoji(draggable="false" alt=""
                                src="https://acechanime.com/wp-content/themes/anime/img/bicons/parchment.svg"
                                width="12px")
                        li
                            router-link(to="/acecha-premium/") Acecha premium
                                img.emoji(draggable="false"
                                    alt="🔱"
                                    src="https://s.w.org/images/core/emoji/2.4/svg/1f531.svg"
                                    width="12px")
                        li
                            router-link(to="/acecha-tv/") Acecha tv
                                img.emoji(draggable="false" alt="📺" width="12px"
                                    src="https://s.w.org/images/core/emoji/11/svg/1f4fa.svg")
                        li#navbar-comunidad
                            a Comunidad
                                img.emoji(draggable="false" alt="👨‍👨‍👧‍👧" width="12px"
                                    src="https://s.w.org/images/core/emoji/11/svg/1f468-200d-1f468-200d-1f467-200d-1f467.svg")
                        // li
                            a
                                img.search(src="../assets/icons/search.svg")
        // barra-navegacion-movil(v-else)
    //
</template>

<script lang="coffee">
    import barraNavMovil from "./barra-navegacion-movil.vue"

    export default
        name: "barra-navegacion"
        components:
            "barra-navegacion-movil": barraNavMovil
        data: ->
            barraMin: no
        computed:
            barraMinClase: ->
                if @$route.path is "/"
                    if @barraMin then "navegacion--min" else ""
                else "navegacion--min"
            esMovil: -> window.innerWidth < 550
        created: ->
            vm = this
            window.addEventListener "scroll", () ->
                if window.pageYOffset > 50
                    vm.barraMin = yes
                else
                    vm.barraMin = no

    #
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    #navbar-anime, #navbar-comunidad, #navbar-tips
        &::after
            display: inline-block
            color: var(--texto1)
            content: "\e90b"
            top: 17px
            right: 14px
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
        color: var(--texto1)
        background-color: transparent
        position: fixed
        top: 0
        left: 0
        z-index: 10
        // Padding: 25 -> 10
        padding: 25px 0
        width: 100%
        transition: padding 300ms ease-in-out, background-color 300ms ease-in-out

    .navegacion--min
        padding: 10px 0
        background-color: var(--fondo1)
        color: var(--texto2)
        box-shadow: 0 1px 10px -6px rgba(0, 0, 0, 0.42), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px -2px rgba(0, 0, 0, 0.1)

    .izq
        display: inline-block
        float: left
        height: 50px
        .logo
            height: 50px
        &:after
            content: ""
            clear: both
            display: table

    .der
        display: inline-block
        float: right
        height: 50px
        &:after
            content: ""
            clear: both
            display: table

    .items
        list-style: none
        display: inline-table
        margin: 0 10px
        height: 50px
        li
            position: relative
            display: table-cell
            vertical-align: middle
            font:
                size: 12px
                family: Roboto, sans-serif
            text-transform: uppercase
            transition: color 250ms ease-in-out
            a
                color: inherit
                text-decoration: none
                // padding: 10px 0
                display: block
                cursor: pointer
                padding: 15px 1.6875rem 15px 10px !important

            img.emoji
                //vertical-align: top
                height: 12px
                margin-left: 6px
            img.search
                height: 12px

            .material-icons
                font:
                    size: 20px
                    weight: bold
                display: inline-block
                transform: translateY(7px)
                transition: transform 500ms

            &:hover
                color: #E91E63
                &:after
                    transform: rotate(180deg)
                    color: #E91E63 !important

    @media only screen and (max-width: 1023px)
        .der
            display: none !important

    @media only screen and (max-width: 500px)
        .izq
            height: 51px !important

        //.logo
            height: 75px !important


    //
</style>
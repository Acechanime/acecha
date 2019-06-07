<template lang="pug">
    nav.navegacion(:class="barraMinClase")
        div.contenedor
            div.izq
                img.logo( src="https://acechanime.com/wp-content/themes/anime/img/logo.png"
                     alt="Logo AcechaAnime")
            div.der
                ul.items
                    li
                        router-link(to="/anime") Anime
                    li Acecha tips
                    li Acecha premium
                    li Acecha tv
                    li Comunidad
    //
</template>

<script lang="coffee">

    export default
        name: "barra-navegacion"
        data: ->
            barraMin: no
        computed:
            barraMinClase: ->
                if @barraMin && @$route.path is "/" then "navegacion--min" else ""
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

    .navegacion
        color: white
        background-color: transparent
        position: fixed
        top: 0
        left: 0
        z-index: 1030
        // Padding: 25 -> 10
        padding: 25px 0
        width: 100%
        transition: padding 300ms ease-in-out, background-color 300ms ease-in-out

    .navegacion--min
        padding: 10px 0
        background-color: white
        color: #4e565b
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
            display: table-cell
            vertical-align: middle
            padding: 0 10px
            height: 50px
            font:
                size: 12px
                family: Roboto, sans-serif
            text-transform: uppercase

    //
</style>
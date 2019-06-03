<template lang="pug">
    header
        nav.navegacion
            div.contenedor
                div.izq
                    img.logo( src="https://i0.wp.com/acechanime.com/wp-content/uploads/2019/01/cropped-Acecha-EDIT5-1.png?fit=1280%2C400&ssl=1"
                         alt="Logo AcechaAnime")
                div.der
                    ul.items
                        li Calendario
                        li Ver anime
                        li Acecha tips
                        li Acecha premium
                        li Acecha tv
                        li Comunidad
    //
</template>

<script lang="coffee">

    export default
        name: "barra-navegacion"

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
        height: 70px
        width: 100%
        transition: height 250ms
        &:before
            content: " "
            display: table

    .izq
        display: inline-block
        float: left
        &:after
            content: ""
            clear: both
            display: table

    .der
        display: inline-block
        float: right
        height: 70px
        &:after
            content: ""
            clear: both
            display: table

    .items
        list-style: none
        display: inline-table
        margin: 10px
        height: 50px
        li
            display: table-cell
            vertical-align: middle
            padding: 0 10px
            height: 50px

    .logo
        padding: 10px 0
        height: 70px

    //
</style>
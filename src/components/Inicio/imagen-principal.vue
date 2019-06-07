<template lang="pug">
    div.imgPrin
        div.contenido
            div.m-contenedor
                div.txt
                    div.titulo AcechaAnime
                    br
                    span.motto Te damos el amor que no te da él/ella
                    br
                    br
                    br
                    div.boton Compatible para
        div.img
    //
</template>

<script>
    export default {
        name: "imagen-principal"
    }
</script>

<style scoped lang="sass">
.contenido
    height: 862px
    .m-contenedor
        padding: 120px 0
        height: 100%
        width: 100%
        display: inline-table
    .txt
        display: table-cell
        vertical-align: middle
        text-align: center
        color: white
        .titulo
            font:
                size: 67px
                weight: 700
        .boton
            display: inline-block
            border-radius: 50px
            padding: 15px 33px
            background-color: #e91e63
            text-transform: uppercase
            font-size: 12px
            cursor: pointer
            user-select: none

.img
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: -1
    background-size: cover !important
    background: url("https://acechanime.com/wp-content/uploads/2019/05/subheader.jpg") center center
    height: 862px
    &::before
        background-color: rgba(0, 0, 0, 0.6)
    &:before
        z-index: -1
        display: block
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        content: ""
</style>
<template lang="pug">
    div
        h2 Modo color
        p Estos son los colores que se implementarán en el futuro.
        br
        div Claro
        div#color_claro.color_demo Acechanime
        div Oscuro
        div#color_oscuro.color_demo Acechanime
        div Gris
        div#color_gris.color_demo Acechanime
        div Amoled
        div#color_negro.color_demo Acechanime
        div Azul oscuro
        div#color_azul_oscuro.color_demo Acechanime

    //
</template>

<script lang="coffee">

    export default
        name: "modo-color"
    
#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .color_demo
        padding: 15px 5px
        text-align: center
        font:
            family: "Product Sans", Roboto, sans-serif
            size: larger
        border-radius: 26px
        margin: 20px 0

    #color_claro
        background-color: white
        color: #3A3A3A
        border: solid 1px black

    #color_oscuro
        background-color: #101010
        color: #e8e8e1
        border: solid 1px white

    #color_gris
        background-color: #1a2329
        color: #e8e8e1
        border: solid 1px white

    #color_negro
        background-color: black
        color: #e8e8e1
        border: solid 1px white

    #color_azul_oscuro
        background-color: #080911
        color: #e8e8e1
        border: solid 1px white


    h2
        font:
            family: "Product Sans", Roboto, sans-serif
            weight: normal
        padding: 20px 0
        text-decoration: underline

    //
</style>
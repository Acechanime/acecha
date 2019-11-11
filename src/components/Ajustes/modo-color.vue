<template lang="pug">
    div
        h2 Modo color
        p Estos son los colores que se implementarán en el futuro.
        br
        div Claro
        div#color_claro.color_demo(@click="establecerEsquema('claro')") Acechanime

        div(:class="modoOscuroActivo? 'texto_activo': ''") Oscuro
        div#color_oscuro.color_demo(:class="modoOscuroActivo? 'color_activo': ''"
            @click="establecerEsquema('oscuro')")
            | Acechanime

        div(:class="modoGrisActivo? 'texto_activo': ''") Gris
        div#color_gris.color_demo(:class="modoGrisActivo? 'color_activo': ''"
            @click="establecerEsquema('gris')")
            | Acechanime

        div(:class="modoNegroActivo? 'texto_activo': ''") Amoled
        div#color_negro.color_demo(:class="modoNegroActivo? 'color_activo': ''"
            @click="establecerEsquema('negro')")
            | Acechanime

        div(:class="modoAzulOscuroActivo? 'texto_activo': ''") Azul oscuro
        div#color_azul_oscuro.color_demo(:class="modoAzulOscuroActivo? 'color_activo': ''"
            @click="establecerEsquema('azulOscuro')")
            | Acechanime

    //
</template>

<script lang="coffee">
    import { cambiarModoColorOscuro, cambiarEsquema } from "../App/ModoColor.coffee"

    export default
        name: "modo-color"
        data: ->
            modoColorOscuro: localStorage?.getItem "modo-color-oscuro"
        computed:
            modoOscuroActivo: -> @modoColorOscuro is "oscuro"
            modoGrisActivo: -> @modoColorOscuro is "gris"
            modoNegroActivo: -> @modoColorOscuro is "negro"
            modoAzulOscuroActivo: -> @modoColorOscuro is "azulOscuro"
        methods:
            establecerEsquema: (modo) ->
                cambiarEsquema modo
                if modo isnt "claro"
                    @modoColorOscuro = modo
                    cambiarModoColorOscuro modo

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .texto_activo
        font:
            family: "Product Sans", Roboto, sans-serif
            size: larger
        &:before
            content: "Activo: "

    .color_activo
        border: none !important

    .color_demo
        padding: 15px 5px
        text-align: center
        font:
            family: "Product Sans", Roboto, sans-serif
            size: larger
        border-radius: 26px
        margin: 20px 0
        cursor: pointer

    %bordeBlanco
        border: solid 1px white

    #color_claro
        background-color: white
        color: #3A3A3A
        border: solid 1px white


    #color_oscuro
        @extend %bordeBlanco
        background-color: #101010
        color: #e8e8e1


    #color_gris
        @extend %bordeBlanco
        background-color: #1a2329
        color: #e8e8e1


    #color_negro
        @extend %bordeBlanco
        background-color: black
        color: #e8e8e1


    #color_azul_oscuro
        @extend %bordeBlanco
        background-color: #080911
        color: #e8e8e1


    h2
        font:
            family: "Product Sans", Roboto, sans-serif
            weight: normal
        padding: 20px 0
        text-decoration: underline

    //
</style>
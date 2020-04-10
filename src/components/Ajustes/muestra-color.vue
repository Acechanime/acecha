<template lang="pug">
    div.cont-muestra(:class="clase")
        h4.titulo-muestra {{ titulo }} {{ esColorActivo? " - activo": "" }}
        div.muestra
            div(style="background-color: var(--fondo0);")
            div(style="background-color: var(--fondo1);")
        button.boton-muestra(v-if="!esColorActivo" @click="activarColor") Activar

    //
</template>

<script lang="ls">

    module.exports =
        name: "muestra-color"
        props:
            titulo:
                type: String
                required: true
            clase:
                type: String
                required: true
        computed:
            esColorActivo: -> @$store.state.color.color == @clase
        methods:
            activarColor: ->
                @$store.dispatch "color/cambiarModoColorOscuro", @clase


</script>

<style scoped lang="sass">

    .boton-muestra
        background-color: var(--fondo0)
        color: var(--texto1)
        border: none
        padding: 0.5rem 1rem
        margin: 0.5rem 0
        font-family: "Product Sans", Roboto, sans-serif
        border-radius: 3px
        box-shadow: 0 0 5px 2px var(--sombra1)
        cursor: pointer


    .cont-muestra
        margin: 2rem 1rem


    .titulo-muestra
        font:
            family: Roboto, sans-serif
            weight: 700


    .muestra
        display: grid
        grid-template-columns: repeat(2, 50%)
        div
            height: 2rem
            width: 100%
            border: solid 1px gray


    //
</style>
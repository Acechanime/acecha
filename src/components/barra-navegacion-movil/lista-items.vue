<template lang="pug">
    ul.lista#menu-barrra-movil(:style="ancho")
        div#menu-cont
            div.ltitulo Comunidad
            li Nosotros
            li Creadores de contenido
            div.ltitulo Acecha Tips
            li Comprar desde Japón
            li Comprar anime
            li Leer Manga
            div.ltitulo Mi experiencia
            li Acecha TV
            li Acecha Premium
            li Calendario
            div.ltitulo Yo
            li Mi cuenta
            li Ajustes
    //
</template>

<script lang="coffee">

    export default
        name: "lista-items"
        data: ->
            elem: null
        props:
            mostrar:
                type: Boolean
                required: true
        computed:
            ancho: ->
                if @elem?
                    if @mostrar
                        "height: #{@elem.scrollHeight}px"
                    else "height: 0"
                else "/* -- */"
        mounted: ->
            vm = this
            intervalo = setInterval (=>
                vm.elem = document.getElementById "menu-barrra-movil"
                if vm.elem? then clearInterval intervalo
            ), 250

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .lista
        max-height: 50%
        list-style-type: none
        overflow: hidden
        transition: height 250ms ease-in-out

    #menu-cont
        padding: 15px

    .ltitulo
        // text-transform: uppercase
        opacity: 0.6
        font:
            family: "Product Sans", Roboto, sans-serif
            size: medium
        padding-top: 12px
        padding-bottom: 5px

    .lseparador
        height: 8px

    //
</style>
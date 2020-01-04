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
            li.item-activo(@click="irA('/ajustes/')") Ajustes

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
            cambiarEstadoMenu:
                type: Function
                required: true
        computed:
            ancho: ->
                if @elem?
                    if @mostrar
                        res = parseInt((window.innerHeight - 100) * 0.9)
                        "max-height: #{res}px;"
                    else "max-height: 0"
                else "/* -- */"
            esPagAjustes: -> @$route.path is "/ajustes/"
        methods:
            irA: (link) ->
                @cambiarEstadoMenu()
                @$router.push link
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

    .item-activo
        color: $colorPrincipal
        background-color: rgba(233, 30, 99, 0.25)
        border-radius: 0 17px 17px 0

    .lista
        list-style-type: none
        overflow-y: scroll
        transition: max-height 250ms ease-in-out

    #menu-cont li
        padding: 7px 15px
        margin-right: 5px

    .ltitulo
        // text-transform: uppercase
        opacity: 0.6
        font:
            family: "Product Sans", Roboto, sans-serif
            size: medium
        padding-top: 12px
        padding-bottom: 5px
        padding-left: 10px

    .lseparador
        height: 8px

    //
</style>
<template lang="pug">
    li.barra_li
        div#buscador_barra
            input(placeholder="Buscar anime" v-model="nombre")
        ul.autocompletar(:style="estilos")
            template(v-if="listaAnimesFiltrada.length !== 0")
                item-buscador(v-for="(anime, i) in listaAnimesFiltrada"
                    :anime="anime"
                    :limpiarBuscador="limpiarBuscador"
                    :key="i")
            li.texto_error(v-else) No se encontraron animes.
    //
</template>

<script lang="coffee">
    import { comp, removerCaracteres } from "../Animes/buscador.coffee"
    import itemBuscador from "./item-buscador.vue"

    export default
        name: "buscador"
        components: { itemBuscador }
        data: ->
            anchoBuscador: 0
            altoBuscador: 0
            nombre: ""
            tieneNombre: no
        watch:
            nombre: (nuevo) -> @tieneNombre = nuevo isnt ""

        computed:
            estilos: ->
                res = "width: #{@anchoBuscador}px; top: #{@altoBuscador}px;"
                if @tieneNombre then res += "display: block"
                res
            listaAnimes: -> @$store.state.datos.listaAnimes
            listaAnimesFiltrada: ->
                if @listaAnimes isnt undefined
                    (@listaAnimes.filter @filtroNombre).slice 0, 5
                else []
        methods:
            filtroNombre: (a) ->
                vm = this
                if vm.nombre.length is 0 then return true
                palabras = removerCaracteres a.info.nombre, "-:"
                nombre = removerCaracteres vm.nombre, "-:"
                if nombre.length is 0 then return true
                for p1 in palabras
                    for p2 in nombre
                        if (p1.search p2) != -1 then return true
                return false
            limpiarBuscador: ->
                @nombre = ""
        mounted: ->
            vm = this
            intervalo = setInterval (=>
                buscadorElem = document.getElementById "buscador_barra"
                if buscadorElem?
                    clearInterval intervalo
                    vm.anchoBuscador = buscadorElem.scrollWidth + 2
                    vm.altoBuscador = buscadorElem.scrollHeight + 2
            ), 500

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .barra_li
        position: relative
        display: table-cell
        vertical-align: middle


    .autocompletar
        $borde: solid rgba(117, 117, 117, 0.85) 1px
        display: none
        padding: 0.75rem
        position: absolute
        z-index: 11
        border-left: $borde
        border-right: $borde
        border-bottom: $borde
        border-radius: 0 0 5px 5px

        right: 0
        text-transform: none
        text-decoration: none
        background-color: var(--fondo1)
        color: var(--texto1)


    #buscador_barra
        z-index: 10
        background-color: var(--fondo1)
        display: table-cell
        vertical-align: middle
        padding: 2px 0.75rem 8px
        border-radius: 5px
        border: solid rgba(117, 117, 117, 0.85) 1px
        box-shadow: none
        transition: border-radius 250ms

        input
            background-color: inherit
            color: var(--texto1)
            border: none
            height: 100%
            width: 15rem
            vertical-align: middle
            font:
                family: $titulos
                size: 15px
            outline: none

        &::after
            font:
                family: 'Material Icons'
                weight: normal
                style: normal
                size: 20px
            vertical-align: middle
            content: "search"
            line-height: 1
            letter-spacing: normal
            text-transform: none
            display: inline-block
            white-space: nowrap
            word-wrap: normal
            direction: ltr


    .texto_error
        list-style-type: none


    @media only screen and (max-width: 1100px)

        #buscador_barra input
            width: 10rem


    @media only screen and (max-width: 950px)

        #buscador_barra
            input
                width: 6rem

            &::after
                content: ""




    //
</style>
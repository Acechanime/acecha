<template lang="pug">
    li.barra_li
        div#buscador_barra
            form(@submit.prevent="buscarAnime")
                input(placeholder="Buscar anime" @input="cambiarNombre($event)" :value="nombre")
                i.material-icons(@click="buscarAnime") search
        ul.autocompletar(:style="estilos")
            template(v-if="listaAnimesFiltrada2.length !== 0")
                item-buscador(v-for="(anime, i) in listaAnimesFiltrada2"
                    :anime="anime"
                    :limpiarBuscador="limpiarBuscador"
                    :key="i")
            li.texto_error(v-else) No se encontraron animes.

    //
</template>

<script lang="coffee">
    import { filtroNombre, filtrar } from "../Animes/buscador.coffee"
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
            nombre: (nuevo) ->
                @tieneNombre = (nuevo isnt "")

        computed:
            estilos: ->
                res =
                    width: "#{@anchoBuscador}px"
                    top: "#{@altoBuscador}px"

                if @tieneNombre
                    res.display = "block"
                res
            listaAnimes: -> @$store.state.datos.listaAnimes
            listaAnimesFiltrada: ->
                if @listaAnimes isnt undefined
                    (@listaAnimes.filter @filtroNombre).slice 0, 5
                else []
            listaAnimesFiltrada2: ->
                vm = this
                if @listaAnimes isnt undefined
                    filtrar @, @listaAnimes, filtroNombre, 5
                else []
        methods:
            cambiarNombre: (element) ->
                @nombre = element.target.value

            limpiarBuscador: ->
                @nombre = ""

            buscarAnime: () ->
                nombre = @nombre
                @limpiarBuscador()
                @$router.push "/animes/?nombre=#{ encodeURI nombre }"

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
        min-width: 15rem

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
        padding: 0.25rem 0.75rem 0.5rem
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
            // transition: width 250ms ease-in-out

        i
            font:
                family: 'Material Icons'
                weight: normal
                style: normal
                size: 20px
            vertical-align: middle
            line-height: 1
            letter-spacing: normal
            text-transform: none
            display: inline-block
            white-space: nowrap
            word-wrap: normal
            direction: ltr
            user-select: none
            cursor: pointer


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
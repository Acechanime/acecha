<template lang="pug">
    div.busc
        input#nombre(placeholder="Nombre del anime" @input="cambiarNombre($event)")
        select#generos(v-model.number="genero")
            option(value="-1" selected) Cualquier género
            option(v-for="gen in listaGeneros" :value="gen.genero_id") {{ gen.nombre }}
        select#emision(v-model.number="estado")
            option(value="-1" selected) Cualquier estado
            option(value="0") Terminado
            option(value="1") En emisión
        // select(v-model.number="anyo")
            option(value="-1" selected) Cualquier año
        orden(:cambiarFunOrden="cambiarFunOrden" v-model="orden")

    //
</template>

<!-- TODO: Hacer que los filtros que se apliquen se vean en la url. -->
<script lang="coffee">
    import {impr} from "../../variables";
    import orden from "./buscador/orden.vue"
    import { removerCaracteres, filtroNombre, comp2 } from "./buscador.coffee"


    export default
        name: "buscador"
        components: { orden }
        data: ->
            nombre: ""
            genero: -1
            estado: -1
            anyo: -1
            orden: -1
            listaGeneros: []
            filtros:
                orden: () -> true
            primeraCarga: true
        props:
            cambiarFiltro:
                type: Function # [(a -> Bool)] -> ()
                required: true
            cambiarFunOrden:
                type: Function # ('A -> 'B -> Num) -> ()
                required: true
        watch:
            genero: (nuevo, viejo) ->
                if !@primeraCarga and nuevo != viejo
                    @$router.push "?genero=#{nuevo}&estado=#{@estado}&orden=#{@orden}"
            estado: (nuevo, viejo) ->
                if !@primeraCarga and nuevo != viejo
                    @$router.push "?genero=#{@genero}&estado=#{nuevo}&orden=#{@orden}"
            orden: (nuevo, viejo) ->
                if !@primeraCarga and nuevo != viejo
                    @$router.push "?genero=#{@genero}&estado=#{@estado}&orden=#{nuevo}"
        methods:
            cambiarNombre: (element) ->
                nombre = element.target.value
                @nombre = nombre
                # @$router.push "#nombre=#{nombre}"

            cargarListaGeneros: ->
                [datos, bool] = await @$store.state.datos.listaGeneros

                @listaGeneros = datos.sort (a, b) =>
                    if a.nombre > b.nombre then 1
                    else if a.nombre < b.nombre then -1
                    else 0

            cambiarFiltroOrden: (f) ->
                @filtros.orden = f
            recuperarFiltros: ->
                q = @$route.query
                @genero = parseInt (q.genero || "-1")
                @estado = parseInt (q.estado || "-1")
                @orden  = parseInt (q.orden  || "-1")
        created: ->
            @cargarListaGeneros()
            @recuperarFiltros()
            vm = this
            filtroEstado = (a) ->
                if vm.estado is -1 then true
                else if vm.estado is 0
                    a.emision.en_emision is false or a.emision.en_emision is null
                else if vm.estado is 1
                    a.emision.en_emision is true
                else true


            filtroNombre2 = (_, anime) -> filtroNombre vm, anime

            ###
            filtroNombre = (a) ->
                if vm.nombre.length is 0 then return true

                palabras = removerCaracteres a.info.nombre, "-:"
                nombre = removerCaracteres vm.nombre, "-:"

                if nombre.length is 0 then return true

                for p1 in palabras
                    for p2 in nombre
                        if (p1.search p2) != -1 then return true
                return false

             ###

            filtroGenero = (a) ->
                if vm.genero is -1 then true
                else
                    res = a.info.generos?.find (g) -> g == vm.genero
                    res?

            vm.cambiarFiltro (comp2 [filtroEstado, filtroGenero], filtroNombre2)
            setTimeout (=>
                vm.primeraCarga = false
            ), 0

            # vm.cambiarFiltros [
            #     filtroEstado
            #     filtroGenero
            #     filtroNombre
            #     @filtros.orden
            # ]

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .busc
        padding: 2rem 0
        // display: table

    select
        vertical-align: middle
        margin-right: 1rem
        padding: 5px 10px
        font:
            family: $titulos
        border-radius: 5px
        box-shadow: none
        &:focus
            outline: none



    #nombre
        background-color: var(--fondo1)
        color: var(--texto1)
        max-width: 100%
        margin-right: 1rem
        font:
            family: $titulos
            size: 1.15rem

        padding: 0.5rem 1.15rem
        border-radius: 25px
        border: solid $colorPrincipal 1px
        box-shadow: none
        transition: border-radius 250ms
        &:focus
            color: $colorPrincipal
            border-radius: 5px
            outline: none


        
        

    //
</style>
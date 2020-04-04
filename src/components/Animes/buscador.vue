<template lang="pug">
    div.busc
        input#nombre(placeholder="Nombre del anime" @input="cambiarNombre($event)" :value="nombre")

        select#generos(v-model="genero")
            option(value="-1" selected) Cualquier género
            option(v-for="gen in listaGeneros" :value="gen.id") {{ gen.nombre }}

        select#emision(v-model.number="estado")
            option(value="-1" selected) Cualquier estado
            option(value="0") Terminado
            option(value="1") En emisión
        // select(v-model.number="anyo")
            option(value="-1" selected) Cualquier año

        orden(:cambiarFunOrden="cambiarFunOrden" v-model="orden")

    //
</template>

<script lang="coffee">
    import {impr} from "../../coffee/variables.coffee";
    import orden from "./buscador/orden.vue"
    import { removerCaracteres, filtroNombre, comp2 } from "../../coffee/buscador.coffee"


    export default
        name: "buscador"
        components: { orden }
        data: ->
            nombre: ""
            genero: "-1"
            estado: -1
            anyo: -1
            orden: -1
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
        computed:
            listaGeneros: ->
                if process.client == false then return []

                generos = [@$store.state.datos.generos...]
                generos.sort (a, b) =>
                    if a.nombre > b.nombre then 1
                    else if a.nombre < b.nombre then -1
                    else 0

        methods:
            cambiarNombre: (element) ->
                nombre = element.target.value
                @nombre = nombre
                # @$router.push "#nombre=#{nombre}"

            cambiarFiltroOrden: (f) ->
                @filtros.orden = f

            recuperarFiltros: ->
                q = @$route.query
                @nombre = q.nombre || ""
                @genero = q.genero || "-1"
                @estado = parseInt (q.estado || "-1")
                @orden  = parseInt (q.orden  || "-1")

        mounted: ->
            @recuperarFiltros()
            vm = this
            filtroEstado = (a) ->
                if vm.estado is -1 then true
                else if vm.estado is 0
                    a.en_emision is false or a.en_emision is null
                else if vm.estado is 1
                    a.en_emision is true
                else true


            filtroNombre2 = (_, anime) -> filtroNombre vm, anime

            filtroGenero = (a) ->
                if vm.genero is "-1" then true
                else
                    res = a.generos?.find (g) -> g == vm.genero
                    res?

            vm.cambiarFiltro (comp2 [filtroEstado, filtroGenero], filtroNombre2)
            setTimeout (=>
                vm.primeraCarga = false
            ), 0


#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"


    .busc
        padding: 2rem 0
        color: black
        // display: table


    select
        vertical-align: middle
        margin-right: 1rem
        padding: 5px 10px
        font:
            family: var(--fuenteTitulos)
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
            family: var(--fuenteTitulos)
            size: 1.15rem

        padding: 0.5rem 1.15rem
        border-radius: 25px
        border: solid var(--colorPrincipal) 1px
        box-shadow: none
        transition: border-radius 250ms
        &:focus
            color: var(--colorPrincipal)
            border-radius: 5px
            outline: none


    //
</style>

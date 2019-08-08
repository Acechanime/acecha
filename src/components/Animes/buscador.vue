<template lang="pug">
    div.busc
        input#nombre(placeholder="Nombre del anime" v-model="nombre")
        select#generos(v-model.number="genero")
            option(value="-1" selected) Cualquier género
            option(v-for="gen in $store.state.listaGeneros" :value="gen.genero_id") {{ gen.nombre }}
        select#emision(v-model.number="estado")
            option(value="-1" selected) Cualquier estado
            option(value="0") Terminado
            option(value="1") En emisión
    //
</template>

<script lang="coffee">

    removerCaracteres = (str, strArr) =>
        caracs = strArr.split ""
        arr = (str.split "").map (c) =>
            res = caracs.filter (c2) => c == c2
            if res.length == 1 then " " else c
        arr.join("").toLowerCase().split(" ")

    export default
        name: "buscador"
        data: ->
            nombre: ""
            genero: -1
            estado: -1
        props:
            cambiarFiltros:
                type: Function # [(a -> Bool)] -> ()
                required: true
        created: ->
            vm = this
            filtroEstado = (a) ->
                if vm.estado is -1 then true
                else if vm.estado is 0 then a.en_emision is false or a.en_emision is null
                else if vm.estado is 1 then a.en_emision is true
                else true
            filtroNombre = (a) ->
                if vm.nombre.length is 0 then return true
                palabras = removerCaracteres a.nombre, "-:"
                nombre = removerCaracteres vm.nombre, "-:"
                if nombre.length is 0 then return true
                for p1 in palabras
                    for p2 in nombre
                        if (p1.search p2) != -1 then return true
                return false
            filtroGenero = (a) ->
                if vm.genero is -1 then true
                else
                    res = a.generos?.find (g) -> g?.genero_id == vm.genero
                    res?
            vm.cambiarFiltros [filtroEstado, filtroGenero, filtroNombre]
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .busc
        padding: 25px 0
        display: table

    #nombre
        background-color: var(--fondo1)
        display: table-cell
        vertical-align: middle
        max-width: 100%
        margin-right: 15px
        font:
            family: $titulos
            size: 21px

        padding: 10px 20px
        border-radius: 25px
        border: solid $colorPrincipal 1px
        box-shadow: none
        transition: border-radius 250ms
        &:focus
            color: $colorPrincipal
            border-radius: 5px
            border-width: 2px
            outline: none
            padding-bottom: 8px

    #generos
        display: table-cell
        vertical-align: middle
        margin: 0 15px

    #emision
        display: inline-table
        margin: 0 15px
        vertical-align: middle

    //
</style>
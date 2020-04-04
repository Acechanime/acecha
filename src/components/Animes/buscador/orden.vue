<template lang="pug">
    select(:value="value" @input="$emit('input', parseInt($event.target.value))")
        option(value="-1" selected) Agregado recientemente
        option(value="1") Odenar por nombre
        option(value="2") Ordenar por emision
        // option(value="3") Agregado recientemente

    //
</template>

<script lang="coffee">

    ###: (Anime, Anime) -> Bool
    Toma 2 animes y los ordena
    ###
    ordenarPorNombre = (x, y) =>
        if x.nombre > y.nombre then 1 else -1


    obtenerMs = (fecha) =>
        posPrimerSlash = fecha.indexOf "/"
        temp = fecha.substr (posPrimerSlash + 1)
        posSegundoSlash = temp.indexOf "/"

        dia = fecha.substring 0, posPrimerSlash
        mes = temp.substring 0, posSegundoSlash
        año = temp.substr (posSegundoSlash + 1)

        Date.parse "#{mes}/#{dia}/#{año}"


    ordenarPorEmision = (x, y) =>

        emisionX = obtenerMs x.inicio_emision
        if Number.isNaN emisionX
            console.log "#{x.nombre} tiene inicio `#{x.inicio_emision}`"
            console.log new Date x.inicio_emision
            emisionX = 0

        emisionY = obtenerMs y.inicio_emision
        if Number.isNaN emisionY
            console.log "#{y.info.nombre} tiene inicio ´#{y.inicio_emision}´"
            console.log new Date y.inicio_emision
            emisionY = 0

        if emisionX < emisionY then 1 else -1



    export default
        name: "orden"
        props:
            cambiarFunOrden:
                type: Function
                required: true
            value:
                type: Number
                required: true
        watch:
            value: (nuevo) ->
                @cambiarFunOrden switch nuevo
                    when -1 then => -1
                    when  1 then ordenarPorNombre
                    when  2 then ordenarPorEmision
        created: ->
            @cambiarFunOrden switch @value
                when -1 then => -1
                when  1 then ordenarPorNombre
                when  2 then ordenarPorEmision


#
</script>

<style scoped lang="sass">

    //
</style>

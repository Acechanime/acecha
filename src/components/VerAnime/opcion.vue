<template lang="pug">
    li.opcion(:title="opcion[0]" :class="clases" @click="cambiar()") Opcion {{ pos + 1 }}
    //
</template>

<script lang="coffee">

    export default
        name: "opcion"
        props:
            pos:
                type: Number
                required: true
            opcion:
                type: Array
                required: true
            largo:
                type: Number
                required: true
            posActiva:
                type: Number
                required: true
            cambiarOpcion:
                type: Function
                required: true
        computed:
            clases: ->
                clases = []
                if @pos is 0 then clases.push "opcion--primero"
                else if @pos is @largo - 1 then clases.push "opcion--ultimo"

                if @posActiva is @pos then clases.push "opcion--activa"

                clases
        methods:
            cambiar: ->
                @cambiarOpcion @pos
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .opcion
        display: inline-block
        padding: 10px 15px
        background-color: #0f0d0d
        color: #BFC1B6
        cursor: pointer

    .opcion--activa
        background-color: black

    .opcion--primero
        border-radius: 22px 0 0 0

    .opcion--ultimo
        border-radius: 0 22px 0 0

    //
</style>

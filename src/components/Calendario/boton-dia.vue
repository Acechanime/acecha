<template lang="pug">
    div(:class="clases")
        button(@click="clickFn(pos)") {{ txt }}

    //
</template>

<script lang="coffee">

    export default
        name: "boton-dia"
        props:
            txt:
                type: String
                required: true
            pos:
                type: Number
                required: true
            posActual:
                type: Number
                required: true
            clickFn:
                type: Function #: Num -> ()
                required: true
        computed:
            clases: ->
                if @pos is @posActual then ["boton-dia", "boton-dia-actual"]
                else ["boton-dia"]

    
#
</script>

<style scoped lang="sass">

    .boton-dia
        text-align: center
        button
            display: inline-block
            cursor: pointer
            border: none
            padding: 0.45rem 1rem
            text-transform: uppercase
            font-family: Roboto, sans-serif
            background-color: #DADADA
            color: #31373c
            border-radius: 2px


    .boton-dia-actual button
        background-color: #6e25b2
        color: white


    @media only screen and (max-width: 500px)
        .boton-dia button
            width: 80%

    //
</style>
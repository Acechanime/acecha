<template lang="pug">
    i.modo-color-pc.material-icons(@click="cambiarColor") invert_colors

    //
</template>

<script lang="coffee">

    export default
        name: "modo-color"
        methods:
            cambiarColor: ->
                console.log "Cambiando..."
                @$store.commit "color/cambiarModoColor"


#
</script>

<style scoped lang="sass">

    .modo-color-pc
        position: fixed
        bottom: 0
        right: 0
        z-index: 5
        font-size: 30px
        background-color: var(--texto1)
        color: var(--fondo1)
        padding: 15px
        margin: 20px
        border-radius: 50%
        cursor: pointer
        user-select: none
        box-shadow: rgba(84, 84, 84, 0.65) 1px 1px 1px 1px

    @media only screen and (max-width: 770px)
        .modo-color-pc
            display: none !important

    //
</style>

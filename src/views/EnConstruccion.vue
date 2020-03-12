<template lang="pug">
    div
        div.img-fondo
        div.construccion
            div.cont
                h2 {{ titulo }}
                p {{ texto }}
                br
                br
                router-link.ir-inicio(to="/") Ir al inicio
    //
</template>

<script lang="coffee">

    export default
        name: "EnConstruccion"
        props:
            titulo:
                type: String
                default: "Esta página está en construcción"
            texto:
                type: String
                default: "Pero aun puedes ver todos tus animes, solo debes"
        created: ->
            @$store.commit "terminarCargaPagina"
    #
    
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    .ir-inicio

        padding: 15px 40px
        background-color: var(--first-color)
        border-radius: 37px
        color: white
        text-decoration: none

    .img-fondo
        background: url("../assets/img/construccion.jpg") fixed center
        position: fixed
        top: 0
        left: 0
        z-index: 8
        width: 100%
        height: 100%
        // opacity: 0.4
        filter: brightness(40%)

    .construccion
        color: #e8e8e1
        position: fixed
        top: 0
        left: 0
        display: table
        z-index: 9
        width: 100%
        height: 100%
        text-align: center
        .cont
            display: table-cell
            vertical-align: middle
        
    //
</style>
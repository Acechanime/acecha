<template lang="pug">
    div
        div.img-fondo
        div.construccion
            div.cont
                h2.titulo-aviso {{ titulo }}
                p.texto-aviso {{ texto }}
                br
                br
                // router-link.ir-inicio(to="/") Ir al inicio
    //
</template>

<script lang="coffee">

    export default
        name: "EnConstruccion"
        metaInfo:
            title: "Mantenimiento"
        props:
            titulo:
                type: String
                default: "La página está en mantenimiento"
            texto:
                type: String
                default: "Acechadores, estamos en mantenimiento para arreglar los nuevos problemas de la versión que añadimos, la web se pondrá operativa hoy mismo en cuanto se arreglen los problemas ocasionados, disculpen las molestias, ¡gracias por visitarnos!"


#
</script>

<style scoped lang="sass">
    @import "../sass/variables"


    .titulo-aviso, .texto-aviso
        color: white


    .ir-inicio

        padding: 15px 40px
        background-color: var(--first-color)
        border-radius: 37px
        color: white
        text-decoration: none

    .img-fondo
        background: url("../assets/img/Problemas_tecnicos_2020.png") fixed center
        position: fixed
        top: 0
        left: 0
        z-index: 8
        width: 100%
        height: 100%
        background-size: cover
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

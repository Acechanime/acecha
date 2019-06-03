<template lang="pug">
    div.pie
        div.contenedor
            div.overlay
            div.row
                div.col.l3.logo
                    img( src="https://i2.wp.com/acechanime.com/wp-content/uploads/2019/01/Acecha-EDIT5.png?resize=768%2C240&ssl=1"
                         alt="AcechaAnime" )
                div.col.l4.nosotros
                    span.titulo Sobre Nosotros
                    br
                    br
                    span.
                        AcechaAnime es una página web segura para descargar y ver anime online
                        sin publicidad molesta. Soporte 24/7.
                div.col.l3.distingue
                    span.titulo ¿Qué nos distingue?
                    br
                    br
                    span Diseño original
                    br
                    span Optimizado al 100%
                    br
                    span Ofrecemos Soporte
                div.col.l2.contacto
                    span.titulo Contacto
                    br
                    img( src="https://i1.wp.com/acechanime.com/wp-content/uploads/2018/12/Twitter_Icon-1.png?resize=768%2C675&ssl=1"
                         alt="Contacto")
    //
</template>

<script lang="coffee">

    export default
        name: "pie-pagina"
    #

</script>

<style scoped lang="sass">
    .pie
        color: white
        position: relative
        height: 275px

    .overlay
        position: absolute
        height: 100%
        width: 100%
        top: 0
        left: 0
        background-color: black
        opacity: 0.69

    .row
        position: relative

    .logo
        padding: 30px
        img
            width: 100%

    .nosotros
        padding: 30px
        font-size: medium
        .titulo
            font-weight: bold

    .distingue
        padding: 30px
        font-size: medium
        .titulo
            font-weight: bold

    .contacto
        padding: 30px 0
        .titulo
            font-weight: bold
        img
            padding: 10px 0
            width: 100px

    //
</style>
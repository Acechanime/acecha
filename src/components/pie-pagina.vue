<template lang="pug">
    footer.pie
        div.contenedor
            div.row
                div.col.l3.logo
                    h3.titulo Sobre Nosotros
                    span.txt.
                        AcechaAnime es una página web segura para descargar y ver anime online gratis.
                        Soporte 24/7.
                div.col.l3.nosotros
                    h3.titulo ¿Qué nos distingue?
                    div.txt
                        span Diseño original
                        br
                        span Optimizado al 100%
                        br
                        span Ofrecemos Soporte
                div.col.l3.distingue
                    h3.titulo URLS
                    div.txt
                        router-link(to="/dmca/") DMCA
                        br
                        router-link(to="/politica-privacidad/") Política de privacidad
                div.col.l3.contacto
                    h3.titulo Contacto
                    img( src="https://acechanime.com/wp-content/uploads/2019/05/twitter-300x264.png"
                         alt="Contacto")
    //
</template>

<script lang="coffee">

    export default
        name: "pie-pagina"
    #

</script>

<style scoped lang="sass">
    @import "../sass/variables.sass"

    .pie
        color: white
        position: relative
        height: 275px
        font-family: $titulos
        background-color: #4c4c4c
        padding: 64px 0

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
        padding-right: 40px

    .titulo
        font:
            size: 21px
            weight: bold
        margin-bottom: 20px

    .nosotros, .distingue
        font-size: medium

    .contacto
        img
            padding: 10px 0
            width: 100px

    .txt
        line-height: 2
        font-size: 14px
        a
            color: white
            text-decoration: none

    //
</style>
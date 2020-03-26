<template lang="pug">
    footer.pie(:style="estilos")
        div.cont-foot
            div.logo
                h3.titulo Sobre Nosotros
                // img(src="../assets/img/acechanime.png"
                    alt="Logo")
                // br
                span.txt.
                    AcechaAnime es una página web segura para descargar y ver anime online.
                    Soporte 24/7.
            div.nosotros
                h3.titulo ¿Qué nos distingue?
                div.txt
                    span Diseño original
                    br
                    span Optimizado al 100%
                    br
                    span Ofrecemos Soporte
                    br
                    span Publicidad mínima
            div.distingue
                h3.titulo URLS
                div.txt
                    router-link(to="/dmca/") DMCA
                    br
                    router-link(to="/politica-privacidad/") Política de privacidad
            div.contacto
                h3.titulo Contacto
                img(src="https://legacy.acechanime.com/wp-content/uploads/2019/05/twitter-300x264.png"
                     alt="Contacto")
    //
</template>

<script lang="coffee">

    export default
        name: "pie-pagina"
        computed:
            estilos: ->
                vm = this
                listaBlanca = ["/mi-cuenta", "/mi-cuenta/", "/en-construccion/", "/login/"]
                estilos = {}
                if (listaBlanca.find (x) => x is vm.$route.path)?
                    estilos.display = "none"

                estilos.backgroundImage =
                    if Math.random() < 0.01 then "url('/img/portada/you-kei.webp')"
                    else "url('/img/portada/footer.jpg')"

                estilos

#
</script>

<style scoped lang="sass">
    @import "../sass/variables.sass"

    .pie
        color: white
        position: relative
        font-family: $titulos
        // background-image: url("../assets/img/footer.jpg")
        background: no-repeat top left/cover
        padding: 64px 0
        z-index: 1
        &::before
            content: ""
            background: rgba(0, 0, 0, 0.7)
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            z-index: -1

    .overlay
        position: absolute
        height: 100%
        width: 100%
        top: 0
        left: 0
        background-color: black
        opacity: 0.69

    .cont-foot
        // grid-template-columns: repeat(4, 1fr)
        display: grid
        grid-gap: 3rem
        width: 90%
        max-width: var(--wrap)
        margin-left: auto
        margin-right: auto

    .row
        position: relative

    .logo
        // padding-right: 40px
        img
            max-width: 180px
            width: 100%

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

    @media only screen and (min-width: 700px)
        .cont-foot
            grid-template-columns: repeat(4, 1fr)

    //
</style>
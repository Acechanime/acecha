<template lang="pug">
    footer.pie-pagina-dos.contenedor
        div.cont-pie-pagina-dos
            div
                img.info-logo(src="/img/logos/LOGO_ACECHA.webp" alt="Logo")
            div
                p.info-titulo Acechanime
                p.info-descripcion
                    | Página web segura para descargar y ver anime online.
                    br
                    | Soporte 24/7.
                div.info-vinculos
                    router-link(to="/dmca/") DMCA
                    router-link(to="/politica-privacidad") Politica de privacidad
                p.info-descripcion
                    | Copyright &copy; 2018 - {{ new Date().getUTCFullYear() }}
            div
                a(href="https://twitter.com/Acechanime" target="_blank")
                    img.img-contacto(
                        src="https://legacy.acechanime.com/wp-content/uploads/2019/05/twitter-300x264.png"
                        alt="Contacto"
                    )

    //
</template>

<script lang="coffee">

    export default
        name: "pie-pagina-2.vue"

#
</script>

<style scoped lang="sass">

    .pie-pagina-dos
        position: relative
        z-index: 1
        background-color: var(--fondo1)
        color: var(--texto1)
        padding: 2rem 0


    .cont-pie-pagina-dos
        display: grid
        grid-template-columns: 5rem auto 5rem
        grid-column-gap: 3rem


    .info-titulo
        font:
            family: "Product Sans", Roboto, sans-serif
            size: 1.2rem


    .info-logo
        max-width: 100%
        height: auto
        object-fit: contain


    .info-descripcion, .info-vinculos
        opacity: 0.75
        font-size: 0.85rem


    .info-vinculos
        padding: 0.25rem 0
        a
            display: inline-block
            padding-right: 0.5rem


    .img-contacto
        max-width: 100%
        height: auto
        object-fit: contain


    //
</style>
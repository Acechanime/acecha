<template lang="pug">
    div.comentarios
        div.contenedor
            img(src="https://image.flaticon.com/icons/svg/179/179319.svg" height="60px")
            br
            br
            p.txt
                b.
                    Esta página está en beta. Los comentarios relacionados a errores se
                    responderán <i>en menos de 4h por los programadores</i>.
                br
                | Las preguntas generales se responderán a discreción.
            br
            fb-comments(path="/")

    //
</template>

<script lang="coffee">
    import fbComments from "../fb-comments.vue"

    export default
        name: "comentarios"
        components: { fbComments }

    #

</script>

<style scoped lang="sass">
    .comentarios
        padding: 40px 0
        text-align: center

    .txt
        font-size: 14px
        color: var(--texto1)


    //
</style>
<template lang="pug">
    div.comentarios
        div.contenedor
            img(src="https://image.flaticon.com/icons/svg/179/179319.svg" height="60px")
            br
            br
            p.txt.
                Reporta errores y pregunta todo lo que quieras, tus preguntas serán respondidas
                antes de 24h.
            br
            div.simular-com
    //
</template>

<script lang="coffee">

    export default
        name: "comentarios"

    #

</script>

<style scoped lang="sass">
    .comentarios
        padding: 40px 0
        text-align: center

    .txt
        font-size: 14px

    .simular-com
        height: 600px
        background-color: #ececec

    //
</style>
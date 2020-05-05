<template lang="pug">
    div.comentario
        div.autor {{ comentario.autor.nombre }} | {{ fechaDelComentario }}
        div.contenido {{ comentario.contenido }}

    //
</template>

<script lang="coffee">

    export default
        name: "comentario"
        props:
            comentario:
                type: Object
                required: true
        computed:
            fechaDelComentario: ->
                horaActual = new Date().getTime()
                diferencia = horaActual - @comentario.creacion

                minutos = Math.round(diferencia / 60000)

                if minutos <= 1
                    "Ahora mismo"
                else if minutos < 60
                    "Hace #{ minutos } minutos"
                else if minutos < 1440
                    "Hace #{ Math.round(minutos / 60) } horas"
                else
                    "Hace #{ Math.round(minutos / 24 / 60) } dias"

    
#
</script>

<style scoped lang="sass">

    .comentario
        margin: 1rem 0

    .autor
        font-size: 0.7rem
        padding-bottom: 0.5rem
        opacity: 0.8
    
    //
</style>
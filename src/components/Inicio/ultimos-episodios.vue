<template lang="pug">
    div.ultimos-eps.contenedor.contenedor-rec
        div.row
            div.col.l6.leyenda
                div.titulo acechanime
                div.txt Últimos episodios
                hr.divisor
                div.boton ¡Activa las notificaciones abajo a la izquierda!
            div.col.l6
                img.img( src="https://i1.wp.com/acechanime.com/wp-content/uploads/2019/02/dororo-anime-del-2019-trailer-1.jpg?resize=768%2C432&ssl=1"
                     alt="Ultimo episodio" )
                br
                span.nombre Dororo 9
</template>

<script lang="coffee">

    export default
        name: "ultimos-episodios"
    #
</script>

<style scoped lang="sass">
    .contenedor--rec
        max-width: 1068px

    .ultimos-eps
        text-align: center

    .leyenda
        text-transform: uppercase
        .titulo
            padding: 30px 0
            font:
                size: 12px
                weight: bold
            letter-spacing: 12px
        .txt
            font:
                weight: bold
                size: 43px
            line-height: 1.2em
            color: #3a3a3a
            padding: 30px 0
        .divisor
            margin: 0 auto
            width: 50%
        .boton
            display: inline-block
            cursor: pointer
            font-size: 14px
            font-weight: 600
            letter-spacing: 1px
            color: #e22914
            background-color: white
            border-radius: 30px
            padding: 15px 40px
            margin: 30px 0
            border: solid 1px
            box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
            transition: all 300ms
            &:hover
                transform: scale(1.1)
                color: #e20000

    .img
        width: 70%
        box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
        border-radius: 5px

    .nombre
        font-size: 17px
        font-weight: 700
        line-height: .9em
        letter-spacing: 0
        color: #4e565b

    //
</style>
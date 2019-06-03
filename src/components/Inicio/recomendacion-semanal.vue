<template lang="pug">
    div.rec.contenedor.contenedor--rec
        div.row
            div.col.l6.pad
                div.cont-img
                    img.img( src="https://i2.wp.com/acechanime.com/wp-content/uploads/2019/02/DyFPH7tUwAIsD8n.jpg?w=724&ssl=1"
                         alt="Img anime" )
                div.temporizador.row
                    div.col.l3
                        span.num {{ dias }}
                        br
                        span.desc Dias
                    div.col.l3
                        span.num {{ horas }}
                        br
                        span.desc Horas
                    div.col.l3
                        span.num {{ minutos }}
                        br
                        span.desc Minutos
                    div.col.l3
                        span.num {{ segundosF }}
                        br
                        span.desc Segundos
            div.col.l6.pad.leyenda
                div.titulo acechanime
                div.txt Recomendación Semanal
                hr.divisor
                div.boton Click para verlo
    //
</template>

<script lang="coffee">
    # Todo: Optimizar el comportamiento del temporizador. Campos separados y que sec llame a min, min a hora etc

    export default
        name: "recomendacion-semanal"
        data: ->
            segundos: 99999,
            intervaloSegundos: ''
        computed:
            dias: -> Math.floor(this.segundos / 60 / 60 / 24)
            horas: -> Math.floor(this.segundos / 60 / 60) % 24
            minutos: -> Math.floor(this.segundos / 60) % 60
            segundosF: -> this.segundos % 60
        created: ->
            vm = this
            vm.intervaloSegundos = setInterval (() =>
                if !vm.segundos <= 0
                    vm.segundos--
            ), 1000

        beforeDestroy: ->
            clearInterval(this.intervaloSegundos)
    #
</script>

<style scoped lang="sass">
    .contenedor--rec
        max-width: 1068px

    .rec
        padding: 30px 0
        text-align: center

    .pad
        padding: 20px

    .cont-img
        cursor: pointer
        &:hover
            .img
                opacity: 0.75

    .img
        transition: opacity 250ms
        border-radius: 10px
        max-width: 50%
        box-shadow: 0 0 10px 0 rgba(0,0,0,.5)

    .temporizador
        padding: 20px 0
        font-family: 'Roboto Slab', sans-serif
        font-size: 10px
        .num
            line-height: 1
            font-size: 54px
            padding: 20px
        .desc
            font-size: small

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
            color: #54b760
            background-color: white
            border-radius: 30px
            padding: 15px 40px
            margin: 30px 0
            border: solid 1px
            box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
            transition: all 300ms
            &:hover
                transform: scale(1.1)
                color: #0cbc00

    //

</style>
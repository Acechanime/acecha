<template lang="pug">
    div.rec.contenedor.contenedor--rec
        div.row(v-if="cargado && !error")
            div.col.l6.s12.pad
                div.cont-img
                    router-link(:to="recomendacion.ruta")
                        img.img( :src="recomendacion.img_portada"
                             alt="Img anime" )
                div.temporizador2.countdown
                    div.countdown__block
                        div.countdown__digits {{ dias }}
                        label.countdown__label Días
                    div.countdown__block
                        div.countdown__digits {{ horas }}
                        label.countdown__label Horas
                    div.countdown__block
                        div.countdown__digits {{ minutos }}
                        label.countdown__label Minutos
                    div.countdown__block
                        div.countdown__digits {{ segundosF }}
                        label.countdown__label Segundos

            div.col.l6.s12.pad.leyenda
                div.titulo acechanime
                div.txt Recomendación Semanal
                hr.divisor
                router-link.boton(to="/") Click para verlo
        div.err(v-if="error")
            span.
                Hubo un error al cargar la recomendación semanal.<br>
                Vuelve en unos minutos, o escribenos en Discord.<br>
            p.tech Código de error: 0x{{ codigoDeError }}
    //
</template>

<script lang="coffee">

    export default
        name: "recomendacion-semanal"
        data: ->
            segundos: 0,
            intervaloSegundos: ''
            recomendacion: {}
            error: no
            cargado: no
            codigoDeError: "00"
        computed:
            dias: -> Math.floor(this.segundos / 60 / 60 / 24)
            horas: -> Math.floor(this.segundos / 60 / 60) % 24
            minutos: -> Math.floor(this.segundos / 60) % 60
            segundosF: -> this.segundos % 60
        props:
            terminarCarga:
                type: Function
                required: true
        methods:
            cargarRecomendacion: ->
                recRaw = await fetch "/api/recomendacionSemanal/"
                rec = await recRaw.json()
                if rec.exito
                    animeId = rec.payload["anime_id"]
                    hora = rec.payload["hora"]
                    [animeId, hora]
                else
                    throw new Error rec.error.razon
            inicializarRecomendacion: (animeId) ->
                res = @$store.state.listaAnimes.filter (n) => n.anime_id == animeId
                if res[0]?
                    @recomendacion = res[0]
                else
                    @error = yes
                    @codigoDeError = "01"
                    console.error "Error. No existe este anime en la recomendacion semanal."
                @cargado = yes
            inicializarTemporizador: (hora) ->
                horaLimite = Math.floor (hora / 1000)
                horaActual = Math.floor (new Date().getTime() / 1000)
                @segundos = horaLimite - horaActual

        created: ->
            vm = this
            vm.intervaloSegundos = setInterval (() =>
                if !vm.segundos <= 0
                    vm.segundos--
            ), 1000

            try
                [ruta, hora] = await @cargarRecomendacion()
                @inicializarRecomendacion ruta
                @inicializarTemporizador hora
            catch e
                @cargado = yes
                @error = yes
                @codigoDeError = "02"
            @terminarCarga()

        beforeDestroy: ->
            clearInterval(this.intervaloSegundos)
    #
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .contenedor--rec
        max-width: 1068px

    .rec
        padding: 48px 0
        text-align: center

    .pad
        padding: 20px

    .img
        @extend %imgFlotantes
        cursor: pointer
        border-radius: 5px
        max-width: 50%
        box-shadow: 0 0 10px 0 rgba(0,0,0,.5)

    .temporizador2
        color: var(--texto2)
        display: grid
        grid-template-columns: repeat(4, 1fr)
        margin-top: 1rem
        .countdown__block
            justify-self: center
            text-align: center
            .countdown__digits
                font-size: var(--tamano-titulos)
                line-height: 1
            .countdown__label
                font-size: var(--tamano-textos)

    .leyenda
        text-transform: uppercase
        .titulo
            color: var(--texto2)
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
            color: var(--texto1)
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
            background-color: var(--fondo1)
            border-radius: 30px
            padding: 15px 40px
            margin: 30px 0
            border: solid 1px
            box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
            transition: all 300ms
            text-decoration: none
            &:hover
                transform: scale(1.1)
                color: #0cbc00

    @media only screen and (max-width: 500px)
        .leyenda .txt
            font-size: var(--tamano-titulos)

        .img
            max-width: 100%

        .temporizador
            .num
                font-size: var(--tamano-titulos)
            .desc
                font-size: var(--tamano-textos)

    //

</style>
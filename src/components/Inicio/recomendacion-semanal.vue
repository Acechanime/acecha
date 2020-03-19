<template lang="pug">
    div.rec.contenedor.contenedor--rec
        div.malla-recomendacion(v-if="cargado && !error")
            div.pad.leyenda(v-if="esMovil")
                div.titulo.titulo-recomendacion-movil acechanime
                div.txt.txt-recomendacion-movil Recomendación Semanal

            div.pad
                div.cont-img
                    router-link(:to="recomendacion.info.ruta")
                        img.img(:src="recomendacion.imagenes.portada"
                             alt="Img anime" )

            div.pad.leyenda(v-if="!esMovil")
                div.titulo acechanime
                div.txt Recomendación Semanal
                hr.divisor
                router-link.boton(:to="recomendacion.info.ruta") Click para verlo

        div.err(v-if="error")
            span.
                Hubo un error al cargar la recomendación semanal.<br>
                Vuelve en unos minutos, o escribenos en Discord.<br>
            p.tech Código de error: 0x{{ codigoDeError }}
    //
</template>

<script lang="coffee">
    import {servidor, impr} from "../../variables";
    import store, {listaAnimesCargada} from "../../store/store.coffee"

    export default
        name: "recomendacion-semanal"
        data: ->
            segundos: 0,
            intervaloSegundos: ''
            error: no
            cargado: no
            cache: no
            codigoDeError: "00"
            recomendacion:
                info: 
                    ruta: "."
                emision: {}
                temporada: {}
                imagenes: {}
        computed:
            dias: -> Math.floor(this.segundos / 60 / 60 / 24)
            horas: -> Math.floor(this.segundos / 60 / 60) % 24
            minutos: -> Math.floor(this.segundos / 60) % 60
            segundosF: -> this.segundos % 60
            listaAnimes: -> @$store.state.datos.listaAnimes
            recomendacionRaw: -> @$store.state.datos.recomendacionSemanal
            esMovil: ->
                _ = @$store.state.datos.resizeEvent
                window.innerWidth <= 650

        props:
            terminarCarga:
                type: Function
                required: true
        methods:
            cargarRecomendacion: ->
                vm = this
                recRaw = await fetch "#{servidor}/recomendacion"
                rec = await recRaw.json()
                await listaAnimesCargada
                if rec.exito
                    rec.payload
                else
                    throw new Error rec.error.razon

            inicializarRecomendacion: (animeId) ->
                await listaAnimesCargada
                res = @listaAnimes.find (n) => n.info.anime_id == animeId
                if res?
                    @recomendacion = res
                else
                    @error = yes
                    @codigoDeError = "01"
                    console.log "La recomendacion semanal tiene un anime_id invalido."
                    impr "anime_id -> #{animeId}"
                @cargado = yes
            inicializarRecomendacion2: (anime) ->
                @recomendacion = anime
                @cargado = yes
            inicializarTemporizador: (hora) ->
                horaLimite = Math.floor (hora / 1000)
                horaActual = Math.floor (new Date().getTime() / 1000)
                segundos = horaLimite - horaActual
                @segundos =
                    if segundos < 0
                        clearInterval @intervaloSegundos
                        0
                    else segundos

        created: ->
            vm = this
            vm.intervaloSegundos = setInterval (() =>
                if !vm.segundos <= 0
                    vm.segundos--
            ), 1000

            try
                [datos, cargadoDesdeLocalStorage] = await vm.recomendacionRaw

                if datos?.info?.anime_id?
                    @inicializarRecomendacion2 datos
                else
                    animeId = datos.anime_id
                    @inicializarRecomendacion animeId
                # Deprecado porque el servidor ya no establece una hora.
                # @inicializarTemporizador hora

                if cargadoDesdeLocalStorage
                    @cache = true
                    setTimeout (->
                        try
                            mres = await vm.cargarRecomendacion()
                            vm.inicializarRecomendacion2 mres
                            # Deprecado
                            # vm.inicializarTemporizador mres.hora
                            store.commit "cambiarRecomendacionSemanal",
                                anime_id: mres.info.anime_id
                                hora: 0
                        catch e
                            console.log e
                    ), 100
            catch e
                impr "Inicio/recSemanal - atrapado"
                impr e
                @cargado = yes
                @error = yes
                @codigoDeError = "02"
            @terminarCarga()

        beforeDestroy: ->
            clearInterval @intervaloSegundos

#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .malla-recomendacion
        display: grid
        grid-template-columns: 50% 50%


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

    .titulo-recomendacion-movil
        padding: 15px 0 !important


    .txt-recomendacion-movil
        padding: 8px 0 !important



    @media only screen and (max-width: 800px)
        .leyenda .txt
            font-size: 36px

        .img
            max-width: 100%

        .pad
            padding: 20px 0

    @media only screen and (max-width: 650px)

        .malla-recomendacion
            grid-template-columns: 100%


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

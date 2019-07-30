<template lang="pug">
    div.ultimos-eps.contenedor.contenedor-rec
        div.row(v-if="anime !== undefined")
            div.col.l6.leyenda
                div.titulo acechanime
                h2.txt Últimos episodios
                hr.divisor
                div.boton ¡Activa las notificaciones abajo a la izquierda!
            div.col.l6
                episodio(:ep="ep")
        div.err(v-if="cargaFallida")
            span.
                Hubo un error al cargar este último episodio.<br>
                Vuelve en unos minutos, o escribenos en Discord.<br>
            p.tech Código de error: 0x{{ codigoDeError }}
    //
</template>

<script lang="coffee">
    import { manejarError } from "./manejo-errores.coffee"
    import episodio from "./episodio.vue"

    export default
        name: "ultimos-episodios"
        data: ->
            cargaFallida: no
            codigoDeError: ""
        components: { episodio }
        props:
            terminarCarga:
                type: Function
                required: true
            epRecientePrincipal:
                type: Object
                required: true
            cargaTerminada:
                type: Boolean
                required: true
        computed:
            ep: -> @epRecientePrincipal
            anime: ->
                ep = @ep
                if ep != {}
                    animes = @$store.state.listaAnimes.filter (x) =>
                        x.anime_id == ep.anime_id
                    animes[0]
                else {}
        watch:
            cargaTerminada: (estado) ->
                vm = this
                if estado
                    console.log @epRecientePrincipal
                    if @epRecientePrincipal == {}
                        manejarError "No se recibió un objeto con el episodio.", "F3", vm
                    @terminarCarga()

    #
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .contenedor--rec
        max-width: 1068px

    .ultimos-eps
        text-align: center
        padding: 48px 0

    .leyenda
        text-transform: uppercase
        .titulo
            padding-top: 40px
            font:
                size: 12px
                weight: bold
            letter-spacing: 12px
            color: var(--texto1)
        .txt
            font:
                weight: 900
                size: 43px
            line-height: 1.2em
            color: var(--texto1)
            padding: 40px 0
        .divisor
            margin: 0 auto
            width: 50%
        .boton
            display: inline-block
            cursor: pointer
            font-size: 14px
            font-weight: 600
            letter-spacing: 1px
            color: #e91e63
            background-color: var(--fondo1)
            border-radius: 30px
            padding: 15px 40px
            margin: 30px 0
            border: solid 1px
            box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
            transition: all 300ms
            &:hover
                transform: scale(1.1)
                color: #e91e63

    .img
        @extend %imgFlotantes
        width: 90%
        box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
        border-radius: 5px

    .nombre
        font:
            size: 18px
            weight: 700
            family: $titulos
        line-height: .9rem
        letter-spacing: 0
        color: var(--texto1)

    //
</style>
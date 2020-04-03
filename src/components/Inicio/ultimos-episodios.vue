<template lang="pug">
    div.ultimos-eps.contenedor
        div.contenedor-ultimos-eps(v-if="anime !== undefined")
            div.leyenda
                div.titulo acechanime
                h2.txt Últimos episodios
                hr.divisor
                // div.boton ¡Activa las notificaciones abajo a la izquierda!
            div
                episodio(:ep="epRecientePrincipal")
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
        components: { episodio }
        data: ->
            cargaFallida: no
            codigoDeError: ""
        props:
            terminarCarga:
                type: Function
                required: true
            epRecientePrincipal:
                type: Object
                required: true
        computed:
            listaAnimes: -> @$store.state.datos.animes
            anime: ->
                lista = await @listaAnimes
                if lista isnt undefined
                    ep = @epRecientePrincipal
                    unless ep.anime_id?
                        animes = lista.find (x) => x.id == ep.anime_id
                        animes
                    else {}
                else {}
        watch:
            cargaTerminada: (estado) ->
                vm = this
                if estado
                    unless @ep.anime_id?
                        manejarError "No se recibió un objeto con el episodio.", "F3", vm
                    @terminarCarga()


#
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .contenedor-ultimos-eps
        display: grid
        grid-template-columns: 50% 50%


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
            family: var(--fuenteTitulos)
        line-height: .9rem
        letter-spacing: 0
        color: var(--texto1)


    @media only screen and (max-width: $anchoMovil)
        .leyenda .txt
            font-size: var(--tamano-titulos)

        .contenedor-ultimos-eps
            grid-template-columns: 100%
            grid-row-gap: 2rem


    //
</style>

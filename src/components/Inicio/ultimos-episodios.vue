<template lang="pug">
    div.ultimos-eps.contenedor.contenedor-rec
        div.row(v-if="ep.nombre")
            div.col.l6.leyenda
                div.titulo acechanime
                h2.txt Últimos episodios
                hr.divisor
                div.boton ¡Activa las notificaciones abajo a la izquierda!
            div.col.l6
                img.img(:src="ep.img" :alt="'Episodio ' + ep.num + ' de ' + ep.nombre" )
                br
                span.nombre {{ ep.nombre }} {{ ep.num }}
        div.err(v-if="cargaFallida")
            span.
                Hubo un error al cargar este último episodio.<br>
                Vuelve en unos minutos, o escribenos en Discord.<br>
            p.tech Código de error: 0x{{ codigoDeError }}
    //
</template>

<script lang="coffee">
    import YAML from "yaml"
    import { manejarError } from "./manejo-errores.coffee"

    export default
        name: "ultimos-episodios"
        data: ->
            ep: {}
            cargaFallida: no
            codigoDeError: ""
        props:
            terminarCarga:
                type: Function
                required: true
        created: ->
            vm = this

            try
                xhr = await fetch "/static/ultimo-ep-principal.yaml"
                resTxt = await xhr.text()
                res = YAML.parse resTxt
                if typeof res is "object"
                    vm.ep = res
                else manejarError "No se recibió un objeto YAML desde el servidor.", "F3", vm
            catch e
                manejarError e, "F4", vm
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
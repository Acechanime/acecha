<template lang="pug">
    div
        div.controles
            div.cont-controles
                router-link(:to="epAnterior" v-if="epAnterior !== ''")
                    i.material-icons skip_previous
                router-link(to="./")
                    i.material-icons.sep list
                router-link(:to="epSiguiente" v-if="epSiguiente !== ''")
                    i.material-icons.sep skip_next
                i.material-icons.sep done
                i.material-icons.sep(@click="cambiarEstadoPanelDescarga") get_app

        div.descarga
            table.panel(v-show="panelDescargaAbierto")
                thead
                    tr
                        td Servidor
                        td Descarga
                tbody.panel--cuerpo

                    template(v-if="panelDescargaAbierto")
                        tr(v-for="([nombre, url], num) in links")
                            td {{ nombre }}
                            td
                                a(:href="url" target="_blank" @click="registrarClickDescarga") Descargar
                        tr(v-if="links.length === 0")
                            td No hay links disponibles

    //
</template>

<script lang="coffee">

    export default
        name: "controles"
        data: ->
            panelDescargaAbierto: false
        props:
            listaEps:
                type: Array
                required: true
            epActual:
                type: Object
                required: true
            numEp:
                type: Number
                required: true
            esOva:
                type: Boolean
                required: true
        computed:
            links: -> Object.entries(@epActual.descargas ? {}).filter ([nombre, url]) => url?
            epTexto: -> "./#{if @esOva then 'ova' else 'ep'}"
            epSiguiente: ->
                numEpActual = @numEp
                esOva = @esOva

                existeEpSiguiente = @listaEps.find (a) =>
                    (a.numero == numEpActual + 1) && (a.es_ova == esOva)

                if existeEpSiguiente?
                    @epTexto + "#{numEpActual + 1}"
                else
                    ""
            epAnterior: ->
                numEpActual = @numEp
                esOva = @esOva

                existeEpAnterior = @listaEps.find (a) =>
                    (a.numero == numEpActual - 1) && (a.es_ova == esOva)

                if existeEpAnterior?
                    @epTexto + "#{numEpActual - 1}"
                else
                    ""
        methods:
            cambiarEstadoPanelDescarga: -> @panelDescargaAbierto = !@panelDescargaAbierto
            registrarClickDescarga: ->
                @$gtag.event "click-descarga",
                    'event_category': "reproductor"
                    'event_label': "Click a un link de descarga"

#
</script>

<style scoped lang="sass">

    .controles



    .cont-controles
        display: inline-block
        padding: 0.5rem 0


    .material-icons
        display: inline-block
        font-size: 2rem
        padding: 0.5rem 1rem
        user-select: none
        cursor: pointer
        transition: background-color 50ms
        &:hover
            background-color: var(--borde)

    .sep
        border-left: solid 1px var(--borde)


    .cont--tabla
        height: 210px
        overflow: hidden
        transition: height 250ms ease-out
        background-color: var(--fondo1)
        border-radius: 5px
        margin: 15px

        box-shadow: 0 0 5px 2px var(--fondo0)


    .cont--tabla--oculto
        box-shadow: none
        height: 0

    .panel
        border-radius: 5px
        background-color: var(--fondo1)
        color: var(--texto1)
        display: table
        width: 100%
        border-collapse: collapse
        border-spacing: 0

        thead
            background-color: var(--fondo1)
            display: table-header-group
            vertical-align: middle
            border-color: inherit

            tr td
                padding-left: 10px
                font-weight: bold
                text-transform: uppercase

        tbody
            display: table-row-group
            vertical-align: middle
            border-color: inherit

        td
            padding: 15px 5px
            display: table-cell
            text-align: left
            vertical-align: middle
            border-radius: 2px

    .panel--oculto
        max-height: 0

    .panel--cuerpo
        border-top: 5px solid #005fc6 !important

        tr td
            padding-left: 10px
            text-transform: uppercase
            font-weight: bold

            a
                display: inline-block
                padding: 5px 10px
                background-color: #43A047
                color: white
                border-radius: 5px
                box-shadow: 1px 1px 5px 1px #BDBDBD

    //
</style>
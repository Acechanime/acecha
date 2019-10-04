<template lang="pug">
    div
        div.boton-cont
            div.boton(@click="abrirEps()")
                | Descargar
                br
                span.pequeno capitulo
            // div.boton(@click="abrirCarpetas()" style="margin-left: 10px")
                | Descargar
                br
                span.pequeno anime completo

        div.cont--tabla(:class="(panelLinks || panelCarpetas)? '': 'cont--tabla--oculto'")
            table.panel(v-show="panelLinks || panelCarpetas")
                thead
                    tr
                        td Servidor
                        td Descarga
                tbody.panel--cuerpo
                    template(v-if="panelLinks")
                        tr(v-for="(opcion, pos) in listaLinks")
                            td {{ pos + 1 }}. {{ opcion.nombre }}
                            td
                                a(:href="opcion.link" target="_blank") Descargar
                        tr(v-if="listaLinks.length === 0")
                            td No hay links disponibles
                    template(v-if="panelCarpetas")
                        tr(v-for="(opcion, pos) in listaCarpetas")
                            td {{ pos + 1 }}. {{ opcion.nombre }}
                            td
                                a(:href="opcion.link" target="_blank") Descargar
                        tr(v-if="listaCarpetas.length === 0")
                            td No hay carpetas disponibles.
                            td
</template>

<script lang="coffee">

    export default
        name: "descarga"
        data: ->
            panelLinks: false
            panelCarpetas: false
        props:
            links:
                type: Object
                required: true
        computed:
            listaLinks: ->
                lista = []
                if @links.okru?
                    lista.push
                        nombre: "OkRu"
                        link: @links.okru
                    
                if @links.mango?
                    lista.push
                        nombre: "Mango"
                        link: @links.mango
                        
                if @links.mega?
                    lista.push
                        nombre: "Mega"
                        link: @links.mega
                        
                if @links.mp4upload?
                    lista.push
                        nombre: "Mp4Upload",
                        link: @links.mp4upload
                    
                lista
            listaCarpetas: ->
                carpetas = []
                if @links.carpeta_mega?
                    carpetas.push
                    nombre: "Carpeta Mega",
                    link: @links.carpeta_mega
                
                carpetas
        methods:
            abrirEps: ->
                @panelLinks = !@panelLinks
                @panelCarpetas = false
            abrirCarpetas: ->
                @panelCarpetas = !@panelCarpetas
                @panelLinks = false
            
        
            
#

</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .boton-cont
        text-align: center

    .boton
        text-align: center
        width: 118px
        height: 44px
        display: inline-block
        padding: 10px 5px 5px
        background-color: #2e3437
        text-transform: uppercase
        font:
            weight: bold
            size: 18px
        line-height: 0.7
        transition: background-color 100ms linear
        margin: 10px 0
        color: white
        border-radius: 5px
        cursor: pointer
        user-select: none

        &:hover
            background-color: #1c1f21

        .pequeno
            font-size: 11px
    // font-weight: normal

    .cont--tabla
        height: 310px
        overflow: hidden
        transition: height 250ms ease-out
        background-color: var(--fondo1)
        border-radius: 5px
        margin: 15px

        box-shadow: 0 0 5px 2px var(--fondo2)


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
            background-color: var(--fondo3)
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
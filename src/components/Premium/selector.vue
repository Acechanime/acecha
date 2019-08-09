<template lang="pug">
    div.selector
        table.tabla
            thead
                tr
                    td
                    td.tit Básico
                    td.tit.proCont
                        span.pro Pro
                    td.tit VIP
            tbody.cuerpoT
                tr
                    td Cientos de episodios de anime gratis
                    td
                        i.material-icons.verde check
                    td
                        i.material-icons.verde check
                    td
                        i.material-icons.verde check
                tr
                    td Notificaciones en nuevos eps.
                    td
                        i.material-icons.verde check
                    td
                        i.material-icons.verde check
                    td
                        i.material-icons.verde check
                tr
                    td Continua viendo donde lo dejaste
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.verde check
                    td
                        i.material-icons.verde check
                tr
                    td Notificaciones personalizadas
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.verde check
                    td
                        i.material-icons.verde check
                tr
                    td Modo oscuro
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.verde check
                    td
                        i.material-icons.verde check
                tr
                    td Personaliza la portada
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.verde check
                    td
                        i.material-icons.verde check
                tr
                    td Cero anuncios
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.verde check
                tr
                    td Cero acortadores
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.verde check
                tr
                    td Recibe ayuda prioritaria
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.verde check
                tr
                    td Pide tus animes favoritos
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.verde check
                tr
                    td Rol VIP en Discord
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.rojo close
                    td
                        i.material-icons.verde check


    //
</template>

<script lang="coffee">

    export default
        name: "selector"
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .rojo
        color: #757575

    .verde
        color: #ff114e
        font:
            weight: bold
            size: xx-large

    .selector
        text-align: center
        color: var(--texto1)

    .tit
        min-width: 200px
        font:
            family: $titulos
            size: 1.5rem

    .proCont
        border: solid 5px black
        border-radius: 10px
        background-color: black
        color: white

    .pro
        font:
            size: 2rem
            weight: bold

    .carac
        // text-align: left
        .sep
            height: 50px
            width: 100%

        p
            margin: 10px 0


    .tabla
        border-spacing: 0

    .cuerpoT
        tr
            display: table-row
            transition: background-color 150ms
            &:hover
                background-color: #F5F5F5
            td
                display: table-cell
                padding: 10px
                font:
                    family: $titulos



    //
</style>
<template lang="pug">
    div#app
        barra-navegacion
        div#contenedor-contenido
            router-view
        pie-pagina
        // ver-anime
        modo-color
        // aviso-global
        indicador-version
    //
</template>

<script lang="coffee">
    import BarraNavegacion from "./components/App/barra-navegacion.vue"
    import avisoGlobal from "./components/App/aviso-global.vue"
    import PiePagina from "./components/App/pie-pagina-2.vue"
    import pantallaCarga from "./components/App/pantalla-carga.vue"
    import modoColor from "./components/App/modo-color.vue"
    import indicadorVersion from "./components/App/indicador-version.vue"

    export default
        metaInfo:
            title: "Anime online HD sub español"
            titleTemplate: "%s | Acechanime"
        components: {
            PiePagina
            BarraNavegacion
            avisoGlobal
            pantallaCarga
            modoColor
            indicadorVersion
        }
        mounted: ->
            vm = this
            window.addEventListener "resize", ((ev) =>
                vm.$store.commit "datos/actualizarResizeEvent", ev
            )
            @$store.commit "color/iniciarModoColor"
            @$store.dispatch "datos/inicializar"



#
</script>

<style lang="sass">

    #app
        background-color: var(--fondo1)

    #contenedor-contenido
        position: relative
        z-index: 2
        box-shadow: 0 1px 10px -6px rgba(0, 0, 0, 0.42), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px -2px rgba(0, 0, 0, 0.1)


    //
</style>

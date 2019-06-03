<template>
    <div id="app">
        <barra-navegacion />
        <router-view/>
        <pie-pagina />
    </div>
</template>

<script>
    import BarraNavegacion from "./components/barra-navegacion.vue";
    import PiePagina from "./components/pie-pagina.vue";

    export default {
        components: {PiePagina, BarraNavegacion}
    }
</script>
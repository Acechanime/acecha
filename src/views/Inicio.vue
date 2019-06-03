<template>
    <div>
        <imagen-principal />
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="animes">
            <ultimos-episodios />
            <br>
            <br>
            <br>
            <br>
            <br>
            <episodios />
            <br>
            <br>
            <br>
            <br>
            <br>
            <recomendacion-semanal />
        </div>
        <comentarios />
    </div>
</template>

<script>
    import Comentarios from "@/components/Inicio/comentarios";
    import RecomendacionSemanal from "@/components/Inicio/recomendacion-semanal";
    import Episodios from "@/components/Inicio/episodios";
    import UltimosEpisodios from "@/components/Inicio/ultimos-episodios";
    import ImagenPrincipal from "@/components/Inicio/imagen-principal";
    export default {
        name: "Inicio",
        components: {ImagenPrincipal, UltimosEpisodios, Episodios, RecomendacionSemanal, Comentarios}
    }
</script>

<style scoped lang="sass">

</style>
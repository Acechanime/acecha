<template lang="pug">
    div.contenedor
        div.separador
        h1 Versiones

        p Historial de cambios de Acechanime, a partir de la versión 4.11.0

        div.version(v-for="versionData in versiones")
            h2 {{ versionData.version }}
            div.notas-version(v-html="procesar(versionData.msg)")

        br
        br

    //
</template>

<script lang="coffee">
    import versiones from "../versiones.yaml"
    import DOMPurify from "dompurify"
    import marked from "marked"

    export default
        name: "Versiones"
        data: -> {
            versiones
        }
        methods:
            procesar: (txt) -> DOMPurify.sanitize (marked txt)

#
</script>

<style scoped lang="sass">

    h1, h2
        padding: 1rem 0

    div
        line-height: 160%

    //
</style>
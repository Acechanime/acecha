<template lang="pug">
    div
        p.titulo Acecha Publicidad
    //
</template>

<script lang="coffee">

    export default
        name: "publicidad"
    #

</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .titulo
        font:
            family: $titulos
            size: 1.5rem
            weight: 600
        color: var(--texto2)

    //
</style>
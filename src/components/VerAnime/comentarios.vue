<template lang="pug">
    div.comentarios
        fb-comments(:path="$router.currentRoute.path")
    //
</template>

<script lang="coffee">
    import fbComments from "../fb-comments.vue"

    export default
        name: "comentarios"
        components: { fbComments }
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .comentarios
        color: var(--texto1)

    //
</style>
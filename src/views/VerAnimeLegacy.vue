<template lang="pug">
    div Legacy!
    //
</template>

<script lang="coffee">

    export default
        name: "VerAnimeLegacy"
        mounted: ->
            console.log "Montado!!!"
            @$store.commit "activarVerAnime"
        beforeDestroy: ->
            @$store.commit "desactivarVerAnime"
    #
    
</script>

<style scoped lang="sass">
    @import "../sass/variables"

    
    //
</style>
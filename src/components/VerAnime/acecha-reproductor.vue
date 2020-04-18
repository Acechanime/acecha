<template lang="pug">
    div
        video.acecha-rep(:preload="precargarVideo" controls)
            source(:src="urlVideo" type="video/mp4")
            p Tu navegador no soporta videos HTML. Usa un navegador actualizado, por favor.


    //
</template>

<script lang="coffee">

    export default
        name: "acecha-reproductor"
        props:
            urlVideo:
                type: String
                required: true
        computed:
            precargarVideo: -> if @$store.state.datos.precargarVideo then "auto" else "metadata"

#
</script>

<style scoped lang="sass">

    .acecha-rep
        width: 100%
        height: auto

    
    //
</style>
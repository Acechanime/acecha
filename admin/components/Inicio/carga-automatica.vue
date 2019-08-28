<template lang="pug">
    div
        button.boton(@click="panelAbierto = !panelAbierto") Carga Automatica
        div.pad(v-if="panelAbierto")
            p Aquí se muestran los episodios que se empezaron a cargar.


    //
</template>

<script lang="coffee">

    export default
        name: "carga-automatica"
        data: ->
            panelAbierto: no

#
</script>

<style scoped lang="sass">
    @import "../../sass/global"

    .boton
        background-color: darkslateblue

    //
</style>
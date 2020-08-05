<template lang="pug">
    div.aviso-global(v-if="mostrar" @click="desaparecerMensaje")
        | No se subirán animes/episodios nuevos.

    //
</template>

<script lang="coffee">

    export default
        name: "aviso-global"
        data: ->
            mostrar: true
        methods:
            desaparecerMensaje: ->
                @mostrar = false

#
</script>

<style scoped lang="sass">

    .aviso-global
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        background-color: var(--colorPrincipal)
        color: white
        text-align: center
        z-index: 11
        user-select: none
        cursor: pointer



    //
</style>

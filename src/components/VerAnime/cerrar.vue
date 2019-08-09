<template lang="pug">
    div.cerrar
        i.material-icons(@click="cerrarPanel") expand_more
        span.txt
            | {{ $store.state.verAnime.nombre }}
            | {{ $store.state.verAnime.esOva? 'ova': 'episodio' }}
            | {{ $store.state.verAnime.ep }}
    //
</template>

<script lang="coffee">

    export default
        name: "cerrar"
        methods:
            cerrarPanel: ->
                history.back()
        created: ->
            vm = this

    #

</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .material-icons
        color: var(--texto1)
        display: table-cell
        vertical-align: middle
        width: 65px
        height: 65px
        font-size: 1.5rem
        cursor: pointer
        text-align: center

    .txt
        display: table-cell
        vertical-align: middle

    .cerrar
        // background-color: var(--fondo1)
        display: table
        width: 100%
        user-select: none

    //
</style>
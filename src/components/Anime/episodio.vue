<template lang="pug">
    router-link.ep(:to="link")
        | Ver {{ nombre }} {{ episodio.es_ova? "ova": "capítulo" }} {{ episodio.num_ep }}
    //
</template>

<script lang="coffee">

    export default
        name: "episodio"
        props:
            episodio:
                type: Object
                required: true
            nombre:
                type: String
                required: true
        computed:
            link: -> "./" + (if @episodio.es_ova then "ova" else "ep") + @episodio.num_ep
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .ep
        display: block
        text-align: left
        // border-bottom: 1px solid var(--semi-white-color)
        padding: .75rem 1rem
        cursor: pointer
        transition: background-color 150ms ease-in-out
        color: var(--texto1)
        text-decoration: none
        &:hover
            background-color: var(--fondo3)
        &::before
            content: "\e90d"
            font-family: icomoon !important
            color: var(--blue-color)
            font-size: 1.5rem
            margin-right: 1rem
            vertical-align: middle

    //
</style>

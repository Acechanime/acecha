<template lang="pug">
    article.ep
        router-link.link(:to="ep.link")
            img.imagen(:src="ep.img" :alt="'Episodio ' + ep.num + ' de ' + ep.nombre")
            br
            span.nombre {{ ep.nombre }} {{ ep.num }}
</template>

<script lang="coffee">

    export default
        name: "episodio"
        props:
            ep:
                type: Object
                required: true
    #

</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .ep
        text-align: center
        margin: 10px 0

    .link
        text-decoration: none

    .imagen
        @extend  %imgFlotantes
        width: 94%
        border-radius: 5px
        box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
        cursor: pointer

    .nombre
        color: var(--texto1)
        font-size: 17px
        font-weight: 700
        line-height: .9em
        letter-spacing: 0

    //
</style>

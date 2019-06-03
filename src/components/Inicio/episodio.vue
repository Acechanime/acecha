<template lang="pug">
    div.col.l3.ep
        img.imagen(:src="ep.img" :alt="'Img de ' + ep.nombre")
        br
        span.nombre {{ ep.nombre }}
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
    .ep
        text-align: center
        margin: 10px 0

    .imagen
        width: 94%
        border-radius: 5px
        box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
        cursor: pointer
        transition: opacity 250ms, transform 400ms
        &:hover
            opacity: 0.7
            transform: translateY(-8px)

    .nombre
        color: #4e565b
        font-size: 17px
        font-weight: 700
        line-height: .9em
        letter-spacing: 0

    //
</style>

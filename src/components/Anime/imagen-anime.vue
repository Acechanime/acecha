<template lang="pug">
    div.sub
        h1.nombre.contenedor {{ nombre }}
        div.cover(:style="imgFondo")
    //
</template>

<script lang="coffee">

    export default
        name: "imagen-anime"
        props:
            nombre:
                type: String
                required: true
            img:
                type: String
                requied: true
        computed:
            imgFondo: ->
                "background-image: url(\"#{@img}\");"

    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .sub
        clip-path: ellipse(100% 100% at 50% -0.25%)
        position: relative
        padding-bottom: 200px
        padding-top: 70px

    .nombre
        position: relative
        z-index: 2
        font:
            weight: 400
            size: 3.6rem
        color: white
        padding: 155px 0
        text-align: center

    .cover
        z-index: 1
        background-position: center
        background-size: cover
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        &::before
            content: ""
            display: block
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            background: rgba(0, 0, 0, 0.6)

    //
</style>
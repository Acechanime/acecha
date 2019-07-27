<template lang="pug">
    div.the-post__social
        a.the-post__social__link(
            :href="'https://www.facebook.com/sharer/sharer.php?u=' + urlActual"
            target="_blank" data-bgcolor="facebook"
        )
            span.icon-facebook
        a.the-post__social__link(
            :href="'https://twitter.com/home?status=' + urlActual"
            target="_blank" data-bgcolor="twitter"
        )
            span.icon-twitter
        a.the-post__social__link(
            :href="'https://api.whatsapp.com/send?phone=#&amp;text=' + urlActual"
            target="_blank" data-bgcolor="whatsapp"
        )
            span.icon-whatsapp

    //
</template>

<script lang="coffee">

    export default
        name: "redes-sociales"
        data: ->
            urlActual: window.location.href
    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/variables"

    .the-post__social
        display: -webkit-box
        display: -ms-flexbox
        display: flex
        -webkit-box-pack: center
        -ms-flex-pack: center
        justify-content: center
        padding-top: 50px
        padding-bottom: 25px

    .the-post__social__link
        --size: 44px
        color: var(--white-color)
        font-size: 1.125rem
        width: var(--size)
        height: var(--size)
        margin: 0 0.5rem
        border-radius: 50%
        display: -webkit-box
        display: -ms-flexbox
        display: flex
        -webkit-box-pack: center
        -ms-flex-pack: center
        justify-content: center
        -webkit-box-align: center
        -ms-flex-align: center
        align-items: center
        text-decoration: none
        transition: transform 300ms ease-in-out
        &:hover
            transform: rotate(360deg)

    //
</style>
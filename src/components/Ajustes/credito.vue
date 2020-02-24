<template lang="pug">
    div.credito
        span Hecho con 💖,
        img.logo_vue(src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg")
        span , y
        img.logo_csharp(src="../../assets/img/c_sharp.svg")

    //
</template>

<script lang="coffee">

    export default
        name: "credito"

#
</script>

<style lang="sass">

    .credito
        padding: 15% 0
        text-align: center
        font:
            family: "Product Sans", Roboto, sans-serif
            size: 2rem
            weight: lighter

    .logo_vue, .logo_csharp
        vertical-align: bottom


    .logo_vue
        height: 2rem
    
    .logo_csharp
        height: 2.5rem


    //
</style>

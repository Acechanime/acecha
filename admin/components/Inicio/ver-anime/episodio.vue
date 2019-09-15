<template lang="pug">
    div {{ esOva? 'ova': 'ep' }} {{ ep.num_ep }}
    //
</template>

<script lang="coffee">

    export default
        name: "episodio"
        props:
            ep:
                type: Object
                required: yes
            esOva:
                type: Boolean
                required: no
                default: no
    #
    
</script>

<style scoped lang="sass">
    @import "../../../sass/global"
    
    //
</style>
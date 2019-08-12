<template lang="pug">
    div
        button.boton(@click="abierto = !abierto" :class="claseBoton") Ver/Editar animes
        div(v-if="abierto")
            ver-anime(v-for="(anime, i) in animes" :anime="anime" :key="i")

    //
</template>

<script lang="coffee">
    import verAnime from "./ver-anime.vue"

    # [a] -> [a] -> [a]
    merge = (xs, ys) =>
        i = 0
        d = 0
        res = while i < xs.length and d < ys.length
            if xs[i].anime_id > ys[d].anime_id
                retorno = xs[i]
                i++
                retorno
            else
                retorno = ys[d]
                d++
                retorno
        res.concat (if i is xs.length then ys[d ... ys.length] else xs[i ... xs.length])


    # [a] -> [a]
    mergesort = (xs) =>
        largo = xs.length
        if largo is 1 then xs
        else
            izq = mergesort xs[0 ... largo / 2]
            der = mergesort xs[largo / 2 .. largo - 1]
            merge izq, der

    export default
        name: "ver-animes"
        components:
            "ver-anime": verAnime
        data: ->
            abierto: no
        computed:
            claseBoton: ->
                if @abierto then "boton--activo"
            animes: ->
                mergesort @$store.state.listaAnimes
        methods: {}

    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/global"
    
    //
</style>
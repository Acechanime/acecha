<template lang="pug">
    div
        h3 Recomendacion semanal
        br
        label Mostrar el anime
        select(v-model="animeEscogido")
            option(disabled value="-1" selected) Selecciona un anime
            option(v-for="anime in listaAnimesOrd"
                :value="anime.anime_id") {{ anime.nombre }}
        br
        label Mostrar hasta el
        datepicker.fecha(v-model="fecha")
        br
        br

        button.boton(@click="cambiarAnime" :class="claseBoton") {{ textoBoton }}
    //
</template>

<script lang="coffee">
    import Datepicker from "vuejs-datepicker"

    export default
        name: "recomendacion-semanal"
        components: { Datepicker }
        data: ->
            animeEscogido: -1
            fecha: new Date()
            cargando: 0
            textoBoton: "Cambiar"
            claseBoton: ""
        computed:
            listaAnimesOrd: ->
                @$store.state.listaAnimes.sort (a, b) => a.nombre.localeCompare(b.nombre)
        watch:
            cargando: (n) ->
                vm = this
                [@textoBoton, @claseBoton] =
                    if n is 1
                        ["Cargando...", "boton--activo"]
                    else
                        setTimeout (() ->
                            vm.textoBoton = "Cambiar"
                            vm.claseBoton = ""
                            vm.cargando = 0
                        ), 1500
                        if n is 2
                            ["Exito.", ""]
                        else if n is -1
                            ["Error.", "boton--error"]
                        else if n is -2
                            ["Selecciona un anime", "boton--error"]
                        else if n isnt 0
                            ["Error. Estado invalido (#{n}).", "boton--error"]
        methods:
            cambiarAnime: ->
                vm = this
                if vm.animeEscogido is -1
                    vm.cargando = -2
                else
                    vm.cargando = 1
                    resRaw = await fetch "/api/recomendacionSemanal",
                        method: "POST"
                        headers:
                            "Content-Type": "application/json"
                        body: JSON.stringify {
                            key: "Deb3@$urb8uCu00!ur"
                            anime_id: vm.animeEscogido
                            hora: vm.fecha.getTime()
                        }
                    res = await resRaw.json()
                    vm.cargando =
                        if res.exito? and res.exito then 2 else -1


    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/global"

    label
        display: inline-block
        min-width: 200px

    .fecha
        color: black
        display: inline-block

    //
</style>
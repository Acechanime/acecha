<template lang="pug">
    div
        h3 Video recomendado
        label Url del video:
        input(v-model="url")
        button.boton(@click="cambiarVideo" :class="claseBoton") {{ textoBoton }}
    //
</template>

<script lang="coffee">
    import {servidor} from "../../../src/variables";

    export default
        name: "video-recomendado"
        data: ->
            url: ""
            cargando: 0
            textoBoton: "Cambiar"
            claseBoton: ""
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
                            ["Ingresa una url", "boton--error"]
                        else if n isnt 0
                            ["Error. Estado invalido (#{n}).", "boton--error"]
        methods:
            cambiarVideo: ->
                vm = this
                if vm.url isnt ""
                    vm.cargando = 1
                    resRaw = await fetch "#{servidor}/videoRecomendado",
                        method: "POST"
                        headers:
                            "Content-Type": "application/json"
                        body: JSON.stringify {
                            key: "Deb3@$urb8uCu00!ur"
                            url: vm.url
                        }
                    res = await resRaw.json()
                    vm.cargando = if res.exito? and res.exito then 2 else -1
                else
                    vm.cargando = -2

    #
    
</script>

<style scoped lang="sass">
    @import "../../sass/global"
    
    //
</style>
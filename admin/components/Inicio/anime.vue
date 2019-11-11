<template lang="pug">
    div.anime
        span.anime__titulo {{ anime.anime_id }} {{ anime.nombre }}
        button.anime__boton(style="background-color: #004323; width: 98px;"
            @click="episodios($event)")
            | Episodios
        button.anime__boton(style="background-color: #210043; width: 126px;"
            @click="mostrarEditarAnimeF($event)")
            | Editar Anime
        lista-eps(v-if="mostrarEps"
            :anime="anime" :epsData="epsData" :nombre="nombre" :nombreCorto="nombreCorto")
        editar-anime(v-if="mostrarEditarAnime" :config="anime" :texto="edicionTexto"
            :fun="actualizarAnime" :error="edicionError")

    //
</template>

<script lang="coffee">
    import miLink from "./mi-link.vue"
    import editarAnime from "../editar-anime.vue"
    import listaEps from "./anime/lista-eps.vue"
    import { servidor } from "../../../src/variables"

    export default
        name: "anime"
        components:
            "mi-link": miLink
            "editar-anime": editarAnime
            "lista-eps": listaEps
        data: ->
            epsData: undefined
            mostrarEps: false
            mostrarEditarAnime: false
            colores: ['#313EA9', '#5196a9', '#46a95d', '#a93783']
            esOva: false
            edicionTexto: "Actualizar"
            edicionError: no
        props:
            nombre:
                type: String
                default: "Sin nombre"
            animeID:
                type: Number
                required: true
            anime:
                type: Object
                required: true
            fnRecargarListaAnimes:
                type: Function
                required: true
        computed:
            nombreCorto: ->
                nombreCorto = this.nombre
                while /\s/.test(nombreCorto)
                    nombreCorto = nombreCorto.replace(" ", "-")
                nombreCorto

        methods:
            actualizarAime: ->
                vm = this
                resRaw = await fetch "#{servidor}/animes/#{vm.anime.anime_id}",
                    method: "PUT"
                    headers:
                        "Content-Type": "application/json"
                    body: JSON.stringify vm.$store.state.animeAdmin
                respuesta =
                    try
                        await resRaw.json()
                    catch e
                        { exito: no}
                if respuesta?.exito and respuesta.exito
                    vm.edicionTexto = "Exito"
                    setTimeout (() =>
                        vm.edicionTexto = "Crear"
                    ), 1500
                else
                    vm.edicionTexto = "Error"
                    vm.error = yes
                    setTimeout (() =>
                        vm.edicionTexto = "Crear"
                        vm.edicionError = no
                    ), 2500
                    console.error respuesta.razon
            mostrarEditarAnimeF: (ev) ->
                if @mostrarEditarAnime
                    @$store.commit "ocultarAnimeAdmin"
                    ev.target.innerText = "Editar Anime"
                else
                    @$store.commit "mostrarAnimeAdmin"
                    ev.target.innerText = "Cerrar"

                @mostrarEditarAnime = !@mostrarEditarAnime
            eliminarAnime: (animeID) ->
                respuesta = confirm("Se borraran todos los datos del anime, incluidos sus episodios.")

                if respuesta
                    xhr = new XMLHttpRequest()
                    xhr.open("POST", "${servidor}/acecha/Animes/eliminarAnime.php")
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                    xhr.onload = () =>
                        JSON.parse(xhr.responseText)
                        this.fnRecargarListaAnimes()
                    xhr.onerror = () =>
                        console.log(xhr.responseText)
                        console.error("Hubo un error :c")
                    xhr.send("animeID=#{this.animeID}")
                null
            obtenerEpisodios: ->
                vm = this
                xhr = new XMLHttpRequest()

                # xhr.open("POST", `${servidor}/acecha/Eps/obtenerEps.php`);
                xhr.open("GET", "#{servidor}/episodios?anime_id=#{this.animeID}")
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                xhr.onload = () =>
                    respuesta = JSON.parse(xhr.responseText)
                    vm.epsData = respuesta.payload

                xhr.onerror = () =>
                    console.log(xhr.responseText)
                    console.error("Hubo un error :c")

                # xhr.send(`animeID=${this.animeID}`)
                xhr.send()
                null

            episodios: (ev) ->
                if !this.mostrarEps
                    ev.target.innerText = "Cerrar"
                else
                    ev.target.innerText = "Episodios"
                this.mostrarEps = !this.mostrarEps
                this.obtenerEpisodios()
                ###
                xhr = new XMLHttpRequest()
                xhr.open("POST", "#{servidor}/api/episodios")
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                xhr.onload = () =>
                    try
                        data = JSON.parse(xhr.responseText)

                        if data.exito
                            console.log("Exito")
                            this.obtenerEpisodios()

                            items = form.getElementsByClassName("anime__form__rapid")
                            for num in [0..items.length]
                                items[num].value = ""

                            vm.esOva = false

                            terminarCicloBotonCrear(true)
                        else
                            console.error(data.razon)

                            terminarCicloBotonCrear(false)

                    catch e
                        console.log(xhr.responseText)
                        console.error("Error al convertir JSON. Razon:\n" + e.stack + "\n" + e)

                        terminarCicloBotonCrear(false)
                xhr.onerror = () =>

                    console.error("Error al ejecutar la petición.")
                    terminarCicloBotonCrear(false)

                xhr.send(datosAEnviar.join("&"))
                null
                ###

            editarAnime: (ev, campo) ->
                ev.preventDefault()
                valorNuevo = ev.target.parentNode[campo].value
                vm = this

                xhra = new XMLHttpRequest()
                xhra.open("POST", "#{servidor}/acecha/Animes/actualizarAnime.php")
                xhra.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

                terminarCicloBotonCrear = this.cambiarColoresElem(ev.target, "Actualizando...", "innerHTML")

                xhra.onload = () =>
                    try
                        respuesta = JSON.parse(xhra.responseText)
                        if respuesta.exito
                            terminarCicloBotonCrear true
                        else
                            console.log(xhra.responseText)
                            terminarCicloBotonCrear(false)

                    catch e
                        console.log(xhra.responseText)
                        terminarCicloBotonCrear(false)


                xhra.onerror = () =>
                    console.log(xhr.responseText)
                    terminarCicloBotonCrear(false)

                xhra.send("modo=individual&animeID=#{this.animeID}&campo=#{campo}&valor=#{valorNuevo}")
                null

            editarAnimeTodo: (ev) ->
                form = ev.target

                xhru = new XMLHttpRequest()
                xhru.open("POST", "#{servidor}/acecha/Animes/actualizarAnime.php")
                xhru.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

                terminarCicloBotonCrear = this.cambiarColoresElem(form["actualizar"], "Actualizando...", "value")

                xhru.onload = () =>
                    try
                        respuesta = JSON.parse(xhr.responseText)
                        if respuesta.exito
                            terminarCicloBotonCrear(true)
                        else
                            console.log(xhr.responseText)
                            terminarCicloBotonCrear(false)

                    catch e
                        console.log(xhr.responseText)
                        terminarCicloBotonCrear(false)


                xhru.onerror = () =>
                    console.log(xhr.responseText)
                    terminarCicloBotonCrear(false)


                xhru.send "modo=todo&animeID=" + this.animeID + "&nombre=" + form["nombre"].value +
                    "&urlAnime=" + form["urlAnime"].value + "&urlImg=" + form["urlImg"].value
                null

            cambiarColoresElem: (elem, textoNuevo, objetivo) ->
                colorActual = elem.style.backgroundColor
                textoActual = elem[objetivo]

                colores = ['#313EA9','#5196a9','#46a95d','#a93783']

                elem[objetivo] = textoNuevo
                intervalo = setInterval (() =>
                    elem.style.backgroundColor = colores[parseInt(Math.random()*4)]
                ), 750

                (exito) =>
                    clearInterval(intervalo)
                    if (exito)
                        elem[objetivo] = "Éxito"
                        elem.style.backgroundColor = "#2d9168"

                        setTimeout (() =>
                            elem[objetivo] = textoActual
                            elem.style.backgroundColor = colorActual
                        ), 4000
                    else
                        elem[objetivo] = "Error"
                        elem.style.backgroundColor = "#ac2923"

                        setTimeout (() =>
                            elem[objetivo] = textoActual
                            elem.style.backgroundColor = colorActual
                        ), 10000


#
</script>

<style scoped lang="sass">
    .row::after
        display: table
        content: ""
        clear: both

    #selectOva
        border: none

    .deprecado
        filter: opacity(0.3)

    .avisoDeprecado
        font:
            size: large
            weight: normal
        color: var(--texto1)

    .anime
        padding: 10px 10px 10px 20px
        border-radius: 4px

    .anime__titulo
        font-family: Roboto, sans-serif
        width: 600px
        display: inline-block

    .anime__boton
        border: none
        padding: 6px 10px
        font-family: Ubuntu, sans-serif
        font-size: large
        border-radius: 4px
        cursor: pointer
        color: var(--texto1)
        transition: transform 250ms
        display: inline-block

    .anime__boton:hover
        transform: translate(-2px, -2px)
        
    //

</style>
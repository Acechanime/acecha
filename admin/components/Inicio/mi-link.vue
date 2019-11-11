<template lang="pug">
    div
        span.link__ep {{(link.es_ova? 'ova ' : 'ep ') + link.num_ep }} &rarr;
        a.anime__form__link(target="_blank"
            :href="'https://acechanime.com/' + nombreCorto + '/' + ((link.es_ova === '1'? 'ova' : 'ep') + link.num_ep)")
            | /{{ nombreCorto }}/{{ (link.esOva === "1"? 'ova' : 'ep') + link.num_ep }}
        button.link_verLinks(@click="botonVerLinks($event)")
            | Ver links
        button.link_verLinks.link_eliminarEp(@click="eliminarEpisodio($event)")
            | Eliminar
        div.link__links(v-if="mostrarLinks")
            form(@submit.prevent)
                span.titulo-o Online:
                br

                span.link__links__label RapidVideo &rarr;
                input.link__links__input(type="text" name="rapidvideo" :value="link.rapidvideo"
                       :placeholder="link.rapidvideo? '': 'Sin episodio.'")
                button.link__links__botonActualizar(@click="actualizarEpisodio($event, 'rapidvideo')")
                    | {{ link.rapidvideo? 'Actualizar': 'Crear' }}
                br

                span.link__links__label Mega &rarr;
                input.link__links__input(type="text" name="mega" :value="link.mega"
                       :placeholder="link.mega? '': 'Sin episodio.'")
                button.link__links__botonActualizar(@click="actualizarEpisodio($event, 'mega')")
                    | {{ link.mega? 'Actualizar': 'Crear' }}
                br

                span.link__links__label Okru &rarr;
                input.link__links__input(type="text" name="okru" :value="link.okru"
                       :placeholder="link.okru? '': 'Sin episodio.'")
                button.link__links__botonActualizar(@click="actualizarEpisodio($event, 'okru')")
                    | {{ link.okru? 'Actualizar': 'Crear' }}
                br

                span.link__links__label MP4Upload &rarr;
                input.link__links__input(type="text" name="mp4upload" :value="link.mp4upload"
                       :placeholder="link.mp4upload? '': 'Sin episodio.'")
                button.link__links__botonActualizar(@click="actualizarEpisodio($event, 'mp4upload')")
                    | {{ link.mp4upload? 'Actualizar': 'Crear' }}
                br

                span.link__links__label Mango &rarr;
                input.link__links__input(type="text" name="mango" :value="link.mango"
                       :placeholder="link.mango? '': 'Sin episodio.'")
                button.link__links__botonActualizar(@click="actualizarEpisodio($event, 'mango')")
                    | {{ link.mango? 'Actualizar': 'Crear' }}
                br

                hr

                span.titulo-o Descarga
                br

                span.link__links__label Mega &rarr;
                input.link__links__input(type="text" name="acortado" :value="link.mega_acortado"
                       :placeholder="link.mega_acortado? '': 'Sin episodio.'")
                button.link__links__botonActualizar(@click="actualizarEpisodio($event, 'mega_acortado')")
                    | {{ link.mega_acortado? 'Actualizar': 'Crear' }}
                br

                span.link__links__label Okru &rarr;
                input.link__links__input(type="text" name="okruDescarga" :value="link.okru_acortado"
                       :placeholder="link.okru_acortado? '': 'Sin episodio.'")
                button.link__links__botonActualizar(@click="actualizarEpisodio($event, 'okru_acortado')")
                    | {{ link.okru_acortado? 'Actualizar': 'Crear' }}
                br

                span.link__links__label MP4Upload &rarr;
                input.link__links__input(type="text" name="mp4uploadDescarga" :value="link.mp4upload_acortado"
                       :placeholder="link.mp4upload_acortado? '': 'Sin episodio.'")
                button.link__links__botonActualizar(@click="actualizarEpisodio($event, 'mp4upload_acortado')")
                    | {{ link.mp4upload_acortado? 'Actualizar': 'Crear' }}
                br

                span.link__links__label Mango &rarr;
                input.link__links__input(type="text" name="mangoDescarga" :value="link.mango_acortado"
                       :placeholder="link.mango_acortado? '': 'Sin episodio.'")
                button.link__links__botonActualizar(@click="actualizarEpisodio($event, 'mango_acortado')")
                    | {{ link.mango_acortado? 'Actualizar': 'Crear' }}

    //
</template>

<script lang="coffee">
    import { servidor } from "../../../src/variables"

    export default
        name: "mi-link"
        data: ->
            mostrarLinks: false,
            okru: {},
            mango: {},
            mp4upload: {},
            mega: {},
            rapidvideo: {},
            okruDescarga: {},
            mangoDescarga: {},
            mp4uploadDescarga: {},
            acortado: {}

        props:
            link:
                type: Object
                required: true

            nombre:
                type: String
                required: true

            nombreCorto:
                type: String
                required: true

            fnObtenerEps:
                type: Function
                required: true

        methods:
            botonVerLinks: (ev) ->
                if (!this.mostrarLinks)
                    ev.target.innerText = "Cerrar"

                else
                    ev.target.innerText = "Ver links"

                this.mostrarLinks = !this.mostrarLinks
                undefined

            eliminarEpisodio: (ev) ->

                terminarCicloBotonCrear = this.cambiarColoresElem ev.target, "Eliminando...", "innerHTML"

                try
                    resRaw = await fetch "#{servidor}/episodio",
                        method: "DELETE"
                        headers:
                            "Content-Type": "application/json"
                        body: "linkID=#{this.link.linkID}"
                    respuesta = await resRaw.json()
                    if respuesta?.exito? and respuesta.exito
                        vm.fnObtenerEps()
                        terminarCicloBotonCrear true
                    else
                        console.error "Error al eliminar el episodio."
                        terminarCicloBotonCrear false
                catch e
                    console.error "Error al eliminar el episodio."
                    terminarCicloBotonCrear false


                ###
                xhr = new XMLHttpRequest()
                vm = this
                xhr.open "POST", "#{servidor}/api/Eps/eliminarEp.php"
                xhr.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"

                terminarCicloBotonCrear = this.cambiarColoresElem(ev.target, "Eliminando...", "innerHTML")

                xhr.onload = =>
                    try
                        respuesta = JSON.parse xhr.responseText
                        if respuesta.exito
                            vm.fnObtenerEps()
                            terminarCicloBotonCrear true
                        else
                            console.log xhr.responseText
                            terminarCicloBotonCrear false

                    catch e
                        console.log xhr.responseText
                        terminarCicloBotonCrear false


                xhr.onerror = =>
                    console.log xhr.responseText
                    terminarCicloBotonCrear false

                xhr.send "linkID=#{this.link.linkID}"
                undefined
                ###

            actualizarEpisodio: (ev, elem) ->
                valorNuevo = ev.target.parentNode[elem].value
                vm = this

                xhr = new XMLHttpRequest()
                xhr.open "POST", "#{servidor}/acecha/Eps/actualizarEp.php"
                xhr.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"

                terminarCicloBotonCrear = this.cambiarColoresElem(ev.target, "Actualizando...", "innerHTML")

                xhr.onload = =>
                    try
                        respuesta = JSON.parse(xhr.responseText)
                        if respuesta.exito
                            terminarCicloBotonCrear(true)
                            vm.fnObtenerEps()
                        else
                            console.log(xhr.responseText)
                            terminarCicloBotonCrear(true)

                    catch e
                        console.log(xhr.responseText)
                        terminarCicloBotonCrear(true)


                xhr.send "linkID=#{this.link.linkID}&campo=#{elem}&valor=#{valorNuevo}"
                undefined

            cambiarColoresElem: (elem, textoNuevo, objetivo) ->
                colorActual = elem.style.backgroundColor
                textoActual = elem[objetivo]

                colores = ['#313EA9','#5196a9','#46a95d','#a93783']

                elem[objetivo] = textoNuevo
                intervalo = setInterval (=>
                    elem.style.backgroundColor = colores[parseInt(Math.random()*4)]
                ), 750

                (exito) =>
                    clearInterval(intervalo);
                    if exito
                        elem[objetivo] = "Éxito"
                        elem.style.backgroundColor = "#2d9168"

                        setTimeout (=>
                            elem[objetivo] = textoActual
                            elem.style.backgroundColor = colorActual
                        ), 4000
                    else
                        elem[objetivo] = "Error"
                        elem.style.backgroundColor = "#ac2923"

                        setTimeout (=>
                            elem[objetivo] = textoActual
                            elem.style.backgroundColor = colorActual
                        ), 10000

        created: ->
            this.okru = this.link.okru
            this.mango = this.link.mango
            this.mp4upload = this.link.mp4upload
            this.mega = this.link.mega
            this.rapidvideo = this.link.rapidvideo
            this.okruDescarga = this.link.okruDescarga
            this.mangoDescarga = this.link.mangoDescarga
            this.mp4uploadDescarga = this.link.mp4uploadDescarga
            this.acortado = this.link.acortado

#
</script>

<style scoped lang="sass">
    .deprecado
        filter: opacity(0.3)

    .avisoDeprecado
        font:
            size: large
            weight: normal
        color: #989898

    .titulo-o
        font:
            family: Raleway, Ubuntu, sans-serif
            size: x-large
        margin: 10px 0
        display: inline-block

    .anime__form__link
        color: var(--texto1)

    .link__ep
        display: inline-block
        width: 80px

    .link_verLinks
        cursor: pointer
        font-family: Ubuntu, sans-serif
        padding: 5px
        border: none
        border-radius: 5px
        margin: 0 10px

    .link_eliminarEp
        background-color: #610000
        color: white

    .link__links__label
        display: inline-block
        min-width: 141px

    .link__links
        font-size: large
        padding: 20px
        border-left: solid 1px #37474f

    .link__links__input
        padding: 5px
        border: none
        border-radius: 5px
        font-family: Ubuntu, sans-serif
        display: inline-block
        width: 400px

    .link__links__botonActualizar
        padding: 5px
        border: none
        border-radius: 5px
        margin: 5px
        cursor: pointer
        font-family: Ubuntu, sans-serif
        background-color: #009316
        color: white

    .editarAnime__form
        padding: 20px
        border-left: solid 1px #37474f

    .editarAnime__form__entrada
        display: inline-block
        width: 210px

    .editarAnime__form__input
        padding: 5px
        display: inline-block
        width: 500px
        border: none
        border-radius: 3px
        background-color: #abb2bf
        color: black
        font-family: Ubuntu, sans-serif
        font-size: large

    .editarAnime__form__boton
        padding: 5px
        font-size: large
        font-family: Ubuntu, sans-serif
        margin: 5px 0
        border: none
        border-radius: 5px
        background-color: #009316
        color: white
        cursor: pointer
        transition: background-color 700ms


    //

</style>

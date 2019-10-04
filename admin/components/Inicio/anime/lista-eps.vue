<template lang="pug">
    div.lista
        crear-ep(:anime_id="anime.anime_id")
        // form.anime__form(method="post" @submit.prevent="crearEpisodio($event)")

            label.anime__form__label {{ esOva? 'OVA num': 'Ep num' }}
            input.anime__form__ep(type="number" min="1" name="numEp" placeholder="1")
            label.anime__form__label(for="selectOva" style="padding-left: 50px")
                | ¿Es OVA?
            input#selectOva(type="checkbox" v-model="esOva")
            br
            br
            div.row
                div.anime__form--online
                    div.anime__form__titulo Online
                    br
                    label.anime__form__label RapidVideo
                    input.anime__form__rapid(type="text" name="linkRapidVideo")
                    br
                    label.anime__form__label Mega
                    input.anime__form__rapid(type="text" name="linkMega")
                    br
                    label.anime__form__label Okru
                    input.anime__form__rapid(type="text" name="linkOkru")
                    br
                    label.anime__form__label MP4Upload
                    input.anime__form__rapid(type="text" name="linkMP4Upload")
                    br
                    label.anime__form__label Mango
                    input.anime__form__rapid(type="text" name="linkMango")
                    br
                div.anime__form--descarga
                    div.anime__form__titulo Descarga
                    br
                    label.anime__form__label MEGA
                    input.anime__form__rapid(type="text" name="linkAcortado")
                    br
                    label.anime__form__label Okru
                    input.anime__form__rapid(type="text" name="linkOkru--descarga")
                    br
                    label.anime__form__label MP4Upload
                    input.anime__form__rapid(type="text" name="linkMP4Upload--descarga")
                    br
                    label.anime__form__label Mango
                    input.anime__form__rapid(type="text" name="linkMango--descarga")
                    br
            br
            input.anime__form__botonCrear(type="submit" name="botonCrear" value="Crear")
        br
        hr
        br
        template(v-if="epsData === undefined")
            | Obteniendo episodios existentes del servidor...
        template(v-else)
            | Eps:
            br
            template(v-for="link in epsData")
                mi-link(v-if="!link.es_ova" :key="link.link_id" :link="link" :nombre="nombre"
                    :nombreCorto="nombreCorto" :fnObtenerEps="obtenerEpisodios")
            br
            | OVAs:
            br
            template(v-for="link in epsData")
                mi-link(v-if="link.es_ova" :key="link.link_id" :link="link" :nombre="nombre"
                    :nombreCorto="nombreCorto" :fnObtenerEps="obtenerEpisodios")
    //
</template>

<script lang="coffee">
    import { servidor } from "../../../../src/variables";
    import miLink from "../mi-link.vue"
    import crearEp from "./crear-ep.vue"

    export default
        name: "lista-eps"
        components:
            "mi-link": miLink
            "crear-ep": crearEp
        data: ->
            esOva: no

        props:
            anime:
                type: Object
                required: true
            epsData:
                type: Array | undefined
                required: true
            nombre:
                type: String
                required: true
            nombreCorto:
                type: String
                required: true
        methods:
            crearEpisodio: (ev) ->
                form = ev.target
                vm = this

                botonCrear = form['botonCrear']

                terminarCicloBotonCrear = this.cambiarColoresElem(botonCrear, "Creando...", "value")

                datos =
                    animeID: this.animeID
                    numEp: form["numEp"].value
                    mega: form["linkMega"].value
                    rapidvideo: form["linkRapidVideo"].value
                    acortado: form["linkAcortado"].value
                    mango: form["linkMango"].value
                    mp4upload: form["linkMP4Upload"].value

                    # ¡Nuevo!
                    okru: form["linkOkru"].value
                    okruDescarga: form["linkOkru--descarga"].value
                    mangoDescarga: form["linkMango--descarga"].value
                    mp4uploadDescarga: form["linkMP4Upload--descarga"].value

                    esOva: this.esOva

                datosAEnviar = for item, dato of datos
                    "#{encodeURIComponent item}=#{encodeURIComponent dato}"

                try
                    dataR = await fetch "#{servidor}/api/episodios",
                        method: "POST"
                        headers:
                            "Content-Type": "application/x-www-form-urlencoded"
                        body: datosAEnviar.join "&"
                    data = await dataR.json()
                    if data.exito? and data.exito is yes
                        terminarCicloBotonCrear yes
                        @obtenerEpisodios()
                        items = form.getElementsByClassName("anime__form__rapid")

                        for num in [0..items.length - 1]
                            items[num].value = ""

                        @esOva = false

                    else throw new Error "Error. No exito en solicitud."

                    terminarCicloBotonCrear yes
                catch e
                    console.log "Error.\n#{e.stack}"
                    terminarCicloBotonCrear no
            obtenerEpisodios: ->
                console.log "alv"

#
</script>

<style scoped lang="sass">

    .lista
        padding-left: 25px
        border-left: solid 1px #37474f

    //
</style>
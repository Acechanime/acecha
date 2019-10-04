<template lang="pug">
    div
        div.botones
            button.botonm.ep(v-if="tipoCreando === 0" @click="crearEp") Ep
            button.botonm.ova(v-if="tipoCreando === 0" @click="crearOva") Ova
            button.botonm.cancelar(v-if="tipoCreando !== 0" @click="cancelarCreacion")
                span.txtDefecto Creando {{ textoBoton }}
                    span.txtCancelar Cancelar

        form.anime__form(v-if="tipoCreando !== 0" @submit.prevent)
            label.anime__form__label {{ textoBoton }} numero
            input.anime__form__ep(type="number" min="0" v-model.number="numero")
            br
            br
            div.row
                div.anime__form--online
                    div.anime__form__titulo Online
                    br
                    label.anime__form__label RapidVideo
                    input.anime__form__rapid(type="text" v-model="link_rapidvideo")
                    br
                    label.anime__form__label Mega
                    input.anime__form__rapid(type="text" v-model="link_mega")
                    br
                    label.anime__form__label Okru
                    input.anime__form__rapid(type="text" v-model="link_okru")
                    br
                    label.anime__form__label MP4Upload
                    input.anime__form__rapid(type="text" v-model="link_mp4upload")
                    br
                    label.anime__form__label Mango
                    input.anime__form__rapid(type="text" v-model="link_mango")
                    br
                div.anime__form--descarga
                    div.anime__form__titulo Descarga
                    br
                    label.anime__form__label MEGA
                    input.anime__form__rapid(type="text" v-model="link_mega_acortado")
                    br
                    label.anime__form__label Okru
                    input.anime__form__rapid(type="text" v-model="link_okru_acortado")
                    br
                    label.anime__form__label MP4Upload
                    input.anime__form__rapid(type="text" v-model="link_mp4upload_acortado")
                    br
                    label.anime__form__label Mango
                    input.anime__form__rapid(type="text" v-model="link_mango_acortado")
            div.botones
                button.botonm.crear(@click="crearEpisodio"
                    :style="'background-color: ' + creando.color")
                    i.material-icons {{ creando.icono }}
                    | {{ creando.texto }}

    //
</template>

<script lang="coffee">
    import {servidor} from "../../../../src/variables";

    export default
        name: "crear-ep"
        data: ->
            tipoCreando: 0 # 0 nada, 1 ep, -1 ova
            numero: 0

            creando:
                icono: "cloud_upload"
                texto: "Crear"
                error: no
                color: "#004D40"

            link_rapidvideo: ""
            link_mega: ""
            link_okru: ""
            link_mp4upload: ""
            link_mango: ""
            link_mega_acortado: ""
            link_okru_acortado: ""
            link_mp4upload_acortado: ""
            link_mango_acortado: ""
        props:
            anime_id:
                type: Number
                required: true
        computed:
            textoBoton: -> if @tipoCreando is 1 then "episodio" else "ova"
        methods:
            crearEp: -> @tipoCreando = 1
            crearOva: -> @tipoCreando = -1
            cancelarCreacion: -> @tipoCreando = 0
            crearEpisodio: ->
                @creando =
                    icono: "cloud_queue"
                    texto: "Creando..."
                    error: no
                    color: "#004D40"
                datos =
                    anime_id: @anime_id
                    num_ep: @numero
                    mega: @link_mega
                    rapidvideo: @link_rapidvideo
                    mango: @link_mango
                    mp4upload: @link_mp4upload
                    okru: @link_okru
                    mega_acortado: @link_mega_acortado
                    okru_acortado: @link_okru_acortado
                    mango_acortado: @link_mango_acortado
                    mp4upload_acortado: @link_mp4upload_acortado
                    es_ova: @tipoCreando is -1


                try
                    resR = await fetch "#{servidor}/api/episodios",
                        method: "POST"
                        headers:
                            "Content-Type": "application/json"
                        body: JSON.stringify datos
                    res = await resR.json()

                    if res.exito? and res.exito
                        @creando =
                            icono: "cloud_done"
                            texto: "Exito"
                            error: no
                            color: "#1B5E20"
                    else
                        @creando =
                            icono: "cloud_off"
                            texto: "Error"
                            error: no
                            color: "#b71c1c"

                catch e
                    @creando =
                        icono: "cloud_off"
                        texto: "Error"
                        error: no
                        color: "#b71c1c"

                vm = this
                setTimeout (() =>
                    vm.creando =
                        icono: "cloud_upload"
                        texto: "Crear"
                        error: no
                        color: "#004D40"
                ), 3000

#
</script>

<style scoped lang="sass">

    .botones
        .ep, .ova, .cancelar
            &::before
                content: "add"
                font:
                    family: "Material Icons", sans-serif !important
                    size: 20px
                vertical-align: top
            margin: 10px 20px 10px 0
        .cancelar
            &::before
                content: "close"
                color: white
            &:hover
                background-color: #b71c1c
        .crear
            color: white
            i
                vertical-align: bottom
                padding-right: 10px

    .txtDefecto
        position: relative

    .txtCancelar
        position: absolute
        left: 10px
        opacity: 0
        color: white

    .botones .cancelar:hover
        .txtDefecto
            color: #b71c1c

        .txtCancelar
            opacity: 1

    .anime__form
        padding-left: 25px
        border-left: solid 1px #37474f

    .anime__form--online, .anime__form--descarga
        width: 600px
        float: left

    .anime__form__titulo
        text-align: center
        font:
            weight: normal
            family: Raleway, Ubuntu, sans-serif

    .anime__form__ep, .anime__form__mega, .anime__form__rapid
        font-family: Roboto, sans-serif
        font-size: large

    .anime__form__ep
        padding: 5px
        display: inline-block
        width: 50px
        border: none
        border-radius: 3px
        background-color: #abb2bf
        color: black

    .anime__form__mega, .anime__form__rapid
        padding: 5px
        display: inline-block
        width: 300px
        border: none
        border-radius: 3px
        background-color: #abb2bf
        color: black

    .anime__form__botonCrear
        background-color: #e91e63
        color: white
        border: none
        font-family: Raleway, Ubuntu, sans-serif
        padding: 5px
        font-size: large
        cursor: pointer
        border-radius: 3px
        margin-left: 10px
        transition: transform 250ms, background-color 700ms

    .anime__form__botonCrear:hover
        transform: translate(-2px, -2px)

    .anime__form__label
        display: inline-block
        width: 190px

    //
</style>
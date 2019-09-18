<template lang="pug">
    div
        div.botones
            button.botonm.ep(v-if="creando === 0" @click="crearEp") Ep
            button.botonm.ova(v-if="creando === 0" @click="crearOva") Ova
            button.botonm.cancelar(v-if="creando !== 0" @click="cancelarCreacion")
                span.txtDefecto Creando {{ textoBoton }}
                    span.txtCancelar Cancelar

        form.anime__form(v-if="creando !== 0")
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
                button.botonm.crear(@click="crearEpisodio") Crear
    //
</template>

<script lang="coffee">

    export default
        name: "crear-ep"
        data: ->
            creando: 0 # 0 nada, 1 ep, -1 ova
            numero: 0
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
            textoBoton: -> if @creando is 1 then "episodio" else "ova"
        methods:
            crearEp: -> @creando = 1
            crearOva: -> @creando = -1
            cancelarCreacion: -> @creando = 0
            crearEpisodio: ->

#
</script>

<style scoped lang="sass">

    .botones
        .ep, .ova, .cancelar, .crear
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
            background-color: #004D40
            color: white
            &::before
                content: "check"

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
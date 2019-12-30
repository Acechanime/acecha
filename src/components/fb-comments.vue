<template lang="pug">
    div#contenedor-fb

    //
</template>

<script lang="coffee">

    url = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v5.0&appId=190418928513620&autoLogAppEvents=1"
    parte1 = "<!DOCTYPE html><html lang=\"es\"><head><meta charset=\"UTF-8\"><title>Comentarios</title></head><body><div id=\"fb-root\"></div>"
    parte2 = "<script async defer crossorigin=\"anonymous\" src=\"https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v5.0&appId=190418928513620&autoLogAppEvents=1\"" + ">"
    parte3 = "</" + "script" + ">"

    getHtml = (url, esClaro) ->
        res = "<div style='text-align: center'><div class=\"fb-comments\" data-href=\"#{url}\" data-numposts=\"5\"
                     data-order-by=\"reverse_time\" data-colorscheme=\"#{if esClaro then 'light' else 'dark'}\">
                </div></div></body></html>"

        parte1 + parte2 + parte3 + res

    export default
        name: "fb-comments"
        props:
            path:
                type: String
                required: true
        computed:
            url: -> "https://acechanime.com" + @path
            modoColor: -> @$store.state.datos.modoColor
            esClaro: -> @modoColor is "claro"
        watch:
            url: (nuevo, viejo) ->
                # @cargarFbSdk()
                @crearComentarios()
            modoColor: (nuevo) ->
                @crearComentarios()
        methods:
            crearComentarios: ->
                contenedor = document.getElementById "contenedor-fb"
                while contenedor.hasChildNodes()
                    contenedor.removeChild contenedor.firstChild

                iframe = document.createElement "iframe"
                htmlContent = getHtml @url, @esClaro
                contenedor.appendChild iframe

                anchoPantalla = window.innerHeight
                iframe.style.width = "100%"
                iframe.style.height = "#{Math.floor (anchoPantalla * 0.8) }px"
                iframe.style.border = "none"
                iframe.contentWindow.document.open()
                iframe.contentWindow.document.write htmlContent
                iframe.contentWindow.document.close()

            ajustarNodos: ->
                contenedor = document.getElementById "contenedor-fb"

                elem1 = document.createElement "div"
                elem1.id = "fb-root"

                elem2 = document.createElement "div"
                elem2.className = "fb-comments"
                elem2.setAttribute "data-href", @url
                elem2.setAttribute "data-numposts", "5"
                elem2.setAttribute "data-width", ""
                elem2.setAttribute "data-order-by", "reverse_time"
                elem2.setAttribute "data-colorscheme", if @esClaro then 'light' else 'dark'

                while contenedor.hasChildNodes()
                    contenedor.removeChild contenedor.firstChild

                contenedor.appendChild elem1
                contenedor.appendChild elem2

            cargarFbSdk: ->
                @ajustarNodos()

                contenedor_codigo = document.getElementById "facebook-jssdk"
                if contenedor_codigo?
                    contenedor_codigo?.parentElement?.removeChild? contenedor_codigo

                contenedor_codigo = document.createElement "script"
                contenedor_codigo.id = "facebook-jssdk"
                contenedor_codigo.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.0"
                document.head.appendChild contenedor_codigo

        mounted: ->
            # @cargarFbSdk()
            @crearComentarios()

#
</script>

<style scoped lang="sass">
    @import "../sass/variables"
    
    //
</style>
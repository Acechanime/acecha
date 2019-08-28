<template lang="pug">
    div
        div.entrada
            editar-anime(:config="animeVacio" :texto="texto" :error="error" :fun="crearAnime")

    //
</template>

<script lang="coffee">
    import editarAnime from "../editar-anime.vue"
    import {servidor} from "../../../src/variables";

    export default
        name: "crear-anime"
        components:
            "editar-anime": editarAnime
        data: ->
            texto: "Crear"
            error: no
            animeVacio:
                nombre: "Nombre"
                otros_nombres: [
                    "Otros nombres"
                ]
                ruta: "/ruta-del-anime/"
                sinopsis: "Sinopsis del anime"
                generos: []
                episodios: 12
                temporada: "Invierno"
                anio: 2019
                estudio: "A-1 Pictures"
                fuente: "Manga"
                emision: "01/01/2019"
                culminacion: "30/03/2019"
                mal: "https://myanimelist.net/"
                en_emision: yes
                img_portada: "https://cdn.myanimelist.net/images/anime/5/86830l.jpg"
                img_fondo: "/img/you-kei.jpg"
                img_nuevoEp: "nuevo ep"
                id_temporada_ant: null
                id_temporada_sig: null
                num_temporada: 1
        methods:
            crearAnime: ->
                vm = this
                @texto = "Creando..."

                respuestaRaw = await fetch "#{servidor}/api/animes",
                    method: "POST"
                    headers:
                        "Accept": "application/json"
                        "Content-Type": "application/json"
                    body: JSON.stringify @$store.state.animeAdmin
                respuesta =
                    try
                        await respuestaRaw.json()
                    catch e
                        { exito: no}
                if respuesta?.exito and respuesta.exito
                    @texto = "Exito"
                    setTimeout (() =>
                        vm.texto = "Crear"
                    ), 1500
                else
                    @texto = "Error"
                    @error = yes
                    setTimeout (() =>
                        vm.texto = "Crear"
                        vm.error = no
                    ), 2500
                    console.error respuesta.razon
                @creando = no

    #

</script>

<style scoped lang="sass">

    //
</style>
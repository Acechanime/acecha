<template lang="pug">
    div.anime(:id="anime.nombre")
        span.anime__titulo {{ anime.nombre }}
        button.anime__boton(style="background-color: #004323; width: 98px;" @click="episodios($event)")
            | Episodios
        button.anime__boton(style="background-color: #210043; width: 126px;" @click="mostrarEditarAnimeF($event)")
            | Editar Anime</button>
        div(v-if="mostrarEps" style="padding-left: 25px; border-left: solid 1px #37474f")
            br
            | Carpeta de MEGA:
            input#carpetaMega.anime__form__rapid(type="text" placeholder="Vacio"
                   :value="anime.carpetaMega")
            button.anime__form__botonCrear(@click="actualizarCarpetaMega($event)") Actualizar
            hr
            | Nuevo episodio:
            form.anime__form(method="post" @submit.prevent="crearEpisodio($event)")

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
                    mi-link(v-if="!link.es_ova" :key="link.num_ep + '-link'" :link="link" :nombre="nombre"
                              :nombreCorto="nombreCorto" :fnObtenerEps="obtenerEpisodios")
                br
                | OVAs:
                br
                template(v-for="link in epsData")
                    mi-link(v-if="link.es_ova" :key="link.num_ep + '-link--ova'" :link="link" :nombre="nombre"
                             :nombreCorto="nombreCorto" :fnObtenerEps="obtenerEpisodios")

</template>

<script>
    import miLink from "./mi-link.vue"
    const servidor = 'http://localhost:3000';

    export default {
        name: "anime",
        components: {
            'mi-link': miLink
        },
        data: function () {
            return {
                epsData: undefined,
                mostrarEps: false,
                mostrarEditarAnime: false,
                colores: ['#313EA9', '#5196a9', '#46a95d', '#a93783'],
                esOva: false
            }
        },
        props: {
            nombre: {
                type: String,
                default: "Sin nombre",
            },
            animeID: {
                type: Number,
                required: true
            },
            anime: {
                type: Object,
                required: true
            },
            fnRecargarListaAnimes:{
                type: Function,
                required: true
            }
        },
        computed: {
            nombreCorto: function () {
                let nombreCorto = this.nombre;
                while (/\s/.test(nombreCorto)) {
                    nombreCorto = nombreCorto.replace(" ", "-");
                }
                return nombreCorto;
            }
        },
        methods: {
            mostrarEditarAnimeF(ev) {
                if (!this.mostrarEditarAnime) {
                    ev.target.innerText = "Cerrar";
                }
                else {
                    ev.target.innerText = "Editar Anime";
                }
                this.mostrarEditarAnime = !this.mostrarEditarAnime;
            },
            eliminarAnime(animeID) {
                const respuesta = confirm("Se borraran todos los datos del anime, incluidos sus episodios.");

                if (respuesta) {
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", `${servidor}/acecha/Animes/eliminarAnime.php`);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.onload = () => {
                        JSON.parse(xhr.responseText);
                        this.fnRecargarListaAnimes();
                    };
                    xhr.onerror = () => {
                        console.log(xhr.responseText);
                        console.error("Hubo un error :c");
                    };
                    xhr.send(`animeID=${this.animeID}`);
                }
            },
            obtenerEpisodios () {
                const vm = this;
                const xhr = new XMLHttpRequest();

                // xhr.open("POST", `${servidor}/acecha/Eps/obtenerEps.php`);
                xhr.open("GET", `${servidor}/api/episodios?anime_id=${this.animeID}`);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onload = () => {
                    const respuesta = JSON.parse(xhr.responseText);
                    vm.epsData = respuesta.payload;
                };
                xhr.onerror = () => {
                    console.log(xhr.responseText);
                    console.error("Hubo un error :c");
                };
                // xhr.send(`animeID=${this.animeID}`);
                xhr.send();
            },
            episodios (ev) {
                if (!this.mostrarEps) {
                    ev.target.innerText = "Cerrar";
                }
                else {
                    ev.target.innerText = "Episodios";
                }
                this.mostrarEps = !this.mostrarEps;

                this.obtenerEpisodios();
            },
            crearEpisodio (ev) {
                const form = ev.target;
                const vm = this;

                const botonCrear = form['botonCrear'];

                const terminarCicloBotonCrear = this.cambiarColoresElem(botonCrear, "Creando...", "value");

                const xhr = new XMLHttpRequest();
                // xhr.open("POST", servidor + "/acecha/Eps/crearEp.php");
                xhr.open("POST", `${servidor}/api/episodios`);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onload = () => {
                    try {
                        const data = JSON.parse(xhr.responseText);

                        if (data.exito) {
                            console.log("Exito");

                            this.obtenerEpisodios();

                            const items = form.getElementsByClassName("anime__form__rapid");
                            for (let i = 0; i < items.length; i++)
                                items[i].value = "";

                            vm.esOva = false;

                            terminarCicloBotonCrear(true);
                        } else {
                            console.error(data.razon);

                            terminarCicloBotonCrear(false);
                        }
                    } catch (e) {
                        console.log(xhr.responseText);
                        console.error("Error al convertir JSON. Razon:\n" + e.stack + "\n" + e);

                        terminarCicloBotonCrear(false);
                    }
                };
                xhr.onerror = () => {

                    console.error("Error al ejecutar la petición.");

                    terminarCicloBotonCrear(false);
                };

                const datos = {
                    animeID: this.animeID,
                    numEp: form["numEp"].value,
                    mega: form["linkMega"].value,
                    rapidvideo: form["linkRapidVideo"].value,
                    acortado: form["linkAcortado"].value,
                    mango: form["linkMango"].value,
                    mp4upload: form["linkMP4Upload"].value,

                    // ¡Nuevo!
                    okru: form["linkOkru"].value,
                    okruDescarga: form["linkOkru--descarga"].value,
                    mangoDescarga: form["linkMango--descarga"].value,
                    mp4uploadDescarga: form["linkMP4Upload--descarga"].value,

                    esOva: this.esOva
                };
                let datosAEnviar = [];
                for (const item in datos) {
                    datosAEnviar.push(`${encodeURIComponent(item)}=${encodeURIComponent(datos[item])}`);
                }

                // console.log(datosAEnviar.join("&"));
                xhr.send(datosAEnviar.join("&"));
            },
            editarAnime(ev, campo) {
                ev.preventDefault();
                const valorNuevo = ev.target.parentNode[campo].value;
                const vm = this;

                const xhr = new XMLHttpRequest();
                xhr.open("POST", `${servidor}/acecha/Animes/actualizarAnime.php`);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                const terminarCicloBotonCrear = this.cambiarColoresElem(ev.target, "Actualizando...", "innerHTML");

                xhr.onload = () => {
                    try {
                        const respuesta = JSON.parse(xhr.responseText);
                        if (respuesta.exito) {
                            terminarCicloBotonCrear(true);
                        } else {
                            console.log(xhr.responseText);
                            terminarCicloBotonCrear(false);
                        }
                    } catch (e) {
                        console.log(xhr.responseText);
                        terminarCicloBotonCrear(false);
                    }
                };
                xhr.onerror = () => {
                    console.log(xhr.responseText);
                    terminarCicloBotonCrear(false);
                };
                xhr.send(`modo=individual&animeID=${this.animeID}&campo=${campo}&valor=${valorNuevo}`);
            },
            editarAnimeTodo (ev) {
                const form = ev.target;

                const xhr = new XMLHttpRequest();
                xhr.open("POST", `${servidor}/acecha/Animes/actualizarAnime.php`);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                const terminarCicloBotonCrear = this.cambiarColoresElem(form["actualizar"], "Actualizando...", "value");

                xhr.onload = () => {
                    try {
                        const respuesta = JSON.parse(xhr.responseText);
                        if (respuesta.exito) {
                            terminarCicloBotonCrear(true);
                        } else {
                            console.log(xhr.responseText);
                            terminarCicloBotonCrear(false);
                        }
                    } catch (e) {
                        console.log(xhr.responseText);
                        terminarCicloBotonCrear(false);
                    }
                };
                xhr.onerror = () => {
                    console.log(xhr.responseText);
                    terminarCicloBotonCrear(false);
                };

                xhr.send(`modo=todo&animeID=${this.animeID}&nombre=${form["nombre"].value}&urlAnime=${form["urlAnime"].value
                    }&urlImg=${form["urlImg"].value}`);
            },
            cambiarColoresElem (elem, textoNuevo, objetivo) {
                const colorActual = elem.style.backgroundColor;
                const textoActual = elem[objetivo];

                const colores = ['#313EA9','#5196a9','#46a95d','#a93783'];

                elem[objetivo] = textoNuevo;
                const intervalo = setInterval(() => {
                    elem.style.backgroundColor = colores[parseInt(Math.random()*4)];
                }, 750);

                return exito => {
                    clearInterval(intervalo);
                    if (exito) {
                        elem[objetivo] = "Éxito";
                        elem.style.backgroundColor = "#2d9168";

                        setTimeout(() => {
                            elem[objetivo] = textoActual;
                            elem.style.backgroundColor = colorActual;
                        }, 4000);
                    } else {
                        elem[objetivo] = "Error";
                        elem.style.backgroundColor = "#ac2923";

                        setTimeout(() => {
                            elem[objetivo] = textoActual;
                            elem.style.backgroundColor = colorActual;
                        }, 10000);
                    }
                };
            },
            actualizarCarpetaMega (ev) {
                const boton = ev.target;
                const nuevoNombre = document.getElementById("carpetaMega").value;

                const terminarCicloBoton = this.cambiarColoresElem(boton, "Actualizando...", "innerHTML");

                const xhr = new XMLHttpRequest();
                xhr.open("POST", servidor + "/acecha/Animes/actualizarCampo.php");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                xhr.onload = () => {
                    try {
                        const res = JSON.parse(xhr.responseText);
                        if (res.exito) {
                            terminarCicloBoton(true);
                        } else {
                            terminarCicloBoton(false);
                        }
                    } catch (e) {
                        terminarCicloBoton(false);
                    }
                };
                xhr.onerror = () => {
                    terminarCicloBoton(false);
                };

                xhr.send(`animeID=${this.anime.animeID}&campo=carpetaMega&valor=${nuevoNombre}`);
            }
        },
    }
</script>

<style scoped lang="sass">
    .row::after
        display: table
        content: ""
        clear: both


    .anime__form--online, .anime__form--descarga
        width: 600px
        float: left

    .anime__form__titulo
        text-align: center
        font:
            weight: normal
            family: Raleway, Ubuntu, sans-serif

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
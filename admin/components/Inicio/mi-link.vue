<template>
    <div>
        <span class="link__ep">{{(link.es_ova? 'ova ' : 'ep ') + link.num_ep }}</span> &rarr;
        <a class="anime__form__link" :href="'https://acechanime.com/' + nombreCorto + '/' + ((link.es_ova === '1'? 'ova' : 'ep') + link.num_ep)" target="_blank">
            /{{ nombreCorto }}/{{ (link.esOva === "1"? 'ova' : 'ep') + link.num_ep }}
        </a>
        <button class="link_verLinks" @click="botonVerLinks($event)">
            Ver link
        </button>
        <button class="link_verLinks link_eliminarEp" @click="eliminarEpisodio($event)">
            Eliminar
        </button>
        <div class="link__links" v-if="mostrarLinks">
            <form @submit.prevent>
                <span class="titulo-o">Online:</span>
                <br>

                <span class="link__links__label">RapidVideo</span> &rarr;
                <input class="link__links__input" type="text" name="rapidvideo" :value="link.rapidvideo"
                       :placeholder="link.rapidvideo? '': 'Sin episodio.'">
                <button class="link__links__botonActualizar" @click="actualizarEpisodio($event, 'rapidvideo')">
                    {{ link.rapidvideo? 'Actualizar': 'Crear' }}
                </button>
                <br>

                <span class="link__links__label">Mega</span> &rarr;
                <input class="link__links__input" type="text" name="mega" :value="link.mega"
                       :placeholder="link.mega? '': 'Sin episodio.'">
                <button class="link__links__botonActualizar" @click="actualizarEpisodio($event, 'mega')">
                    {{ link.mega? 'Actualizar': 'Crear' }}
                </button>
                <br>

                <span class="link__links__label">Okru</span> &rarr;
                <input class="link__links__input" type="text" name="okru" :value="link.okru"
                       :placeholder="link.okru? '': 'Sin episodio.'">
                <button class="link__links__botonActualizar" @click="actualizarEpisodio($event, 'okru')">
                    {{ link.okru? 'Actualizar': 'Crear' }}
                </button>
                <br>

                <span class="link__links__label">MP4Upload</span> &rarr;
                <input class="link__links__input" type="text" name="mp4upload" :value="link.mp4upload"
                       :placeholder="link.mp4upload? '': 'Sin episodio.'">
                <button class="link__links__botonActualizar" @click="actualizarEpisodio($event, 'mp4upload')">
                    {{ link.mp4upload? 'Actualizar': 'Crear' }}
                </button>
                <br>

                <span class="link__links__label">Mango</span> &rarr;
                <input class="link__links__input" type="text" name="mango" :value="link.mango"
                       :placeholder="link.mango? '': 'Sin episodio.'">
                <button class="link__links__botonActualizar" @click="actualizarEpisodio($event, 'mango')">
                    {{ link.mango? 'Actualizar': 'Crear' }}
                </button>
                <br>

                <hr>

                <span class="titulo-o">Descarga</span>
                <br>

                <span class="link__links__label">Mega</span> &rarr;
                <input class="link__links__input" type="text" name="acortado" :value="link.mega_acortado"
                       :placeholder="link.mega_acortado? '': 'Sin episodio.'">
                <button class="link__links__botonActualizar" @click="actualizarEpisodio($event, 'mega_acortado')">
                    {{ link.mega_acortado? 'Actualizar': 'Crear' }}
                </button>
                <br>

                <span class="link__links__label">Okru</span> &rarr;
                <input class="link__links__input" type="text" name="okruDescarga" :value="link.okru_acortado"
                       :placeholder="link.okru_acortado? '': 'Sin episodio.'">
                <button class="link__links__botonActualizar" @click="actualizarEpisodio($event, 'okru_acortado')">
                    {{ link.okru_acortado? 'Actualizar': 'Crear' }}
                </button>
                <br>

                <span class="link__links__label">MP4Upload</span> &rarr;
                <input class="link__links__input" type="text" name="mp4uploadDescarga" :value="link.mp4upload_acortado"
                       :placeholder="link.mp4upload_acortado? '': 'Sin episodio.'">
                <button class="link__links__botonActualizar" @click="actualizarEpisodio($event, 'mp4upload_acortado')">
                    {{ link.mp4upload_acortado? 'Actualizar': 'Crear' }}
                </button>
                <br>

                <span class="link__links__label">Mango</span> &rarr;
                <input class="link__links__input" type="text" name="mangoDescarga" :value="link.mango_acortado"
                       :placeholder="link.mango_acortado? '': 'Sin episodio.'">
                <button class="link__links__botonActualizar" @click="actualizarEpisodio($event, 'mango_acortado')">
                    {{ link.mango_acortado? 'Actualizar': 'Crear' }}
                </button>

            </form>
        </div>
    </div>
</template>

<script>
    const servidor = 'https://acechanime.com';

    export default {
        name: "mi-link",
        data: function () {
            return {
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
            }
        },
        props: {
            link: {
                type: Object,
                required: true
            },
            nombre: {
                type: String,
                required: true
            },
            nombreCorto: {
                type: String,
                required: true
            },
            fnObtenerEps: {
                type: Function,
                required: true
            }
        },
        methods: {
            botonVerLinks (ev) {
                if (!this.mostrarLinks) {
                    ev.target.innerText = "Cerrar";
                }
                else {
                    ev.target.innerText = "Ver links";
                }
                this.mostrarLinks = !this.mostrarLinks;
            },
            eliminarEpisodio (ev) {
                const xhr = new XMLHttpRequest();
                const vm = this;
                xhr.open("POST", `${servidor}/acecha/Eps/eliminarEp.php`);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                const terminarCicloBotonCrear = this.cambiarColoresElem(ev.target, "Eliminando...", "innerHTML");

                xhr.onload = () => {
                    try {
                        const respuesta = JSON.parse(xhr.responseText);
                        if (respuesta.exito) {
                            vm.fnObtenerEps();
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
                xhr.send(`linkID=${this.link.linkID}`);
            },
            actualizarEpisodio (ev, elem) {
                const valorNuevo = ev.target.parentNode[elem].value;
                const vm = this;

                const xhr = new XMLHttpRequest();
                xhr.open("POST", `${servidor}/acecha/Eps/actualizarEp.php`);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                const terminarCicloBotonCrear = this.cambiarColoresElem(ev.target, "Actualizando...", "innerHTML");

                xhr.onload = () => {
                    try {
                        const respuesta = JSON.parse(xhr.responseText);
                        if (respuesta.exito) {
                            terminarCicloBotonCrear(true);
                            vm.fnObtenerEps();
                        } else {
                            console.log(xhr.responseText);
                            terminarCicloBotonCrear(true);
                        }
                    } catch (e) {
                        console.log(xhr.responseText);
                        terminarCicloBotonCrear(true);
                    }
                };
                xhr.onerror = () => {

                };
                xhr.send(`linkID=${this.link.linkID}&campo=${elem}&valor=${valorNuevo}`);
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
            }
        },
        created () {
            this.okru = this.link.okru;
            this.mango = this.link.mango;
            this.mp4upload = this.link.mp4upload;
            this.mega = this.link.mega;
            this.rapidvideo = this.link.rapidvideo;
            this.okruDescarga = this.link.okruDescarga;
            this.mangoDescarga = this.link.mangoDescarga;
            this.mp4uploadDescarga = this.link.mp4uploadDescarga;
            this.acortado = this.link.acortado;
        }
    }
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

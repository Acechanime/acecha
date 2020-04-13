import localforage from "localforage";
import md5 from "md5";
import { servidor } from "../coffee/variables.coffee"

const cargarRecursoDesdeRed = (nombre, url) => new Promise(async (resolve, reject) =>{

    try {
        const resRaw = await fetch(`${servidor}${url}`);

        if (resRaw.ok === true) {

            const datos = await resRaw.json();
            localStorage.setItem(nombre, JSON.stringify(datos));
            resolve(datos);

        } else {
            console.error(resRaw);
            throw new Error("");
        }

    } catch (e) {
        console.error(`Error al cargar recurso ${nombre} desde ${url}.`);
        console.error(e);
        reject(e);
    }

});


//: (nombre: Txt, url: Txt) -> [Promise {}, Promise {}]
const cargarRecurso = (nombre, url) => {

    const promesaRed = cargarRecursoDesdeRed(nombre, url);
    const datosLocales = localStorage.getItem(nombre);

    if (datosLocales) {
        return [JSON.parse(datosLocales), promesaRed];
    } else {
        return [undefined, promesaRed];
    }

};


const inicializar = async ({ commit }) => {

    const inicializarYActualizar = async (nombreValor, nombreRec, urlRec) => {
        const [local, promesaRed] = cargarRecurso(nombreRec, urlRec);

        if (local !== undefined) {
            commit("actualizarValores", { clave: nombreValor , valor: local});
        }

        try {
            const datos = await promesaRed;
            commit("actualizarValores", { clave: nombreValor, valor: datos});
        } catch (e) {}
    };


    const inicializarAnimes = async () => {

        const obtenerAnimes = animeData => {
            let animes = [];
            for (const id in animeData) if (animeData.hasOwnProperty(id)) {
                animes.push(datos[id].datos);
            }
            return animes;
        };

        /*
        reg AnimeData = {
            [id: Txt]: {
                hash: Txt
                datos: Anime
            }
        }
        */

        //: AnimeData
        let datos = await localforage.getItem("animes");

        let bodyPeticion = "";
        if (datos === null) {
            datos = {};
            bodyPeticion = `{"Hashes": [{"id": "-1", "hash": "-1"}]}`;
            commit("actualizarValores", { clave: "animes", valor: [] });
        } else {
            let animes = [];
            let esPrimer = true;
            bodyPeticion += `{"Hashes": [`;
            for (const id in datos) if (datos.hasOwnProperty(id)) {
                const datosAnime = datos[id];
                bodyPeticion += (esPrimer? "": ",") + `{"id": "${id}", "hash": "${datosAnime.hash}"}`;
                animes.push(datosAnime.datos);
                esPrimer = false;
            }
            bodyPeticion += "]}";

            commit("actualizarValores", { clave: "animes", valor: animes });
        }

        const respuesta = await fetch(`${servidor}/animes/get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyPeticion
        });

        if (respuesta.ok) {

            const datosNuevos = await respuesta.json();

            for (const anime of datosNuevos) {

                const hash = JSON.stringify(anime) |> md5;

                datos[anime.id] = {
                    hash,
                    datos: anime
                };

            }

            commit("actualizarValores", { clave: "animes", valor: obtenerAnimes(datos) });

            localforage.setItem("animes", datos)
                .then(() => {
                    console.log("Almacenado exitosamente.");
                });

        }

    };


    // RecomendacionSemanal
    inicializarYActualizar("recomendacionSemanal", "recomendacion-semanal", "/animes/semanal");
    inicializarYActualizar("generos", "generos", "/generos");
    // inicializarYActualizar("animes", "animes", "/animes")
    inicializarAnimes();

};


export const datos = {
    namespaced: true,
    state: {
        //: [AnimeData]
        animes: [],
        generos: [],
        recomendacionSemanal: {
            ruta: ".",
            portada: ""
        },
        resizeEvent: {},
        paginaCargada: false,
        animeActual: {},
        animeActualCargando: false,
        animeActualCargado: false,
        mostrarVersion: localStorage.getItem("mostrar-version") === "true"
    },
    mutations: {
        actualizarResizeEvent (state, valor) {
            state.resizeEvent = valor;
        },
        terminarCargaPagina (state) {
            state.paginaCargada = true;
        },
        actualizarRecomendacionSemanal (state, valor) {
            state.recomendacionSemanal = valor;
        },
        actualizarValores (state, { clave, valor }) {
            state[clave] = valor
        },
        actualizarAnimeActual (state, valor) {
            state.animeActual = valor;
        },
        setAnimeActualCargando (state, valor) {
            state.setAnimeActualCargando = valor
        },
        setAnimeActualCargado (state, valor) {
            state.animeActualCargado = !!valor
        },
        setMostrarVersion (state, valor) {
            localStorage.setItem("mostrar-version", valor);
            state.mostrarVersion = valor;
        }
    },
    actions: {
        inicializar,
        cargarAnime({ commit, state }, ruta) {
            commit("setAnimeActualCargado", false);
            commit("setAnimeActualCargando", true);

            if (!state.animeActualCargado) {
                const intervalo = setInterval(() => {

                    if (state.animes.length > 0) {

                        const animePrev = state.animes.find(a => a.ruta === ruta);
                        if (animePrev) {
                            commit("actualizarAnimeActual", animePrev);
                        } else {
                            commit("actualizarAnimeActual", {});
                        }

                        commit("setAnimeActualCargando", false);
                        commit("setAnimeActualCargado", true);
                        clearInterval(intervalo);
                    }

                }, 100);
            }

        }

    }
};


const cambiarEsquemaColor = color => {
    const clases = document.body.classList;

    bucle: for (const pos in clases) {
        if (clases.hasOwnProperty(pos)) {
            const clase =  clases[pos];

            switch (clase) {
                case "color-claro":
                case "color-azul-oscuro":
                case "color-negro":
                case "color-oscuro":
                case "color-gris": {
                    clases.remove(clase);
                    break bucle;
                }
            }

        }
    }

    clases.add(color);
};


const obtenerLocalStorage = (clave, defecto) => {
    if (process.client === false) return defecto;

    const valor = localStorage.getItem(clave);
    return valor? valor: defecto;
};


export const color = {
    namespaced: true,
    state: {
        color: "init"
    },
    mutations: {
        cambiarAModoOscuro (state) {
            let modoOscuro = obtenerLocalStorage("modo-color-oscuro", "color-oscuro");
            state.color = modoOscuro;
            localStorage.setItem("modo-color", modoOscuro);
            cambiarEsquemaColor(modoOscuro);
        },
        cambiarModoColor (state) {
            const colorActual = state.color;
            let modoOscuro = obtenerLocalStorage("modo-color-oscuro", "color-oscuro");
            if (modoOscuro.indexOf("color-") !== 0) {
                modoOscuro = "color-oscuro";
            }

            console.log(`${colorActual} -> ${modoOscuro}`);

            if (colorActual === "color-claro") {
                console.log(`Cambiando a oscuro...`);
                state.color = modoOscuro;
                localStorage.setItem("modo-color", modoOscuro);
                cambiarEsquemaColor(modoOscuro);
            } else {
                console.log(`Cambiando a claro...`);
                state.color = "color-claro";
                localStorage.setItem("modo-color", "color-claro");
                cambiarEsquemaColor("color-claro");
            }

        },
        iniciarModoColor (state) {
            const color = obtenerLocalStorage("modo-color", "color-oscuro");
            cambiarEsquemaColor(color);
            state.color = color;
        }
    },
    actions: {
        cambiarModoColorOscuro ({state, commit}, valor) {
            localStorage.setItem("modo-color-oscuro", valor);
            commit("cambiarAModoOscuro");
        },
    }
};


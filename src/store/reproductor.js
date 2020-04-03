
export const reproductor = {
    namespaced: true,
    state: {
        activo: false,
        episodios: [],
        epActual: {}
    },
    mutations: {
        activar (state) {
            state.activo = true;
        },
        desactivar (state) {
            state.activo = false;
        },
        setEpisodios (state, valor) {
            state.episodios = valor;
        },
        setEpActual (state, valor) {
            state.epActual = valor;
        }
    },
    actions: {
        cambiarEpActual({state, commit}, {num, esOva}) {
            const intervalo = setInterval(() => {
                if (state.episodios.length > 0) {
                    clearInterval(intervalo);

                    const eps = state.episodios;
                    const nuevoEpActual = eps.find(e => {
                        return (e.numero === num) && (e.es_ova === esOva)
                    });
                    commit("setEpActual", nuevoEpActual ? nuevoEpActual : {});
                }

            }, 100);
        }
    }
};


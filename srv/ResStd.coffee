export crearRespuesta = (resultado) =>
    exito: yes
    payload: resultado
    error: {}

export crearError = (ruta, razon) =>
    exito: no
    payload: {}
    error:
        ruta: ruta
        razon: razon

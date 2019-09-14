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

export error500 = (res, error, ruta) =>
    res.status(500).json crearError ruta, "Error al realizar " +
        "consulta.\n#{error.stack}"

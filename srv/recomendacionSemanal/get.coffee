con = require("../db").con
import { crearRespuesta, crearError } from "../ResStd"

export fun = (req, res) =>

    query = "SELECT * FROM recomendacion_semanal ORDER BY recomendacion_id DESC LIMIT 1"

    con.query query
        .then (respuesta) =>
            res.status(200).json crearRespuesta respuesta.rows[0]
        .catch (err) =>
            res.status(500).json (
                crearError (__dirname + "/get"), "Error al ejecutar consulta.\n#{err.stack}"
            )

#
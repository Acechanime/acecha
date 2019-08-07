con = require("../db").con
import { crearRespuesta, crearError } from "../ResStd"

export fun = (req, res) =>

    sql = "SELECT link_id, anime_id, num_ep, es_ova, nivel_prioridad, mega, okru, mango, mp4upload, rapidvideo
            FROM links WHERE mostrar_en_inicio=TRUE ORDER BY link_id DESC LIMIT 21;"

    con.query sql
        .then (respuesta) =>
            res.status(200).json crearRespuesta respuesta.rows
        .catch (error) =>
            res.status(500).json crearError (__dirname + "/get"), "Error al realizar " +
                "consulta.\n#{error.stack}"

#
con = require("../db").con
import { crearRespuesta, crearError } from "../ResStd"

export fun = (req, res) =>

    anime_id = req.query.anime_id
    legacy = if req.query.legacy? then yes else no
    if anime_id?

        sql =
            if legacy
                "SELECT link_id, es_ova, anime_id, num_ep, mega, okru, mango, mp4upload,
                    rapidvideo, mega_acortado, okru_acortado, mango_acortado, mp4upload_acortado
                    FROM links WHERE anime_id=$1 ORDER BY num_ep DESC"
            else "SELECT * FROM links WHERE anime_id=$1 ORDER BY num_ep ASC"
        datos = [anime_id]

        con.query sql, datos
        .then (respuesta) =>
            res.status(200).json crearRespuesta respuesta.rows
        .catch (error) =>
            res.status(500).json crearError (__dirname + "/get"), "Error al realizar " +
                "consulta.\n#{error.stack}"

    else
        res.status(400).json crearError "/episodios/get", "No se envió un anime_id."


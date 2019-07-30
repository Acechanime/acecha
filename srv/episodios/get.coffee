con = require("../db").con
import { crearRespuesta, crearError } from "../ResStd"

export fun = (req, res) =>
    anime_id = req.query.anime_id
    if anime_id?

        sql = "SELECT * FROM links WHERE anime_id=$1"
        datos = [anime_id]

        con.query sql, datos
            .then (respuesta) =>
                res.status(200).json crearRespuesta respuesta.rows
            .catch (error) =>
                res.status(500).json crearError (__dirname + "/get"), "Error al realizar " +
                    "consulta.\n#{error.stack}"

    else
        res.status(400).json crearError "/episodios/get", "No se envió un anime_id."


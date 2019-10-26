con = require("../db").con
import { crearRespuesta, crearError } from "../ResStd"

export fun = (req, res) =>

    link_id = req.body.anime_id

    if link_id?
        sql = "DELETE FROM links WHERE link_id=$1"
        datos = [link_id]

        con.query sql, datos
        .then () =>
            res.status(200) crearRespuesta {}
        .catch (error) =>
            res.status(500).json crearError (__dirname + "/get"), "Error al realizar " +
                "consulta.\n#{error.stack}"

    else
        res.status(400).json crearError "/api/episodio", "No se envió un link_id."


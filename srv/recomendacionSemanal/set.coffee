con = require("../db").con
import { crearRespuesta, crearError } from "../ResStd"
import { key } from "../key"

export fun = (req, res) =>

    keyUsuario = req.body.key
    if keyUsuario is key

        anime_id = req.body.anime_id
        hora = req.body.hora

        sql = "INSERT INTO recomendacion_semanal (anime_id, hora) VALUES ($1, $2)"
        datos = [anime_id, hora]

        con.query sql, datos
        .then () =>
            res.status(200).json crearRespuesta {}
        .catch (err) =>
            res.status(500).json (
                crearError (__dirname + "/get"), "Error al ejecutar consulta.\n#{err.stack}"
            )

    else
        res.status(403).json (
            crearError (__dirname + "/get"), "Error. La clave es inválida."
        )

#

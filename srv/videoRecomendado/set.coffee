con = require("../db").con
import { crearRespuesta, crearError } from "../ResStd"
import { key } from "../key"

export fun = (req, res) =>

    keyUsuario = req.body.key
    if keyUsuario is key

        url = req.body.url

        sql = "INSERT INTO video_recomendado (url) VALUES ($1)"
        datos = [url]

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

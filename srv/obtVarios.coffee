con = require("./db").con
import { crearRespuesta, crearError } from "./ResStd"

export fn = (req, res) =>

    query1 = "SELECT * FROM varios ORDER BY id DESC LIMIT 1"

    con.query query1
        .then (respuesta) =>
            res.status(200).json crearRespuesta respuesta.rows[0]
        .catch (err) =>
            res.status(500).json crearError "/obtVarios","Error al ejecutar consulta.\n#{err.stack}"


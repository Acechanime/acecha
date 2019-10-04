con = require("../db").con
import { crearError, error500 } from "../ResStd"

export fun = (req, res) =>

    if req.body.anime_id? and req.body.num_ep? and req.body.es_ova?

        sql = "INSERT INTO Links (anime_id, mega, rapidvideo, num_ep, mega_acortado, mango,
                mp4upload, okru, mango_acortado, okru_acortado, mp4upload_acortado, es_ova)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)"

        datos = [
            req.body.anime_id
            req.body.mega
            req.body.rapidvideo
            req.body.num_ep
            req.body.mega_acortado
            req.body.mango
            req.body.mp4upload
            req.body.okru
            req.body.mango_acortado
            req.body.okru_acortado
            req.body.mp4upload_acortado
            req.body.es_ova
        ]

        con.query sql, datos
        .then () =>
            res.status(200).json { exito: true }
        .catch (error) => error500 res, error, (__dirname + "/create")


    else
        res.status(400).json crearError "/legacy/obtenerEp",
            "No se enviaron los datos necesarios. (#{req.body.anime_id}," +
                 "#{req.body.num_ep}, #{req.body.es_ova})"

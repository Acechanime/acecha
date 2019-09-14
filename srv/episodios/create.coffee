con = require("../db").con
import { crearError, error500 } from "../ResStd"

export fun = (req, res) =>
    anime_id = req.body.animeID
    num_ep = req.body.numEp
    mega = req.body.mega
    rapidvideo= req.body.rapidvideo
    mega_acortado = req.body.acortado
    mango = req.body.mango
    mp4upload = req.body.mp4upload
    okru = req.body.okru
    okru_acortado = req.body.okruDescarga
    mango_acortado = req.body.mangoDescarga
    mp4upload_acortado = req.body.mp4uploadDescarga
    es_ova = req.body.esOva

    if anime_id? and num_ep? and es_ova?

        sql = "INSERT INTO Links (anime_id, mega, rapidvideo, num_ep, mega_acortado, mango,
                mp4upload, okru, mango_acortado, okru_acortado, mp4upload_acortado, es_ova)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)"
        datos = [anime_id, mega, rapidvideo, num_ep, mega_acortado, mango,
            mp4upload, okru, mango_acortado, okru_acortado, mp4upload_acortado, es_ova]

        con.query sql, datos
        .then (respuesta) =>
            res.status(200).json { exito: true }
        .catch (error) => error500 res, error, (__dirname + "/create")


    else
        res.status(400).json crearError "/legacy/obtenerEp",
            "No se enviaron los datos necesarios. (#{anime_id}, #{num_ep}, #{es_ova})"

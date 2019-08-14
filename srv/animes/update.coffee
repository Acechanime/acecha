con = require("../db").con
import { crearRespuesta, crearError } from "../ResStd"

export fun = (req, res) =>
    anime = req.body
    anime_id = req.params.anime_id

    if anime_id?

        sql = "UPDATE animes SET
            nombre=$1, ruta=$2, sinopsis=$3, generos=$4, episodios=$5, temporada=$6, anio=$7,
            estudio=$8, fuente=$9, emision=$10, culminacion=$11, mal=$12, en_emision=$13,
            img_portada=$14, img_fondo=$15, img_nuevo_ep=$16, num_temporada=$17,
            id_temporada_sig=$18, id_temporada_ant=$19, otros_nombres=$20 WHERE anime_id=$21"
        datos = [
            anime.nombre
            anime.ruta
            anime.sinopsis
            anime.generos
            anime.episodios
            anime.temporada
            anime.anio
            anime.estudio
            anime.fuente
            anime.emision
            anime.culminacion
            anime.mal
            anime.en_emision
            anime.img_portada
            anime.img_fondo
            anime.img_nuevoEp
            anime.num_temporada
            anime.id_temporada_sig
            anime.id_temporada_ant
            anime.otros_nombres
            anime.anime_id
        ]

        con.query sql, datos
        .then () =>
            res.status(200).json crearRespuesta {}
        .catch (err) =>
            res.status(500).json (
                crearError (__dirname + "/update"), "Error al ejecutar consulta.\n#{err.stack}"
            )
    else
        res.status(400).json (
            crearError (__dirname + "/update"), "No se envió un anime_id"
        )

#
con = require("../db").con
import { crearRespuesta, crearError } from "../ResStd"

export fun = (req, res) =>
    anime = req.body

    sql = "INSERT INTO animes
        (nombre, ruta, sinopsis, generos, episodios, temporada, anio, estudio, fuente, emision,
        culminacion, mal, en_emision, img_portada, img_fondo, img_nuevo_ep, num_temporada,
        id_temporada_sig, id_temporada_ant) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17, $18, $19)"
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
    ]

    con.query sql, datos
        .then (_) =>
            res.status(200).json crearRespuesta {}
        .catch (err) =>
            res.status(500).json (
                crearError (__dirname + "/create"), "Error al ejecutar consulta.\n#{err.stack}"
            )

#
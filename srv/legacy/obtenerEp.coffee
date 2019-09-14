con = require("../db").con
import { crearRespuesta, crearError, error500 } from "../ResStd"

buscarEp = (animeObj, numEp, esOva, res) =>
    anime_id = animeObj.anime_id
    respuestaJ =
        carpetaMega: animeObj.carpeta_mega
        imgFondo: animeObj.img_fondo
        nombre: animeObj.nombre
        numEp: numEp
        pagInicio: ".#{animeObj.ruta}"
        tieneEpAnterior: no
        tieneEpSiguiente: no

    sql = "SELECT * FROM links WHERE anime_id=$1 AND
            (num_ep=$2 OR num_ep=$3 OR num_ep=$4) AND es_ova=$5"
    datos = [anime_id, numEp, numEp - 1, numEp + 1, esOva]
    con.query sql, datos
    .then (respuesta) =>
        if respuesta.rows.length isnt 0
            for n, ep of respuesta.rows
                if ep.num_ep is numEp - 1
                    respuestaJ.tieneEpAnterior = yes
                else if ep.num_ep is numEp + 1
                    respuestaJ.tieneEpSiguiente = yes
                else if ep.num_ep is numEp
                    resPr =
                        linkAcortado: ep.mega_acortado
                        linkMp4Upload: ep.mp4upload
                        linkMp4UploadDescarga: ep.mp4upload_acortado
                        linkMango: ep.mango
                        linkMangoDescarga: ep.mango_acortado
                        linkMega: ep.mega
                        linkOkru: ep.okru
                        linkOkruDescarga: ep.okru_acortado
                        linkRapid: ep.rapidvideo
                    Object.assign respuestaJ, resPr
                null
            res.status(200).json
                exito: true
                payload: respuestaJ
        else
            res.status(400).json crearError (__dirname + "/obtenerEp"),
                "Error. El anime existe, pero no tiene el episodio."
    .catch (error) => error500 res, error, (__dirname + "/obtenerEp")

export fun = (req, res) =>
    nombreCorto = req.body.nombreCorto
    numEp = req.body.numEp
    esOva = req.body.esOva

    if nombreCorto? and numEp? and esOva?

        sql = "SELECT anime_id, carpeta_mega_acortada, img_fondo, nombre, ruta
            FROM animes WHERE upper(nombre_corto)=upper($1);"
        datos = [nombreCorto]

        con.query sql, datos
        .then (respuesta) =>
            unless respuesta.rows.length is 0
                animeObj = respuesta.rows[0]
                buscarEp animeObj, (parseInt numEp), esOva, res

            else
                res.status(400).json crearError (__dirname + "/get"),
                    "Error. El anime solicitado no existe."
        .catch (error) => error500 res, error, (__dirname + "/obtenerEp")

    else
        res.status(400).json crearError "/legacy/obtenerEp",
            "No se enviaron los datos necesarios. (#{nombreCorto}, #{numEp}, #{esOva})"


#
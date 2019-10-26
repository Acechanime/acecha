const express = require("express");
const cors = require("cors");

const sitiosCors = [
    "https://acechanime.com",
    "https://beta.acechanime.com",
    "http://localhost:8080",
    "http://localhost:8081",
];

const opcionesCors = {
    origin: (origin, callback) => {
        if (sitiosCors.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

const iniciarRutas = (app, ruta) => {

    app.use(cors(opcionesCors));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.post("/api/legacy/obtenerEp", require("./legacy/obtenerEp").fun);

    app.get("/api/animes", require("./animes/get").fun);
    app.post("/api/animes", require("./animes/create").fun);
    app.put("/api/animes/:anime_id", require("./animes/update").fun);

    app.get("/api/episodios", require("./episodios/get").fun);
    app.post("/api/episodios", require("./episodios/create").fun);

    app.delete("/api/episodio", require("./episodio/delete").fun);

    app.get("/api/episodiosRecientes", require("./episodiosRecientes/get").fun);

    app.get("/api/generos", require("./generos/get").fun);

    app.get("/api/videoRecomendado/", require("./videoRecomendado/get").fun);
    app.post("/api/videoRecomendado/", require("./videoRecomendado/set").fun);

    app.get("/api/recomendacionSemanal/", require("./recomendacionSemanal/get").fun);
    app.post("/api/recomendacionSemanal/", require("./recomendacionSemanal/set").fun);

};

module.exports = (app, http) => {
    iniciarRutas(app, __dirname);
};

module.exports.iniciarRutas = iniciarRutas;
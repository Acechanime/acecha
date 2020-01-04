const express = require("express");
const cors = require("cors");

const sitiosCors = [
    "https://acechanime.com",
    "https://beta.acechanime.com",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://192.168.0.4:8080",
    "90.165.186.93",
    "179.7.224.119",
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

    app.get("/", (req, res) => {
        res.send("<h1>Bienvenido a la API de acechanime. " +
            "Si no sabes qué hacer, no deberias estar aqui v:</h1>");
    });

    app.post("/legacy/obtenerEp", require("./legacy/obtenerEp").fun);

    app.get("/animes", require("./animes/get").fun);
    app.post("/animes", require("./animes/create").fun);
    app.put("/animes/:anime_id", require("./animes/update").fun);

    app.get("/episodios", require("./episodios/get").fun);
    app.post("/episodios", require("./episodios/create").fun);

    app.delete("/episodio", require("./episodio/delete").fun);
    app.put("/episodio", require("./episodio/update").fun);

    app.get("/episodiosRecientes", require("./episodiosRecientes/get").fun);

    app.get("/generos", require("./generos/get").fun);

    app.get("/videoRecomendado", require("./videoRecomendado/get").fun);
    app.post("/videoRecomendado", require("./videoRecomendado/set").fun);

    app.get("/recomendacionSemanal", require("./recomendacionSemanal/get").fun);
    app.post("/recomendacionSemanal", require("./recomendacionSemanal/set").fun);
    app.post("/animeinfo", require("./animelist/scrapper.js"));
    app.post("/usuario/registrar", require("./usuario/registrar").fun);
    app.post("/usuario/login", require("./usuario/login").fun);
    app.post("/usuario/estadoEpisodio", require("./usuario/estadoEpisodio").fun);
};

module.exports = (app, http) => {
    iniciarRutas(app, __dirname);
};

module.exports.iniciarRutas = iniciarRutas;

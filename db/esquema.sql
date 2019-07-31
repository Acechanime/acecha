CREATE TABLE IF NOT EXISTS animes (
    anime_id SERIAL PRIMARY KEY,
    nombre TEXT,
    ruta TEXT,
    sinopsis TEXT,
    generos INTEGER ARRAY,
    episodios SMALLINT,
    temporada TEXT,
    anio SMALLINT,
    estudio TEXT,
    fuente TEXT,
    emision TEXT,
    culminacion TEXT,
    mal TEXT,
    en_emision BOOLEAN,
    img_portada TEXT, /* Ruta en la aplicacion */
    img_fondo TEXT,
    img_nuevo_ep TEXT,
    num_temporada SMALLINT,
    id_temporada_sig INTEGER, /* Apunta a la sig. temp. */
    id_temporada_ant INTEGER, /* Apunta a la temp. ant. */

    carpeta_mega TEXT
);

CREATE TABLE IF NOT EXISTS nombres_alternativos (
    nombre_id SERIAL PRIMARY KEY,
    anime_id INTEGER,
    nombre TEXT
);

CREATE TABLE IF NOT EXISTS generos (
    genero_id SERIAL PRIMARY KEY,
    nombre TEXT,
    icono TEXT
);

CREATE TABLE IF NOT EXISTS imagenes (
    img_id SERIAL PRIMARY KEY,
    ruta TEXT,
    nombre TEXT
);

CREATE TABLE IF NOT EXISTS recomendacion_semanal (
    recomendacion_id SERIAL PRIMARY KEY,
    anime_id INTEGER,
    hora BIGINT
);

CREATE TABLE IF NOT EXISTS video_recomendado (
    video_recomendado_id SERIAL PRIMARY KEY,
    url TEXT
);

/* Links de los episodios */
CREATE TABLE IF NOT EXISTS links (
    link_id SERIAL PRIMARY KEY,
    anime_id INT,
    numEp INT,
    es_ova BOOLEAN,

    mega TEXT,
    mega_acortado TEXT,
    rapidvideo TEXT,
    mango TEXT,
    mango_acortado TEXT,
    mp4upload TEXT,
    mp4upload_acortado TEXT,
    okru TEXT,
    okru_acortado TEXT,

    mostrar_en_inicio BOOLEAN NOT NULL DEFAULT FALSE,
    nivel_prioridad SMALLINT NOT NULL DEFAULT 0
);



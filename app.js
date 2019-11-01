const iniciarRutas = require("./srv/index").iniciarRutas;

const cluster = require('cluster'),
      numCPUs = require('os').cpus().length,
      fs = require("fs"),
      http = require("http"),
      // https = require("https"),
      express = require("express");

/*
const clavePrivada = fs.readFileSync("./ssl/private.key", "utf-8").toString();
const certificado  = fs.readFileSync("./ssl/certificate.crt", "utf-8").toString();

const credenciales = {key: clavePrivada, cert: certificado};


 */

if (cluster.isMaster) {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // TODO: Log error data.
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log(`Starting a new cluster...`);
        cluster.fork();
    });

} else {
    const app = express();
    // El servidor sera exclusivo de API
    // app.use(express.static("./dist/"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));



    iniciarRutas(app, __dirname);

    const serverHttp = http.createServer(app);
    // const serverHttps = https.createServer(credenciales, app);

    // Desactivado porque cloudflare redirige a https
    serverHttp.listen(5000);
    // serverHttps.listen(443);
    console.log(`Process ${process.pid} active!`);

}

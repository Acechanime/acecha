const iniciarRutas = require("./srv/index").iniciarRutas;

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const express = require("express");

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const app = express();
    app.use(express.static("./dist/"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    iniciarRutas(app, __dirname);

    app.listen(3000);

    console.log(`Worker ${process.pid} started`);
}

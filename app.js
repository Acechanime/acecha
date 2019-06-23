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

    const extraerPrimer = url => {
        const p1 = url.substr(1);
        const sigSlash = p1.search("/");
        return (() => {
            if (sigSlash === -1) return p1;
            else return p1.substring(0, sigSlash);
        })();
        // const p2 = p1.charAt(p1.length - 1) === "/"? p1.substring(0, p1.search("/")): p1;

    };

    app.use((req, res, next) => {
        const path = req.path;
        const pathFixed = extraerPrimer(path);

        const urls = ["api", "css", "img", "js", "static"];

        const resultado = urls.filter(x => x === pathFixed);
        if (resultado.length > 0) {
            next();
        } else {
            res.sendFile(__dirname + "/dist/index.html");
        }
    });

    app.listen(3000);

    console.log(`Worker ${process.pid} started`);
}

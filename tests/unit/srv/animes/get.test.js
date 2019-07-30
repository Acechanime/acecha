const request = require("supertest");
const srv = request("http://localhost:3000");

/*
* TEST CASES
* */

// Solicitud GET con header Accept incorrecto
describe("Testear solicitud GET a /api/animes", () => {
    it("Debería responder con 200 a un GET.", done => {
        srv.get("/api/animes")
            .set("Accept", "text/html")
            .expect(400, done);
    });
});

// Solicitut GET con header Accept correcto
describe("Testear solicitud GET a /api/animes", () => {
    it("Debería responder con 200 a un GET.", done => {
        srv.get("/api/animes")
            .set("Accept", "application/json")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200, done);
    });
});

const { Client } = require("pg");

const client = new Client({
    user: 'araozu',
    host: 'localhost',
    database: 'acecha',
    password: 'xsakah4b',
    port: 5432,
});
client.connect();

module.exports.con = client;
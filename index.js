const { connectToMongoDB } = require('./db/mongoClient');
const { findUsers } = require('./service/users');
const log = require('./lib/log');
const express = require('express');
const dotenv = require("dotenv")
dotenv.config()

const app = express();

connectToMongoDB().then((db) => log.info(`Connected to database ${db.databaseName}`));

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.get('/users', async (req, res) => {
  log.info('getting users');
  findUsers().then((users) => res.send(users));
});

app.listen(Number(process.env.PORT), () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
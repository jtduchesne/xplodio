"use strict";

const { connectDb, disconnectDb } = require("./database");

const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res) => {
  res.status(404).end();
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDb().catch(console.log);
});

function gracefulShutdown(e) {
  if (server.listening) {
    disconnectDb()
      .then(() => server.close())
      .catch(console.log);
  }
}
['beforeExit','SIGINT','SIGTERM','SIGHUP'].forEach((event) => {
  process.on(event, gracefulShutdown);
});

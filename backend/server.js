"use strict";

const express = require("express");
const app = express();

app.use(express.json());

//-------------------------------------------------------------------//

const {
  UsersController,
  ArtistsController,
} = require("./controllers");

app.use(new UsersController);
app.use(new ArtistsController);

app.use((req, res) => {
  res.status(404).end();
});

//-------------------------------------------------------------------//

const { connectDb, disconnectDb } = require("./database");

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

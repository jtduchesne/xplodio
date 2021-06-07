"use strict";

const express = require("express");

const server = express();

server.use(express.json())

server.use((req, res) => {
  res.status(404).end();
});

server.listen(8000, () => console.log(`Listening on port ${server.address().port}`));

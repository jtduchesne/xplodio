"use strict";

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require('path');
app.use('/files', express.static(path.join(__dirname, 'files')));

//-------------------------------------------------------------------//

const {
  UsersController,
  ArtistsController,
  SongsController,
  TracksController,
} = require("./controllers");

app.use(new UsersController);
app.use(new ArtistsController({with: SongsController}));
app.use(new SongsController({with: TracksController}));
app.use(new TracksController);

// app.route('/').get((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write('<form action="tracks" method="post" enctype="multipart/form-data">');
//   res.write('<input type="text" name="name"><br>');
//   res.write('<input type="file" name="fileToUpload"><br>');
//   res.write('<input type="submit">');
//   res.write('</form>');
//   return res.end();
// });

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

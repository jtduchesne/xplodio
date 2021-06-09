const { Router } = require("express");

const Song = require("../models/Song");

class SongsController {
  constructor(opts) {
    let router = Router(opts);

    router.param('slug', this.setSong);

    router.route("/songs")
      .get(this.index)
      .post(this.create)
      .all((req, res) => res.set('Allow', "GET,POST").sendStatus(405));
    router.route("/song/:slug")
      .get(this.show)
      .put(this.update)
      .patch(this.update)
      .delete(this.destroy)
      .all((req, res) => res.set('Allow', "GET,PUT,PATCH,DELETE").sendStatus(405));

    return router;
  }

  // --------------------------------------------------------------- //

  index(req, res) {
    Song.find(req.artist ? { artist: req.artist } : {}).exec((err, songs) => {
      if (err) console.log(err);
      res.status(200).send({
        status: 200,
        data: songs
      });
    });
  }

  show(req, res) {
    res.status(200).send({
      status: 200,
      data: req.song
    });
  }

  create(req, res) {
    new Song({
      artist: req.artist._id,
      ...req.body,
    }).save(req.body, (err, song) => {
      if (song) {
        res.status(201).send({
          status: 201,
          data: song
        });
      } else if (err) {
        res.status(422).send({
          status: 422, errors: err.errors
        });
      } else
        res.sendStatus(400);
    });
  }

  update(req, res) {
    req.song.set(req.body).save((err, song) => {
      if (song) {
        res.status(200).send({
          status: 200,
          data: song
        });
      } else if (err) {
        res.status(422).send({
          status: 422, errors: err.errors
        });
      } else
        res.sendStatus(400);
    });
  }

  destroy(req, res) {
    req.song.remove((err, song) => {
      if (song) {
        res.status(204).end();
      } else if (err) {
        res.status(400).send({
          status: 400, errors: err.errors
        });
      } else
        res.sendStatus(400);
    });
  }

  // --------------------------------------------------------------- //

  setSong(req, res, next, slug) {
    Song.findOne({ slug }).exec((err, song) => {
      if (err) console.log(err);
      if (song) {
        req.song = song;
        next();
      } else {
        res.status(404).send({
          status: 404,
          data: { slug },
          message: "Not Found"
        });
      }
    });
  }
}

module.exports = SongsController;

const { Router } = require("express");

const Artist = require("../models/Artist");

class ArtistsController {
  constructor(opts) {
    let router = Router(opts);

    router.param('slug', this.setArtist);

    router.route("/artists")
      .get(this.index)
      .post(this.create)
      .all((req, res) => res.set('Allow', "GET,POST").sendStatus(405));
    router.route("/artist/:slug")
      .get(this.show)
      .put(this.update)
      .patch(this.update)
      .delete(this.destroy)
      .all((req, res) => res.set('Allow', "GET,PUT,PATCH,DELETE").sendStatus(405));

    return router;
  }

  // --------------------------------------------------------------- //

  index(req, res) {
    Artist.find({}).exec((err, artists) => {
      if (err) console.log(err);
      res.status(200).send({
        status: 200,
        data: artists
      });
    });
  }

  show(req, res) {
    res.status(200).send({
      status: 200,
      data: req.artist
    });
  }

  create(req, res) {
    new Artist({
      ...req.body,
    }).save((err, artist) => {
      if (artist) {
        res.status(201).send({
          status: 201,
          data: artist
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
    req.artist.set(req.body).save((err, artist) => {
      if (artist) {
        res.status(200).send({
          status: 200,
          data: artist
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
    req.artist.remove((err, artist) => {
      if (artist) {
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

  setArtist(req, res, next, slug) {
    Artist.findOne({ slug }).exec((err, artist) => {
      if (err) console.log(err);
      if (artist) {
        req.artist = artist;
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

module.exports = ArtistsController;

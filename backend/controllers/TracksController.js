const { Router } = require("express");
const Busboy = require("busboy");
const fs = require('fs');
const path = require('path');

const Track = require("../models/Track");

class TracksController {
  constructor(opts) {
    let router = Router(opts);

    router.param('id', this.setTrack);

    router.route("/tracks")
      .get(this.index)
      .post(this.create)
      .all((req, res) => res.set('Allow', "GET,POST").sendStatus(405));
    router.route("/track/:id")
      .get(this.show)
      .put(this.update)
      .patch(this.update)
      .delete(this.destroy)
      .all((req, res) => res.set('Allow', "GET,PUT,PATCH,DELETE").sendStatus(405));

    return router;
  }

  // --------------------------------------------------------------- //

  index(req, res) {
    if (req.song) {
      res.status(200).send({
        status: 200,
        data: req.song.tracks
      });
    } else {
      Track.find({}, (err, tracks) => {
        if (err) console.log(err);
        res.status(200).send({
          status: 200,
          data: tracks
        });
      });
    }
  }

  show(req, res) {
    res.status(200).send({
      status: 200,
      data: req.track
    });
  }

  create(req, res) {
    new Track({
      ...req.body,
    }).save((err, track) => {
      if (track) {
        res.status(201).send({
          status: 201,
          data: track
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
    req.track['name'] = req.body['name'];

    req.track.save((err, track) => {
      if (track) {
        res.status(200).send({
          status: 200,
          data: track
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
    req.track.remove((err, track) => {
      if (track) {
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

  setTrack(req, res, next, id) {
    Track.findById(id).exec((err, track) => {
      if (err) console.log(err);
      if (track) {
        req.track = track;
        next();
      } else {
        res.status(404).send({
          status: 404,
          data: {_id: id},
          message: "Not Found"
        });
      }
    });
  }
}

module.exports = TracksController;

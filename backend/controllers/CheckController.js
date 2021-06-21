const { Router } = require("express");

const {
  Artist,
  Song,
} = require("../models");

class CheckController {
  constructor(opts) {
    let router = Router(opts);

    router.route("/check/artist/:slug([A-Za-z0-9][A-Za-z0-9-]{2,})")
      .get(this.checkArtist)
      .all((req, res) => res.set('Allow', "GET").sendStatus(405));
    router.route("/check/song/:slug([A-Za-z0-9][A-Za-z0-9-]{2,})")
      .get(this.checkSong)
      .all((req, res) => res.set('Allow', "GET").sendStatus(405));

    return router;
  }

  // --------------------------------------------------------------- //

  checkArtist(req, res) {
    let slug = req.params.slug;
    Artist.findOne({ slug }).exec((err, artist) => {
      res.status(200).send({
        status: 200,
        data: { exists: !!artist }
      });
    });
  }

  checkSong(req, res) {
    let slug = req.params.slug;
    Song.findOne({ slug }).exec((err, song) => {
      res.status(200).send({
        status: 200,
        data: { exists: !!song }
      });
    });
  }
}

module.exports = CheckController;

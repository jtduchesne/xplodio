const { Router } = require("express");

const Image = require("../models/Image");

class ImagesController {
  constructor(opts) {
    let router = Router(opts);

    router.param('id', this.setImage);

    router.route("/images")
      .get(this.index)
      .post(this.create)
      .all((req, res) => res.set('Allow', "GET,POST").sendStatus(405));
    router.route("/image/:id")
      .get(this.show)
      .delete(this.destroy)
      .all((req, res) => res.set('Allow', "GET,DELETE").sendStatus(405));

    return router;
  }

  // --------------------------------------------------------------- //

  index(req, res) {
    Image.find({}, (err, images) => {
      if (err) console.log(err);
      res.status(200).send({
        status: 200,
        data: images
      });
    });
  }

  show(req, res) {
    res.status(200).send({
      status: 200,
      data: req.image
    });
  }

  create(req, res) {
    new Image({
      ...req.body
    }).save((err, image) => {
      if (image) {
        res.status(201).send({
          status: 201,
          data: image
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
    req.image.remove((err, image) => {
      if (image) {
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

  setImage(req, res, next, id) {
    Image.findById(id).exec((err, image) => {
      if (err) console.log(err);
      if (image) {
        req.image = image;
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

module.exports = ImagesController;

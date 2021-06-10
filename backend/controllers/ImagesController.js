const { Router } = require("express");
const Busboy = require("busboy");
const fs = require('fs');
const path = require('path');

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
    let newImage = new Image();

    let busboy = new Busboy({ headers: req.headers });

    busboy.on('field', (fieldname, value) => {
      newImage[fieldname] = value;
    });
    busboy.on('file', (fieldname, file, filename) => {
      let ext = path.extname(filename);
      let basename = path.basename(filename, ext);

      let filepath = path.join(
        "files",
        req.song['slug'],
        `${basename}-${Date.now()}${ext}`
      );

      newImage['url'] = filepath;
      newImage['filePath'] = path.resolve(filepath);
      file.on('data', (data) => {
        newImage['fileSize'] = data.length;
      });

      file.pipe(fs.createWriteStream(newTrack['filePath']));
    });
    busboy.on('finish', () => {
      newImage.save((err, image) => {
        if (track) {
          res.status(201).set('Connection', 'close').send({
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
    });
    req.pipe(busboy);
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

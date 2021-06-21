const { Router } = require("express");
const Busboy = require("busboy");
const fs = require('fs');
const path = require('path');

const Upload = require("../models/Upload");

class UploadsController {
  constructor(opts) {
    let router = Router(opts);

    router.param('id', this.setUpload);

    router.route("/uploads")
      .get(this.index)
      .post(this.create)
      .all((req, res) => res.set('Allow', "GET,POST").sendStatus(405));
    router.route("/upload/:id")
      .get(this.show)
      .delete(this.destroy)
      .all((req, res) => res.set('Allow', "GET,DELETE").sendStatus(405));

    return router;
  }

  // --------------------------------------------------------------- //

  index(req, res) {
    Upload.find({}, (err, uploads) => {
      if (err) console.log(err);
      res.status(200).send({
        status: 200,
        data: uploads
      });
    });
  }

  show(req, res) {
    res.status(200).send({
      status: 200,
      data: req.upload
    });
  }

  create(req, res) {
    let newUpload = new Upload();

    let busboy = new Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      let ext = path.extname(filename);
      let basename = path.basename(filename, ext);

      let filepath = path.join(
        "files",
        `${basename.replace(/[^A-Za-z0-9_-]/g, "")}-${Date.now()}${ext}`
      );

      newUpload['url'] = "/"+filepath;
      newUpload['contentType'] = mimetype;
      newUpload['filePath'] = path.resolve(filepath);
      file.on('data', (data) => {
        newUpload['fileSize'] = data.length;
      });

      file.pipe(fs.createWriteStream(newUpload['filePath']));
    });
    busboy.on('finish', () => {
      newUpload.save((err, upload) => {
        if (upload) {
          res.status(201).set('Connection', 'close').send({
            status: 201,
            data: upload
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
    req.upload.remove((err, upload) => {
      if (upload) {
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

  setUpload(req, res, next, id) {
    Upload.findById(id).exec((err, upload) => {
      if (err) console.log(err);
      if (upload) {
        req.upload = upload;
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

module.exports = UploadsController;

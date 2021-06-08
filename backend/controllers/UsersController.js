const { Router } = require("express");

const User = require("../models/User");

class UsersController {
  constructor(opts) {
    let router = Router(opts);

    router.param('id', this.setUser);

    router.route("/users")
      .get(this.index)
      .post(this.create)
      .all((req, res) => res.set('Allow', "GET,POST").sendStatus(405));
    router.route("/user/:id")
      .get(this.show)
      .put(this.update)
      .patch(this.update)
      .delete(this.destroy)
      .all((req, res) => res.set('Allow', "GET,PUT,PATCH,DELETE").sendStatus(405));

    return router;
  }

  // --------------------------------------------------------------- //

  index(req, res) {
    User.find({}).exec((err, users) => {
      if (err) console.log(err);
      res.status(200).send({
        status: 200,
        data: users
      });
    });
  }

  show(req, res) {
    res.status(200).send({
      status: 200,
      data: req.user
    });
  }

  create(req, res) {
    User.create(req.body, (err, user) => {
      if (user) {
        res.status(201).send({
          status: 201,
          data: user
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
    req.user['name'] = req.body['name'];
    req.user['photoUrl'] = req.body['photoUrl'];

    req.user.save((err, user) => {
      if (user) {
        res.status(200).send({
          status: 200,
          data: user
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
    req.user.remove((err, user) => {
      if (user) {
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

  setUser(req, res, next, id) {
    User.findById(id).exec((err, user) => {
      if (err) console.log(err);
      if (user) {
        req.user = user;
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

module.exports = UsersController;

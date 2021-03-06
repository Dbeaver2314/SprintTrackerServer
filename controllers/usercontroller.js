const express = require("express");
const router = express.Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// signup

router.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    userType: req.body.userType,
    team: req.body.team
  }).then(
    (createSuccess = user => {
      //   console.log(process.env.JWT_SECRET);
      let token = jwt.sign(
        {
          id: user.id
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 }
      );
      res.json({
        user: user,
        message: "user created",
        sessionToken: token
      });
    }),
    (createError = err => res.send(500, err))
  );
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(
    user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign(
              {
                id: user.id
              },
              process.env.JWT_SECRET,
              { expiresIn: 60 * 60 * 24 }
            );
            res.json({
              user: user,
              message: "user successfully signedin",
              sessionToken: token
            });
          } else {
            res.status(502).send({ error: "bad gateway" });
          }
        });
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    err => res.status(501).send({ error: "failed to process" })
  );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Teams = require("../db").import("../models/teams");
const validateSession = require("../middleware/validate-session");

router.post("/add", (req, res) => {
  const addTeam = {
    teamName: req.body.teamName,
    username: req.body.username
  };
  Teams.create(addTeam)
    .then(team => res.status(200).json(team))
    .catch(err =>
      res.json({
        error: err
      })
    );
});

router.get("/", (req, res) => {
  Teams.findAll()
    .then(log => res.status(200).json(log))
    .catch(err =>
      res.json({
        error: err
      })
    );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const backlog = require("../db").import("../models/backlog");

router.post("/add", (req, res) => {
  const addLog = {
    item: req.body.item,
    description: req.body.description,
    status: req.body.status,
    workingUser: req.body.user,
    userId: req.user.id,
    team: req.user.team
  };
  backlog
    .create(addLog)
    .then(log => res.status(200).json(log))
    .catch(err =>
      res.json({
        error: err
      })
    );
});

router.get("/", (req, res) => {
  backlog
    .findAll({
      where: { team: req.user.team }
    })
    .then(log => res.status(200).json(log))
    .catch(err =>
      res.json({
        error: err
      })
    );
});

router.delete("/:id", (req, res) => {
  backlog
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(log => res.status(200).json(log))
    .catch(err =>
      res.json({
        error: err
      })
    );
});

router.put("/:id", (req, res) => {
  backlog
    .update(req.body, { where: { id: req.params.id } })
    .then(log => res.status(200).json(log))
    .catch(err => res.json({ error: err }));
});

module.exports = router;

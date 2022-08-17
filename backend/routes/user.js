const router = require("express").Router();
let User = require("../models/user/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => {
      res.json("User Added!");
    })
    .catch((err) => res.status(400).json("Error " + err));
});

//Get by username
router.route("/:username").post((req, res) => {
  const username = req.params.username;
  User.findOne({ username: username })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error " + err));
});

//Update by username
router.route("/update/:username").post((req, res) => {
  const username = req.params.username;
  User.findOne({ username: username })
    .then((user) => {
      user.username = req.body.username;

      user
        .save()
        .then(() => {
          res.json("User Updated!");
        })
        .catch((err) => res.status(400).json("Error " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
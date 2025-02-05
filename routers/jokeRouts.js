const express = require("express");
const jokeController = require("../controllers/jokeController");

const router = express.Router();

router.route("/").get(jokeController.getJoke);

module.exports = router;

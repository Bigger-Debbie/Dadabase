const express = require("express");
const jokeController = require("../controllers/jokeController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(jokeController.getJokeByTag, jokeController.getRandomJoke)
  .post(authController.protect, jokeController.createJoke);

module.exports = router;

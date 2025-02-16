const express = require("express");
const jokeController = require("../controllers/jokeController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", jokeController.getJokeByTag, jokeController.getRandomJoke);

router.use(authController.protect);
router.use(authController.restrictedTo("user", "admin"));
router.post("/submit", jokeController.submitJoke);

router.use(authController.restrictedTo("admin"));
router.post("/", jokeController.createJoke);
router.route("/review").get(jokeController.reviewJokes);

module.exports = router;

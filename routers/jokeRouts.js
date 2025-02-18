const express = require("express");
const jokeController = require("../controllers/jokeController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", jokeController.getJokeByTag, jokeController.getRandomJoke);
router.get("/dailyjoke", jokeController.getDailyJoke);

router.use(authController.protect);
router.use(authController.restrictedTo("user", "admin"));
router.post("/submit", jokeController.submitJoke);

router.use(authController.restrictedTo("admin"));
router.post("/", jokeController.createJoke);

router
  .route("/:id")
  .patch(jokeController.updateJoke)
  .delete(jokeController.deleteJoke);
router
  .route("/review")
  .get(jokeController.reviewJokes)
  .patch(jokeController.acceptJoke);

module.exports = router;

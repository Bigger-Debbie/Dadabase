const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = new express.Router();

router.get("/", authController.isLoggedIn, viewController.getHome);
router.get("/login", viewController.getLogin);

module.exports = router;

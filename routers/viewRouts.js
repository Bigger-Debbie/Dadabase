const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = new express.Router();

router.get("/", authController.isLoggedIn, viewController.getHome);
router.get("/login", viewController.login);
router.get("/signup", viewController.signUp);
router.get("/resetpassword/:token", viewController.resetPassword);
router.get("/verify/:verificationNum/:email", viewController.verify);

module.exports = router;

const express = require("express");
const viewController = require("../controllers/viewController");

const router = new express.Router();

router.get("/", viewController.getHome);
router.get("/login", viewController.getLogin);

module.exports = router;

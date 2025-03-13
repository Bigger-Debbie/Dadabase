const catchAsync = require("../utils/catchAsync");

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render("home", {
    page: req.url,
    title: "Home",
    user: "Alex",
  });
});

exports.getLogin = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    page: req.url,
    title: "Login",
  });
});

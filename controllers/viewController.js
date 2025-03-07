const catchAsync = require("../utils/catchAsync");

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render("home", {
    title: "Home",
    user: "Alex",
  });
});

exports.getLogin = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
});

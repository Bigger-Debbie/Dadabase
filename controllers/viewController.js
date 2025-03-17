const catchAsync = require("../utils/catchAsync");

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render("home", {
    page: req.url,
    title: "Home",
  });
});

exports.login = (req, res, next) => {
  res.status(200).render("login", {
    page: req.url,
    title: "Login",
  });
};

exports.signUp = (req, res, next) => {
  res.status(200).render("signup", {
    title: "Sign Up",
  });
};

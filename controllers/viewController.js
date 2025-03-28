const catchAsync = require("../utils/catchAsync");
const authController = require("./authController");

exports.getHome = (req, res, next) => {
  res.status(200).render("home", {
    page: req.url,
    title: "Home",
  });
};

exports.login = (req, res, next) => {
  res.status(200).render("login", {
    page: req.url,
    title: "Login",
  });
};

exports.signUp = (req, res, next) => {
  res.status(200).render("signup", {
    page: req.url,
    title: "Sign Up",
  });
};

exports.verify = (req, res, next) => {};

exports.resetPassword = catchAsync(async (req, res, next) => {
  const token = req.params.token;
  console.log(token);
  const user = await authController.checkToken(token);

  if (user) {
    res.status(200).render("reset", {
      page: req.url,
      title: "Password Reset",
      token,
    });
  } else {
    res.status(200).render("home", {
      page: req.url,
      title: "Home",
    });
  }
});

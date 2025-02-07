const express = require("express");
const jokeRouter = require("./routers/jokeRouts");
const userRouter = require("./routers/userRouts");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/jokes", jokeRouter);
app.use("/api/user/", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

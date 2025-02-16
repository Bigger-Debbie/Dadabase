const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const jokeRouter = require("./routers/jokeRouts");
const userRouter = require("./routers/userRouts");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use("/api/joke/", jokeRouter);
app.use("/api/user/", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

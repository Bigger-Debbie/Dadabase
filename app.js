const express = require("express");
const jokeRouter = require("./routers/jokeRouts");
const userRouter = require("./routers/userRouts");

const app = express();

app.use(express.json());
app.use("/api/jokes", jokeRouter);
app.use("/api/user/", userRouter);

module.exports = app;

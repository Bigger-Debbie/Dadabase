const express = require("express");
const jokeRouter = require("./routers/jokeRouts");

const app = express();

app.use("/api/jokes", jokeRouter);

module.exports = app;

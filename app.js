const express = require("express");
const jokeRouter = require("./routers/jokeRouts");

const app = express();

app.use(express.json());
app.use("/api/jokes", jokeRouter);

module.exports = app;

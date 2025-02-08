const Joke = require("../models/jokeModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getRandomJoke = catchAsync(async (req, res, next) => {
  const count = await Joke.countDocuments();
  const random = Math.floor(Math.random() * count);
  const randomJoke = await Joke.findOne().skip(random).populate({
    path: "dad",
    select: "name email",
  });

  res.status(200).json({
    status: "success",
    joke: randomJoke,
  });
});

exports.getJokeByTag = catchAsync(async (req, res, next) => {
  if (!req.query.tags) return next();
  const tags = req.query.tags.split(",");
  const jokes = await Joke.find({ tags: { $in: tags } });

  res.status(201).json({
    status: "success",
    jokes,
  });
});

exports.createJoke = catchAsync(async (req, res, next) => {
  let joke = await Joke.create({
    joke: req.body.joke,
    dad: req.user._id,
    tags: req.body.tags,
  });

  joke = await Joke.findById(joke._id);

  res.status(201).json({
    status: "success",
    joke,
  });
});

const Joke = require("../models/jokeModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getRandomJoke = catchAsync(async (req, res, next) => {
  const randomJokeArray = await Joke.aggregate([{ $sample: { size: 1 } }]);
  const randomJoke = randomJokeArray.length > 0 ? randomJokeArray[0] : null;

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

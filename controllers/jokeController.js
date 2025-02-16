const Joke = require("../models/jokeModel");
const catchAsync = require("../utils/catchAsync");

const createJokeHelper = async (jokeText, userId, tags, status) => {
  let joke = await Joke.create({
    joke: jokeText,
    dad: userId,
    tags: tags,
    status: status,
  });

  return Joke.findById(joke._id);
};

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
  const joke = await createJokeHelper(
    req.body.joke,
    req.user._id,
    req.body.tags,
    "accepted"
  );

  res.status(201).json({
    status: "success",
    joke,
  });
});

exports.submitJoke = catchAsync(async (req, res, next) => {
  const joke = await createJokeHelper(
    req.body.joke,
    req.user._id,
    req.body.tags,
    "review"
  );

  res.status(201).json({
    status: "success",
    joke,
  });
});

exports.reviewJokes = catchAsync(async (req, res, next) => {
  const reviewJokes = await Joke.find({ status: "review" });

  res.status(201).json({
    status: "success",
    reviewJokes,
  });
});

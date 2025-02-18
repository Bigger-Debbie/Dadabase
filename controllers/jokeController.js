const Joke = require("../models/jokeModel");
const AppError = require("../utils/appError");
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
  const count = await Joke.countDocuments({ status: "accepted" });
  const random = Math.floor(Math.random() * count);
  const randomJoke = await Joke.findOne({ status: "accepted" })
    .skip(random)
    .populate({
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
  if (!reviewJokes || reviewJokes.length === 0)
    return next(new AppError("No jokes to review", 404));

  res.status(200).json({
    status: "success",
    reviewJokes,
  });
});

exports.acceptJoke = catchAsync(async (req, res, next) => {
  let joke = await Joke.findById(req.body.jokeId);
  const tags = req.body.tags;

  if (!joke) return next(new AppError("Please enter joke ID"));

  if (joke.status === accepted)
    return next(
      new AppError(
        "Joke is already accepted. To updated tags please use /api/joke/udate"
      )
    );

  if (!Array.isArray(tags) || tags.length === 0)
    return next(new AppError("Please enter an array of tags"));

  await joke.updateOne({
    tags: tags,
    status: "accepted",
  });

  joke = await Joke.findById(req.body.jokeId);

  res.status(200).json({
    status: "success",
    joke,
  });
});

exports.updateJoke = catchAsync(async (req, res, next) => {
  const jokeId = req.params.id;
  const updatedJoke = await Joke.findByIdAndUpdate(jokeId, req.body, {
    new: true,
  });

  if (!updatedJoke) return next(new AppError("Joke not found"), 404);

  res.status(200).json({
    status: "success",
    joke: updatedJoke,
  });
});

exports.deleteJoke = catchAsync(async (req, res, next) => {
  const jokeId = req.params.id;
  const updatedJoke = await Joke.findByIdAndDelete(jokeId);

  if (!updatedJoke) return next(new AppError("Joke not found"), 404);

  res.status(204).json({
    status: "success",
  });
});

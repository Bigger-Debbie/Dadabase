const Joke = require("../models/jokeModel");

exports.getJoke = async (req, res, next) => {
  const randomJoke = await Joke.aggregate([{ $sample: { size: 1 } }])[0];

  res.status(200).json({
    status: "success",
    joke: randomJoke,
  });
};

exports.createJoke = async (req, res, next) => {
  try {
    const joke = await Joke.create(req.body);

    res.status(201).json({
      status: "success",
      joke,
    });
  } catch (error) {
    console.log("Validation error:", error);

    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

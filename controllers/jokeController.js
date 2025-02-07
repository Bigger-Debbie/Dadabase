const Joke = require("../models/jokeModel");

exports.getRandomJoke = async (req, res, next) => {
  const randomJokeArray = await Joke.aggregate([{ $sample: { size: 1 } }]);
  const randomJoke = randomJokeArray.length > 0 ? randomJokeArray[0] : null;

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

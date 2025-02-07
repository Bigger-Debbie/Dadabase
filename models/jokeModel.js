const mongoose = require("mongoose");

const jokeSchema = new mongoose.Schema({
  joke: {
    type: String,
    required: [
      true,
      "The whole point of this is to provide a joke... Wheres the joke?",
    ],
  },
  dad: {
    type: String,
    required: [
      true,
      "We have to know the genius to give credit to. Please provide a name.",
    ],
  },
  dailyJoke: Boolean,
});

const Joke = mongoose.model("Joke", jokeSchema);
module.exports = Joke;

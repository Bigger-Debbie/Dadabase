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
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [
      true,
      "We have to know the genius to give credit to. Please provide a name.",
    ],
  },
  tags: {
    type: [String],
    index: true,
  },
  dailyJoke: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "review",
  },
});

// Add a pre-find middleware to automatically populate the dad field
jokeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "dad",
    select: "name email", // Add whatever user fields you want to include
  });
  next();
});

const Joke = mongoose.model("Joke", jokeSchema);
module.exports = Joke;

const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player", //referencing the Player model
    },
  ],
  scores: {
    type: Map, //allows you to have key-value pairs
    of: Number,
    default: {},
  },
});

module.exports = mongoose.model("Match", MatchSchema);

const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide player name"],
      minlength: 3,
      maxlength: 15,
    },
    consecutiveWins: {
      type: Number,
      default: 0,
    },
    position: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", PlayerSchema);

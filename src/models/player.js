const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide player name"],
      minlength: 3,
      maxlength: 15,
    },
    gameMode: {
      type: String,
      enum: ["singles", "doubles"],
      required: [true, "Please provide game mode (singles or doubles)"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", PlayerSchema);

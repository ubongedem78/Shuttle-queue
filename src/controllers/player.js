const Player = require("../models/player");

const createPlayer = async (req, res) => {
  const player = new Player({ name: req.body.name });
  try {
    const newPlayer = await player.save();
    res.status(201).json({ newPlayer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePlayer = async (req, res) => {
  const {
    params: { id: playerId },
    body: { name },
  } = req;
  try {
    const player = await Player.findOneAndUpdate(
      { _id: playerId },
      { name },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.json({ player });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const {
      params: { id: playerId },
    } = req;
    const player = await player.findOneAndDelete({ _id: playerId });
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(201).json({ message: "Player deleted" });
  } catch (error) {
    res.status(500).json({ message: `No Player found with id ${playerId}` });
  }
};

module.exports = { createPlayer, updatePlayer, deletePlayer };

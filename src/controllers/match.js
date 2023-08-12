const Match = require("../models/match");

//get list of matches
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate(players);
    res.json({ matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create a match
const createMatch = async (req, res) => {
  const players = req.body.players;
  const match = new Match({ players });
  try {
    const newMatch = await match.save();
    res.status(201).json({ newMatch });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get match details
const getMatchDetails = async (req, res) => {
  const {
    params: { id: matchId },
  } = req;
  try {
    const match = findOne({ _id: matchId });
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(201).json({ match });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update match details
const updateMatchDetails = async (req, res) => {
  const {
    params: { id: matchId },
    body: { players },
  } = req;
};

try {
  const match = await Match.findOneAndUpdate(
    { _id: matchId },
    { players },
    { new: true, runValidators: true }
  );
  if (!match) {
    return res.status(404).json({ message: "Match not found" });
  }
  res.json({ match });
} catch (error) {
  res.status(400).json({ message: error.message });
}

//update scores
const updateMatchScores = async (req, res) => {
  const {
    params: { id: matchId },
    body: { scores },
  } = req;

  try {
    const match = await Match.findOneAndUpdate({ _id: matchId }, { scores });
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    //update scores assuming scores is a map with playerIDs as keys and the scores as values
    for (const playerId in scores) {
      if (scores.hasOwnProperty(playerId)) {
        match.scores.set(playerId, scores[playerId]);
      }
    }

    await match.save();
    res.json({ match });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete match
const deleteMatch = async (req, res) => {
  const {
    params: { id: matchId },
  } = req;
  try {
    const match = await Match.findOneAndDelete({ _id: matchId });
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(201).json({ message: "Match deleted" });
  } catch (error) {
    res.status(500).json({ message: `No Match found with id ${matchId}` });
  }
};

module.exports = {
  getAllMatches,
  createMatch,
  getMatchDetails,
  updateMatchDetails,
  updateMatchScores,
  deleteMatch,
};

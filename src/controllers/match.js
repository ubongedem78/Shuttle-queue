const Match = require("../models/match");
const mongoose = require("mongoose");
const uuid = require("uuid");

const { v4: uuidv4 } = require("uuid");

//get list of matches
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate(players);
    res.json({ matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a match with a unique matchId
const createMatch = async (req, res) => {
  const players = req.body.players;

  // Generate a new UUID for the matchId
  const matchId = uuidv4();

  // Use the generated matchId when creating the match
  const match = new Match({ _id: matchId, players });
  try {
    const newMatch = await match.save();
    res.status(201).json({ matchId: newMatch._id }); // Return the matchId in the response
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
    const match = await Match.findOne({ _id: matchId });
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
};

const updateMatchScores = async (req, res) => {
  const {
    body: { matchId, team1Scores, team2Scores },
  } = req;

  try {
    const objectIdMatchId = new mongoose.Types.ObjectId(matchId);
    const match = await Match.findOne({ _id: objectIdMatchId });

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    // Update scores for team 1
    if (team1Scores) {
      for (const playerId in team1Scores) {
        if (team1Scores.hasOwnProperty(playerId)) {
          match.team1Scores.set(playerId, team1Scores[playerId]);
        }
      }
    }

    // Update scores for team 2
    if (team2Scores) {
      for (const playerId in team2Scores) {
        if (team2Scores.hasOwnProperty(playerId)) {
          match.team2Scores.set(playerId, team2Scores[playerId]);
        }
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

const Player = require("../models/player");
const uuid = require("uuid");

const generateMatchId = () => {
  return uuid.v4(); // Generate a new UUID match ID
};

// Fetch the player queue from the database
const fetchPlayerQueue = async () => {
  try {
    const playerQueue = await Player.find().sort("_id");
    return playerQueue;
  } catch (error) {
    console.error("Error fetching player queue:", error);
    return [];
  }
};

const startGame = async (req, res) => {
  try {
    const playerQueue = await fetchPlayerQueue();

    // Check if there are enough players in the queue to start a game
    if (playerQueue.length < 2) {
      return res
        .status(400)
        .json({ message: "Not enough players to start the game." });
    }

    // Determine the game mode based on the query parameter
    const gameMode = req.query.gameMode; // Assuming the query parameter is named "gameMode"

    let team1Players = [];
    let team2Players = [];

    if (gameMode === "doubles") {
      // For doubles mode, the first pair in the queue is Team 1, and the second pair is Team 2
      team1Players = playerQueue.slice(0, 2);
      team2Players = playerQueue.slice(2, 4);
    } else {
      // For singles mode, the first player is Team 1, and the second player is Team 2
      team1Players = [playerQueue[0]];
      team2Players = [playerQueue[1]];
    }

    const matchId = generateMatchId(); // Generate a new match ID
    // console.log(matchId);

    res.status(200).json({ matchId, team1Players, team2Players });
  } catch (error) {
    console.error("Error starting the game:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  startGame,
};

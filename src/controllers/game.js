const Player = require("../models/player");

// Fetch the player queue or perform any game-related logic here
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

    // Divide the players into two teams, for example, the first two players as Team 1 and the next two players as Team 2
    const team1Players = playerQueue.slice(0, 2);
    const team2Players = playerQueue.slice(2, 4);

    // You can implement additional game-related logic here
    // For example, update player stats, create a new match, etc.

    res.status(200).json({ team1Players, team2Players });
  } catch (error) {
    console.error("Error starting the game:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateScores = async (req, res) => {
  try {
    // Extract data from the request (assuming you're sending the team name and the score increment)
    const { team, increment } = req.body;

    // Implement your scoring logic here
    // Update the scores for the specified team based on the increment value
    // Example: Fetch the current scores from the database, increment the scores, and update them back in the database

    // Return a response indicating successful score update
    res.status(200).json({ message: "Score updated successfully" });
  } catch (error) {
    console.error("Error updating scores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  startGame,
  updateScores,
};

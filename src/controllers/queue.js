const Player = require("../models/player");

const getPlayerQueue = async (req, res) => {
  try {
    const queue = await Player.find().sort("_id");
    res.json(queue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a player to the queue (singles)
const addPlayerToQueue = async (req, res) => {
  try {
    const { name, gameMode } = req.body;
    const player = new Player({ name, gameMode: "singles" }); // Set the game mode to "singles"
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a doubles pair to the queue (doubles)
const addDoublesToQueue = async (req, res) => {
  try {
    const { player1, player2 } = req.body;
    const doublesPair = new Player({
      name: `${player1}/${player2}`,
      gameMode: "doubles",
    }); // Set the game mode to "doubles"
    const newDoublesPair = await doublesPair.save();
    res.status(201).json(newDoublesPair);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const reorderQueue = async (req, res) => {
  const {
    body: { newOrder },
  } = req;

  try {
    // Grab the current queue and ids
    const currentQueue = await Player.find().sort("_id");
    const currentQueueIds = currentQueue.map((player) => player._id.toString());

    // Validate newOrder is an array and has the same length as currentQueueIds
    if (
      !Array.isArray(newOrder) ||
      newOrder.length !== currentQueueIds.length
    ) {
      return res.status(400).json({ message: "Invalid reorder request" });
    }

    // Check if newOrder has the same ids as currentQueueIds
    const newOrderIds = newOrder.map((player) => player._id.toString());
    if (newOrderIds.sort().join(",") !== currentQueueIds.sort().join(",")) {
      return res.status(400).json({ message: "Invalid reorder request" });
    }

    // Reorder the queue based on the newOrder array
    const reorderedQueue = newOrder.map((id) =>
      currentQueue.find((player) => player._id.toString() === id)
    );

    const maxConsecutiveWins = 2; // Number of consecutive wins required to move to the bottom of the queue
    for (const player of reorderedQueue) {
      if (player.consecutiveWins < maxConsecutiveWins) {
        player.consecutiveWins++;
      } else {
        // Reset consecutive wins and move to the bottom of the queue
        player.consecutiveWins = 0;
        player.position = currentQueue.length; // Move to the bottom of the queue
      }
      await player.save();
    }
    res.status(200).json({ message: "Queue reordered" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPlayerQueue,
  addPlayerToQueue,
  addDoublesToQueue,
  reorderQueue,
};

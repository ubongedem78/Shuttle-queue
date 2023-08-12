const express = require("express");
const router = express.Router();

const {
  getPlayerQueue,
  addPlayerToQueue,
  reorderQueue,
  addDoublesToQueue,
} = require("../controllers/queue");

// Get the queue
router.route("/").get(getPlayerQueue);

// Add a player to the queue (singles)
router.post("/add", addPlayerToQueue);

// Add a doubles pair to the queue (doubles)
router.post("/add-doubles", addDoublesToQueue);

//reorder
router.route("/reorder").put(reorderQueue);

module.exports = router;

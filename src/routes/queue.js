const express = require("express");
const router = express.Router();

const {
  getPlayerQueue,
  addPlayerToQueue,
  reorderQueue,
} = require("../controllers/queue");

router.route("/queue").get(getPlayerQueue).post(addPlayerToQueue);

module.exports = router;

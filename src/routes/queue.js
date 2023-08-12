const express = require("express");
const router = express.Router();

const {
  getPlayerQueue,
  addPlayerToQueue,
  reorderQueue,
} = require("../controllers/queue");

router.route("/queue").get(getPlayerQueue).post(addPlayerToQueue);
router.route("/queue/reorder").put(reorderQueue);

module.exports = router;

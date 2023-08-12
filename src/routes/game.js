const express = require("express");
const router = express.Router();

const { startGame, updateScores } = require("../controllers/game");

router.get("/start", startGame);
router.post("/score", updateScores);

module.exports = router;

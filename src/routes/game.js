const express = require("express");
const router = express.Router();

const { startGame } = require("../controllers/game");

router.get("/start", startGame);

module.exports = router;

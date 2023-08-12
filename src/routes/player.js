const express = require("express");
const router = express.Router();

const {
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/player");

router.route("/").post(createPlayer);
router.route("/:id").patch(updatePlayer).delete(deletePlayer);

module.exports = router;

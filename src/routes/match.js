const express = require("express");
const router = express.Router();

const {
  getAllMatches,
  getMatchDetails,
  createMatch,
  updateMatchDetails,
  updateMatchScores,
  deleteMatch,
} = require("../controllers/match");

router.route("/").get(getAllMatches).post(createMatch);
router.route("/:id/scores").post(updateMatchScores);
router
  .route("/:id")
  .get(getMatchDetails)
  .patch(updateMatchDetails)
  .delete(deleteMatch);

module.exports = router;

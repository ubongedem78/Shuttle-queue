// Function to fetch the initial teams and scores from the backend
const fetchInitialData = async () => {
  try {
    const response = await axios.get("/api/v1/game/start");
    return response.data;
  } catch (error) {
    console.error("Error fetching initial data:", error);
    return {
      team1Players: [],
      team2Players: [],
      team1Score: 0,
      team2Score: 0,
    };
  }
};

// Function to update the teams and scores on the UI
const updateTeamsAndScores = async () => {
  try {
    const team1Players = document.getElementById("team1-players");
    const team2Players = document.getElementById("team2-players");
    const team1Score = document.getElementById("team1-score");
    const team2Score = document.getElementById("team2-score");

    // Clear existing players and scores
    team1Players.innerHTML = "";
    team2Players.innerHTML = "";
    const {
      team1Players: team1Data,
      team2Players: team2Data,
      team1Score: score1,
      team2Score: score2,
    } = await fetchInitialData();

    // Update Team 1 players
    team1Data.forEach((player, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${player.name}`;
      team1Players.appendChild(listItem);
    });

    // Update Team 2 players
    team2Data.forEach((player, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${player.name}`;
      team2Players.appendChild(listItem);
    });

    // Update Team 1 score
    team1Score.textContent = score1 !== undefined ? score1.toString() : "0";

    // Update Team 2 score
    team2Score.textContent = score2 !== undefined ? score2.toString() : "0";
  } catch (error) {
    console.error("Error updating teams and scores:", error);
  }
};

// Function to handle scoring
const handleScoreClick = async (team, increment) => {
  try {
    // Fetch the match ID from the res

    const { matchId } = await fetchInitialData();
    console.log(matchId);

    if (matchId) {
      // Update scores for the specified team
      await axios.post(`/api/v1/match/${matchId}/scores`, {
        team: team,
        increment: increment,
      });

      // Update teams and scores on the UI
      await updateTeamsAndScores();
    } else {
      console.error("Error: matchId is null or invalid.");
    }
  } catch (error) {
    console.error("Error handling scoring:", error);
  }
};

// Function to initialize the page and set up event listeners
const initializePage = async () => {
  // Fetch initial teams and scores
  await updateTeamsAndScores();

  // Add event listeners
  document
    .getElementById("decrement-score-team1")
    .addEventListener("click", () => handleScoreClick("team1", -1));
  document
    .getElementById("decrement-score-team2")
    .addEventListener("click", () => handleScoreClick("team2", -1));

  const team1ScoreElement = document.getElementById("team1-score");
  if (team1ScoreElement) {
    team1ScoreElement.addEventListener("click", () =>
      handleScoreClick("team1", 1)
    );
  }

  const team2ScoreElement = document.getElementById("team2-score");
  if (team2ScoreElement) {
    team2ScoreElement.addEventListener("click", () =>
      handleScoreClick("team2", 1)
    );
  }
};

// Call the initializePage function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializePage);

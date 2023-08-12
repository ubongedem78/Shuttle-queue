// Function to fetch the initial teams from the backend
const fetchInitialTeams = async () => {
  try {
    const response = await axios.get("/api/v1/game/start");
    return response.data;
  } catch (error) {
    console.error("Error fetching initial teams:", error);
    return { team1Players: [], team2Players: [] };
  }
};

// Function to update the teams on the UI
const updateTeams = async () => {
  try {
    const team1Players = document.getElementById("team1-players");
    const team2Players = document.getElementById("team2-players");

    // Clear existing players
    team1Players.innerHTML = "";
    team2Players.innerHTML = "";

    const { team1Players: team1, team2Players: team2 } =
      await fetchInitialTeams();

    // Update Team 1 players
    team1.forEach((player, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${player.name}`;
      team1Players.appendChild(listItem);
    });

    // Update Team 2 players
    team2.forEach((player, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${player.name}`;
      team2Players.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error updating teams:", error);
  }
};

// Function to handle the "Start Game" button click
const handleStartGameClick = async () => {
  try {
    const response = await axios.get("/api/v1/game/start");

    // Update teams on the UI
    await updateTeams();

    // You can add additional logic here if needed
  } catch (error) {
    console.error("Error starting the game:", error);
  }
};

// Function to handle scoring
const handleScoreClick = async (team, increment) => {
  try {
    // Send a POST request to update scores
    await axios.post("/api/v1/game/score", { team, increment });

    // Update teams on the UI after scoring
    await updateTeams();
  } catch (error) {
    console.error("Error handling scoring:", error);
  }
};

// Function to initialize the page and set up event listeners
const initializePage = () => {
  updateTeams();

  const startGameButton = document.getElementById("start-game");
  const decrementScoreTeam1Button = document.getElementById(
    "decrement-score-team1"
  );
  const decrementScoreTeam2Button = document.getElementById(
    "decrement-score-team2"
  );

  startGameButton.addEventListener("click", handleStartGameClick);
  decrementScoreTeam1Button.addEventListener("click", () =>
    handleScoreClick("team1", -1)
  );
  decrementScoreTeam2Button.addEventListener("click", () =>
    handleScoreClick("team2", -1)
  );

  // You can add more event listeners for scoring
  // For example, incrementing scores, resetting scores, etc.
};

// Call the initializePage function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializePage);

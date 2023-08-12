// Function to fetch the player queue from the backend
const fetchPlayerQueue = async () => {
  try {
    const response = await axios.get("/api/v1/queue");
    return response.data;
  } catch (error) {
    console.error("Error fetching player queue:", error);
    return [];
  }
};

// Function to update the queue list on the UI
const updateQueueList = async () => {
  try {
    const queueList = document.getElementById("queue-list");
    const playerQueue = await fetchPlayerQueue();

    // Clear existing list items
    queueList.innerHTML = "";

    // Iterate over the player queue and create list items
    playerQueue.forEach((player, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${player.name}`;
      queueList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error updating queue list:", error);
  }
};

// Function to handle the "Add Player" button click
const handleAddPlayerClick = () => {
  window.location.href = "/add-player.html";
};

// Function to handle the "Start Game" button click
const handleStartGameClick = async () => {
  try {
    const response = await axios.get("/api/v1/game/start");
    const { team1Players, team2Players } = response.data;

    // Handle updating the UI for the game page here
    // For example, you can redirect to the game page and pass team players as query parameters
    window.location.href = `/game.html?team1=${encodeURIComponent(
      JSON.stringify(team1Players)
    )}&team2=${encodeURIComponent(JSON.stringify(team2Players))}`;
  } catch (error) {
    console.error("Error starting the game:", error);
  }
};

// Function to initialize the page and set up event listeners
const initializePage = () => {
  updateQueueList();

  const startGameButton = document.getElementById("start-game");
  const addPlayerButton = document.getElementById("add-player");

  startGameButton.addEventListener("click", handleStartGameClick);
  addPlayerButton.addEventListener("click", handleAddPlayerClick);
};

// Call the initializePage function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializePage);

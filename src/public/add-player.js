// Get elements from the form
const addPlayerForm = document.getElementById("add-player-form");
const gameModeSelect = document.getElementById("game-mode");
const playerInputsContainer = document.getElementById("player-inputs");

// Handle game mode selection change
gameModeSelect.addEventListener("change", (event) => {
  const selectedGameMode = event.target.value;
  // Show/hide player input fields based on the selected game mode
  if (selectedGameMode === "singles") {
    // Show input field for single player
    playerInputsContainer.innerHTML = `
      <div>
        <label for="player-name" class="block font-semibold mb-1">Player Name:</label>
        <input
          id="player-name"
          name="name"
          type="text"
          class="bg-white border border-gray-300 px-3 py-2 rounded-md w-full"
          placeholder="Enter player name"
        />
      </div>
    `;
  } else if (selectedGameMode === "doubles") {
    // Show input fields for doubles team
    playerInputsContainer.innerHTML = `
      <div>
        <label for="player1" class="block font-semibold mb-1">Player 1 Name:</label>
        <input
          id="player1"
          name="player1"
          type="text"
          class="bg-white border border-gray-300 px-3 py-2 rounded-md w-full"
          placeholder="Enter player 1 name"
        />
      </div>
      <div>
        <label for="player2" class="block font-semibold mb-1">Player 2 Name:</label>
        <input
          id="player2"
          name="player2"
          type="text"
          class="bg-white border border-gray-300 px-3 py-2 rounded-md w-full"
          placeholder="Enter player 2 name"
        />
      </div>
    `;
  } else {
    playerInputsContainer.innerHTML = ""; // Clear player input fields
  }
});

// Handle form submission
addPlayerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const selectedGameMode = gameModeSelect.value;

  if (selectedGameMode === "singles") {
    const playerName = document.getElementById("player-name").value;
    // Make API call to add a singles player
    try {
      const response = await axios.post("/api/v1/queue/add", {
        name: playerName,
      });
      // Handle successful response, e.g., display a success message
      console.log("Player added:", response.data);
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error("Error adding player:", error);
    }
  } else if (selectedGameMode === "doubles") {
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;
    // Make API call to add a doubles pair
    try {
      const response = await axios.post("/api/v1/queue/add-doubles", {
        player1: player1Name,
        player2: player2Name,
      });
      // Handle successful response, e.g., display a success message
      console.log("Doubles pair added:", response.data);
      window.location.href = "/index.html";
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error("Error adding doubles pair:", error);
    }
  }
});

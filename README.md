# Shuttle-queue

A web application designed for managing badminton games, player queues, and match details. The application supports both singles and doubles games, with flexible queue management to ensure fair play for all participants.

## Features

- Player Management: Add, update, and remove players (both singles and doubles) from the queue.

- Queue Management: Reorder the player queue based on wins and losses, with specific rules for pushing players to the bottom.

- Match Management: Create, update, and delete matches, record match scores, and view match details.

- Game Start: Start games by determining Team 1 and Team 2 based on the queue and game mode.

- Deuce Condition: Deuce condition at 20:20 where a team will only win when they have 2 points clear onwards.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ubongedem78/Shuttle-queue.git
cd Shuttle-queue/src
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

```bash
PORT=3000
MONGO_URI=[your_mongodb_connection_string]
```

4. Start the server:

```bash
npm start
```

## Usage

1. Adding Players to the Queue: Use the appropriate endpoint to add players (singles or doubles) to the queue.

2. Managing the Queue: Reorder the queue, pushing losers to the bottom and promoting consecutive winners.

3. Starting a Game: Click the "Start Game" button to begin a game, determining Team 1 and Team 2 based on the queue and game mode.

4. Match Management: Create, update, or delete matches. Record match scores and view match details.

## API Documentation

https://app.swaggerhub.com/apis-docs/UBONGEDEM78_1/shuttle-queue_api/1.0.0

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");
const queueRoutes = require("./routes/queue");
const matchRoutes = require("./routes/match");
const playerRoutes = require("./routes/player");

//middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/v1/queue", queueRoutes);
app.use("/api/v1/match", matchRoutes);
app.use("/api/v1/player", playerRoutes);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

const path = require("path");

const notFoundMiddleware = (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "..", "public", "404.html"));
};

module.exports = notFoundMiddleware;

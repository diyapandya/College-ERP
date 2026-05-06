const express = require("express");
const cors = require("cors");
const rateLimit = require("./middleware/rateLimit.middleware");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit);
app.use("/api", require("./routes"));
// Serve frontend static files
app.use(express.static(path.join(__dirname, "../../Frontend/dist")));
// React routing support
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../Frontend/dist/index.html"));
});

module.exports = app;

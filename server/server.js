// server/server.js

const express = require("express");
const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello World from Backend 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

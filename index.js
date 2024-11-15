// Add Express
const express = require("express");
const router = require("./src/routes/test.routes");
// Initialize Express
const app = express();

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/test", (req, res) => {
  res.send("Express on test");
});
app.use(router)

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;
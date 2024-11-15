// Add Express
const express = require("express");
const router = require("./src/routes/test.routes");

// Initialize Express
const app = express();
app.use(express.json());

// Create GET request
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

app.use('/api', router);

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;
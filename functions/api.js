import express from "express";
import cors from "cors";
import "dotenv/config";
import errorHandler from "./src/middleware/errorHandler.js";
import connectDB from "./src/config/mongoose.config.js";
import { join } from "path";
import Router from './routes/routes.js'
import ServerlessHttp from "serverless-http";
let records = [];
// Initialize Express
const app = express();
app.use(express.json());
app.use("/api/media", [express.static(join(process.cwd(), "public"))]);
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to the Express App!");
});


// erro handler
app.use(errorHandler);


// Initialize server
app.listen(5000, () => {
  console.log(`server run ${5000}`);
  connectDB();
});

app.use('/.netlify/functions/api', Router);
export default ServerlessHttp(app)

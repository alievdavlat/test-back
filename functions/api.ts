import express , { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import errorHandler from "./middleware/errorHandler";
import connectDB from "./config/mongoose.config";
import { join } from "path";
import Router from './routes/routes'
import ServerlessHttp from "serverless-http";
let records = [];
// Initialize Express
const app:Application = express();
app.use(express.json());
app.use("/api/media", [express.static(join(process.cwd(), "public"))]);
app.use(cors());

// routes
app.get("/", (req:Request, res:Response) => {
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
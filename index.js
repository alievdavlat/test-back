import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./src/routes/routes.js";
import errorHandler from './src/middleware/errorHandler.js'
import { CustomErrorHandler } from './src/error/error.js'
import connectDB from "./src/config/mongoose.config.js";
import { join } from "path";

// Initialize Express
const app = express();
app.use(express.json());
app.use("/api/media", [
  express.static(join(process.cwd(), "public")),
]);
app.use(cors());


// routes
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});
app.use('/api', router);
app.use(errorHandler)




// Initialize server
app.listen(5000, () => {
  console.log(`server run ${5000}`);
  connectDB()
})

export default app;
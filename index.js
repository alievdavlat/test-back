import express from "express";
import cors from "cors";
import "dotenv/config";
import errorHandler from './src/middleware/errorHandler.js'
import connectDB from "./src/config/mongoose.config.js";
import { join } from "path";
// routes 
import AuthRouter from "./src/routes/auth.routes.js";
import CommentsRouter from './src/routes/comments.routes.js'
import ExperienceRouter from './src/routes/experience.routes.js'
import GetSelfRouter from './src/routes/getSelf.routes.js'
import HeroRouter from './src/routes/hero.routes.js'
import MailRouter from './src/routes/mails.routes.js'
import ProjectRouter from './src/routes/projects.routes.js'



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
app.use(AuthRouter)
app.use(CommentsRouter)
app.use(ExperienceRouter)
app.use(GetSelfRouter)
app.use(HeroRouter)
app.use(MailRouter)
app.use(ProjectRouter)
// erro handler
app.use(errorHandler)




// Initialize server
app.listen(5000, () => {
  console.log(`server run ${5000}`);
  connectDB()
})

export default app;
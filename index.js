import express from "express";
import cors from "cors";
import "dotenv/config";
import errorHandler from "./src/middleware/errorHandler.js";
import connectDB from "./src/config/mongoose.config.js";
import { join } from "path";
// controllers 
import authController from './src/controllers/auth.js'
import commentsController from './src/controllers/comments.js'
import experienceController from './src/controllers/experience.js'
import getSelfController from './src/controllers/getSelf.js'
import heroController from './src/controllers/hero.js'
import mailController from './src/controllers/mails.js'
import projectController from './src/controllers/projects.js'

// Initialize Express
const app = express();
app.use(express.json());
app.use("/api/media", [express.static(join(process.cwd(), "public"))]);
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to the Express App!");
});

app.post("/login", authController.login);
app.post("/register", authController.register);
app.get("/comments-list", commentsController.GET);
app.post("/comments-create", commentsController.POST);
app.put("/comments-update/:id", commentsController.PUT);
app.delete("/comments-delete/:id", commentsController.DELETE);
app.get("/experience-list", experienceController.GET);
app.post("/experience-create", experienceController.POST);
app.put("/experience-update/:id", experienceController.PUT);
app.delete("/experience-delete/:id", experienceController.DELETE);
app.get("/account", getSelfController.GET);
app.get("/hero-list", heroController.GET);
app.post("/hero-create", heroController.POST);
app.put("/hero-update/:id", heroController.PUT);
app.get("/mail-list", mailController.GET);
app.post("/mail-create", mailController.POST);
app.put("/mail-update/:id", mailController.PUT);
app.delete("/mail-delete/:id", mailController.DELETE);
app.get("/project-list", projectController.GET);
app.post("/project-create", projectController.POST);
app.put("/project-update/:id", projectController.PUT);
app.delete("/project-delete/:id", projectController.DELETE);

// erro handler
app.use(errorHandler);

// Initialize server
app.listen(5000, () => {
  console.log(`server run ${5000}`);
  connectDB();
});

export default app;

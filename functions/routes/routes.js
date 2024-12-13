import { Router } from "express";
import heroRouter from "./hero.routes.js";
import experienceRouter from "./experience.routes.js";
import projectsRouter from "./projects.routes.js";
import commentsRouter from "./comments.routes.js";  
import mailRouter from "./mails.routes.js";
import getSelfRouter from '../routes/getSelf.routes.js'
import authRouter from '../routes/auth.routes.js'
const Routes = Router() 



export default Routes.use([
  heroRouter,
  experienceRouter,
  projectsRouter,
  commentsRouter,
  mailRouter,
  getSelfRouter,
  authRouter
])
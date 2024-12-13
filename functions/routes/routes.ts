import { Router } from "express";
import heroRouter from "./hero.routes";
import experienceRouter from "./experience.routes";
import projectsRouter from "./projects.routes";
import commentsRouter from "./comments.routes";  
import mailRouter from "./mails.routes";
import getSelfRouter from './getSelf.routes'
import authRouter from './auth.routes'
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
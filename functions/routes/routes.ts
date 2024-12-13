import { Router } from "express";
import heroRouter from "./hero.routes";
import experienceRouter from "./experience.routes";
import projectsRouter from "./projects.routes";
import commentsRouter from "./comments.routes";  
import mailRouter from "./mails.routes";
import getSelfRouter from './getSelf.routes'
import authRouter from './auth.routes'
import ProjectMediaRouter from './projectUpload.routes'
import ExperienceMediaRouter from './experienceUpload.routes'
import AvatarRouter from './userAvatar.routes'
import SkillsRouter from "./skills.routes";
const Routes = Router() 



export default Routes.use([
  heroRouter,
  experienceRouter,
  projectsRouter,
  commentsRouter,
  mailRouter,
  getSelfRouter,
  authRouter,
  ProjectMediaRouter,
  ExperienceMediaRouter,
  AvatarRouter,
  SkillsRouter
])
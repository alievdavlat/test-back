import { Router } from "express";
import SkillsController from '../controllers/skills'
import {uploadSkillsImage} from "../utils/multer";


const SkillsRouter = Router();


SkillsRouter
.get('/skills-list', SkillsController.GET)
.post("/skills-create", SkillsController.POST)
.put("/skills-update/:id", SkillsController.PUT)
.put("/skills-image-upload/:id",  SkillsController.UPLOAD_SKILL_IMAGE)
.delete("/skills-delete/:id", SkillsController.DELETE)


export default SkillsRouter
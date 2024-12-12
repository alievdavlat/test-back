import { Router } from "express";
import projectController from "../controllers/projects.js";
import upload from "../utils/multer.js";

const projectRouter = Router();

projectRouter
  .get("/project-list", projectController.GET)
  .get("/project-get/:id", projectController.GET_BY_ID)
  .post("/project-create",upload.single('pictures'), upload.single('video'), projectController.POST)
  .put("/project-update/:id", upload.single('pictures'), upload.single('video'), projectController.PUT)
  .delete("/project-delete/:id", projectController.DELETE);

export default projectRouter;

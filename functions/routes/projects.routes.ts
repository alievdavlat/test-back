import { Router } from "express";
import projectController from "../controllers/projects";

const projectRouter = Router();

projectRouter
  .get("/project-list", projectController.GET)
  .get("/project-get/:id", projectController.GET_BY_ID)
  .post("/project-create", projectController.POST)
  .put("/project-update/:id",  projectController.PUT)
  .delete("/project-delete/:id", projectController.DELETE);

export default projectRouter;

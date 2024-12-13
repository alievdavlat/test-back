import { Router } from "express";
import experienceController from "../controllers/experience";

const experienceRouter = Router();

experienceRouter
  .get("/experience-list", experienceController.GET)
  .post("/experience-create", experienceController.POST)
  .put("/experience-update/:id", experienceController.PUT)
  .delete("/experience-delete/:id", experienceController.DELETE);

export default experienceRouter;

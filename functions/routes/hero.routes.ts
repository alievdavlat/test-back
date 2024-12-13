import { Router } from "express";
import heroController from "../controllers/hero"

const heroRouter = Router();

heroRouter
  .get("/hero-list", heroController.GET)
  .post("/hero-create", heroController.POST)
  .put("/hero-update/:id", heroController.PUT);

export default heroRouter;

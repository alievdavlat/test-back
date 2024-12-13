import { Router } from "express";
import commentsController from "../controllers/comments";

const commentsRouters = Router();

commentsRouters
  .get("/comments-list", commentsController.GET)
  .post("/comments-create", commentsController.POST)
  .put("/comments-update/:id", commentsController.PUT)
  .delete("/comments-delete/:id", commentsController.DELETE)
  
export default commentsRouters;

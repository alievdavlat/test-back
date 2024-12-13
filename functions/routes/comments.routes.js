import { Router } from "express";
import commentsController from "../controllers/comments.js";
import upload from "../utils/multer.js";

const commentsRouters = Router();

commentsRouters
  .get("/comments-list", commentsController.GET)
  .post("/comments-create",upload.single('avatar'), commentsController.POST)
  .put("/comments-update/:id",upload.single('avatar'), commentsController.PUT)
  .delete("/comments-delete/:id", commentsController.DELETE)
  
export default commentsRouters;

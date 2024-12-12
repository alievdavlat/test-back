import { Router } from "express";
import mailController from "../controllers/mails.js";

const mailRouter = Router();

mailRouter
  .get("/mail-list", mailController.GET)
  .post("/mail-create", mailController.POST)
  .put("/mail-update/:id", mailController.PUT)
  .delete("/mail-delete/:id", mailController.DELETE);
export default mailRouter;

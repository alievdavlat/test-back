import { Router } from "express";
import getSelfController from "../controllers/getSelf.js";

const getSelf = Router();

getSelf
  .get("/account", getSelfController.GET)

  
export default getSelf;

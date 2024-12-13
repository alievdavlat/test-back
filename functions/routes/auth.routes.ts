import { Router } from "express";
import authController from "../controllers/auth"
const authRouter = Router();

  
authRouter
.post('/login', authController.login)
.post('/register', authController.register)
export default authRouter;

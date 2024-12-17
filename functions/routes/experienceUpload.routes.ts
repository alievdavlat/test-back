import { Router } from "express";
import ExperienceUploadController from "../controllers/upload-experince-images";
import { uploadExperienceLogo } from "../utils/multer";

const ExperienceMediaRouter = Router();

ExperienceMediaRouter.put(
  "/experience-image-upload/:id",
  uploadExperienceLogo.single("logo"),
  ExperienceUploadController.upload_experience_logo
);

export default ExperienceMediaRouter;

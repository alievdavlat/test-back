import { Router } from "express";
import projectUploadController from "../controllers/upload-projectImages";
import { uploadExperienceLogo } from "../utils/multer";

const ExperienceMediaRouter = Router();

ExperienceMediaRouter.put(
  "/experience-image-upload/:id",
  uploadExperienceLogo.single("logo"),
  projectUploadController.upload_project_images
);

export default ExperienceMediaRouter;
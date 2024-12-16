import { Router } from "express";
import projectUploadController from "../controllers/upload-projectImages";
import { uploadProjectImage, uploadProjectVideo } from "../utils/multer";

const ProjectMediaRouter = Router();

ProjectMediaRouter.put(
  "/project-image-upload/:id",

  projectUploadController.upload_project_images
).put(
  "/project-video-upload/:id",
  projectUploadController.upload_project_video
);

export default ProjectMediaRouter;

import { Router } from "express";
import projectUploadController from "../controllers/upload-projectImages";
import { uploadProjectImage, uploadProjectVideo } from "../utils/multer";

const ProjectMediaRouter = Router();

ProjectMediaRouter
  .put(
    "/project-image-upload/:id",
    uploadProjectImage.fields([
      { name: "img1" },
      { name: "img2" },
      { name: "img3" },
    ]),
    projectUploadController.upload_project_images
  )
  .put(
    "/project-video-upload/:id",
    uploadProjectVideo.single("video"),
    projectUploadController.upload_project_video
  );

export default ProjectMediaRouter;

import { NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "../error/error";
import Projects from '../model/projects.model'
import { uploadToCloud } from "../utils/uploader";

export default {
  upload_project_images: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new CustomErrorHandler(400, "Project ID is required"));
      }

      const project = await Projects.findById(id);

      if (!project) {
        return next(new CustomErrorHandler(404, "Project not found"));
      }

      if (req?.files) {
        let updatedPictures: string[] = project.pictures || []; 
        
        try {
          for (const key of Object.keys(req?.files)) {
            const file = req?.files[key];
            if (file) {
              let imagePath = await uploadToCloud(file, 'project');
              updatedPictures.push(imagePath);
            }
          }
      
          project.pictures = updatedPictures;
      
          await project.save();
      
          res.status(200).json({
            status: 200,
            project: project,
            msg: "Project images updated successfully",
          });
        } catch (error) {
          return next(new CustomErrorHandler(500, "Error uploading images"));
        }
      } else {
        return next(new CustomErrorHandler(400, "No images uploaded"));
      }
      
    } catch (err) {
      return next(new CustomErrorHandler(500, `Server Error: ${err.message}`));
    }
  },
  upload_project_video: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new CustomErrorHandler(400, "Project ID is required"));
      }

      const project = await Projects.findById(id);

      if (!project) {
        return next(new CustomErrorHandler(404, "Project not found"));
      }

      if (req?.file) {
        // Get the filename of the uploaded video file
        // const filename = req.file.filename;

        // Construct the file path to the uploaded video
        // const videoPath = `/media/project/${filename}`;
        const videoPath = await uploadToCloud(req.file, "project")
        // Update the project with the video URL
        project.video = videoPath; // Assuming `video` field exists in the project schema

        await project.save();

        res.status(200).json({
          status: 200,
          project: project,
          msg: "Project video updated successfully",
        });
        return;
      } else {
        return next(new CustomErrorHandler(400, "No video uploaded"));
      }
    } catch (err) {
      return next(new CustomErrorHandler(500, `Server Error: ${err.message}`));
    }
  },
};

import { NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "../error/error";
import Projects from '../model/projects.model'

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
        let updatedPictures: string[] = project.pictures || []; // Initialize pictures array if it’s empty
        
        // Iterate over the uploaded files
        Object.keys(req?.files).forEach((key, index) => {
          const filename = req?.files[key][0]?.filename;
          if (filename) {
            const imagePath = `/media/project/${filename}`;
            updatedPictures[index] = imagePath; // Assign image path to the correct position in the array
          }
        });

        // Update the pictures array in the project document
        project.pictures = updatedPictures;

        await project.save();

        res.status(200).json({
          status: 200,
          project: project,
          msg: "Project images updated successfully",
        });
        return;
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
        const filename = req.file.filename;

        // Construct the file path to the uploaded video
        const videoPath = `/media/project/${filename}`;

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

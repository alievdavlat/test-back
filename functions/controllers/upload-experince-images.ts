import { NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "../error/error";
import Experience from '../model/experience.model'

export default {
 
  upload_experience_logo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new CustomErrorHandler(400, "Experience ID is required"));
      }

      const experience = await Experience.findById(id);

      if (!experience) {
        return next(new CustomErrorHandler(404, "Experience not found"));
      }

      if (req?.file) {
        // Get the filename of the uploaded video file
        const filename = req.file.filename;

        // Construct the file path to the uploaded video
        const imagePath = `/media/experince/${filename}`;

        experience.logo = imagePath; 

        await experience.save();

        res.status(200).json({
          status: 200,
          experience: experience,
          msg: "Experience video updated successfully",
        });
        return;
      } else {
        return next(new CustomErrorHandler(400, "No image uploaded"));
      }
    } catch (err) {
      return next(new CustomErrorHandler(500, `Server Error: ${err.message}`));
    }
  },
};

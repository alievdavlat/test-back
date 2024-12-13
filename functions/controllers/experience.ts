import experience from "../model/experience.model";
import { CustomErrorHandler } from "../error/error";
import { Response, Request, NextFunction } from "express";

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const experienceData = await experience.find();

      if (!experienceData) {
        return next(new CustomErrorHandler(404, "Experience not found"));
      }

      res.status(200).json({
        message: "ok",
        data: experienceData,
        error: null,
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, "Error retrieving experiences"));
    }
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { company_name, period, job, description } = req.body;
    try {
      if (!company_name || !period || !job || !description) {
        return next(new CustomErrorHandler(400, "All fields are required"));
      }

      const checkExperience = await experience.findOne({ company_name });

      if (checkExperience) {
        return next(new CustomErrorHandler(400, "Experience already exists"));
      }

      const experienceData = await experience.create({
        company_name,
        period,
        job,
        description,
      });

      res.status(201).send({
        status: 201,
        data: experienceData,
        msg: "New experience successfully created",
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, `Error creating experience: ${error.message}`));
    }
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
      const experienceData = await experience.findById(id);

      if (!experienceData) {
        return next(new CustomErrorHandler(404, "Experience not found"));
      }

      const updatedExperienceData = await experience.findByIdAndUpdate(
        id,
        { $set: { ...req.body } },
        { new: true } // Ensure the updated document is returned
      );

      res.status(200).send({
        status: 200,
        data: updatedExperienceData,
        msg: "Experience successfully updated",
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, "Error updating experience"));
    }
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      const checkExperience = await experience.findById(id);

      if (!checkExperience) {
        return next(new CustomErrorHandler(404, "Experience not found"));
      }

      const deletedExperience = await experience.deleteOne({ _id: id }); // Corrected delete query to use _id

      res.status(200).json({
        status: 200,
        data: deletedExperience,
        msg: "Experience successfully deleted",
      });
    } catch (err: any) {
      return next(new CustomErrorHandler(500,err.message));
    }
  },
};

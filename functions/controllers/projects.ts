import projects from "../model/projects.model";
import { CustomErrorHandler } from "../error/error";
import { Response, Request, NextFunction } from "express";

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projectsData = await projects.find();

      if (!projectsData) {
        return next(new CustomErrorHandler(404, "Project topilmadi"));
      }

      res.status(200).json({
        message: "ok",
        data: projectsData,
        error: null,
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, "Project olishda xatolik yuz berdi"));
    }
  },

  GET_BY_ID: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      if (!id) {
        return next(new CustomErrorHandler(400, "ID required"));
      }

      const currentProject = await projects.findById(id);

      if (!currentProject) {
        return next(new CustomErrorHandler(404, "Project not found"));
      }

      res.status(200).json({
        status: 200,
        data: currentProject,
        msg: "ok",
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, `Error retrieving project: ${error.message}`));
    }
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, description, source_link, live_site, technalogies } = req.body;

    try {
      if (!title || !description || !source_link || !live_site || !technalogies) {
        return next(new CustomErrorHandler(400, "Barcha maydonlar to'liq emas"));
      }

      const projectsData = await projects.create({
        title,
        description,
        source_link,
        live_site,
        technalogies,
      });

      res.status(201).json({ msg: "Project yaratildi", data: projectsData });
    } catch (error: any) {
      next(new CustomErrorHandler(500, `Project yaratishda xatolik yuz berdi: ${error.message}`));
    }
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const projectsData = await projects.findById(id);

      if (!projectsData) {
        return next(new CustomErrorHandler(404, "Project topilmadi"));
      }

      const updatedProjectsData = await projects.findByIdAndUpdate(
        id,
        { $set: { ...req.body } },
        { new: true } // Return updated document
      );

      res.status(200).json({
        message: "Project yangilandi",
        data: updatedProjectsData,
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, `Project yangilashda xatolik yuz berdi: ${error.message}`));
    }
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const checkProject = await projects.findById(id);

      if (!checkProject) {
        return next(new CustomErrorHandler(404, "Project not found"));
      }

      const deletedProject = await projects.findByIdAndDelete(id);

      res.status(200).json({
        status: 200,
        data: deletedProject,
        msg: "Project successfully deleted",
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, `Error deleting project: ${error.message}`));
    }
  },
};

import projects from "../model/projects.model.js";
import { CustomErrorHandler } from "../error/error.js";

export default {
  GET: async (req, res, next) => {
    try {
      const projectsData = await projects.find();

      if (!projectsData) {
        return next(new CustomErrorHandler(404, "project topilmadi"));
      }

      res.status(200).json({
        message: "ok",
        data: projectsData,
        error: null,
      });
    } catch (error) {
      next(new CustomErrorHandler(500, "project  olishda  xatolik yuz berdi"));
    }
  },
  GET_BY_ID: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        return next(new CustomErrorHandler("id required", 400));
      }

      const currentProject = await projects.findById(id);

      if (!currentProject) {
        return next(new CustomErrorHandler("Project not found", 404));
      }

      res.status(200).json({
        status: 200,
        data: currentProject,
        msg: "ok",
      });
    } catch (err) {
      return next(new CustomErrorHandler(err.message, 500));
    }
  },

  POST: async (req, res, next) => {
    const {
      title,
      description,
      source_link,
      live_site,
      technalogies,
    } = req.body;
    
    try {
      if (
        !title ||
        !description ||
        !source_link ||
        !live_site ||
        !technalogies 
      ) {
        return next(new CustomErrorHandler(400, "Barcha maydonlar toliq emas"));
      }

      const projectsData = await projects.create({
        title,
        description,
        source_link,
        live_site,
        technalogies,
      });

      res.status(201).json({ msg: "project yaratildi", data: projectsData });
    } catch (error) {
      next(
        new CustomErrorHandler(
          500,
          `project yaratishda xatolik yuz berdi ${error}`
        )
      );
    }
  },

  PUT: async (req, res) => {
    const { id } = req.params;
    try {
      const projectsData = await projects.findById(id);

      if (!projectsData) {
        return next(new CustomErrorHandler(404, "project topilmadi"));
      }

      const updatedprojectsData = await projects.findByIdAndUpdate(
        id, 
        {$set:{...req.body}}
      )

      res.status(200).json({
        message: "project yangilandi",
        data: updatedprojectsData,
      });
    } catch (error) {
      next(
        new CustomErrorHandler(500, "project yangilashda xatolik yuz berdi")
      );
    }
  },

  DELETE: async (req, res, next) => {
    try {
      const { id } = req.params;

      const checkProject = await projects.findById(id);

      if (!checkProject) {
        return next(new CustomErrorHandler("Project not found", 404));
      }

      const deletedProject = await projects.deleteOne({ id });

      res.status(200).json({
        status: 200,
        data: deletedProject,
        msg: "Project successfuly deleted",
      });
      
    } catch (err) {
      return next(new CustomErrorHandler(err.message, 500));
    }
  },
};

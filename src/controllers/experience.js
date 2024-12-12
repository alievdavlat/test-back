import experience from "../model/experience.model.js";
import { CustomErrorHandler } from "../error/error.js";

export default {
  GET: async (req, res, next) => {
    try {
      const experienceData = await experience.find();

      if (!experienceData) {
        return next(new CustomErrorHandler(404, "experience topilmadi"));
      }

      res.status(200).json({
        message: "ok",
        data: experienceData,
        error: null,
      });
    } catch (error) {
      next(
        new CustomErrorHandler(500, "experience  olishda  xatolik yuz berdi")
      );
    }
  },

  POST: async (req, res, next) => {
    const { company_name, period, job, description } = req.body;
    try {
      if (!company_name || !period || !job || !description ) {
        return next(new CustomErrorHandler(400, "Barcha maydonlar toliq emas"));
      }

      const checkExperience  = await experience.findOne({company_name})

      if (checkExperience) {
        return next(new CustomErrorHandler('Experience already created', 400))
      }

      const experinceData = await experience.create({
        company_name,
        period,
        job,
        description,
      });

      res.status(201).send({
        status:201,
        data: experinceData,
        msg:'new project successfuly created'
    })

    } catch (error) {
      next(
        new CustomErrorHandler(
          500,
          `experience yaratishda xatolik yuz berdi ${error}`
        )
      );
    }
  },

  PUT: async (req, res) => {
    const { id } = req.params;
    try {
      const experienceData = await experience.findById(id);

      if (!experienceData) {
        return next(new CustomErrorHandler(404, "experience topilmadi"));
      }

      const updatedExperienceData = await experience.findByIdAndUpdate(
        id, 
        {$set:{...req.body}}
      );

      res.status(201).send({
        status:201,
        data: updatedExperienceData,
        msg:'new project successfuly created'
    })
    } catch (error) {
      next(
        new CustomErrorHandler(500, "experience yangilashda xatolik yuz berdi")
      );
    }
  },

  DELETE: async (req, res, next) => {
    try {
      const { id } = req.params;

      const checkExperience = await experience.findById(id);

      if (!checkExperience) {
        return next(new CustomErrorHandler("Experience not found", 404));
      }

      const deletedExperience = await experience.deleteOne({ id });

      res.status(200).json({
        status: 200,
        data: deletedExperience,
        msg: "Experience successfuly deleted",
      });
    } catch (err) {
      return next(new CustomErrorHandler(err.message, 500));
    }
  },
  
};

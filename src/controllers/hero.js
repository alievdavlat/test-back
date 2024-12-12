import { CustomErrorHandler } from "../error/error.js";
import hero from "../model/hero.model.js";

export default {
  GET: async (req, res, next) => {
    try {
      const heroData = await hero.find();

      if (!heroData) {
        return next(new CustomErrorHandler(404, "hero topilmadi"));
      }

      res.status(200).json({
        message: "ok",
        data: heroData,
        error: null,
      });
    } catch (error) {
      next(new CustomErrorHandler(500, "heroni  olishda  xatolik yuz berdi"));
    }
  },

  POST: async (req, res, next) => {
    const { title, description } = req.body;
    
    try {
      if (!title || !description) {
        return next(new CustomErrorHandler(400, "Barcha maydonlar toliq emas"));
      }

      if (typeof title !== "string" || typeof description !== "string") {
        return next(new CustomErrorHandler(400, "Ma'lumotlar noto‘g‘ri formatda"));
      }
      const heroData = await hero.create({ title, description});

      res.status(201).json({ msg: "hero yaratildi", data: heroData });
    } catch (error) {
      next(new CustomErrorHandler(500, "hero yaratishda xatolik yuz berdi"));
    }
  },

  PUT: async (req, res) => {
    const { id } = req.params;
    try {
      const heroData = await hero.findById(id);

      if (!heroData) {
        return next(new CustomErrorHandler(404, "hero topilmadi"));
      }

      const updatedheroData = await hero.update(
        { ...req.body },
        {
          where: { id: id },
        }
      );

      res
        .status(200)
        .json({ message: "hero yangilandi", data: updatedheroData });
    } catch (error) {
      next(new CustomErrorHandler(500, "hero yangilashda xatolik yuz berdi"));
    }
  },
};

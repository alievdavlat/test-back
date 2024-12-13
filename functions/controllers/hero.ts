import { CustomErrorHandler } from "../error/error";
import hero from "../model/hero.model";
import { Response, Request, NextFunction } from "express";

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const heroData = await hero.find();

      if (!heroData) {
        return next(new CustomErrorHandler(404, "Hero topilmadi"));
      }

      res.status(200).json({
        message: "ok",
        data: heroData,
        error: null,
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, "Heroni olishda xatolik yuz berdi"));
    }
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, description } = req.body;

    try {
      if (!title || !description) {
        return next(new CustomErrorHandler(400, "Barcha maydonlar to‘liq emas"));
      }

      if (typeof title !== "string" || typeof description !== "string") {
        return next(new CustomErrorHandler(400, "Ma'lumotlar noto‘g‘ri formatda"));
      }

      const heroData = await hero.create({ title, description });

      res.status(201).json({ msg: "Hero yaratildi", data: heroData });
    } catch (error: any) {
      next(new CustomErrorHandler(500, "Hero yaratishda xatolik yuz berdi"));
    }
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const heroData = await hero.findById(id);

      if (!heroData) {
        return next(new CustomErrorHandler(404, "Hero topilmadi"));
      }

      const updatedHeroData = await hero.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true } // Return the updated document
      );

      res.status(200).json({ message: "Hero yangilandi", data: updatedHeroData });
    } catch (error: any) {
      next(new CustomErrorHandler(500, "Hero yangilashda xatolik yuz berdi"));
    }
  },
};

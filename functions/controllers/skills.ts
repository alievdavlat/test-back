import Skills from "../model/skils.model";
import { CustomErrorHandler } from "../error/error";
import { Request, Response, NextFunction } from "express";
import { uploadToCloud } from "../utils/uploader";

export default {
  GET: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const skils = await Skills.find();
      if (!skils) {
        return next(new CustomErrorHandler(404, "skils not found"));
      }
      res.status(200).json({
        status: 200,
        data: skils,
        msg: "ok",
      });
    } catch (err) {
      return next(new CustomErrorHandler(500, err));
    }
  },
  POST: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { title } = req.body;

      if (!title) {
        return next(new CustomErrorHandler(400, "title is required"));
      }
      const checkSkill = await Skills.findOne({ title });

      if (checkSkill) {
        return next(new CustomErrorHandler(400, "Skill alreaady created"));
      }

      const newSkill = await Skills.create({ title });

      res
        .status(201)
        .json({ status: 201, msg: "Silll created", data: newSkill });
    } catch (err) {
      return next(new CustomErrorHandler(500, err));
    }
  },
  PUT: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const checkSkill = await Skills.findById(id);

      if (!checkSkill) {
        return next(new CustomErrorHandler(404, "Skill not Found"));
      }

      const updatedSkill = await Skills.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ status: 200, msg: "Silll updated", data: updatedSkill });
    } catch (err) {
      return next(new CustomErrorHandler(500, err));
    }
  },
  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const checkSkill = await Skills.findById(id);

      if (!checkSkill) {
        return next(new CustomErrorHandler(404, "Skill not found"));
      }

      const deletedSkill = await Skills.findByIdAndDelete(id);

      res.status(200).json({
        status: 200,
        data: deletedSkill,
        msg: "Skill successfully deleted",
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, `Error deleting Skill: ${error.message}`));
    }
  },

  UPLOAD_SKILL_IMAGE: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const checkSkill = await Skills.findById(id);

      if (!checkSkill) {
        return next(new CustomErrorHandler(404, "Skill not Found"));
      }
       
      let filename:any 

      console.log(req?.file);
      if (req?.file) {
        
        // filename = req.file.filename
        const skilImage = await uploadToCloud(req.file, 'skills')
        checkSkill.image = skilImage
        await checkSkill.save()
        res
          .status(200)
          .json({ status: 200, msg: "Skill updated", data: checkSkill });
      }
      // const imagePath = `/media/skills/${filename}`;

      // checkSkill.image = imagePath
    } catch (err) {
      return next(new CustomErrorHandler(500, err));
    }
  },
};

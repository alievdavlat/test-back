import comment from "../model/comments.model";
import { CustomErrorHandler } from "../error/error";
import { Response, Request, NextFunction } from "express";

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const commentsData = await comment.find();

      if (!commentsData) {
        return next(new CustomErrorHandler(404, "commentlar topilmadi"));
      }

      res.status(200).json({
        message: "ok",
        data: commentsData,
        error: null,
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, "commentlarni olishda xatolik yuz berdi"));
    }
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, usrjob, rate, msg }: { username: string; usrjob: string; rate: number; msg: string } = req.body;

    try {
      if (!username || !usrjob || !rate || !msg) {
        return next(new CustomErrorHandler(400, "Barcha maydonlar toliq emas"));
      }

      const commentData = await comment.create({
        username,
        usrjob,
        rate,
        msg,
      });

      res.status(201).json({ msg: "comment yaratildi", data: commentData });
    } catch (error: any) {
      next(new CustomErrorHandler(500, `Comment yaratishda xatolik yuz berdi ${error.message}`));
    }
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const commentData = await comment.findById(id);

      if (!commentData) {
        return next(new CustomErrorHandler(404, "comment topilmadi"));
      }

      const updatedCommentData = await comment.findByIdAndUpdate(
        id,
        { $set: { ...req.body } },
        { new: true }
      );

      res.status(200).json({
        message: "comment yangilandi",
        data: updatedCommentData,
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, "Comment yangilashda xatolik yuz berdi"));
    }
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      const checkComment = await comment.findById(id);

      if (!checkComment) {
        return next(new CustomErrorHandler(404, "Comment not found"));
      }

      const deletedComment = await comment.deleteOne({ _id: id });

      res.status(200).json({
        status: 200,
        data: deletedComment,
        msg: "Comment successfully deleted",
      });
    } catch (error: any) {
      return next(new CustomErrorHandler(500, error.message));
    }
  },
};

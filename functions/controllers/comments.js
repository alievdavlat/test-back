import comment from "../model/comments.model.js";
import { CustomErrorHandler } from "../error/error.js";

export default {
  GET: async (req, res, next) => {
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
    } catch (error) {
      next(
        new CustomErrorHandler(500, "commentlarni  olishda  xatolik yuz berdi")
      );
    }
  },

  POST: async (req, res, next) => {
    const { username, usrjob, rate, msg } = req.body;
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
    } catch (error) {
      next(
        new CustomErrorHandler(
          500,
          `Comment yaratishda xatolik yuz berdi ${error}`
        )
      );
    }
  },
  PUT: async (req, res) => {
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
      
      res
        .status(200)
        .json({ message: "mail yangilandi", data: updatedCommentData });
    } catch (error) {
      next(new CustomErrorHandler(500, "Mail yangilashda xatolik yuz berdi"));
    }
  },

  DELETE: async (req, res, next) => {
    try {
      const { id } = req.params;

      const checkComment = await comment.findById(id);

      if (!checkComment) {
        return next(new CustomErrorHandler("Comment not found", 404));
      }

      const deletedComment = await comment.deleteOne({  id });

      res.status(200).json({
        status: 200,
        data: deletedComment,
        msg: "Comment successfuly deleted",
      });
    } catch (err) {
      return next(new CustomErrorHandler(err.message, 500));
    }
  },
};

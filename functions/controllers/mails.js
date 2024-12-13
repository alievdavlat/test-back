import mails from "../model/mails.model.js";
import { CustomErrorHandler } from "../error/error.js";
import TelegramBot from 'node-telegram-bot-api';
const token = '7932078768:AAHEnIndI35KqtX-Gf9mJ0iT3jb0EPxerfw';

const bot = new TelegramBot(token, {polling: true});
export default {
  GET: async (req, res, next) => {
    try {
      const maillsData = await mails.find();

      if (!maillsData) {
        return next(new CustomErrorHandler(404, "mailar topilmadi"));
      }

      res.status(200).json({
        message: "ok",
        data: maillsData,
        error: null,
      });
    } catch (error) {
      next(new CustomErrorHandler(500, "mailarni  olishda  xatolik yuz berdi"));
    }
  },

  POST: async (req, res, next) => {
    const { name, email, msg } = req.body;
    try {
      if (!name || !email || !msg) {
        return next(new CustomErrorHandler(400, "Barcha maydonlar toliq emas"));
      }
      const mailData = await mails.create({ name, email, msg });
      bot.sendMessage('1043959566', `Hello, this is a message from your Portfolio sender: ${name} ,email: ${email}, message: ${msg}`);
      res.status(201).json({ msg: "mail yaratildi", data: mailData });
    } catch (error) {
      next(new CustomErrorHandler(500, "Mail yaratishda xatolik yuz berdi"));
    }
  },

  PUT: async (req, res) => {
    const { id } = req.params;
    try {
      const mailData = await mails.findById(id);

      if (!mailData) {
        return next(new CustomErrorHandler(404, "mail topilmadi"));
      }

      const updatedMailData = await mails.findByIdAndUpdate(
        id, 
        {$set:{...req.body}}
      )

      res
        .status(200)
        .json({ message: "mail yangilandi", data: updatedMailData });
    } catch (error) {
      next(new CustomErrorHandler(500, "Mail yangilashda xatolik yuz berdi"));
    }
  },
  DELETE: async (req, res, next) => {
    try {
      const { id } = req.params;

      const checkMail = await mails.findById(id);

      if (!checkMail) {
        return next(new CustomErrorHandler("Mail not found", 404));
      }

      const deletedMail = await mails.deleteOne({id});

      res.status(200).json({
        status: 200,
        data: deletedMail,
        msg: "Mail successfuly deleted",
      });
    } catch (err) {
      return next(new CustomErrorHandler(err.message, 500));
    }
  }
};

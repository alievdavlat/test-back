import mails from "../model/mails.model";
import { CustomErrorHandler } from "../error/error";
import TelegramBot from "node-telegram-bot-api";
import { Response, Request, NextFunction } from "express";

const token = "7932078768:AAHEnIndI35KqtX-Gf9mJ0iT3jb0EPxerfw";
const bot = new TelegramBot(token, { polling: true });

export default {
  GET: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mailsData = await mails.find();

      if (!mailsData) {
        return next(new CustomErrorHandler(404, "Mailar topilmadi"));
      }

      res.status(200).json({
        message: "ok",
        data: mailsData,
        error: null,
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, "Mailarni olishda xatolik yuz berdi"));
    }
  },

  POST: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, msg } = req.body;

    try {
      if (!name || !email || !msg) {
        return next(new CustomErrorHandler(400, "Barcha maydonlar to‘liq emas"));
      }

      const mailData = await mails.create({ name, email, msg });

      // Send message via Telegram Bot
      await bot.sendMessage(
        "1043959566",
        `Hello, this is a message from your Portfolio: Sender: ${name}, Email: ${email}, Message: ${msg}`
      );

      res.status(201).json({ msg: "Mail yaratildi", data: mailData });
    } catch (error: any) {
      next(new CustomErrorHandler(500, `Mail yaratishda xatolik yuz berdi: ${error.message}`));
    }
  },

  PUT: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const mailData = await mails.findById(id);

      if (!mailData) {
        return next(new CustomErrorHandler(404, "Mail topilmadi"));
      }

      const updatedMailData = await mails.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true } // Return the updated document
      );

      res.status(200).json({ message: "Mail yangilandi", data: updatedMailData });
    } catch (error: any) {
      next(new CustomErrorHandler(500, `Mail yangilashda xatolik yuz berdi: ${error.message}`));
    }
  },

  DELETE: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const checkMail = await mails.findById(id);

      if (!checkMail) {
        return next(new CustomErrorHandler(404, "Mail topilmadi"));
      }

      const deletedMail = await mails.findByIdAndDelete(id);

      res.status(200).json({
        status: 200,
        data: deletedMail,
        msg: "Mail successfuly deleted",
      });
    } catch (error: any) {
      next(new CustomErrorHandler(500, `Mailni o'chirishda xatolik yuz berdi: ${error.message}`));
    }
  },
};

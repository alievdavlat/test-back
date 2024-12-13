"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mails_model_1 = __importDefault(require("../model/mails.model"));
const error_1 = require("../error/error");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const token = "7932078768:AAHEnIndI35KqtX-Gf9mJ0iT3jb0EPxerfw";
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
exports.default = {
    GET: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mailsData = yield mails_model_1.default.find();
            if (!mailsData) {
                return next(new error_1.CustomErrorHandler(404, "Mailar topilmadi"));
            }
            res.status(200).json({
                message: "ok",
                data: mailsData,
                error: null,
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, "Mailarni olishda xatolik yuz berdi"));
        }
    }),
    POST: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, msg } = req.body;
        try {
            if (!name || !email || !msg) {
                return next(new error_1.CustomErrorHandler(400, "Barcha maydonlar to‘liq emas"));
            }
            const mailData = yield mails_model_1.default.create({ name, email, msg });
            // Send message via Telegram Bot
            yield bot.sendMessage("1043959566", `Hello, this is a message from your Portfolio: Sender: ${name}, Email: ${email}, Message: ${msg}`);
            res.status(201).json({ msg: "Mail yaratildi", data: mailData });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, `Mail yaratishda xatolik yuz berdi: ${error.message}`));
        }
    }),
    PUT: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const mailData = yield mails_model_1.default.findById(id);
            if (!mailData) {
                return next(new error_1.CustomErrorHandler(404, "Mail topilmadi"));
            }
            const updatedMailData = yield mails_model_1.default.findByIdAndUpdate(id, Object.assign({}, req.body), { new: true } // Return the updated document
            );
            res.status(200).json({ message: "Mail yangilandi", data: updatedMailData });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, `Mail yangilashda xatolik yuz berdi: ${error.message}`));
        }
    }),
    DELETE: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const checkMail = yield mails_model_1.default.findById(id);
            if (!checkMail) {
                return next(new error_1.CustomErrorHandler(404, "Mail topilmadi"));
            }
            const deletedMail = yield mails_model_1.default.findByIdAndDelete(id);
            res.status(200).json({
                status: 200,
                data: deletedMail,
                msg: "Mail successfuly deleted",
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, `Mailni o'chirishda xatolik yuz berdi: ${error.message}`));
        }
    }),
};

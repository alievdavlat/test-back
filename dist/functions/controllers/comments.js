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
const comments_model_1 = __importDefault(require("../model/comments.model"));
const error_1 = require("../error/error");
exports.default = {
    GET: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const commentsData = yield comments_model_1.default.find();
            if (!commentsData) {
                return next(new error_1.CustomErrorHandler(404, "commentlar topilmadi"));
            }
            res.status(200).json({
                message: "ok",
                data: commentsData,
                error: null,
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, "commentlarni olishda xatolik yuz berdi"));
        }
    }),
    POST: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, usrjob, rate, msg } = req.body;
        try {
            if (!username || !usrjob || !rate || !msg) {
                return next(new error_1.CustomErrorHandler(400, "Barcha maydonlar toliq emas"));
            }
            const commentData = yield comments_model_1.default.create({
                username,
                usrjob,
                rate,
                msg,
            });
            res.status(201).json({ msg: "comment yaratildi", data: commentData });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, `Comment yaratishda xatolik yuz berdi ${error.message}`));
        }
    }),
    PUT: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const commentData = yield comments_model_1.default.findById(id);
            if (!commentData) {
                return next(new error_1.CustomErrorHandler(404, "comment topilmadi"));
            }
            const updatedCommentData = yield comments_model_1.default.findByIdAndUpdate(id, { $set: Object.assign({}, req.body) }, { new: true });
            res.status(200).json({
                message: "comment yangilandi",
                data: updatedCommentData,
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, "Comment yangilashda xatolik yuz berdi"));
        }
    }),
    DELETE: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const checkComment = yield comments_model_1.default.findById(id);
            if (!checkComment) {
                return next(new error_1.CustomErrorHandler(404, "Comment not found"));
            }
            const deletedComment = yield comments_model_1.default.deleteOne({ _id: id });
            res.status(200).json({
                status: 200,
                data: deletedComment,
                msg: "Comment successfully deleted",
            });
        }
        catch (error) {
            return next(new error_1.CustomErrorHandler(500, error.message));
        }
    }),
};

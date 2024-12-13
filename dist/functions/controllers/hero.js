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
const error_1 = require("../error/error");
const hero_model_1 = __importDefault(require("../model/hero.model"));
exports.default = {
    GET: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const heroData = yield hero_model_1.default.find();
            if (!heroData) {
                return next(new error_1.CustomErrorHandler(404, "Hero topilmadi"));
            }
            res.status(200).json({
                message: "ok",
                data: heroData,
                error: null,
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, "Heroni olishda xatolik yuz berdi"));
        }
    }),
    POST: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, description } = req.body;
        try {
            if (!title || !description) {
                return next(new error_1.CustomErrorHandler(400, "Barcha maydonlar to‘liq emas"));
            }
            if (typeof title !== "string" || typeof description !== "string") {
                return next(new error_1.CustomErrorHandler(400, "Ma'lumotlar noto‘g‘ri formatda"));
            }
            const heroData = yield hero_model_1.default.create({ title, description });
            res.status(201).json({ msg: "Hero yaratildi", data: heroData });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, "Hero yaratishda xatolik yuz berdi"));
        }
    }),
    PUT: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const heroData = yield hero_model_1.default.findById(id);
            if (!heroData) {
                return next(new error_1.CustomErrorHandler(404, "Hero topilmadi"));
            }
            const updatedHeroData = yield hero_model_1.default.findByIdAndUpdate(id, Object.assign({}, req.body), { new: true } // Return the updated document
            );
            res.status(200).json({ message: "Hero yangilandi", data: updatedHeroData });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, "Hero yangilashda xatolik yuz berdi"));
        }
    }),
};

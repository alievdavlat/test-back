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
const projects_model_1 = __importDefault(require("../model/projects.model"));
const error_1 = require("../error/error");
exports.default = {
    GET: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const projectsData = yield projects_model_1.default.find();
            if (!projectsData) {
                return next(new error_1.CustomErrorHandler(404, "Project topilmadi"));
            }
            res.status(200).json({
                message: "ok",
                data: projectsData,
                error: null,
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, "Project olishda xatolik yuz berdi"));
        }
    }),
    GET_BY_ID: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            if (!id) {
                return next(new error_1.CustomErrorHandler(400, "ID required"));
            }
            const currentProject = yield projects_model_1.default.findById(id);
            if (!currentProject) {
                return next(new error_1.CustomErrorHandler(404, "Project not found"));
            }
            res.status(200).json({
                status: 200,
                data: currentProject,
                msg: "ok",
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, `Error retrieving project: ${error.message}`));
        }
    }),
    POST: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, description, source_link, live_site, technalogies } = req.body;
        try {
            if (!title || !description || !source_link || !live_site || !technalogies) {
                return next(new error_1.CustomErrorHandler(400, "Barcha maydonlar to'liq emas"));
            }
            const projectsData = yield projects_model_1.default.create({
                title,
                description,
                source_link,
                live_site,
                technalogies,
            });
            res.status(201).json({ msg: "Project yaratildi", data: projectsData });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, `Project yaratishda xatolik yuz berdi: ${error.message}`));
        }
    }),
    PUT: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const projectsData = yield projects_model_1.default.findById(id);
            if (!projectsData) {
                return next(new error_1.CustomErrorHandler(404, "Project topilmadi"));
            }
            const updatedProjectsData = yield projects_model_1.default.findByIdAndUpdate(id, { $set: Object.assign({}, req.body) }, { new: true } // Return updated document
            );
            res.status(200).json({
                message: "Project yangilandi",
                data: updatedProjectsData,
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, `Project yangilashda xatolik yuz berdi: ${error.message}`));
        }
    }),
    DELETE: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const checkProject = yield projects_model_1.default.findById(id);
            if (!checkProject) {
                return next(new error_1.CustomErrorHandler(404, "Project not found"));
            }
            const deletedProject = yield projects_model_1.default.findByIdAndDelete(id);
            res.status(200).json({
                status: 200,
                data: deletedProject,
                msg: "Project successfully deleted",
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, `Error deleting project: ${error.message}`));
        }
    }),
};

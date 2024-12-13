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
const experience_model_1 = __importDefault(require("../model/experience.model"));
const error_1 = require("../error/error");
exports.default = {
    GET: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const experienceData = yield experience_model_1.default.find();
            if (!experienceData) {
                return next(new error_1.CustomErrorHandler(404, "Experience not found"));
            }
            res.status(200).json({
                message: "ok",
                data: experienceData,
                error: null,
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, "Error retrieving experiences"));
        }
    }),
    POST: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { company_name, period, job, description } = req.body;
        try {
            if (!company_name || !period || !job || !description) {
                return next(new error_1.CustomErrorHandler(400, "All fields are required"));
            }
            const checkExperience = yield experience_model_1.default.findOne({ company_name });
            if (checkExperience) {
                return next(new error_1.CustomErrorHandler(400, "Experience already exists"));
            }
            const experienceData = yield experience_model_1.default.create({
                company_name,
                period,
                job,
                description,
            });
            res.status(201).send({
                status: 201,
                data: experienceData,
                msg: "New experience successfully created",
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, `Error creating experience: ${error.message}`));
        }
    }),
    PUT: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const experienceData = yield experience_model_1.default.findById(id);
            if (!experienceData) {
                return next(new error_1.CustomErrorHandler(404, "Experience not found"));
            }
            const updatedExperienceData = yield experience_model_1.default.findByIdAndUpdate(id, { $set: Object.assign({}, req.body) }, { new: true } // Ensure the updated document is returned
            );
            res.status(200).send({
                status: 200,
                data: updatedExperienceData,
                msg: "Experience successfully updated",
            });
        }
        catch (error) {
            next(new error_1.CustomErrorHandler(500, "Error updating experience"));
        }
    }),
    DELETE: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const checkExperience = yield experience_model_1.default.findById(id);
            if (!checkExperience) {
                return next(new error_1.CustomErrorHandler(404, "Experience not found"));
            }
            const deletedExperience = yield experience_model_1.default.deleteOne({ _id: id }); // Corrected delete query to use _id
            res.status(200).json({
                status: 200,
                data: deletedExperience,
                msg: "Experience successfully deleted",
            });
        }
        catch (err) {
            return next(new error_1.CustomErrorHandler(500, err.message));
        }
    }),
};

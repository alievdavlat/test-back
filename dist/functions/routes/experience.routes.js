"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const experience_1 = __importDefault(require("../controllers/experience"));
const experienceRouter = (0, express_1.Router)();
experienceRouter
    .get("/experience-list", experience_1.default.GET)
    .post("/experience-create", experience_1.default.POST)
    .put("/experience-update/:id", experience_1.default.PUT)
    .delete("/experience-delete/:id", experience_1.default.DELETE);
exports.default = experienceRouter;

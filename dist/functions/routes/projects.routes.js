"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_1 = __importDefault(require("../controllers/projects"));
const multer_js_1 = __importDefault(require("../utils/multer.js"));
const projectRouter = (0, express_1.Router)();
projectRouter
    .get("/project-list", projects_1.default.GET)
    .get("/project-get/:id", projects_1.default.GET_BY_ID)
    .post("/project-create", multer_js_1.default.single('pictures'), multer_js_1.default.single('video'), projects_1.default.POST)
    .put("/project-update/:id", multer_js_1.default.single('pictures'), multer_js_1.default.single('video'), projects_1.default.PUT)
    .delete("/project-delete/:id", projects_1.default.DELETE);
exports.default = projectRouter;

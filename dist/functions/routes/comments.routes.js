"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_1 = __importDefault(require("../controllers/comments"));
const multer_1 = __importDefault(require("../utils/multer"));
const commentsRouters = (0, express_1.Router)();
commentsRouters
    .get("/comments-list", comments_1.default.GET)
    .post("/comments-create", multer_1.default.single('avatar'), comments_1.default.POST)
    .put("/comments-update/:id", multer_1.default.single('avatar'), comments_1.default.PUT)
    .delete("/comments-delete/:id", comments_1.default.DELETE);
exports.default = commentsRouters;

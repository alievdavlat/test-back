"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mails_1 = __importDefault(require("../controllers/mails"));
const mailRouter = (0, express_1.Router)();
mailRouter
    .get("/mail-list", mails_1.default.GET)
    .post("/mail-create", mails_1.default.POST)
    .put("/mail-update/:id", mails_1.default.PUT)
    .delete("/mail-delete/:id", mails_1.default.DELETE);
exports.default = mailRouter;

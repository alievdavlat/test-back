"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hero_1 = __importDefault(require("../controllers/hero"));
const heroRouter = (0, express_1.Router)();
heroRouter
    .get("/hero-list", hero_1.default.GET)
    .post("/hero-create", hero_1.default.POST)
    .put("/hero-update/:id", hero_1.default.PUT);
exports.default = heroRouter;

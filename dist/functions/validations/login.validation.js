"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const loginValidation = joi_1.default.object().keys({
    username: joi_1.default.string().required().max(70),
    password: joi_1.default.string().required().max(100)
});
exports.loginValidation = loginValidation;
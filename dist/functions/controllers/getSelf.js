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
const auth_model_1 = __importDefault(require("../model/auth.model"));
const error_1 = require("../error/error");
const jwt_1 = require("../utils/jwt");
exports.default = {
    GET: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Extract token from headers or body
            const { token } = req.body;
            const accesstoken = req.headers.accesstoken;
            // Verify token to extract user information
            const decoded = (0, jwt_1.verify)(accesstoken || token);
            // Check if the decoded token is valid and contains 'id'
            if (typeof decoded === 'string') {
                return next(new error_1.CustomErrorHandler(401, decoded)); // If token is invalid, return error
            }
            const { id } = decoded;
            const currentUser = yield auth_model_1.default.findById(id);
            if (!currentUser) {
                return next(new error_1.CustomErrorHandler(404, "User not found"));
            }
            // Send response with user data
            res.status(200).json({
                status: 200,
                data: currentUser,
                msg: "ok",
            });
        }
        catch (err) {
            // Handle any errors
            next(new error_1.CustomErrorHandler(500, err.message));
        }
    }),
};

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
const login_validation_1 = require("../validations/login.validation");
const auth_model_1 = __importDefault(require("../model/auth.model"));
const jwt_1 = require("../utils/jwt");
const hashing_1 = require("../utils/hashing");
exports.default = {
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { error, value } = login_validation_1.loginValidation.validate(req.body);
        if (error) {
            return next(new error_1.CustomErrorHandler(400, error.message));
        }
        const { username, password } = value;
        try {
            const checkAdmin = yield auth_model_1.default.findOne({ username });
            if (!checkAdmin) {
                return next(new error_1.CustomErrorHandler(404, "User not found"));
            }
            let isValidPassword;
            let token;
            token = (0, jwt_1.sign)({ id: checkAdmin.id, username });
            isValidPassword = yield (0, hashing_1.comparePassword)(password, checkAdmin.password);
            if (!isValidPassword) {
                return next(new error_1.CustomErrorHandler(400, "Username or password is not valid"));
            }
            res.status(200).json({
                status: 200,
                data: checkAdmin,
                token,
                msg: "User successfully logged in",
            });
        }
        catch (err) {
            return next(new error_1.CustomErrorHandler(500, err.message));
        }
    }),
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { error, value } = login_validation_1.loginValidation.validate(req.body);
        if (error) {
            return next(new error_1.CustomErrorHandler(400, error.message));
        }
        const { username, password } = value;
        try {
            const checkAdmin = yield auth_model_1.default.findOne({ username });
            if (checkAdmin) {
                return next(new error_1.CustomErrorHandler(400, "User already exists"));
            }
            const hashedPassword = yield (0, hashing_1.hashPassword)(password);
            const newUser = yield auth_model_1.default.create({
                username,
                password: hashedPassword,
            });
            const token = (0, jwt_1.sign)({ id: newUser.id, username });
            res.status(201).json({
                status: 201,
                data: newUser,
                token,
                msg: "User successfully registered",
            });
        }
        catch (err) {
            return next(new error_1.CustomErrorHandler(500, err.message));
        }
    }),
};

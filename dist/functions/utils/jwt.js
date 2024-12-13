"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Sign function with typed payload
const sign = (payload) => {
    return jsonwebtoken_1.default.sign(payload, "aliev_davlat");
};
exports.sign = sign;
// Verify function with typed token, returning either a JwtPayload or string (in case of failure)
const verify = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, 'aliev_davlat');
    }
    catch (err) {
        return 'Invalid token';
    }
};
exports.verify = verify;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AuthSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "Please enter your name"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    avatar: {
        type: String,
        required: false,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});
// Mongoose model creation
const Auth = mongoose_1.default.model("Auth", AuthSchema);
exports.default = Auth;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "Please enter your name"],
    },
    usrjob: {
        type: String,
        required: [true, "Please enter your password"],
    },
    rate: {
        type: Number,
        required: [true, "Please enter your password"],
    },
    msg: {
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
const Comments = mongoose_1.default.model("Comments", CommentSchema);
exports.default = Comments;

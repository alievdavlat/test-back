"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MailsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your password"],
    },
    msg: {
        type: String,
        required: [true, "Please enter your password"],
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});
const Mails = mongoose_1.default.model("Mails", MailsSchema);
exports.default = Mails;

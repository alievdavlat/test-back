"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const experienceSchema = new mongoose_1.default.Schema({
    company_name: {
        type: String,
        required: [true, "Please enter your company name"],
    },
    period: {
        type: String,
        required: [true, "Please enter your period"],
    },
    job: {
        type: String,
        required: [true, "Please enter your job"],
    },
    description: {
        type: String,
        required: [true, "Please enter your description"],
    },
    logo: {
        type: String,
        required: [false, "Please enter your company logo"]
    }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});
const Experience = mongoose_1.default.model("Experience", experienceSchema);
exports.default = Experience;

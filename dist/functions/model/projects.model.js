"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please enter your name"],
    },
    description: {
        type: String,
        required: [true, "Please enter your password"],
    },
    source_link: {
        type: String,
        required: [true, "Please enter your password"],
    },
    live_site: {
        type: String,
        required: [true, "Please enter your password"],
    },
    technalogies: {
        type: String,
        required: [true, "Please enter your password"],
    },
    iconList: {
        type: String,
        required: [false, "Please enter your password"],
    },
    pictures: {
        type: [String],
        required: [false, "Please enter your password"],
    },
    video: {
        type: String,
        required: [false, "Please enter your password"],
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});
const Projects = mongoose_1.default.model("Projects", ProjectsSchema);
exports.default = Projects;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SkillsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please enter your name"],
    },
    image: {
        type: String,
        required: [true, "Please enter your name"]
    }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});
const Skills = mongoose_1.default.model("Skills", SkillsSchema);
exports.default = Skills;

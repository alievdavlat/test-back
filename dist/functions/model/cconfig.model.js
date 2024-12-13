"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const configSchema = new mongoose_1.default.Schema({
    showTestimonials: {
        type: Boolean,
    },
    showEexperience: {
        type: Boolean,
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});
// Mongoose model creation
const Config = mongoose_1.default.model("Config", configSchema);
exports.default = Config;

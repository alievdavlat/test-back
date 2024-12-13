"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hero_routes_1 = __importDefault(require("./hero.routes"));
const experience_routes_1 = __importDefault(require("./experience.routes"));
const projects_routes_1 = __importDefault(require("./projects.routes"));
const comments_routes_1 = __importDefault(require("./comments.routes"));
const mails_routes_1 = __importDefault(require("./mails.routes"));
const getSelf_routes_1 = __importDefault(require("./getSelf.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const Routes = (0, express_1.Router)();
exports.default = Routes.use([
    hero_routes_1.default,
    experience_routes_1.default,
    projects_routes_1.default,
    comments_routes_1.default,
    mails_routes_1.default,
    getSelf_routes_1.default,
    auth_routes_1.default
]);

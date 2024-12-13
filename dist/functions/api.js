"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const mongoose_config_1 = __importDefault(require("./config/mongoose.config"));
const path_1 = require("path");
const routes_1 = __importDefault(require("./routes/routes"));
const serverless_http_1 = __importDefault(require("serverless-http"));
let records = [];
// Initialize Express
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/media", [express_1.default.static((0, path_1.join)(process.cwd(), "public"))]);
app.use((0, cors_1.default)());
// routes
app.get("/", (req, res) => {
    res.send("Welcome to the Express App!");
});
// erro handler
app.use(errorHandler_1.default);
// Initialize server
app.listen(5000, () => {
    console.log(`server run ${5000}`);
    (0, mongoose_config_1.default)();
});
app.use('/.netlify/functions/api', routes_1.default);
exports.default = (0, serverless_http_1.default)(app);

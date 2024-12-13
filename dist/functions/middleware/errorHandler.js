"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandle = (err, _, res, __) => {
    const status = err.status || 500; // Fallback qiymat
    const message = err.message || "Internal Server Error"; // Fallback qiymat
    res.status(status).json({
        message,
        status,
    });
};
exports.default = errorHandle;

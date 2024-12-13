"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorHandler = void 0;
class CustomErrorHandler extends Error {
    constructor(status = 500, message = "Internal Server Error") {
        super(message);
        this.status = status;
        // Ensures the name of the error is preserved
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
    }
    getErrorInfo(msg = "Internal Server Error", status = 500) {
        return {
            message: msg,
            status: status,
        };
    }
}
exports.CustomErrorHandler = CustomErrorHandler;

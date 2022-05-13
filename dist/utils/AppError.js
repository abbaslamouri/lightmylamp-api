"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    // errorCode: string
    constructor(message, statusCode, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        // this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.custom = true;
        // this.message = message
        // this.errorCode = errorCode
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;

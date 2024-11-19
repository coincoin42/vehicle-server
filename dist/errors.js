"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.ErrorCode = void 0;
exports.errorHandler = errorHandler;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Unknown"] = 1] = "Unknown";
    ErrorCode[ErrorCode["BadRequest"] = 2] = "BadRequest";
    ErrorCode[ErrorCode["RecordNotFound"] = 3] = "RecordNotFound";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
;
class AppError extends Error {
    constructor(code, message, details) {
        super();
        this.code = code;
        this.message = message;
        this.details = details;
    }
    toString() {
        return `[${this.code.toString()}], Message ${this.message}, Details: ${JSON.stringify(this.details)}`;
    }
}
exports.AppError = AppError;
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        next(err);
        return;
    }
    console.error("Handled error:", err.toString());
    if (err instanceof AppError) {
        res.status(toHTTPStatus(err.code));
        res.json({
            error: {
                code: err.code,
                message: err.message,
                details: err.details, // eslint-disable-line @typescript-eslint/no-unsafe-assignment -- not unsafe.
            }
        });
        return;
    }
    res.status(500);
    res.json({
        error: {
            code: ErrorCode.Unknown,
            message: "Something went wrong"
        }
    });
}
function toHTTPStatus(errCode) {
    switch (errCode) {
        case ErrorCode.RecordNotFound:
            return 404;
        case ErrorCode.BadRequest:
            return 400;
        default:
            return 500;
    }
}

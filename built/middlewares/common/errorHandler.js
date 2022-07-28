"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.routeNotFoundHandler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
// 404 route not found error handler
const routeNotFoundHandler = (req, res, next) => {
    next((0, http_errors_1.default)(404, 'Your requested route was not found!'));
};
exports.routeNotFoundHandler = routeNotFoundHandler;
// default error handler
const errorHandler = (err, req, res, next) => {
    // override what you want
    console.log('===> Error: ', err.message);
    res.status(400).json({
        error: err,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map
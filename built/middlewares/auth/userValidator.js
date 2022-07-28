"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserValidationHandler = exports.addUserValidators = void 0;
// external imports
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
// internal imports
const Person_model_1 = __importDefault(require("../../models/Person.model"));
// add user
const addUserValidators = [
    (0, express_validator_1.check)('username')
        .isLength({ min: 1 })
        .withMessage('Name is required')
        // .isAlpha('en-US', { ignore: '-' })
        // .withMessage('Username must not contain anything other than alphabet')
        .trim(),
    (0, express_validator_1.check)('email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (value) => {
        try {
            const user = await Person_model_1.default.findOne({ email: value });
            if (user) {
                throw (0, http_errors_1.default)('Email is already in use!');
            }
        }
        catch (err) {
            throw (0, http_errors_1.default)(err.message);
        }
    }),
    (0, express_validator_1.check)('password')
        // .isStrongPassword()
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long'),
];
exports.addUserValidators = addUserValidators;
const addUserValidationHandler = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        return next();
    }
    let message = '';
    Object.values(mappedErrors).forEach((x) => {
        message += `${x.msg}. `;
    });
    res.status(400).json({
        error: { message },
    });
};
exports.addUserValidationHandler = addUserValidationHandler;
//# sourceMappingURL=userValidator.js.map
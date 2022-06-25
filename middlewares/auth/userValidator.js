// external imports
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');

// internal imports
const User = require('../../models/Person');

// add user
const addUserValidators = [
    check('username')
        .isLength({ min: 1 })
        .withMessage('Name is required')
        .isAlpha('en-US', { ignore: '-' })
        .withMessage('Username must not contain anything other than alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError('Email is already in use!');
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check('password')
        // .isStrongPassword()
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long'),
];

const addUserValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        // remove uploaded files if any
    }

    // response the errors
    res.status(500).json({
        errors: mappedErrors,
    });
};

module.exports = {
    addUserValidators,
    addUserValidationHandler,
};
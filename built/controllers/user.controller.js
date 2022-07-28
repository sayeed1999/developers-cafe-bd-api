"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = exports.deleteUser = exports.getCurrentUser = exports.getById = exports.getUsers = void 0;
// external imports
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
// internal imports
const Person_model_1 = __importDefault(require("../models/Person.model"));
const config_1 = __importDefault(require("../config"));
// get users page
async function getUsers(req, res, next) {
    try {
        const users = await Person_model_1.default.find();
        res.status(200).json({
            users,
        });
    }
    catch (err) {
        next(err);
    }
}
exports.getUsers = getUsers;
// get user by id
async function getById(req, res, next) {
    try {
        const user = await Person_model_1.default.findById(req.params.id);
        if (user === null) {
            throw (0, http_errors_1.default)(404, 'user not found!');
        }
        res.status(200).json({
            user,
        });
    }
    catch (err) {
        next(err);
    }
}
exports.getById = getById;
// get current user
async function getCurrentUser(req, res, next) {
    // console.log(req.user); comes from setCurrentUser middleware
    if (req.user) {
        res.status(200).json({
            user: req.user,
        });
    }
    else {
        res.status(404).json({
            user: null,
        });
    }
}
exports.getCurrentUser = getCurrentUser;
// add user
async function signup(req, res, next) {
    const hashedPassword = await bcrypt_1.default.hash(req.body.password, 10);
    const newUser = new Person_model_1.default({
        ...req.body,
        password: hashedPassword,
    });
    console.log('user created successfully - ', newUser);
    // save user or send error
    try {
        await newUser.save();
        res.status(200).json({
            message: 'Signed up successfully!',
        });
    }
    catch (err) {
        res.status(500).json({
            errors: {
                msg: 'Unknown error occured!',
            },
        });
    }
}
exports.signup = signup;
// delete user
async function deleteUser(req, res, next) {
    try {
        await Person_model_1.default.findByIdAndDelete({
            _id: req.params.id,
        });
        res.status(200).json({
            message: 'User was removed successfully!',
        });
    }
    catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Could not delete the user!',
                },
            },
        });
    }
}
exports.deleteUser = deleteUser;
// login user
async function login(req, res, next) {
    try {
        const user = await Person_model_1.default.findOne({ email: req.body.email });
        if (user && user._id) {
            const isValidPassword = await bcrypt_1.default.compare(req.body.password, user.password);
            if (isValidPassword) {
                // prepare the user object to generate token
                const userObject = {
                    userid: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role || 'user',
                };
                // generate token
                const token = jsonwebtoken_1.default.sign(userObject, config_1.default.jwt.secret, {
                    expiresIn: config_1.default.jwt.expiry,
                });
                res.status(200).json({
                    token,
                    user: userObject,
                });
            }
            else {
                throw (0, http_errors_1.default)(400, 'Login failed! Email & Password dont match.');
            }
        }
        else {
            throw (0, http_errors_1.default)(400, 'Login failed! Email & Password dont match.');
        }
    }
    catch (err) {
        next(err);
    }
}
exports.login = login;
//# sourceMappingURL=user.controller.js.map
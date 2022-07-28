"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.setCurrentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// middleware to set user object if jwt token present in header
const setCurrentUser = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const authorization = req.headers.authorization.split(' ')[1];
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(authorization, config_1.default.jwt.secret);
        }
        catch (e) {
            return next();
            // return res.status(401).send('unauthorized');
        }
        // Fetch the user by id
        // const user = await User.findOne({ _id: decoded.userid });
        const user = {
            userid: decoded.userid,
            username: decoded.username,
            email: decoded.email,
        };
        req.user = user;
    }
    next();
};
exports.setCurrentUser = setCurrentUser;
// auth guard to protect routes that need authentication
const requireRole = (role) => (req, res, next) => {
    if (req.user.role && role.includes(req.user.role)) {
        next();
    }
    else {
        res.status(401).json({
            errors: {
                message: 'You are not authorized!',
            },
        });
    }
};
exports.requireRole = requireRole;
//# sourceMappingURL=rbacHandler.js.map
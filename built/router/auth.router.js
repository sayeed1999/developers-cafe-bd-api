"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// external imports
const express_1 = __importDefault(require("express"));
// internal imports
const user_controller_1 = require("../controllers/user.controller");
const userValidator_1 = require("../middlewares/auth/userValidator");
const rbacHandler_1 = require("../middlewares/common/rbacHandler");
const router = express_1.default.Router();
// only admin routes
router.get('/users', (0, rbacHandler_1.requireRole)('admin'), user_controller_1.getUsers);
router.delete('/users/:id', (0, rbacHandler_1.requireRole)('admin'), user_controller_1.deleteUser);
// general routes
router.get('/users/:id', user_controller_1.getById);
router.post('/get-current-user', user_controller_1.getCurrentUser);
router.post('/signup', userValidator_1.addUserValidators, userValidator_1.addUserValidationHandler, user_controller_1.signup);
router.post('/login', user_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.router.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const router = express_1.default.Router();
router.get('/', post_controller_1.getAll);
router.get('/:id', post_controller_1.getById);
router.post('/', post_controller_1.insertOne);
router.put('/:id', post_controller_1.findByIdAndUpdate);
exports.default = router;
//# sourceMappingURL=newsfeed.router.js.map
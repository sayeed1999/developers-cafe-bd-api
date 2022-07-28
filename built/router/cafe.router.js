"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cafe_controller_1 = require("../controllers/cafe.controller");
const router = express_1.default.Router();
router.get('/', cafe_controller_1.getAll);
router.get('/:id', cafe_controller_1.getById);
router.post('/', cafe_controller_1.insertOne);
router.put('/:id', cafe_controller_1.findByIdAndUpdate);
router.post('/:id/rating', cafe_controller_1.giveProductRating);
exports.default = router;
//# sourceMappingURL=cafe.router.js.map
"use strict";
const express = require('express');
const { getAll, getById, insertOne, findByIdAndUpdate, giveProductRating, } = require('../controllers/cafe.controller');
const router = express.Router();
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', insertOne);
router.put('/:id', findByIdAndUpdate);
router.post('/:id/rating', giveProductRating);
module.exports = router;
module.exports = {};
//# sourceMappingURL=cafe.router.js.map
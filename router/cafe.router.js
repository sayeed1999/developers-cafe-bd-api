const express = require('express');

const {
    getAll,
    getById,
    insertOne,
    findByIdAndUpdate,
    giveProductRating,
} = require('../controller/cafe.controller');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', insertOne);
router.put('/:id', findByIdAndUpdate);
router.post('/:id/rating', giveProductRating);

module.exports = router;

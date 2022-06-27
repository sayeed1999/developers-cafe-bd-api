const express = require('express');

const {
    getAll,
    getById,
    insertOne,
    findByIdAndUpdate,
} = require('../controller/post.controller');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', insertOne);
router.put('/:id', findByIdAndUpdate);

module.exports = router;

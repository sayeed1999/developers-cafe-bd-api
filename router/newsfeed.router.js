const express = require('express');

const {
    getAll,
    getById,
    insertOne,
    findByIdAndUpdate,
} = require('../controller/post.controller');

const router = express.Router();

router.get('/posts', getAll);
router.get('/posts/:id', getById);
router.post('/posts', insertOne);
router.put('/posts/:id', findByIdAndUpdate);

module.exports = router;

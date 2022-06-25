const express = require('express');

const {
    getAll,
    getOne,
    createOne,
} = require('../controller/post.controller');

const router = express.Router();

router.get('/posts', getAll);
router.get('/posts/:id', getOne);
router.post('/posts', createOne);

module.exports = router;

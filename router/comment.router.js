const express = require('express');

const {
    insertOne,
} = require('../controller/comment.controller');

const router = express.Router();

router.post('/', insertOne);

module.exports = router;

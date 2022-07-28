const express = require('express');

const {
    insertOne,
} = require('../controllers/comment.controller');

const router = express.Router();

router.post('/', insertOne);

module.exports = router;
export = {};

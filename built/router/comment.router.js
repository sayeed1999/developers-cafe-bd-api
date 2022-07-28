"use strict";
const express = require('express');
const { insertOne, } = require('../controllers/comment.controller');
const router = express.Router();
router.post('/', insertOne);
module.exports = router;
module.exports = {};
//# sourceMappingURL=comment.router.js.map
const express = require('express');

const {
    getAll,
    getById,
    insertOne,
    findByIdAndUpdate,
} = require('../controller/cafe.controller');

const router = express.Router();

router.get('/products', getAll);
router.get('/products/:id', getById);
router.post('/products', insertOne);
router.put('/products/:id', findByIdAndUpdate);

module.exports = router;

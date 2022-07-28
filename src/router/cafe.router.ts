import express from 'express';

import {
    getAll,
    getById,
    insertOne,
    findByIdAndUpdate,
    giveProductRating,
} from '../controllers/cafe.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', insertOne);
router.put('/:id', findByIdAndUpdate);
router.post('/:id/rating', giveProductRating);

export default router;

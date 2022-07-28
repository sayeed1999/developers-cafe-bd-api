import express from 'express';

import {
    getAll,
    getById,
    insertOne,
    findByIdAndUpdate,
} from '../controllers/post.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', insertOne);
router.put('/:id', findByIdAndUpdate);

export default router;

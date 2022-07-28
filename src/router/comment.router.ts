import express from 'express';

import {
    insertOne,
} from '../controllers/comment.controller';

const router = express.Router();

router.post('/', insertOne);

export default router;

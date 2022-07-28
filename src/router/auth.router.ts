// external imports
import express from 'express';

// internal imports
import {
    getUsers,
    getById,
    getCurrentUser,
    deleteUser,
    signup,
    login,
} from '../controllers/user.controller';

import {
    addUserValidators,
    addUserValidationHandler,
} from '../middlewares/auth/userValidator';

import { requireRole } from '../middlewares/common/rbacHandler';

const router = express.Router();

// only admin routes
router.get('/users', requireRole('admin'), getUsers);
router.delete('/users/:id', requireRole('admin'), deleteUser);

// general routes
router.get('/users/:id', getById);
router.post('/get-current-user', getCurrentUser);
router.post('/signup', addUserValidators, addUserValidationHandler, signup);
router.post('/login', login);

export default router;

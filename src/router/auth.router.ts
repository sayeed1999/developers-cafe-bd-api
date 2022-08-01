// external imports
import express from 'express';

// internal imports
import {
    getUsers,
    getUserById,
    getCurrentUser,
    deleteUser,
    signupUser,
    loginUser,
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
router.get('/users/:id', getUserById);
router.post('/get-current-user', getCurrentUser);
router.post('/signup', addUserValidators, addUserValidationHandler, signupUser);
router.post('/login', loginUser);

export default router;

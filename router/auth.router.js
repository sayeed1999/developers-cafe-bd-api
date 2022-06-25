// external imports
const express = require('express');

// internal imports
const {
    getUsers,
    deleteUser,
    signup,
    login,
} = require('../controller/user.controller');

const {
    addUserValidators,
    addUserValidationHandler,
} = require('../middlewares/auth/userValidator');

const { requireRole } = require('../middlewares/common/rbacHandler');

const router = express.Router();

// only admin routes
router.get('/users', requireRole('admin'), getUsers);
router.delete('/users/:id', requireRole('admin'), deleteUser);
// general routes
router.post('/signup', addUserValidators, addUserValidationHandler, signup);
router.post('/login', login);

module.exports = router;

// external imports
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

// internal imports
import User from '../models/person.model';
import config from '../config';
import UserService from '../services/user.service';

const userService = new UserService(); // DI not used

// get users page
async function getUsers(req, res, next) {
    try {
      const users = await userService.getAll();
      res.status(200).json({
        users,
      });
    } catch (err) {
      next(err);
    }
}

// get user by id
async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    if (user === null) {
      throw createError(404, 'user not found!');
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
}

// get current user
async function getCurrentUser(req, res, next) {
  // console.log(req.user); comes from setCurrentUser middleware!!

  if (req.user) {
    res.status(200).json({
      user: req.user,
    });
  } else {
    res.status(404).json({
      user: null,
    });
  }
}

// add user
async function signupUser(req, res, next) {
    try {
      const newUser = await userService.signup(req.body);
      res.status(200).json({
        message: 'Signed up successfully!',
      });
    } catch (err) {
      res.status(500).json({
        errors: {
            msg: 'Unknown error occured!',
        },
      });
    }
}

// login user
async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const { token, userObject } = await userService.login(email, password);

    res.status(200).json({
      token,
      user: userObject,
    });

  } catch (err) {
    next(err);
  }
}

// delete user
async function deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      await userService.deleteById(id);

      res.status(200).json({
        message: 'User was removed successfully!',
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: 'Could not delete the user!',
          },
        },
      });
    }
}

export {
  getUsers,
  getUserById,
  getCurrentUser,
  deleteUser,
  signupUser,
  loginUser,
};

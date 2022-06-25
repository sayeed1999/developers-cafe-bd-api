// external imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// internal imports
const User = require('../models/Person');

// get users page
async function getUsers(req, res, next) {
    try {
      const users = await User.find();
      res.render('users', {
        users,
      });
    } catch (err) {
      next(err);
    }
}

// add user
async function signup(req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        ...req.body,
        password: hashedPassword,
    });

    // save user or send error
    try {
      await newUser.save();
      res.status(200).json({
        message: 'User was added successfully!',
      });
    } catch (err) {
      res.status(500).json({
        errors: {
            msg: 'Unknown error occured!',
        },
      });
    }
}

// delete user
async function deleteUser(req, res, next) {
    try {
      await User.findByIdAndDelete({
        _id: req.params.id,
      });

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

// login user
async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password,
      );

      if (isValidPassword) {
        // prepare the user object to generate token
        const userObject = {
          userid: user._id,
          username: user.name,
          email: user.email,
          role: user.role || 'user',
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        res.status(200).json({
          body: {
            token,
          },
        });
      } else {
        throw createError('Login failed! Please try again.');
      }
    } else {
      throw createError('Login failed! Please try again.');
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  deleteUser,
  signup,
  login,
};

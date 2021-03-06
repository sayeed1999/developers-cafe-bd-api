// external imports
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

// internal imports
import User from '../models/Person.model';
import config from '../config';

// get users page
async function getUsers(req, res, next) {
    try {
      const users = await User.find();
      res.status(200).json({
        users,
      });
    } catch (err) {
      next(err);
    }
}

// get user by id
async function getById(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
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
  // console.log(req.user); comes from setCurrentUser middleware

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
async function signup(req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        ...req.body,
        password: hashedPassword,
    });

    console.log('user created successfully - ', newUser);

    // save user or send error
    try {
      await newUser.save();
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
          username: user.username,
          email: user.email,
          role: user.role || 'user',
        };

        // generate token
        const token = jwt.sign(userObject, config.jwt.secret, {
          expiresIn: config.jwt.expiry,
        });

        res.status(200).json({
            token,
            user: userObject,
        });
      } else {
        throw createError(400, 'Login failed! Email & Password dont match.');
      }
    } else {
      throw createError(400, 'Login failed! Email & Password dont match.');
    }
  } catch (err) {
    next(err);
  }
}

export {
  getUsers,
  getById,
  getCurrentUser,
  deleteUser,
  signup,
  login,
};

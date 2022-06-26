const createError = require('http-errors');

const Post = require('../models/Post.model');

async function getAll(req, res, next) {
    try {
      const datas = await Post.find();
      res.status(200).json(datas);
    } catch (err) {
      next(err);
    }
}

async function getById(req, res, next) {
    try {
        const data = await Post.findById(req.params.id);
        if (data === null) {
          throw createError(404, 'post not found!');
        }
        res.status(200).json({
          data,
        });
    } catch (err) {
        next(err);
    }
}

async function insertOne(req, res, next) {
    try {
        const data = await Post.insertMany([req.body]);
        res.status(200).json({
          data,
        });
    } catch (err) {
        next(err);
    }
}

async function findByIdAndUpdate(req, res, next) {
  try {
      const data = await Post.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        data,
      });
  } catch (err) {
      next(err);
  }
}

module.exports = {
  getAll,
  getById,
  insertOne,
  findByIdAndUpdate,
};

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

async function getOne(req, res, next) {
    try {
        const data = await Post.findById(req.params.id);
        res.status(200).json({
          data,
        });
    } catch (err) {
        next(err);
    }
}

async function createOne(req, res, next) {
    try {
        const datas = await Post.insertMany([req.body]);
        res.status(200).json({
          datas,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
  getAll,
  getOne,
  createOne,
};

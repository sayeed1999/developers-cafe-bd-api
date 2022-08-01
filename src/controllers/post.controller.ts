import createError from 'http-errors';

import Post from '../models/post.model';

async function getAll(req, res, next) {
    try {
      const { size, page } = req.query; // query parameters
      const data = await Post
                          .find()
                          .sort({ createdAt: -1 })
                          .limit(size).skip(size * (page - 1));
      res.status(200).json({ data });
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
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
}

async function findByIdAndUpdate(req, res, next) {
  try {
      const data = await Post.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ data });
  } catch (err) {
      next(err);
  }
}

export {
  getAll,
  getById,
  insertOne,
  findByIdAndUpdate,
};


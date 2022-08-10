import createError from 'http-errors';

import PostService from '../services/post.service';
import Pagination from '../interfaces/pagination.interface';

const postService = new PostService();

async function getAll(req, res, next) {
    try {
      const args: Pagination = req.query;
      const data = await postService.getAll(args);
      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
}

async function getById(req, res, next) {
    const { id } = req.params;
    try {
        const data = await postService.getById(id);
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
        const data = await postService.insertOne(req.body);
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
}

async function findByIdAndUpdate(req, res, next) {
  try {
      const data = await postService.findByIdAndUpdate(req.params.id, req.body);
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


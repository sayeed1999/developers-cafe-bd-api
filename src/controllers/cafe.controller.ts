import createError from 'http-errors';

import CafeService from '../services/cafe.service';
import Product from '../models/product.model';

const cafeService = new CafeService();

async function getAll(req, res, next) {
    try {
      const data = await cafeService.getAll();
      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
}

async function getById(req, res, next) {
    const { id } = req.params.id;
    try {
        const data = await cafeService.getById(+id);
        if (data === null) {
          throw createError(404, 'product not found!');
        }
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
}

async function insertOne(req, res, next) {
    try {
        const data = await cafeService.insertOne(req.body);
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
}

async function findByIdAndUpdate(req, res, next) {
  try {
      const data = await cafeService.findByIdAndUpdate(+req.params.id, req.body);
      res.status(200).json({ data });
  } catch (err) {
      next(err);
  }
}

async function giveProductRating(req, res, next) {
  const { userid } = req.user;
  try {
    const productId = req.params.id;
    const { star } = req.body;

    const updated = await cafeService.giveProductRating(+userid, +productId, +star);

    res.status(200).json({
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}

export {
  getAll,
  getById,
  insertOne,
  findByIdAndUpdate,
  giveProductRating,
};

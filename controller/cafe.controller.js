const createError = require('http-errors');

const Product = require('../models/Product.model');

async function getAll(req, res, next) {
    try {
      const data = await Product.find();
      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
}

async function getById(req, res, next) {
    try {
        const data = await Product.findById(req.params.id);
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
        const data = await Product.insertMany([req.body]);
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
}

async function findByIdAndUpdate(req, res, next) {
  try {
      const data = await Product.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ data });
  } catch (err) {
      next(err);
  }
}

async function giveProductRating(req, res, next) {
  try {
    const productId = req.params.id;
    const { star } = req.body;

    // const product = await Product.findById(productId);
    // product.ratings.findIndex(x => x.id === )

    res.status(200).json({
      data: null,
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
  giveProductRating,
};

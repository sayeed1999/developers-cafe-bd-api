const createError = require('http-errors');
const Post = require('../models/Post.model');

async function insertOne(req, res, next) {
    const fullUrl = req.originalUrl.split('/');
    const postId = fullUrl[fullUrl.length - 2];
    const comment = req.body;
    try {
        await Post.updateOne({
            _id: postId,
            }, {
            $push: {
                comments: comment,
            },
        });
        const modifiedPost = await Post.findById(postId);
        res.status(201).json({ data: modifiedPost });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    insertOne,
};

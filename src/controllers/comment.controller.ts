import createError from 'http-errors';
import Post from '../models/post.model';
import CommentService from '../services/comment.service';

const commentService = new CommentService();

async function insertOne(req, res, next) {
    const fullUrl = req.originalUrl.split('/');
    const postId = +fullUrl[fullUrl.length - 2];
    const comment = req.body;
    
    try {
        const modifiedPost = await commentService.newCommentOnPost(postId, comment);
        res.status(201).json({ data: modifiedPost });
    } catch (err) {
        next(err);
    }
}

export {
    insertOne,
};


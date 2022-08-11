import Post from "../models/post.model";
import Comment from "../models/comment.model";
import BaseService from "./base.service"
import { ObjectId } from "mongoose";
import PostService from "./post.service";

const postService = new PostService();

export default class CommentService extends BaseService {
    constructor() {
        super(Comment);
    }

    newCommentOnPost = async (postId: ObjectId | string, comment: any) => {
        await Post.updateOne({
            _id: postId,
            }, {
            $push: {
                comments: comment,
            },
        });
        const modifiedPost = await postService.getById(postId);
        return modifiedPost;
    }
}
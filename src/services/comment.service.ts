import Post from "../models/post.model";
import Comment from "../models/comment.model";
import BaseService from "./base.service"

export default class CommentService extends BaseService {
    constructor() {
        super(Comment);
    }

    newCommentOnPost = async (postId: number, comment: any) => {
        await Post.updateOne({
            _id: postId,
            }, {
            $push: {
                comments: comment,
            },
        });
        const modifiedPost = await this.getById(postId);
        return modifiedPost;
    }
}
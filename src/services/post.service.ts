import Post from "../models/post.model";
import BaseService from "./base.service";

export default class PostService extends BaseService {
    constructor() {
        super(Post);
    }
}

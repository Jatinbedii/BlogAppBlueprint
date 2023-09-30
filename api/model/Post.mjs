
import { Schema, model } from "mongoose";
const PostSchema = new Schema({
    title: {type: String, required: true},
    summary: {type : String, required: true},
    content: {type: String, required: true},
    pic: {type:String, required: true},
    user: {type: String, required: true}
})

const Post = model('posts',PostSchema);
export default Post;

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "title required"],
    },
    description: {
        type: String,
        required: [true, "description required"],
    },
    image: {
        type: String,
        // required: [true, "image required"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user required"],
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comments",
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "users",
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: "users",
    }],
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isReported: {
        type: Boolean,
        default: false,
    },
    
  }, {timestamps: true});
  
  var postModel = mongoose.model("posts", postSchema, "posts");
  
  module.exports = postModel;
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
        required: [true, "text required"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user required"],
    },
    
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isReported: {
        type: Boolean,
        default: false,
    },

    
})

const commentModel = mongoose.model("comments", commentSchema, "comments");
module.exports = commentModel;
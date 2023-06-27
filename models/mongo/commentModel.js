const mongoose = require("mongoose");
const baseSchema = require("./baseModel");

const commentSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: [true, "user_id is required"], },
        manga_id: { type: String, required: [true, "manga_id is required"], },
        content: { type: String, required: [true, "content is required"], },
    },
    {
        versionKey: false
    }
);

commentSchema.add(baseSchema)

module.exports = mongoose.model("Comment", commentSchema, "comment");
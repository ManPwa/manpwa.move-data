const mongoose = require("mongoose");
const baseSchema = require("./baseModel");

const followSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: [true, "user_id is required"], },
        manga_id: { type: String, required: [true, "manga_id is required"], },
        is_following: { type: Boolean, default: true }
    },
    {
        versionKey: false
    }
);

followSchema.add(baseSchema)

module.exports = mongoose.model("Follow", followSchema, "following-manga");
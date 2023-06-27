const mongoose = require("mongoose");
const baseSchema = require("./baseModel");

const ratingSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: [true, "user_id is required"], },
        manga_id: { type: String, required: [true, "manga_id is required"], },
        rating: { type: Number, required: [true, "rating is required"], },
    },
    {
        versionKey: false
    }
);

ratingSchema.add(baseSchema)

module.exports = mongoose.model("Rating", ratingSchema, "rating");
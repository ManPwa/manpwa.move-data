const mongoose = require("mongoose");
const baseSchema = require("./baseModel");

const imageSchema = new mongoose.Schema(
    {
        chapter_id: { type: String, required: [true, "chapter_id is required"], },
        page: { type: Number, default: null },
        image_url: { type: String, default: null },
    },
    {
        versionKey: false
    }
);

imageSchema.add(baseSchema)

module.exports = mongoose.model("Image", imageSchema, "chapter-image");
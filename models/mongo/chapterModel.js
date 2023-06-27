const mongoose = require("mongoose");
const baseSchema = require("./baseModel");

const chapterSchema = new mongoose.Schema(
    {
        manga_id: { type: String, required: [true, "manga_id is required"], },
        chapter: { type: Number, default: null },
        title: { type: String, default: null },
        volumne: { type: String, default: null },
        pages: { type: Number, default: null },
    }, 
    {
        versionKey: false
    }
);

chapterSchema.add(baseSchema)

module.exports = mongoose.model("Chapter", chapterSchema, "chapter");
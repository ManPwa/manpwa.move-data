const mongoose = require("mongoose");
const baseSchema = require("./baseModel");

const mangaSchema = new mongoose.Schema(
    {
        title: { type: String, default: null },
        description: { type: String, default: null },
        year: { type: Number, default: null },
        status: { type: String, default: null },
        demographic: { type: String, default: null },
        cover_art_url: { type: String, default: null },
        author: { type: String, default: null },
        tags: { type: Array },
        original_language: { type: String, default: null }
    }, 
    {
        versionKey: false
    }
);

mangaSchema.add(baseSchema)

module.exports = mongoose.model("Manga", mangaSchema, "manga");
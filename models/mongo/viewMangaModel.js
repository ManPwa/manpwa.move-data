const mongoose = require("mongoose");
// const mangaSchema = require("./mangaModel");
const baseSchema = require("./baseModel");

const viewMangaSchema = new mongoose.Schema(
    {
        title: { type: String, default: null },
        description: { type: String, default: null },
        year: { type: Number, default: null },
        status: { type: String, default: null },
        demographic: { type: String, default: null },
        cover_art_url: { type: String, default: null },
        author: { type: String, default: null },
        tags: { type: Array },
        original_language: { type: String, default: null },
        following: { type: Number, default: null },
        average_rating: { type: Number, default: null },
        latest_chapter: { type: Number, default: null },
    },
    {
        versionKey: false
    }
);

viewMangaSchema.add(baseSchema)
viewMangaSchema.index({ title: 'text' });

module.exports = mongoose.model("MangaView", viewMangaSchema, "view--manga");
const MangaView = require("../models/mongo/viewMangaModel");
const Manga = require("../models/mongo/mangaModel");
const Chapter = require("../models/mongo/chapterModel");
const Image = require("../models/mongo/imageModel");


const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
  });

const updateMangaData = async () => {
    base_url = 'https://api.mangadex.org';
    const followed_manga = await MangaView.find({
        "_deleted": null,
        "following": { $gt: 0 }
    });
    for (const manga of followed_manga) {
        console.log(`Updating ${manga.title}...`)
        const chapter_response = await fetch(`${base_url}/manga/${manga.id}/feed?translatedLanguage[]=en&limit=50&order[chapter]=desc`);
        const mychapterJson = await chapter_response.json();
        for (const chapter of mychapterJson["data"]) {
            try {
                attributes = chapter["attributes"]
                if (Number(attributes["chapter"]) > manga.latest_chapter) {
                    const image_response = await fetch(`${base_url}/at-home/server/${chapter["id"]}`);
                    const myImageJson = await image_response.json();
                    await Chapter.create({
                        "_id": chapter["id"],
                        "manga_id": manga.id,
                        "chapter": Number(attributes["chapter"]),
                        "title": attributes["title"],
                        "volumne": attributes["volumne"],
                        "pages": Number(attributes["pages"])
                    })
                    for (const [i, image] of myImageJson["chapter"]["dataSaver"].entries()) {
                        await Image.create({
                            "chapter_id": chapter["id"],
                            "page": i,
                            "image_url": `${myImageJson["baseUrl"]}/data-saver/${myImageJson["chapter"]["hash"]}/${image}`
                        })
                    }
                    await delay(1500);
                }
            } catch (e) {
                console.log(e);
            }
        }
        await Manga.findByIdAndUpdate(
            manga.id,
            {
                "_updated": Date.now()
            }
        )
    }
    console.log(`Done`)
}

module.exports = {
    updateMangaData
  };
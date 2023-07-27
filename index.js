const dotenv = require("dotenv").config();
const schedule = require('node-schedule');
const connectDb = require('./configs/db/mongo');
const { neode, driver } = require('./configs/db/neo4j');
const { moveDataManga, moveDataUser, moveDataRating } = require('./helpers/move-data-func');
const { updateMangaData } = require('./helpers/update-manga-func');


connectDb();
const movedata = async () => {
    // await moveDataManga();
    // await moveDataUser();
    // await moveDataRating();
    await updateMangaData();
}

movedata();
schedule.scheduleJob('0 */30 * * * *', async () => {
    console.log(Date.now());
    await movedata();
});
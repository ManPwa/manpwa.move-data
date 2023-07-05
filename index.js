const dotenv = require("dotenv").config();
import schedule from 'node-schedule';
const connectDb = require('./configs/db/mongo');
const { neode, driver } = require('./configs/db/neo4j');
const { moveDataManga, moveDataUser, moveDataRating } = require('./helpers/move-data-func');


connectDb();
const movedata = async () => {
    await moveDataManga();
    await moveDataUser();
    await moveDataRating();
}

movedata();

schedule.scheduleJob('0 0 0 * *', async () => {
    await movedata();
});
const Neode = require('neode');
const neo4j = require("neo4j-driver");

const Manga = require('../../models/neo4j/manga');
const User = require('../../models/neo4j/user');
const Rating = require('../../models/neo4j/rating');

const neode = new Neode.fromEnv().with({
    Manga,
    User,
    Rating,
});

const driver = neo4j.driver(`bolt://127.0.0.1:7687`, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));

console.log('Neo4j is running');

module.exports = {
    neode,
    driver
};
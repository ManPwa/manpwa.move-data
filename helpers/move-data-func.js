const Manga = require("../models/mongo/mangaModel");
const User = require("../models/mongo/userModel");
const Rating = require("../models/mongo/ratingModel");
const { neode, driver } = require("../configs/db/neo4j");

const moveDataManga = async () => {
  let mangas = [];
  try {
    mangas = await Manga.find({
      "_deleted": null
    });
  } catch (error) {
    mangas = [];
  }
  const session = driver.session();

  try {
    await session.executeWrite((tx) => {
      mangas.forEach((manga) => {
        const _id = manga._id.toString();
        tx.run(
          `
                MERGE (manga:Manga{
                    _id:$_id
                })
                ON CREATE SET
                    manga.title=$title,
                    manga.year=$year,
                    manga.demographic=$demographic,
                    manga.author=$author,
                    manga.tags=$tags,
                    manga.original_language=$original_language
                ON MATCH SET
                    manga.title=$title,
                    manga.year=$year,
                    manga.demographic=$demographic,
                    manga.author=$author,
                    manga.tags=$tags,
                    manga.original_language=$original_language
                WITH manga
                MATCH (other:Manga)
                WHERE other._id <> manga._id AND size([t in manga.tags WHERE t in other.tags]) > 0
                MERGE (manga)-[r:SIMILAR]-(other)
                ON MATCH SET r.score = size([t in manga.tags WHERE t in other.tags])
                ON CREATE SET r.score = size([t in manga.tags WHERE t in other.tags])
                WITH manga, other
                WHERE other._id <> manga._id AND manga.demographic = other.demographic
                MERGE (manga)-[r:SIMILAR]-(other)
                ON MATCH SET r.score = r.score + 1
                ON CREATE SET r.score = 1
          `,
          {
            _id: _id,
            title: manga.title,
            description: manga.description,
            year: manga.year,
            status: manga.status,
            demographic: manga.demographic,
            author: manga.author,
            tags: manga.tags,
            original_language: manga.original_language,
          }
        );
      });
    });
    console.log("Move manga success");
  } catch (error) {
    console.log(error);
    console.log("Move manga failed");
  } finally {
    session.close();
  }
};

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

const moveDataUser = async () => {
  let users = [];
  try {
    users = await User.find({
      "is_admin": false,
      "_deleted": null
    });
  } catch (error) {
    users = [];
  }
  const session = driver.session();

  try {
    await session.executeWrite((tx) => {
      users.forEach((user) => {
        const _id = user._id.toString();
        const age = getAge(user.date_of_birth);
        tx.run(
          `
                MERGE (user:User{
                    _id:$_id
                })
                ON CREATE SET
                    user.username=$username,
                    user.gender=$gender,
                    user.age=$age
                ON MATCH SET
                    user.username=$username,
                    user.gender=$gender,
                    user.age=$age
                WITH user
                MATCH (other:User)
                WHERE other._id <> user._id AND user.age = other.age
                MERGE (user)-[r:SIMILAR]-(other)
                ON MATCH SET r.score = 1
                ON CREATE SET r.score = 1
                WITH user, other
                WHERE other._id <> user._id AND user.gender = other.gender
                MERGE (user)-[r:SIMILAR]-(other)
                ON MATCH SET r.score = r.score + 1
                ON CREATE SET r.score = 1
          `,
          {
            _id: _id,
            username: user.username,
            gender: user.gender,
            age: age
          }
        );
      });
    });
    console.log("Move user success");
  } catch (error) {
    console.log(error);
    console.log("Move user failed");
  } finally {
    session.close();
  }
};


const moveDataRating = async () => {
  let ratings = [];
  try {
    ratings = await Rating.find({
      "_deleted": null
    });
  } catch (error) {
    ratings = [];
  }
  const session = driver.session();

  try {
    await session.executeWrite((tx) => {
      ratings.forEach((rating) => {
        const _id = rating._id.toString();
        tx.run(
          `
            MATCH (user:User {
                _id:$user_id
            })
            MATCH (manga:Manga {
                _id:$manga_id
            })
            MERGE (manga)<-[r1:INTERACTIVE]-(user)
                ON MATCH SET r1.score=$rating
                ON CREATE SET r1.score=$rating
          `,
          {
            _id: _id,
            manga_id: rating.manga_id,
            user_id: rating.user_id,
            rating: rating.rating
          }
        );
      });
    });
    console.log("Move rating success");
  } catch (error) {
    console.log(error);
    console.log("Move rating failed");
  } finally {
    session.close();
  }
};

module.exports = {
  moveDataManga,
  moveDataUser,
  moveDataRating
};

require("dotenv").config(); //para leer .env
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const VideogameModel = require("./src/models/Videogame");
const GenresModel = require("./src/models/Genres");

//URL de conexion
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

// defino los modelos a utilizar
VideogameModel(sequelize);
GenresModel(sequelize);

// relaciono los modelos de muchos a muchos
const { Videogame, Genres } = sequelize.models;
Videogame.belongsToMany(Genres, { through: "videogame_genres" });
Genres.belongsToMany(Videogame, { through: "videogame_genres" });

module.exports = {
  Videogame,
  Genres,
  conn: sequelize,
};

const axios = require("axios");
require("dotenv").config();
const { Genres } = require("../../db_conecctions");
const { API_KEY } = process.env;

//********** GET/GENRES **********//

/* ----- obtengo Genres de la API---- */

const genresVg = async () => {
  try {
    const resp = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = await resp.data.results.map((g) => g.name);
    console.log(genres);

    genres.map((e) =>
      Genres.findOrCreate({
        //lo busco, si no esta lo creo
        where: { name: e },
      })
    );

    const allGenres = await Genres.findAll();
    return allGenres;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { genresVg };

const axios = require("axios");
require("dotenv").config();
const { Videogame, Genres } = require("../../db_conecctions");

const { API_KEY } = process.env;

//********** GET/VIDEOGAMES **********//

/* ----- obtengo 100 Videogames de la API ----- */
const vgApi = async () => {
  let allVideogames = []; // aca voy a guardar todos los videogames (api)
  try {
    for (let i = 1; i < 5; i++) {
      const respuesta = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page${i}`
      );
      respuesta.data.results.map((vg) => {
        // puedo usar un for each
        allVideogames.push({
          id: vg.id,
          name: vg.name,
          image: vg.background_image,
          rating: vg.rating,
          //mapeo genres y platforms que tienen varios objetos dentro de un array
          genres: vg.genres.map((g) => g.name),
          platforms: vg.platforms.map((p) => p.platform.name),
        });
      });
    }
    return allVideogames;
  } catch (error) {
    throw Error(error.message);
  }
};

/* ----- obtengo todos los Videogames de la DB ----- */
const vgDb = async () => {
  try {
    return await Videogame.findAll({
      include: [
        {
          model: Genres, // de este model quiero q me incluya solo atributo name
          attributes: ["name"],
          through: { atributes: [] },
        },
      ],
    });
  } catch (error) {
    throw Error(error.message);
  }
};
/* ----- uno las dos informaciones de la DB y Api ----- */
const vgTotal = async () => {
  const infoApi = await vgApi(); //guardo la info q me trae la ejecucin de vgApi
  const infoDb = await vgDb(); //guardo la info q me trae la ejecucin de vgDb
  const infoTotal = [...infoApi, ...infoDb];
  return infoTotal;
};
// exporto vgTotal

//********** GET/VIDEOGAMES/NAMES?= **********//

const vgByName = async (name) => {
  try {
    /* ----- obtengo Videogames por nombre de la API ----- */
    let arrayByNameApi = [];
    const respApi = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&&key=${API_KEY}`
    );
    respApi.data.results.map((vg) => {
      return arrayByNameApi.push({
        id: vg.id,
        name: vg.name,
        image: vg.background_image,
        rating: vg.rating,
        genres: vg.genres.map((g) => g.name),
        platforms: vg.platforms.map((p) => p.platform.name),
      });
    });
    // arrayByNameApi = arrayByNameApi.filter(
    //   (vg) => vg.name.toLowerCase() || vg.name.toUperCase()
    //);

    /* ----- obtengo Videogames por nombre de la DB----- */
    const byNamDb = await Videogame.findAll({
      where: {
        name: name,
      },
      include: [
        {
          model: Genres,
          attributes: ["name"],
          through: {
            atributes: [],
          },
        },
      ],
    });
    const arrayByNameDb = []; //guardo en un array solo la info que me interesa de v de DB para mostrar al inicio
    byNamDb.map((vg) => {
      return arrayByNameDb.push({
        id: vg.id,
        name: vg.name,
        image: vg.background_image,
        rating: vg.rating,
        genres: vg.genres.map((g) => g.name),
        platforms: vg.platforms.map((p) => p.platform.name),
      });
    });
    const allVgByName = [...arrayByNameApi, ...arrayByNameDb];
    return allVgByName;
  } catch {
    throw Error(error.message);
  }
};

//********** GET/VIDEOGAMES/:IDVIDEOGAMES= **********//

module.exports = { vgTotal, vgByName };
//para juntar los videogames de bd y de la api: allVideogames  = [...bd, ...api]

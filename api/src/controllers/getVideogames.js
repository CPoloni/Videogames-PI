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

/* ----- obtengo Videogames por nombre de la API ----- */
const vgByNameApi = async (name) => {
  let videogamesName = []; // guardo los videogames que coincidan con el nombre (api)
  try {
    const respuesta = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );
    respuesta.data.results.map((vg) => {
      videogamesName.push({
        id: vg.id,
        name: vg.name,
        image: vg.background_image,
        rating: vg.rating,
        genres: vg.genres.map((g) => g.name),
        platforms: vg.platforms.map((p) => p.platform.name),
      });
    });
    return videogamesName;
  } catch (error) {
    //throw Error(error.message);
    if (axios.isAxiosError(error)) {
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
};

/* ----- obtengo Videogames por nombre de la DB----- */
const vgByNameDb = async (name) => {
  try {
    return await Videogame.findAll({
      where: {
        name: name,
      },
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
const totalByName = async () => {
  const byNameApi = await vgByNameApi(); //guardo la info q me trae la ejecucin de vgByNameApi
  const byNameDb = await vgByNameDb(); //guardo la info q me trae la ejecucin de vgByNameDb
  const byNametotal = [...byNameApi, ...byNameDb];
  if (byNametotal.length < 1) {
    return "There are no results for that name";
  } else if (byNametotal.length >= 1 && byNametotal.length <= 15) {
    return byNametotal;
  } else {
    //return byNametotal.slice(0, 15);
    const byName15 = byNametotal.slice(0, 15);
    return byName15;
  }
};

//SI HAY NAME TENGO QUE DEVOLVER LOS PRIMEROS 15 DE LA API Y BASE DE DATOS
//con un metdo slice corto el array que me guarda con los nombres

//********** GET/VIDEOGAMES/:IDVIDEOGAMES= **********//

module.exports = { vgTotal, totalByName };
//para juntar los videogames de bd y de la api: allVideogames  = [...bd, ...api]

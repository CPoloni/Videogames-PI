const axios = require("axios");
require("dotenv").config();
const { Videogame, Genres } = require("../../db_conecctions");

const { API_KEY } = process.env;

//********** GET/VIDEOGAMES **********//

/* ----- para obtener Videogames de la API ----- */
const vgApi = async () => {
  let url = new URL("https://api.rawg.io/api/games");

  url.searchParams.set("key", API_KEY);

  let allVideogames = []; // aca voy a guardar todos los videogames (api)
  try {
    for (let i = 0; i < 5; i++) {
      const respuesta = await axios.get(url.href); // puedo usar un for each
      respuesta.data.results.map((vg) => {
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
      url = new URL(respuesta.data.next); // cambia la url a la url siguiente
      //console.log({ url });
    }
    return allVideogames;
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   console.log(error.response.data);
    // } else {
    console.log(error);
    // }
  }
};

/* ----- para obtener Videogames de la DB ----- */
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
    console.log(error);
  }
};
/* ----- uno las dos informaciones de la DB y Api ----- */
const vgTotal = async () => {
  const infoApi = await vgApi(); //guardo la info q me trae la ejecucin de vgApi
  const infoDb = await vgDb(); //guardo la info q me trae la ejecucin de vgDb
  //concateno;
  //const infoTotal = infoApi.concat(infoDb);
  const infoTotal = [...infoApi, ...infoDb];
  return infoTotal;
};
// exporto info total

//********** GET/VIDEOGAMES/NAMES?= **********//

//SI HAY NAME TENGO QUE DEVOLVER LOS PRIMEROS 15 DE LA API Y BASE DE DATOS
//con un metdo slice corto el array que me guarda con los nombres

//********** GET/VIDEOGAMES/:IDVIDEOGAMES= **********//

module.exports = { vgTotal };
//para juntar los videogames de bd y de la api: allVideogames  = [...bd, ...api]

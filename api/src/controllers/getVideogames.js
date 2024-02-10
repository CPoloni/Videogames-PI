const axios = require("axios");
require("dotenv").config();
const { Videogame, Genres } = require("../../db_conecctions");

const { API_KEY } = process.env;

//********** GET/VIDEOGAMES **********//

const allVideog = async () => {
  try {
    /* ----- obtengo 100 Videogames de la API ----- */
    let vgApi100 = []; // aca guardo todos los videogames (api)
    for (let i = 1; i < 5; i++) {
      const resp = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page${i}`
      );
      console.log(resp);
      resp.data.results.map((vg) => {
        vgApi100.push({
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

    /* ----- obtengo todos los Videogames de la DB ----- */

    let VgDb = await Videogame.findAll({
      include: [
        {
          model: Genres, // de este model quiero q me incluya solo atributo name
          attributes: ["name"],
          through: { atributes: [] },
        },
      ],
    });
    const arrayAllVgDb = []; //guardo en un array solo la info que me interesa de VG de DB
    VgDb.map((vg) => {
      return arrayAllVgDb.push({
        id: vg.id,
        name: vg.name,
        image: vg.background_image,
        rating: vg.rating,
        genres: vg.genres.map((g) => g.name),
        platforms: vg.platforms.map((p) => p.platform.name),
      });
    });
    const allVideogames = [...arrayAllVgDb, ...vgApi100];
    return allVideogames;
  } catch {
    throw Error(error.message);
  }
};

//********** GET/VIDEOGAMES/NAMES?= **********//

const vgByName = async (name) => {
  try {
    /* ----- obtengo Videogames por nombre de la API ----- */
    let arrayByNameApi = [];
    const resp = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&&key=${API_KEY}`
    );
    resp.data.results.map((vg) => {
      //
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
      //TRER SOLO LA INFO DE VIEOGAMES QU EQUIERO

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
    const arrayByNameDb = []; //guardo en un array solo la info que me interesa de VG de DB
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

//********** GET/VIDEOGAMES/:IDVIDEOGAME= **********//
//(separo las dos funciones, n otra funcion segun formato Id busco en API o DB)

/* ----- obtengo Videogame por ID de la API----- */
const vgIdApi = async (id) => {
  const vgApi = [];
  try {
    const resp = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    console.log(resp);
    const dataId = resp.data;
    vgApi.push({
      id: dataId.id,
      name: dataId.name,
      image: dataId.background_image,
      rating: dataId.rating,
      genres: dataId.genres.map((g) => g.name),
      description: dataId.description,
      released: dataId.released,
      platforms: dataId.platforms.map((p) => p.platform.name),
    });
    //console.log(vgApi);

    return vgApi;
  } catch (error) {
    throw Error(error.message);
  }
};

/* ----- obtengo Videogame por ID de la DB----- */
const vgIdDb = async (id) => {
  try {
    let VgDb = await Videogame.findByPk(id, {
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

const vgId = async (id, source) => {
  if (source === "API") return vgIdApi(id);
  else return vgIdDb(id);
};

//********** POST/CREAR VIDEOGAME **********//

const createVg = async ({
  name,
  image,
  rating,
  description,
  released,
  platforms,
  genre,
}) => {
  if (
    !name ||
    !image ||
    !rating ||
    !description ||
    !released ||
    !platforms ||
    !genre
  ) {
    return "All fields must be complete";
  }
  if (rating < 1 || rating > 5) {
    return "The rating entered is not within the valid parameters";
  }
  try {
    //deberia ir un findOrCreated q busque si existe el mismo nombre
    const newVg = await Videogames.create({
      name: name,
      image: image,
      description: description,
      released: released,
      platforms: platforms, // CREAR UN MODELO DE PLATFORMS PARA VINCULAR DE MUCHOS A MUCHOS CON VG
    });
    console.log(newVg);

    genres.forEach(async (g) => {
      let genresVg = await Genres.findOne({ where: { name: g } });
      newVg.addGenre(genresVg);
    });

    return newVg;
  } catch (error) {
    throw Error(error.message);
  }
};

//utilizar findorcreate

module.exports = { allVideog, vgByName, vgId, createVg };

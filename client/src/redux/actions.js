import axios from "axios";
//importo actions-types
import {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_NAME,
  GET_VIDEOGAME_ID,
  GET_GENRES,
  CREATE_GAME,
  ORDER_ALP,
  ORDER_RATING,
  FILTER_API_DB,
  FILTER_GENRES,
  //ver ERROR
} from "./actions-types";

// creo una funcion para cada action y las exporto
// las funciones retornan una funcion async que recibe por argumento(dispatch),
//   esta funcion asyncrona va a retornar al dispatch({
//     type:..,
//   payload:  })

// trae todos los videogames
export const getVideogames = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get("http://localhost:3001/videogames");
      const data = resp.data;
      return dispatch({ type: GET_VIDEOGAMES, pyload: data });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

// trae todos los videogames por nombre
export const getVideogamesName = (name) => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      const data = resp.data;
      return dispatch({ type: GET_VIDEOGAMES_NAME, pyload: data });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

// trae videogame por id
export const getGenres = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`http://localhost:3001/videogames/${id}`);
      const data = resp.data;
      return dispatch({ type: GET_VIDEOGAME_ID, pyload: data });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

// trae los generos
export const getVideogamesId = (id) => {
  return async (dispatch) => {
    try {
      const resp = await axios.get("http://localhost:3001/genres");
      const data = resp.data;
      return dispatch({ type: GET_GENRES, pyload: data });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

// crea un nuevo videogame
export const createVideogame = (game) => {
  return async (dispatch) => {
    try {
      const newGame = await axios.post(
        "http://localhost:3001/videogames",
        game
      );
      const data = newGame.data;
      return dispatch({ type: CREATE_GAME, pyload: data });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

// ordena alfabeticamente
export const orderAlp = (alp) => {
  return {
    type: ORDER_ALP,
    payload: alp,
  };
};

// ordena por rating
export const orderRating = (rating) => {
  return {
    type: ORDER_RATING,
    payload: rating,
  };
};

// filtra por api o db
export const filterApiDb = (source) => {
  return {
    type: FILTER_API_DB,
    payload: source,
  };
};

// filtra por genero
export const filterGenre = (genre) => {
  return {
    type: FILTER_GENRES,
    payload: genre,
  };
};

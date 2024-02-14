//importo las action types
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

const initialState = {
  videogames: [],
  filteredGames: [], //array con los juegos que fueron filtrados
  detailVideogame: [],
  genres: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // voy a tener los casos

    default:
      return { ...state };
  }
};
export default reducer;

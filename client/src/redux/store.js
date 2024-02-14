/*DEPENDENCIES */
import { createStore, applyMiddleware, compose } from "redux"; // es el mediador que le permite a redux manejar asincronias
import thunkMiddleware from "redux-thunk";

import reducer from "./reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //esta linea sirve para conectar nuestra app con la extension REDUX DEVTOOLS DEL NAVEGADOR

//como primer parametro nuestro archivo reducer, segundo parametro opciones extras q querramos q nos haga nuestro store
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware)) //esta linea sirve para que podamos hacer péticioens  una api/servidor
);

export default store;

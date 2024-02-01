// EN ESTE ARCHIVO VOY A TENER LOS MIDDLEWARE Y EN INDEX LA CONFIGURACION DEL SERVIDOR
const express = require("express"); //requiero express
const morgan = require("morgan");

const server = express(); //lo ejecuto

server.use(morgan("dev"));
//AGREGAR MAS MIDDLEWARE
//ver server.use(cors()) instalar la dependecia cors y requerirla: const cors= require ("cors")

//server.use(express.json()); // funcion de parseo(middleware)

//server.Use(nombre del archivo router)TRAER MI ARCHIVO DE RUTAS Y REQUERIRLO ARRIBA

/* este middleware agregara a todas las rutas dentro del router "/videogames". ej: si tengo una ruta en el router que es tipo Get y dije que se llama "/login", con este middlew. ahora se va a llamar"/videogmes/login"*/
//server.use("/videogames", router);

module.exports = { server };

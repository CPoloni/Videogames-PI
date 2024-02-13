// EN ESTE ARCHIVO VOY A TENER LOS MIDDLEWARE Y EN INDEX LA CONFIGURACION DEL SERVIDOR
const express = require("express"); //requiero express
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./src/routes/index");

const server = express(); //lo ejecuto

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//AGREGAR MAS MIDDLEWARE
//ver server.use(cors()) instalar la dependecia cors y requerirla: const cors= require ("cors")

server.use(express.json()); // funcion de parseo(middleware)
server.use(routes); //TRAER MI ARCHIVO DE RUTAS Y REQUERIRLO ARRIBA

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

/* este middleware agregara a todas las rutas dentro del router "/videogames". ej: si tengo una ruta en el router que es tipo Get y dije que se llama "/login", con este middlew. ahora se va a llamar"/videogmes/login"*/
//server.use("/videogames", routes);

module.exports = { server };

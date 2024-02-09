const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRoute = require("./route_videogames");
const genresRoute = require("./route_genres");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogamesRoute);
//router.use("/videogames/name", videogamesRoute);

router.use("/genres", genresRoute);
module.exports = router;

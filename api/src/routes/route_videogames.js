//SEPARAR LOS HANDLERS DE LAS RUTAS
const { Router } = require("express");
const {
  getVideogames,
  getByid,
  postVideogame,
} = require("../handlers/handler_videogames");

const router = Router();

router.get("/", getVideogames);
router.get("/:id", getByid);
router.post("/", postVideogame);

module.exports = router;

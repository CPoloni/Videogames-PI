const { Router } = require("express");
const { vgApi } = require("controllers/getVideogames");

const router = Router();
//recordar el next
// en esta ruta voy a traer todos los vg (api y db)o si me pasan el name por query los primeros 15 resultados.
router.get("/", async (req, res, next) => {
  //let { name } = req.query;
  let allVg = await vgApi();

  // CUANDO TENGA MI CONTROLLERS POR NAME PORNER EL IF(NAME), ELSE TODO
  // if (name) {
  //   try {
  //   } catch (error) {}
  // }
  try {
    res.status(200).send(allVg);
  } catch (error) {
    next(error);
  }
});

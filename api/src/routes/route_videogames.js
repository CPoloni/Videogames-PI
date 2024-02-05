const { Router } = require("express");
const { vgTotal } = require("../controllers/getVideogames");

const router = Router();
//recordar el next
// en esta ruta voy a traer todos los vg (api y db)o si me pasan el name por query los primeros 15 resultados.
router.get("/", async (req, res) => {
  //let { name } = req.query;
  let allVg = await vgTotal();

  // CUANDO TENGA MI CONTROLLERS POR NAME PORNER EL IF(NAME), ELSE TODO
  // if (name) {
  //   try {
  //   } catch (error) {}
  // }
  try {
    res.status(200).json(allVg);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

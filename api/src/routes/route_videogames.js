const { Router } = require("express");
const { vgTotal, totalByName } = require("../controllers/getVideogames");

const router = Router();
//recordar el next
// en esta ruta TRAIGO todos los vg (api y db) o si me pasan el name por query los primeros 15 resultados.
router.get("/", async (req, res) => {
  let { name } = req.query;
  let resVideogames;

  try {
    if (name) {
      resVideogames = await totalByName(name);
    } else {
      resVideogames = await vgTotal();
    }
    res.status(200).json({ resVideogames });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

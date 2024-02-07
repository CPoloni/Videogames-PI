const { Router } = require("express");
const { vgTotal, vgByName } = require("../controllers/getVideogames");

const router = Router();
//recordar el next
// en esta ruta TRAIGO todos los vg (api y db) o si me pasan el name por query los primeros 15 resultados.
router.get("/", async (req, res) => {
  let { name } = req.query;

  try {
    if (name) {
      const resVideogames = await vgByName(name); //pued crear dos constante una cpon api y otr
      if (resVideogames.length < 1) {
        return res.status(200).send("There are no results for that name");
      } else if (resVideogames.length >= 1 && resVideogames.length <= 15) {
        return res.status(200).json({ resVideogames });
      } else {
        let videogame15 = resVideogames.slice(0, 15);
        return res.status(200).json({ videogame15 });
      }
    } else {
      const resVideogames = await vgTotal(name);
      return res.status(200).json({ resVideogames });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

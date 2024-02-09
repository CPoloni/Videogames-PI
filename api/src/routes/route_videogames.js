//SEPARAR LOS HANDLERS DE LAS RUTAS

const { Router } = require("express");
const { allVideog, vgByName, vgId } = require("../controllers/getVideogames");

const router = Router();
//recordar el next
// en esta ruta TRAIGO todos los vg (api y db) o si me pasan el name por query los primeros 15 resultados.
router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      //manejo la respuest que me traen los controlers
      const resVideogames = await vgByName(name);
      if (resVideogames.length < 1) {
        return res.status(200).send("There are no results for that name");
      } else if (resVideogames.length >= 1 && resVideogames.length <= 15) {
        return res.status(200).json({ resVideogames });
      } else {
        let videogame15 = resVideogames.slice(0, 15);
        return res.status(200).json({ videogame15 });
      }
    } else {
      const resVideogames = await allVideog(name);
      return res.status(200).json({ resVideogames });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:Id", async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "DB" : "API";
  try {
    const vgById = await vgId(id, source); //id y source se lo paso por params al controler
    res.status(200).json(vgById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

//if vgId.lenght===0 retornar mensaje q no se encontro vg con ese id "There is no result for that ID";

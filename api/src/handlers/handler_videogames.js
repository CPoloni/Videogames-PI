const {
  allVideog,
  vgByName,
  vgId,
  createVg,
} = require("../controllers/getVideogames");

getVideogames = async (req, res) => {
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
};

getByid = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "DB" : "API";
  try {
    const vgById = await vgId(id, source); //id y source se lo paso por params al controler
    res.status(200).json(vgById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

postVideogame = async (req, res) => {
  const { name, image, rating, description, released, platforms, genre } =
    req.body;
  try {
    const newVideogame = await createVg(
      name,
      image,
      rating,
      description,
      released,
      platforms,
      genre
    );
    // const newVideogame = Videogames.create({
    //   name,
    //   image,
    //   rating,
    //   description,
    //   released,
    //   platforms,
    //   genre,
    // });
    res.status(200).json(newVideogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getVideogames, getByid, postVideogame };

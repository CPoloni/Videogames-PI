const { genresVg } = require("../controllers/getGenres");

getGenres = async (req, res) => {
  try {
    const genres = await genresVg();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { getGenres };

const { Router } = require("express");
const { getGenres } = require("../handlers/handler_genres");

const router = Router();

router.get("/", getGenres);

module.exports = router;

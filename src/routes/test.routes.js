

const router = require("express").Router();

router.get("/", require("../controllers/test"));

module.exports = router;
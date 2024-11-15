

const router = require("express").Router();
const testcontroller = require("../controllers/test");

router.get("/test-with-controller", testcontroller.test);

module.exports = router;
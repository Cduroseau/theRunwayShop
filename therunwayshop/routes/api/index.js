const router = require("express").Router();
const imageapiRoutes = require("./imageapi");

// imageapi routes
router.use("/imageapi", imageapiRoutes);

module.exports = router;
const router = require("express").Router();
const htmlRoutes = require("../html");

router.use("/login", htmlRoutes);

module.exports = router;

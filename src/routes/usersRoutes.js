const express = require('express');
const router = express.Router();

const controllers = require("../API-Controllers/usersControllers.js")

router.get("/cart", controllers.productCart);

module.exports = router;
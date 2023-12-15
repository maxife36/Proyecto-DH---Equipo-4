const express = require('express');
const router = express.Router();

const controllers = require('../API-Controllers/productsControllers.js')

router.get("/detail", controllers.productoDetail)
router.get("/edit", controllers.productEdit)

module.exports = router;
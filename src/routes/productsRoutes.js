const express = require('express');
const router = express.Router();

const controllers = require('../API-Controllers/productsControllers.js')

router.get("/detail", controllers.productoDetail)
router.get("/edit", controllers.productEdit)
router.post("/edit", controllers.productStore)



module.exports = router;
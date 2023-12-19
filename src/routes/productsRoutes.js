const express = require('express');
const router = express.Router();

const controllers = require('../API-Controllers/productsControllers.js')

router.get("/detail", controllers.productoDetail)
router.get("/create", controllers.createPage)
router.post("/create", controllers.productCreate)
router.get("/edit/:id", controllers.editPage)
router.put("/edit/:id", controllers.productEdit)
router.delete("/delete/:id", controllers.productDelete)


module.exports = router;
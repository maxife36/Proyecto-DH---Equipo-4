const express = require("express")
const router = express.Router()

const { cartController: controllers } = require("../API-Controllers")

router.put("/addQuantity", controllers.addQuantityProduct);
router.put("/restQuantity", controllers.restQuantityProduct);


module.exports = router
const express = require("express")
const router = express.Router()

const controllers = require("../API-Controllers/internalControllers.js")

router.get("/darkmode", controllers.darkMode);
router.get("/darkmode/productDetail", controllers.ProductDetailDkMode)
router.get("/subMenues", controllers.subMenues);
router.get("/forms", controllers.forms);
router.get("/header", controllers.header)

module.exports = router
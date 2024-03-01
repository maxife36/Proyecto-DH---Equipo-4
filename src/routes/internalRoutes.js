const express = require("express")
const router = express.Router()

const { internalControllers: controllers } = require("../API-Controllers")

router.get("/darkmode", controllers.darkMode);
router.get("/darkmode/productDetail", controllers.ProductDetailDkMode)
router.get("/subMenues", controllers.subMenues);
router.get("/forms", controllers.forms);
router.get("/header", controllers.header)
router.get("/sideCart", controllers.sideCart);

module.exports = router
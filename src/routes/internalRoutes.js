const express = require("express")
const router = express.Router()

const { internalControllers: controllers } = require("../API-Controllers")

router.get("/darkmode", controllers.darkMode);
router.get("/darkmode/productDetail", controllers.ProductDetailDkMode)
router.get("/darkmode/productDisplay", controllers.ProductDisplayDkMode)
router.get("/subMenues", controllers.subMenues);
router.get("/forms", controllers.forms);
router.get("/header", controllers.header)
router.get("/sideCart", controllers.sideCart);
router.get("/mainControllers", controllers.mainControllers);
router.get("/productDisplay", controllers.productDisplay);

module.exports = router
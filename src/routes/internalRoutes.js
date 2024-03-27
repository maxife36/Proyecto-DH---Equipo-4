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
router.get("/favorites", controllers.favorites);
router.get("/mainControllers", controllers.mainControllers);
router.get("/productDisplay", controllers.productDisplay);
router.get("/userProfile", controllers.userProfile);
router.get("/userData", controllers.userData);
router.get("/securityData", controllers.securityData);
router.get("/purchases", controllers.purchases);
router.get("/profileCart", controllers.profileCart);
router.get("/allProducts", controllers.allProducts);
router.get("/allUsers", controllers.allUsers);
router.get("/productDetail", controllers.productDetail);
router.get("/productCreate", controllers.productCreate);
router.get("/productEdit", controllers.productEdit);

module.exports = router
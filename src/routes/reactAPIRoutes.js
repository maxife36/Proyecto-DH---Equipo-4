const express = require("express")
const router = express.Router()

const { reactAPI: controllers } = require("../API-Controllers")

router.get("/users",  controllers.getAllUsers)
router.get("/users/:userId",  controllers.getUserDetail)
router.get("/products",  controllers.getAllProducts)
router.get("/products/:productId",  controllers.getProductDetail)

module.exports = router
const express = require("express")
const router = express.Router()

const { paymenController: controllers } = require("../API-Controllers")

router.post("/create-order", controllers.createOrder )
router.post("/create-one-product-order", controllers.createOneProductOrder )

router.get("/success", controllers.successHandler )
router.get("/failure", controllers.failureHandler )
router.get("/pending", controllers.pendingHandler )

router.post("/cartWebhook/:userId/:cartId", controllers.recieveCartWebhook )
router.post("/oneProductWebhook/:userId", controllers.recieveOneProducttWebhook )

module.exports = router
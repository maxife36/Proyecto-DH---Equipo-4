const express = require("express")
const router = express.Router()

const { paymenController: controllers } = require("../API-Controllers")

router.post("/create-order", controllers.createOrder )

router.get("/success", controllers.successHandler )
router.get("/failure", controllers.failureHandler )
router.get("/pending", controllers.pendingHandler )

router.post("/webhook/:userId/:cartId", controllers.recieveWebhook )

module.exports = router
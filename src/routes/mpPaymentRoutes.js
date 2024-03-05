const express = require("express")
const router = express.Router()

const { paymenController: controllers } = require("../API-Controllers")

router.post("/create-order", controllers.createOrder )

router.get("/success", (req, res) => {res.send("success")} )
router.get("/failure", (req, res) => {res.send("failure")} )
router.get("/pending", (req, res) => {res.send("pending")} )

router.post("/webhook", controllers.recieveWebhook )


module.exports = router
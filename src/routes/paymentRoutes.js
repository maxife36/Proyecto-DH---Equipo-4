const express = require("express")

const controller = require("../API-Controllers/paymenController")

const router = express.Router()

router.post("/create-order", controller.createOrder )

router.get("/success", (req, res) => {console.log("AQUI EN SUCCESS");res.send("success")} )
router.get("/failure", (req, res) => {res.send("failure")} )
router.get("/pending", (req, res) => {res.send("pending")} )

router.post("/webhook", controller.recieveWebhook )


module.exports = router
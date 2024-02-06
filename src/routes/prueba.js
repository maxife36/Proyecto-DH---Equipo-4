const express = require("express")
const router = express.Router()

const controller = require("../API-Controllers/prueba")

router.post("/createUser", controller.createUser)
router.get("/allUser", controller.showUser)


module.exports = router
const express = require("express")
const router = express.Router()

const controller = require("../API-Controllers/prueba")

router.post("/createUser", controller.createUser)


module.exports = router
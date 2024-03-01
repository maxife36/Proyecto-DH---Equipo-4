const express = require("express")
const router = express.Router()

const { mainControllers: controllers } = require("../API-Controllers")

router.get("/",  controllers.index)

module.exports = router
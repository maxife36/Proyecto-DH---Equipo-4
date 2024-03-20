const express = require("express")
const router = express.Router()

const { mainControllers: controllers } = require("../API-Controllers")

router.get("/",  controllers.index)
router.get("/getHost",  controllers.hostName)

module.exports = router
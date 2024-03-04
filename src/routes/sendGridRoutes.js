const express = require("express")
const router = express.Router()

const { sendGridController: controllers } = require("../API-Controllers")

router.get("/verifiedController/:id",  controllers.emailVerifier)

module.exports = router
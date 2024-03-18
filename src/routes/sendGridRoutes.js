const express = require("express")
const router = express.Router()

const { sendGridController: controllers } = require("../API-Controllers")

router.get("/verifiedController/:id",  controllers.emailVerifier)
router.get("/verifiedSecurityData/:id/:validateToken",  controllers.authUsersetting)

module.exports = router
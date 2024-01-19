const express = require("express")
const router = express.Router()

const controllers = require("../API-Controllers/mainControllers.js")

router.get("/", controllers.index)
router.get("/login", controllers.login);
router.get('/register', controllers.register);


module.exports = router
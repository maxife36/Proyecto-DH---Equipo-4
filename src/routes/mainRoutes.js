const express = require("express")
const guestMiddleware = require("../Middlewares/guestMiddleware.js")
const authMiddleware = require("../Middlewares/authMiddleware.js")
const router = express.Router()

const controllers = require("../API-Controllers/mainControllers.js")

router.get("/", controllers.index)
router.get("/login",guestMiddleware, controllers.login);
router.get('/register',guestMiddleware, controllers.register);
router.get("/prueba", (req,res) => {
    if (req.session.loggedUser) {
        res.send(req.session.loggedUser)
    }
    });

router.post("/login-form", controllers.loginUser)



module.exports = router
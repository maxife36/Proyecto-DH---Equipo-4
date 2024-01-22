const express = require('express');
const router = express.Router();

const controllers = require("../API-Controllers/usersControllers.js")

router.get("/cart", controllers.productCart);


router.get('/register', controllers.showForm);

router.post('/register-form',  controllers.processRegister);

module.exports = router;
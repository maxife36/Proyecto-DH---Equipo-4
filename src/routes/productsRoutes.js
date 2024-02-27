const express = require("express");
const router = express.Router();

const controllers = require("../API-Controllers/productsControllers.js")

const guestMiddleware = require("../Middlewares/guestMiddleware.js")
const authMiddleware = require("../Middlewares/authMiddleware.js")
const adminMiddleware = require("../Middlewares/adminMiddleware.js")

const { productImageUpload } = require("../API-Controllers/configMulter&Validator.js")


router.get("/detail/:productId", controllers.productDetail); //Muestra el Form
router.get("/create", adminMiddleware, controllers.showCreateForm); //Muestra el Form

router.post("/create"/* , adminMiddleware*/, productImageUpload.array("image") , controllers.processCreate)
// router.get("/edit/:id", adminMiddleware, controllers.editPage)
// router.put("/edit/:id", adminMiddleware, upload.array("image"), controllers.productEdit)
// router.delete("/delete/:id", adminMiddleware, controllers.productDelete)


module.exports = router;
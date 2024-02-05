const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require("path")

const controllers = require("../API-Controllers/productsControllers.js")

let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, "..", "..", "public", "img", "Products-Image"))
    },
    filename: function (req, file, cb){
        const imageName = Date.now() + "_img" + path.extname(file.originalname)
        cb(null, imageName) 
        
    }
})

const upload = multer({storage})


router.get("/detail", controllers.productoDetail)
router.get("/create", controllers.createPage)
router.post("/create", upload.single("image"), controllers.productCreate)
router.get("/edit/:id", controllers.editPage)
router.put("/edit/:id", upload.single("image"), controllers.productEdit)
router.delete("/delete/:id", controllers.productDelete)


module.exports = router;
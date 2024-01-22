const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require('path')

let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, "..", "..", "public", "img", "usersImg"))
    },
    filename: function (req, file, cb){
        const imageName = Date.now() + "_img" + path.extname(file.originalname)
        cb(null, imageName) 
        
    }
})

const upload = multer({storage})

const controllers = require("../API-Controllers/usersControllers.js");


router.get("/cart", controllers.productCart);


router.get('/register', controllers.showForm);

router.post('/register-form', upload.single("profileImg"), 
controllers.processRegister
// (req,res) => res.send("PEPE")
);



module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require('path')
const { body } = require('express-validator')

//Validaciones
const validateRegister = [
    body('fullName').notEmpty().withMessage('Debes completar el campo de Nombre y Apellido'),
    body('userEmail').isEmail().withMessage('Debes completar un Email válido'),
    body('userBirthday').isAlphanumeric().withMessage('Debes completar Fecha de Nacimiento'),
    body('userAdress').notEmpty().withMessage('Debes completar tu Domicilio'),
    body('userName').notEmpty().withMessage('Debes completar tu Usuario'),
    body('password').notEmpty().withMessage('Debes completar tu Contraseña'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('confirmPassword').notEmpty().withMessage('Debes confirmar tu Contraseña')
]

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

router.post('/', validateRegister, controllers.showForm);

router.post('/register-form', upload.single("profileImg"),
controllers.processRegister
);



module.exports = router;
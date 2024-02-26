const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require("path")
const { body } = require("express-validator")
const controllers = require("../API-Controllers/usersControllers.js");
const guestMiddleware = require("../Middlewares/guestMiddleware.js")
const authMiddleware = require("../Middlewares/authMiddleware.js")


//Validaciones
const validateRegister = [
    body("fullName").notEmpty().withMessage("Debes completar el campo de Nombre y Apellido"),
    body("userEmail").notEmpty().withMessage("Debes completar un Email válido")
        .isEmail(),
    body("userBirthday").notEmpty().withMessage("Debes completar Fecha de Nacimiento")
        .custom((value) => {
            const currentDate = new Date();
            const birthDate = new Date(value);

            const age = (currentDate - birthDate) / (1000 * 60 * 60 * 24 * 365.25)

            if (age < 18) throw new Error("Debes ser mayor de 18 años");

            return true;
        }),
    body("userName").notEmpty().withMessage("Debes completar tu Usuario"),
    body("password").notEmpty().withMessage("Debes completar tu Contraseña")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("confirmPassword").notEmpty().withMessage("Debes confirmar tu Contraseña")
        .custom((value, { req }) => {
            const password = req.body.password;
            const confirmPassword = value;
            if (confirmPassword !== password) {
                throw new Error("Las contraseñas no coinciden");
            }
            return true;
        })
]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/img/usersImg"))
    },
    filename: function (req, file, cb) {
        const imageName = Date.now() + "_img" + path.extname(file.originalname)
        cb(null, imageName)
    }
})

const fileFilter = function (req, file, cb) {
    //Verifico si se subio algun archivo
    if (!file) {
        cb(new Error("No se ha subido ningún archivo"));
        return;
    }

    // Verificar que sea un formato valido de imagen 
    const allowedFormats = ["jpg", "jpeg", "png"];
    const ext = path.extname(file.originalname).toLowerCase().substring(1);
    if (allowedFormats.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("El formato del archivo no es válido"));
    }
};

const upload = multer({ storage, fileFilter })

router.get("/login", guestMiddleware, controllers.login);
router.get("/register", guestMiddleware, controllers.register);

router.get("/cart", controllers.productCart);

router.post("/processLogin", controllers.processlogin);
router.post("/processRegister", upload.single("profileImg"), validateRegister, controllers.processRegister);

/* 
Falta controladro para:
-Actualizar Valores de usuario
-Eliminar una cuenta
-Cerrar sesion ( eliminar cookie y session)
-Cambiar permiso de admin 0 a admin 1
*/


module.exports = router;
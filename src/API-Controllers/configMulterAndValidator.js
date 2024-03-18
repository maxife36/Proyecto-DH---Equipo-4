const multer = require("multer")
const { body } = require("express-validator")
const path = require("path")



//Validaciones con Express-Validator
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
const validateEditPersonalData = [
    body("fullName").notEmpty().withMessage("Debes completar el campo de Nombre y Apellido"),
    body("userBirthday").notEmpty().withMessage("Debes completar Fecha de Nacimiento")
        .custom((value) => {
            const currentDate = new Date();
            const birthDate = new Date(value);

            const age = (currentDate - birthDate) / (1000 * 60 * 60 * 24 * 365.25)

            if (age < 18) throw new Error("Debes ser mayor de 18 años");

            return true;
        })
]
const validateSecurityData = [
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
//"productName", "productBrand", "shortDescription", "productPrice", "stock", "imageTitles", "categories"
const validateProductCreate = [
    body("productName").notEmpty().withMessage("Debes completar el Nombre del Producto"),
    body("productBrand").notEmpty().withMessage("Debes completar la Marca del Producto"),
    body("shortDescription").notEmpty().withMessage("Debes proveer una descripción breve del Producto."),
    body("productPrice").notEmpty().withMessage("Debes completar el Precio del Producto")
        .isInt({ gt: 0 }).withMessage('Debe ser un número entero mayor que 0'),
    body("stock").notEmpty().withMessage("Debes completarel stock del Producto. Debe ser mayor a 0 (cero).")
        .isInt({ gt: 0 }).withMessage('Debe ser un número entero mayor que 0'),
    body("categories").notEmpty().withMessage("Debes otorgarle una Categoria al Producto")
        .not().equals("default").withMessage("Debes otorgarle una Categoria al Producto")
]

//Configuraciones de Multer

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

//----Multer storage para profile Image
const storageUserRegister = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/img/usersImg"))
    },
    filename: function (req, file, cb) {
        const imageName = Date.now() + "_img" + path.extname(file.originalname)
        cb(null, imageName)
    }
})


//----Multer storage para Products Images

let storageProductImages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/img/Products-Image"))
    },
    filename: function (req, file, cb) {
        const imageName = Date.now() + "_img" + path.extname(file.originalname)
        cb(null, imageName)

    }
})

const userProfileUpload = multer({ storage: storageUserRegister, fileFilter })
const productImageUpload = multer({ storage: storageProductImages, fileFilter })

module.exports = {
    validateRegister,
    validateProductCreate,
    userProfileUpload,
    productImageUpload,
    validateEditPersonalData,
    validateSecurityData
}
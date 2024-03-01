const express = require("express");
const router = express.Router();

const { usersControllers: controllers , configMulterAndValidator} = require("../API-Controllers")
const {validateRegister, userProfileUpload} = configMulterAndValidator

const { guestMiddleware, authMiddleware } = require("../Middlewares")

router.get("/login", guestMiddleware, controllers.login); //Muestra el Form
router.get("/register", guestMiddleware, controllers.register); //Muestra el Form
router.get("/editUser", authMiddleware, controllers.editUser); //Muestra el Form
router.get("/cart", authMiddleware, controllers.productCart); //Muestra el Form
router.get("/profile", authMiddleware, controllers.userProfile)
router.get("/processLogout", authMiddleware, controllers.processLogout);

router.post("/processLogin", guestMiddleware, controllers.processLogin);
router.post("/processRegister", guestMiddleware, userProfileUpload.single("profileImg"), validateRegister, controllers.processRegister);

router.put("/updateData", authMiddleware, userProfileUpload.single("profileImg"), validateRegister, controllers.processEditUser);

router.delete("/deleteUser", authMiddleware, controllers.deleteUser);

/* 
Falta PROBAR controlador para:
-Actualizar Valores de usuario
-Envio de formulariocon info de usuario

Falta controlador para:
*/


module.exports = router;
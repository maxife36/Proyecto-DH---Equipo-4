const express = require("express");
const router = express.Router();

const { usersControllers: controllers , configMulterAndValidator} = require("../API-Controllers")
const {validateRegister, userProfileUpload, validateEditPersonalData, validateSecurityData} = configMulterAndValidator

const { guestMiddleware, authMiddleware } = require("../Middlewares")

router.get("/login", guestMiddleware, controllers.login); //Muestra el Form
router.get("/register", guestMiddleware, controllers.register); //Muestra el Form
router.get("/editUser", authMiddleware, controllers.editUser); //Muestra el Form

router.get("/cart", authMiddleware, controllers.productCart); //Muestra el Form

router.get("/userOnlyData", authMiddleware, controllers.userOnlyData)
router.get("/profile", authMiddleware, controllers.userProfile)
router.get("/userData", authMiddleware, controllers.userData)
router.get("/securityData", authMiddleware, controllers.securityData)
router.get("/editSecurityData",authMiddleware, controllers.editSecurityData)
router.get("/favorites",authMiddleware, controllers.favoritesData)
router.get("/profileCart",authMiddleware, controllers.profileCart)
router.get("/processLogout", authMiddleware, controllers.processLogout);

router.get("/purchases", authMiddleware, controllers.purchases)

router.post("/processLogin", guestMiddleware, controllers.processLogin);
router.post("/processRegister", guestMiddleware, userProfileUpload.single("profileImg"), validateRegister, controllers.processRegister);

router.put("/updateData", authMiddleware, userProfileUpload.single("profileImg"), validateEditPersonalData, controllers.processEditUser);
router.put("/updateSecurityData", authMiddleware, validateSecurityData, controllers.processEditUser);

router.delete("/deleteUser", authMiddleware, controllers.deleteUser);


module.exports = router;
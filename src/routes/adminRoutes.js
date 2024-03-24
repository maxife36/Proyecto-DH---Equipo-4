const express = require("express");
const router = express.Router();

const { adminControllers: controllers , configMulterAndValidator} = require("../API-Controllers")
const {validateRegister, userProfileUpload} = configMulterAndValidator

router.get("/editUser", controllers.editUser); //Muestra el Form
router.get("/deleteUser", controllers.deleteUser);
router.get("/allProducts", controllers.allProducts);

router.post("/updateData", userProfileUpload.single("profileImg"), validateRegister, controllers.processEditUser);
router.post("/changePermission", controllers.changePermission);

module.exports = router;

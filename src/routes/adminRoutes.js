const express = require("express");
const router = express.Router();
const controllers = require("../API-Controllers/adminControllers");

const {validateRegister, userProfileUpload} = require("../API-Controllers/configMulter&Validator.js")

router.get("/editUser", controllers.editUser); //Muestra el Form
router.get("/deleteUser", controllers.deleteUser);

router.post("/updateData", userProfileUpload.single("profileImg"), validateRegister, controllers.processEditUser);
router.post("/changePermission", controllers.changePermission);

module.exports = router;

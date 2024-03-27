const express = require("express");
const router = express.Router();

const { adminControllers: controllers , configMulterAndValidator} = require("../API-Controllers")
const {validateRegister, userProfileUpload} = configMulterAndValidator

router.get("/editUser", controllers.editUser); //Muestra el Form
router.get("/allProducts", controllers.allProducts);
router.get("/allUsers", controllers.allUsers);
router.get("/userDetail/:userId", controllers.userDetail);

router.post("/updateData", userProfileUpload.single("profileImg"), validateRegister, controllers.processEditUser);

router.put("/changePermission", controllers.changePermission);

router.delete("/deleteUser", controllers.deleteUser);

module.exports = router;

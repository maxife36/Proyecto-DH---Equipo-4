const express = require("express")
const router = express.Router()

const { cartController: controllers } = require("../API-Controllers")

router.get("/oneCartProducts/:cartProductId", controllers.getOneCartProductInfo);
router.get("/allCartProducts", controllers.getCartProductsInfo);
router.post("/addProduct/:productId", controllers.addProductToCart); //Requiere params productId y por body = {quantity}
router.put("/updateQuantity", controllers.updateQuantity); // Requiere por body = { cartProductId, productId, currentQuantity }
router.delete("/deleteProduct/:cartProductId", controllers.deleteProduct); //Requiere params cartProductId
router.delete("/cleanCartProducts", controllers.cleanCartProducts);


module.exports = router
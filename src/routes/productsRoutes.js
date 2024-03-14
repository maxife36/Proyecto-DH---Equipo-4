const express = require("express");
const router = express.Router();

const { productsControllers: controllers , configMulterAndValidator} = require("../API-Controllers")
const { productImageUpload, validateProductCreate} = configMulterAndValidator

const { adminMiddleware } = require("../Middlewares")

router.get("/detail/:productId", controllers.productDetail); //Muestra el Form
router.get("/create", adminMiddleware, controllers.showCreateForm); //Muestra el Form
router.get("/edit/:productId", adminMiddleware, controllers.showEditForm) //Muestra el Form
router.get("/productsDisplay", controllers.productDisplay) // Por query -> categoryId, keywords, gte, lte , order, limit, offset

router.get("/filteredByNumber", controllers.filterProduct) // /filteredBy?gte=number&lte=number&order=["DESC", "ASC"] opcional
router.get("/search", controllers.searchProduct) // /search?keywords=texto%20buscado 

router.post("/create", adminMiddleware, productImageUpload.array("image"), validateProductCreate, controllers.processCreate)

router.put("/edit/:productId", adminMiddleware, productImageUpload.array("image"), validateProductCreate, controllers.processEdit)

router.delete("/delete/:productId", adminMiddleware, controllers.deleteProduct)


module.exports = router;